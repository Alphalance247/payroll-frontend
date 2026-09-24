"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChevronDown } from "lucide-react";
import Button from "./Button";

export interface ActionMenuItem {
  label: string;
  onClick: () => void;
  /** "default" = normal text, "danger" = red, "warning" = orange */
  variant?: "default" | "danger" | "warning";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TableActionMenuProps {
  items: ActionMenuItem[];
  /**
   * When provided, renders a labeled button trigger (e.g. "More Actions")
   * instead of the default three-dots icon.
   */
  trigger?: string;
  /** Extra classes on the wrapper div */
  className?: string;
}

const variantClass: Record<NonNullable<ActionMenuItem["variant"]>, string> = {
  default: "text-[#2F2F33]",
  danger: "text-[#D42626]",
  warning: "text-[#CF6E13]",
};

// Rough per-item height (px-3 py-2 text-sm) plus the panel's p-2 padding.
const ITEM_HEIGHT = 36;
const PANEL_PADDING = 16;

interface MenuPosition {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

const TableActionMenu = ({
  items,
  trigger,
  className,
}: TableActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideTrigger = triggerRef.current?.contains(target);
      const insideMenu = menuRef.current?.contains(target);
      if (!insideTrigger && !insideMenu) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Menu is rendered via a portal at a fixed viewport position, so it isn't
  // clipped by a scrollable/overflow-hidden table ancestor. Close it on
  // scroll/resize instead of tracking a moving target.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const estimatedHeight = items.length * ITEM_HEIGHT + PANEL_PADDING;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUpward =
        spaceBelow < estimatedHeight && spaceAbove > spaceBelow;

      setPosition({
        right: window.innerWidth - rect.right,
        ...(openUpward
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      });
    }
    setOpen((p) => !p);
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      {trigger ? (
        <Button
          // type="button"
          variant="secondary"
          onButtonClick={handleToggle}
          className="flex items-center gap-x-1.5 px-3 py-[7px] rounded-[8px] border border-[#D3D3D6] text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors focus:outline-none"
        >
          {trigger}
          <ChevronDown
            size={13}
            strokeWidth={2.5}
            className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </Button>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          className="p-2 rounded-lg text-[#71717A] hover:bg-[#F0F0F3] bg-[white] transition-colors focus:outline-none"
          aria-label="More options"
        >
          <BsThreeDotsVertical size={16} />
        </button>
      )}

      {open &&
        mounted &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "fixed", ...position }}
            className="z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg min-w-[180px] p-2 overflow-hidden"
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-x-2.5 text-[#2F2F33] rounded-sm font-medium px-3 py-2 text-sm text-left transition-colors
                ${variantClass[item.variant ?? "default"]}
                ${item.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-[#F9FAFB]"}
              `}
              >
                {item.icon && (
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default TableActionMenu;
