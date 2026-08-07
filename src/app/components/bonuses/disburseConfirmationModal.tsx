"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

export interface BonusTypeSummary {
  label: string;
  count: number;
}

interface DisburseConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (file: File | null) => void;
  isSubmitting?: boolean;
  recordCount: number;
  totalValue: string;
  bonusTypeSummary: BonusTypeSummary[];
}

function formatBonusTypes(summary: BonusTypeSummary[]): string {
  return summary.map((s) => `${s.label} (${s.count})`).join(", ");
}

export default function DisburseConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  recordCount,
  totalValue,
  bonusTypeSummary,
}: DisburseConfirmationModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-2xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-2">
            Disburse Bonuses
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            You&apos;re about to disburse{" "}
            <span className="font-semibold text-[#2F2F33]">
              {recordCount} selected bonus record{recordCount !== 1 ? "s" : ""}
            </span>
            . This action cannot be undone.
          </p>
        </div>

        {/* Summary box */}
        <div className="mx-6 mb-5 rounded-lg border border-[#E3E3E5] bg-[#F7F7F7] px-4 py-3.5 space-y-2">
          <p className="text-sm text-[#2F2F33]">
            <span className="text-[#71717A]">Bonus Records: </span>
            <span className="font-semibold">{recordCount}</span>
          </p>
          <p className="text-sm text-[#2F2F33]">
            <span className="text-[#71717A]">Total Bonus Value: </span>
            <span className="font-semibold">{totalValue}</span>
          </p>
          {bonusTypeSummary.length > 0 && (
            <p className="text-sm text-[#2F2F33]">
              <span className="text-[#71717A]">Bonus Types: </span>
              <span className="font-semibold">
                {formatBonusTypes(bonusTypeSummary)}
              </span>
            </p>
          )}
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
            onButtonClick={() => onConfirm(null)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Disbursing..." : "Disburse Bonuses"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
