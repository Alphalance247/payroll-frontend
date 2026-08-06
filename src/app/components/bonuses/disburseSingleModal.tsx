"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface DisburseSingleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  employeeName: string;
  amount: string;
}

export default function DisburseSingleModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  employeeName,
  amount,
}: DisburseSingleModalProps) {
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
            Disburse Bonus
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            Do you want to disburse to{" "}
            <span className="font-semibold text-[#2F2F33]">{employeeName}</span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Summary box */}
        <div className="mx-6 mb-5 rounded-lg border border-[#E3E3E5] bg-[#F7F7F7] px-4 py-3.5">
          <p className="text-sm text-[#2F2F33]">
            <span className="text-[#71717A]">Amount: </span>
            <span className="font-semibold">{amount}</span>
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
            {isSubmitting ? "Disbursing..." : "Yes, Disburse"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
