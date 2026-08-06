"use client";
import { Info, X } from "lucide-react";

interface ReturnedBonusBannerProps {
  count: number;
  onClose: () => void;
}

export default function ReturnedBonusBanner({
  count,
  onClose,
}: ReturnedBonusBannerProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5 mb-6 rounded-xl border border-[#F6C05A] bg-[#FFF9EC]">
      <div className="flex items-start gap-3">
        <Info size={16} className="text-[#CF6E13] flex-shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-[#2F2F33]">
            {count} bonus record{count !== 1 ? "s were" : " was"} returned for changes.
          </p>
          <p className="text-sm text-[#71717A]">
            Review the requested updates and resubmit them for approval.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        className="text-[#71717A] hover:text-[#2F2F33] transition-colors flex-shrink-0 mt-0.5"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
