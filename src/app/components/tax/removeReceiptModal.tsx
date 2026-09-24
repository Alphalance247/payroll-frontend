"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface RemoveReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  payrollPeriod?: string;
}

const RemoveReceiptModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  payrollPeriod,
}: RemoveReceiptModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={isSubmitting ? () => {} : onClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-5">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-3">
            Remove Receipt
          </h2>
          <p className="text-sm text-[#2F2F33] leading-relaxed mb-3">
            Are you sure you want to remove this receipt
            {payrollPeriod ? ` for ${payrollPeriod}` : ""}?
          </p>
          <p className="text-sm text-[#2F2F33] leading-relaxed mb-3">
            Removing the receipt will also change the remittance status back to
            Pending Remittance.
          </p>
          <p className="text-sm text-[#2F2F33] leading-relaxed">
            You can upload a new receipt at any time.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3] bg-[#F7F7F7] rounded-b-xl">
          <Button
            variant="primaryWhite"
            className="!text-[#2F2F33] !font-semibold"
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
            {isSubmitting ? "Removing…" : "Remove Receipt"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default RemoveReceiptModal;
