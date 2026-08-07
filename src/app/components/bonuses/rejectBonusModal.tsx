"use client";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface RejectBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isSubmitting?: boolean;
}

export default function RejectBonusModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
}: RejectBonusModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-2">
            Reject Bonus
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            This bonus will be rejected and removed from the approval workflow.
            HR will be notified of the reason.
          </p>
        </div>

        {/* Reason textarea */}
        <div className="px-6 mb-6">
          <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
            Reason for rejection
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain why this bonus is being rejected..."
            className="w-full resize-none rounded-lg border border-[#E3E3E5] px-3.5 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-1 focus:ring-[#D42626] focus:border-[#D42626]"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3]">
          <Button
            variant="secondary"
            onButtonClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onButtonClick={() => {
              onConfirm(reason);
              setReason("");
            }}
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting ? "Rejecting..." : "Reject Bonus"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
