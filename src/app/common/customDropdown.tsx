"use client";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronRight } from "lucide-react";

export type DropdownOption = {
  label: string;
  value: string;
  subOptions?: Omit<DropdownOption, "subOptions">[];
};

export interface CustomDropdownProps {
  trigger: string;
  title?: string;
  options: DropdownOption[];
  selected?: string[];
  onChange?: (values: string[]) => void;
  multiSelect?: boolean;
  viewAllLabel?: string;
  onViewAll?: () => void;
  className?: string;
}

const RadioItem = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-x-3 px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
  >
    <span
      className={`w-[16px] h-[16px] rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
        isSelected ? "border-[#E37915]" : "border-[#D1D1D6]"
      }`}
    >
      {isSelected && (
        <span className="w-[7px] h-[7px] rounded-full bg-[#E37915]" />
      )}
    </span>
    <span
      className={`text-left ${
        isSelected ? "font-medium text-[#2F2F33]" : "font-normal text-[#2F2F33]"
      }`}
    >
      {label}
    </span>
  </button>
);

const CheckboxItem = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-x-3 px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
  >
    <span
      className={`w-[15px] h-[15px] rounded-[3px] border flex-shrink-0 flex items-center justify-center transition-colors ${
        isSelected
          ? "border-[#E37915] bg-[#E37915]"
          : "border-[#C7C7CC] bg-white"
      }`}
    >
      {isSelected && <Check size={9} strokeWidth={3} className="text-white" />}
    </span>
    <span className="text-left text-[#2F2F33]">{label}</span>
  </button>
);

const CustomDropdown = ({
  trigger,
  title,
  options,
  selected = [],
  onChange,
  multiSelect = false,
  viewAllLabel,
  onViewAll,
  className,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [expandedParent, setExpandedParent] = useState<DropdownOption | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setExpandedParent(null);
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
      setExpandedParent(null);
    }
  };

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

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setExpandedParent(null);
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
        <div className="absolute top-full mt-2 right-0 z-50">
          {/* Sub-options panel — separate card to the left with a gap */}
          {expandedParent?.subOptions && (
            <div className="absolute right-[calc(100%+8px)] top-8 bg-white border border-[#E3E3E5] rounded-xl shadow-lg overflow-hidden min-w-[200px]">
              <div className="px-4 pt-3 pb-1.5 border-b border-[#F0F0F3]">
                <p className="text-xs font-medium text-[#71717A]">
                  Select {expandedParent.label.toLowerCase()}
                </p>
              </div>
              <ul className="py-1" role="listbox">
                {expandedParent.subOptions.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={selected.includes(opt.value)}
                  >
                    <CheckboxItem
                      label={opt.label}
                      isSelected={selected.includes(opt.value)}
                      onClick={() => handleSelect(opt.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main options panel */}
          <div className="bg-white border border-[#E3E3E5] rounded-xl shadow-lg overflow-hidden min-w-[220px]">
            {title && (
              <div className="px-4 pt-3 pb-1.5 border-b border-[#F0F0F3]">
                <p className="text-xs font-medium text-[#71717A]">{title}</p>
              </div>
            )}

            <ul className="py-1" role="listbox">
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                const hasChildren = !!opt.subOptions?.length;
                const isExpanded = expandedParent?.value === opt.value;

                if (hasChildren) {
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedParent(isExpanded ? null : opt)
                        }
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#2F2F33] transition-colors ${
                          isExpanded ? "bg-[#F7F7F7]" : "hover:bg-[#F7F7F7]"
                        }`}
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

                return (
                  <li key={opt.value} role="option" aria-selected={isSelected}>
                    <RadioItem
                      label={opt.label}
                      isSelected={isSelected}
                      onClick={() => handleSelect(opt.value)}
                    />
                  </li>
                );
              })}
            </ul>

            {viewAllLabel && onViewAll && (
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
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
