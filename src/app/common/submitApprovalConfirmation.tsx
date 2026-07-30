"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface SubmitApprovalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  /** e.g. 25 */
  recordCount: number;
  /** e.g. ["Simi Ojo", "Tijanu Monrufu"] */
  reviewerNames: string[];
  /** Singular label for the records, e.g. "bonus record" or "payroll record" */
  recordLabel?: string;
}

function formatNames(names: string[]): string {
  if (names.length === 0) return "the selected reviewers";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export default function SubmitApprovalConfirmation({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recordCount,
  reviewerNames,
  recordLabel = "bonus record",
}: SubmitApprovalConfirmationProps) {
  if (!isOpen) return null;

  const pluralLabel = recordCount === 1 ? recordLabel : `${recordLabel}s`;

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="relative z-50 w-full max-w-[440px] bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Body */}
        <div className="px-6 pt-6 pb-5">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-3">
            Submit {pluralLabel}s for approval?
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            <span className="font-semibold text-[#2F2F33]">
              {recordCount} {pluralLabel}
            </span>{" "}
            will be sent to{" "}
            <span className="font-semibold text-[#2F2F33]">
              {formatNames(reviewerNames)}
            </span>{" "}
            for review. Once submitted, they can&apos;t be edited unless
            they&apos;re returned for changes.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3]">
          <Button variant="secondary" onButtonClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onButtonClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
