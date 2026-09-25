"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface MarkTaxPaidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  count: number;
  name?: string;
}

const MarkTaxPaidModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  count,
  name,
}: MarkTaxPaidModalProps) => {
  if (!isOpen) return null;

  const isSingle = count === 1;

  return (
    <ModalOverlay onClose={isSubmitting ? () => {} : onClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-5">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-3">
            Mark as Paid
          </h2>
          <p className="text-sm text-[#2F2F33] leading-relaxed">
            {isSingle
              ? `Are you sure you want to mark ${name ? `${name}'s` : "this employee's"} tax as paid?`
              : `Are you sure you want to mark ${count} tax record(s) as paid?`}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3] bg-[#F7F7F7] rounded-b-xl">
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
            {isSubmitting ? "Marking as paid…" : "Mark as Paid"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default MarkTaxPaidModal;
