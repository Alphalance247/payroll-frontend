"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";

export type DropdownOption = {
  label: string;
  value: string;
  /** Nested options — triggers drill-down navigation (chevron variant) */
  subOptions?: Omit<DropdownOption, "subOptions">[];
};

export interface CustomDropdownProps {
  /** Default button label e.g. "All bonus" or "Status" */
  trigger: string;
  /** Panel header text e.g. "Select a bonus type" */
  title?: string;
  options: DropdownOption[];
  selected?: string[];
  onChange?: (values: string[]) => void;
  /**
   * "radio"   — circular selectors on the left (image 2 style)
   * "chevron" — right-arrow items that drill into sub-options (image 1 style)
   */
  variant?: "radio" | "chevron";
  /** Allow picking more than one option (radio variant) */
  multiSelect?: boolean;
  /** Optional "View All >" link in the footer */
  viewAllLabel?: string;
  onViewAll?: () => void;
  className?: string;
}

const CustomDropdown = ({
  trigger,
  title,
  options,
  selected = [],
  onChange,
  variant = "radio",
  multiSelect = false,
  viewAllLabel,
  onViewAll,
  className,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<DropdownOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveParent(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (value: string) => {
    if (!onChange) return;
    if (multiSelect) {
      const next = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange(next);
    } else {
      onChange(selected[0] === value ? [] : [value]);
      setOpen(false);
      setActiveParent(null);
    }
  };

  // Flatten all options + sub-options to resolve labels from values
  const flatOptions = options.flatMap((o) =>
    o.subOptions ? [o, ...o.subOptions] : [o],
  );

  const triggerLabel = (() => {
    if (selected.length === 0) return trigger;
    const first = flatOptions.find((o) => o.value === selected[0])?.label;
    if (selected.length === 1) return first ?? trigger;
    return `${first} +${selected.length - 1}`;
  })();

  const hasSelection = selected.length > 0;

  // What to render in the panel right now
  const visibleOptions = activeParent
    ? (activeParent.subOptions ?? [])
    : options;
  const panelTitle = activeParent ? activeParent.label : title;

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setActiveParent(null);
        }}
        className={`flex items-center gap-x-1.5 px-3 p-[7px] rounded-[8px] border text-sm font-medium transition-colors focus:outline-none
          ${
            hasSelection
              ? "bg-[#FCF2E8] border-[#E37915] text-[#CF6E13]"
              : "bg-white border-[#D3D3D6] text-[#2F2F33] hover:bg-[#F7F7F7]"
          }`}
      >
        {triggerLabel}
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg min-w-[220px] overflow-hidden">
          {/* Header */}
          {panelTitle && (
            <div className="flex items-center gap-x-2 px-4 pt-3 pb-1.5 border-b border-[#F0F0F3]">
              {activeParent && (
                <button
                  type="button"
                  onClick={() => setActiveParent(null)}
                  className="text-[#71717A] hover:text-[#2F2F33] transition-colors"
                  aria-label="Back"
                >
                  <ChevronLeft size={15} strokeWidth={2.5} />
                </button>
              )}
              <p className="text-xs font-medium text-[#71717A]">{panelTitle}</p>
            </div>
          )}

          {/* Options */}
          <ul className="py-1" role="listbox">
            {visibleOptions.map((opt) => {
              const isSelected = selected.includes(opt.value);
              const hasChildren = !activeParent && !!opt.subOptions?.length;

              /* ── Chevron item (top-level with sub-options, or explicit chevron variant) ── */
              if (hasChildren || (variant === "chevron" && !activeParent)) {
                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() =>
                        hasChildren
                          ? setActiveParent(opt)
                          : handleSelect(opt.value)
                      }
                      className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
                    >
                      <span>{opt.label}</span>
                      <ChevronRight
                        size={14}
                        strokeWidth={2}
                        className="text-[#71717A] flex-shrink-0"
                      />
                    </button>
                  </li>
                );
              }

              /* ── Radio item ── */
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="w-full flex items-center gap-x-3 px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
                  >
                    {/* Circle indicator */}
                    <span
                      className={`w-[16px] h-[16px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                        ${
                          isSelected ? "border-[#E37915]" : "border-[#D1D1D6]"
                        }`}
                    >
                      {isSelected && (
                        <span className="w-[7px] h-[7px] rounded-full bg-[#E37915]" />
                      )}
                    </span>
                    <span
                      className={`text-left ${isSelected ? "font-medium text-[#2F2F33]" : "font-normal text-[#2F2F33]"}`}
                    >
                      {opt.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* View All footer */}
          {viewAllLabel && onViewAll && !activeParent && (
            <div className="border-t border-[#F0F0F3] px-4 py-2.5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onViewAll();
                  setOpen(false);
                }}
                className="flex items-center gap-x-1 text-sm font-medium text-[#CF6E13] hover:text-[#E37915] transition-colors"
              >
                {viewAllLabel}
                <ChevronRight size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
