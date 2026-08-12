"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface MarkAsRemittedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  payrollPeriod?: string;
  mode?: "mark" | "undo";
}

const MarkAsRemittedModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  payrollPeriod,
  mode = "mark",
}: MarkAsRemittedModalProps) => {
  if (!isOpen) return null;

  const isUndo = mode === "undo";

  return (
    <ModalOverlay onClose={isSubmitting ? () => {} : onClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-5">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-3">
            {isUndo ? "Undo Remittance" : "Mark as Remitted"}
          </h2>
          {isUndo ? (
            <p className="text-sm text-[#2F2F33] leading-relaxed">
              Are you sure you want to undo the remittance for this period
              {payrollPeriod ? ` (${payrollPeriod})` : ""}? This will revert
              the remittance status back to Pending Remittance.
            </p>
          ) : (
            <>
              <p className="text-sm text-[#2F2F33] leading-relaxed mb-3">
                Are you sure you want to mark this payroll tax record
                {payrollPeriod ? ` for ${payrollPeriod}` : ""} as remitted?
              </p>
              <p className="text-sm text-[#2F2F33] leading-relaxed">
                This confirms that the tax has been paid to the appropriate tax
                authority. You can upload the payment receipt now or add it
                later.
              </p>
            </>
          )}
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
            {isSubmitting
              ? "Updating…"
              : isUndo
                ? "Undo Remittance"
                : "Mark as Remitted"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default MarkAsRemittedModal;
