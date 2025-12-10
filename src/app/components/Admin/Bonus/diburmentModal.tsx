"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface DisbursementModalProps {
  onModalClose: () => void;
  onConfirm?: () => void;
  employeeName?: string;
  amount?: string;
}

const DisbursementModal = ({
  onModalClose,
  onConfirm,
  employeeName,
  amount,
}: DisbursementModalProps) => {
  const displayName = employeeName || "this employee";
  const displayAmount = amount || "the specified bonus";

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[520px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="pt-6 pb-4 px-6 border-b border-[#E3E3E5]">
          <h2 id="modal-title" className="text-lg font-semibold text-[#2F2F33]">
            Confirm Disbursement
          </h2>
          <p className="text-sm text-[#71717A] mt-1">
            Please confirm you want to disburse this bonus.
          </p>
        </div>

        <div className="p-6 flex flex-col gap-3">
          <div className="bg-[#FCF2E8] border border-[#F2DFCC] rounded-md px-4 py-3">
            <p className="text-sm font-semibold text-[#2F2F33]">
              Are you sure you want to proceed?
            </p>
            <p className="text-sm text-[#51525C] mt-1">
              This will disburse{" "}
              <span className="font-semibold">{displayAmount}</span> to{" "}
              <span className="font-semibold">{displayName}</span>. Please
              review before confirming.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-3 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5]">
          <Button
            variant="secondary"
            className="w-fit"
            onButtonClick={onModalClose}
          >
            Cancel
          </Button>
          <Button
            className="w-fit"
            onButtonClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              onModalClose();
            }}
          >
            Yes, Disburse
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DisbursementModal;
