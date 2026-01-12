import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
  loading = false,
}: {
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[475px] bg-white shadow-lg">
        <div className="px-6 py-5 border-b border-[#E3E3E5]">
          <h5 className="font-semibold text-[#2F2F33] text-lg">
            Delete Comment
          </h5>
          <p className="text-[#71717A] text-sm mt-2">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-3 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5] rounded-b-lg">
          <Button
            variant="secondary"
            className="w-fit"
            onButtonClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="w-fit"
            onButtonClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;
