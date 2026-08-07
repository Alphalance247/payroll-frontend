"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface ApproveBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  recordCount: number;
  totalValue: string;
}

export default function ApproveBonusModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recordCount,
  totalValue,
}: ApproveBonusModalProps) {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-2xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-2">
            Approve All Pending Bonuses
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            You are about to approve{" "}
            <span className="font-semibold text-[#2F2F33]">
              {recordCount} pending bonus record{recordCount !== 1 ? "s" : ""}
            </span>
            . Once approved, these bonuses will move to the next stage of the
            payroll process and can no longer be edited.
          </p>
        </div>

        {/* Summary box */}
        <div className="mx-6 mb-6 rounded-lg border border-[#E3E3E5] bg-[#F7F7F7] px-4 py-3.5 space-y-1.5">
          <p className="text-sm text-[#2F2F33]">
            <span className="text-[#71717A]">• Bonus Records: </span>
            <span className="font-semibold">{recordCount}</span>
          </p>
          <p className="text-sm text-[#2F2F33]">
            <span className="text-[#71717A]">• Total Bonus Value: </span>
            <span className="font-semibold">{totalValue}</span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3]">
          <Button
            variant="secondary"
            onButtonClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onButtonClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Approving..." : "Approve All Pending Bonus"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
