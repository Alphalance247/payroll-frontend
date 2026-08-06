"use client";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface RequestChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isSubmitting?: boolean;
  recordCount: number;
}

export default function RequestChangesModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recordCount,
}: RequestChangesModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const ctaLabel =
    recordCount === 1 ? "Return Bonus" : `Return ${recordCount} Bonuses`;

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-2xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-2">
            Request Changes
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {recordCount === 1 ? (
              <>
                This{" "}
                <span className="font-semibold text-[#2F2F33]">
                  bonus record
                </span>{" "}
                will be returned to HR for review.
              </>
            ) : (
              <>
                These{" "}
                <span className="font-semibold text-[#2F2F33]">
                  {recordCount} bonus records
                </span>{" "}
                will be returned to HR for review. This reason will be applied
                to all selected records.
              </>
            )}
          </p>
        </div>

        {/* Warning banner */}
        <div className="mx-6 mb-4 flex items-start gap-2 rounded-lg border border-[#F6C05A] bg-[#FFF9EC] px-4 py-3">
          <AlertTriangle
            size={15}
            className="mt-0.5 flex-shrink-0 text-[#CF6E13]"
          />
          <p className="text-sm text-[#CF6E13]">
            The selected bonus{recordCount > 1 ? "es" : ""} will be returned to
            HR for review.
          </p>
        </div>

        {/* Reason textarea */}
        <div className="px-6 mb-6">
          <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
            Reason for requesting changes
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain what needs to be corrected..."
            className="w-full resize-none rounded-lg border border-[#E3E3E5] px-3.5 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
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
            variant="primary"
            onButtonClick={() => {
              onConfirm(reason);
              setReason("");
            }}
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting ? "Submitting..." : ctaLabel}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
