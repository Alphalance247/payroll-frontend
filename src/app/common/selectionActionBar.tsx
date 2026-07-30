"use client";
import { X } from "lucide-react";

export interface SelectionAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

interface SelectionActionBarProps {
  selectedCount: number;
  onClear: () => void;
  actions: SelectionAction[];
}

const SelectionActionBar = ({
  selectedCount,
  onClear,
  actions,
}: SelectionActionBarProps) => {
  return (
    <div className="flex items-center gap-x-1 py-[6px] px-3 bg-white rounded-xl border border-[#E3E3E5] shadow-sm w-fit">
      {/* Clear selection pill */}
      <button
        type="button"
        onClick={onClear}
        className="flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
      >
        <X size={13} strokeWidth={2.5} className="text-[#71717A]" />
        Clear {selectedCount} selected
      </button>

      {/* Divider */}
      <div className="w-px h-5 bg-[#E3E3E5] mx-1" />

      {/* Action buttons */}
      {actions.map((action, i) => (
        <button
          key={i}
          type="button"
          onClick={action.onClick}
          className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
            ${
              action.variant === "danger"
                ? "text-[#D42626] hover:bg-[#FEF2F2]"
                : "text-[#2F2F33] hover:bg-[#F7F7F7]"
            }`}
        >
          <span className="flex-shrink-0">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default SelectionActionBar;
