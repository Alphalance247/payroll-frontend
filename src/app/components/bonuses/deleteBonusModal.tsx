"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

interface DeleteBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  employeeName: string;
}

export default function DeleteBonusModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  employeeName,
}: DeleteBonusModalProps) {
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
            Delete Bonus
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            Are you sure you want to delete this bonus record for{" "}
            <span className="font-semibold text-[#2F2F33]">{employeeName}</span>
            ? This action cannot be undone.
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
            variant="danger"
            onButtonClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}
