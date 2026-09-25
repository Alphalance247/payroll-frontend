"use client";
import { Download, Trash2, FileText } from "lucide-react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { type TaxReceiptDetail } from "@/app/hooks/useQueries/tax/useTaxList";

interface ViewReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove?: () => void;
  payrollPeriod?: string;
  meta?: TaxReceiptDetail;
}

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif"];

const getFileExtension = (url?: string) =>
  url?.split(/[?#]/)[0].split(".").pop()?.toLowerCase();

const ViewReceiptModal = ({
  isOpen,
  onClose,
  onRemove,
  payrollPeriod,
  meta,
}: ViewReceiptModalProps) => {
  if (!isOpen) return null;

  const fileExtension = getFileExtension(meta?.receipt);
  const isImage = !!fileExtension && IMAGE_EXTENSIONS.includes(fileExtension);
  const fileTypeLabel = fileExtension ? fileExtension.toUpperCase() : "—";

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="relative z-50 w-full max-w-[620px] bg-white rounded-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            {/* PDF badge icon */}
            <div className="w-8 h-8 rounded-md bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-[#DC2626]" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-[#2F2F33] truncate max-w-[360px]">
              {`${meta?.month_name}_Tax_Receipt`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-2 rounded-lg bg-[#F1F1F2] text-[#71717A] transition-colors"
              aria-label="Download receipt"
              onClick={() => {
                if (meta?.receipt) {
                  const link = document.createElement("a");
                  link.href = meta.receipt;
                  link.download = `${meta?.month_name}_Tax_Receipt`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              <Download size={16} strokeWidth={2} />
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRemove();
                }}
                className="p-2 rounded-lg text-[#71717A] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                aria-label="Remove receipt"
              >
                <Trash2 size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>

        {/* Metadata row */}
        <div className="grid grid-cols-4 gap-4 px-6 py-4">
          <div>
            <p className="text-[13px] font-medium text-[#71717A] mb-2">
              Payroll Period
            </p>
            <p className="text-sm font-medium text-[#2F2F33]">
              {payrollPeriod ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#71717A] mb-2">
              Uploaded By
            </p>
            <p className="text-sm font-medium text-[#2F2F33]">
              {meta?.uploaded_by?.fullname ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#71717A] mb-2">
              Uploaded On
            </p>
            <p className="text-sm font-medium text-[#2F2F33]">
              {meta?.created ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#71717A] mb-2">
              File Type
            </p>
            <p className="text-sm font-medium text-[#2F2F33]">
              {fileTypeLabel}
            </p>
          </div>
        </div>

        {/* Preview area */}
        <div className="px-6 py-5">
          {meta?.receipt && isImage ? (
            <img
              src={meta.receipt}
              alt="Receipt preview"
              className="w-full rounded-lg border border-[#E3E3E5] object-contain max-h-[360px]"
            />
          ) : (
            <div className="w-full rounded-lg border border-[#E3E3E5] bg-[#F7F7F7] flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-14 h-14 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
                <FileText
                  size={28}
                  className="text-[#DC2626]"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-sm font-medium text-[#2F2F33]">
                {fileExtension ? `${fileTypeLabel} Document` : "Document"}
              </p>
              <p className="text-xs text-[#71717A]">
                {meta?.reference ?? "Receipt"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#F0F0F3] bg-[#F7F7F7] rounded-b-xl">
          <Button
            variant="primaryWhite"
            className="!text-[#2F2F33]"
            onButtonClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ViewReceiptModal;
