"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { useEditTaxReceipt } from "@/app/hooks/useQueries/tax/useTaxReceipts";
import {
  type YearTaxRecord,
  type TaxReceiptDetail,
} from "@/app/hooks/useQueries/tax/useTaxList";

type UploadState = "idle" | "file_selected" | "uploading";

interface EditReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (receipt: TaxReceiptDetail) => void;
  record: YearTaxRecord | null;
}

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
const ACCEPTED_EXTS = ".pdf,.jpg,.jpeg,.png,.xls,.xlsx,.csv";

const formatFileSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(0)}MB`
    : `${(bytes / 1024).toFixed(0)}KB`;

const EditReceiptModal = ({
  isOpen,
  onClose,
  onSuccess,
  record,
}: EditReceiptModalProps) => {
  const { mutate: editReceipt } = useEditTaxReceipt();
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [note, setNote] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingReceipt = record?.remittance?.receipt;
  const payrollPeriod = record?.month_name;
  const month = record ? String(record.month_number).padStart(2, "0") : "";
  const year = record?.year ?? "";

  // Pre-fill editable fields whenever the modal opens for a new record
  useEffect(() => {
    if (!isOpen || !record) return;
    setReferenceId(existingReceipt?.reference ?? "");
    setNote(existingReceipt?.note ?? "");
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, record?.month_number, record?.year]);

  const handleClose = () => {
    if (uploadState === "uploading") return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadState("idle");
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const pickFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("File type not supported.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error("File must be under 10MB.");
      return;
    }
    const url = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : null;
    setSelectedFile(file);
    setPreviewUrl(url);
    setUploadState("file_selected");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) pickFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (uploadState !== "uploading") setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (uploadState === "uploading") return;
    const file = e.dataTransfer.files[0];
    if (file) pickFile(file);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSave = !!month && !!year && uploadState !== "uploading";

  const handleSave = () => {
    const receiptId = existingReceipt?.id;
    if (!canSave || !receiptId) return;
    setUploadState("uploading");

    const formData = new FormData();
    formData.append("month", month);
    formData.append("year", year);
    formData.append("reference", referenceId);
    formData.append("note", note);
    if (selectedFile) {
      formData.append("receipt", selectedFile);
    }

    editReceipt(
      { id: receiptId, payload: formData },
      {
        onSuccess: (receipt) => {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setSelectedFile(null);
          setPreviewUrl(null);
          setUploadState("idle");
          onClose();
          onSuccess?.(receipt);
          toast.success("Receipt updated successfully.");
        },
        onError: (err: AxiosError) => {
          setUploadState(selectedFile ? "file_selected" : "idle");
          const message =
            (err.response?.data as { message?: string })?.message ||
            "Failed to update receipt. Please try again.";
          toast.error(message);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[500px] bg-white rounded-[8px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33] mb-1">
            Edit Tax Receipt
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            Update the remittance receipt details
            {payrollPeriod && (
              <>
                {" "}
                for{" "}
                <span className="font-medium text-[#2F2F33]">
                  {payrollPeriod}
                </span>
              </>
            )}
            .
          </p>
        </div>

        {/* Reference ID */}
        <div className="px-6 pb-4 flex flex-col gap-1.5">
          <label
            htmlFor="edit-receipt-reference"
            className="text-sm font-medium text-[#2F2F33]"
          >
            Reference ID
          </label>
          <input
            id="edit-receipt-reference"
            type="text"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            disabled={uploadState === "uploading"}
            placeholder="e.g. TXN-2024-001"
            className="w-full border border-[#E3E3E5] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#BEBEC2] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] transition-colors disabled:bg-[#FAFAFA] disabled:cursor-not-allowed"
          />
        </div>

        {/* Note */}
        <div className="px-6 pb-4 flex flex-col gap-1.5">
          <label
            htmlFor="edit-receipt-note"
            className="text-sm font-medium text-[#2F2F33]"
          >
            Note
          </label>
          <textarea
            id="edit-receipt-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={uploadState === "uploading"}
            placeholder="Add any relevant notes..."
            rows={3}
            className="w-full border border-[#E3E3E5] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#BEBEC2] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] transition-colors resize-none disabled:bg-[#FAFAFA] disabled:cursor-not-allowed"
          />
        </div>

        {/* Receipt File */}
        <div className="px-6 pb-1">
          <label
            htmlFor="edit-receipt-file"
            className="text-sm font-medium text-[#2F2F33]"
          >
            Receipt File
          </label>
        </div>

        {/* Upload zone */}
        <div className="px-6 pb-4 pt-1.5">
          {!selectedFile && existingReceipt?.receipt && (
            <div className="mb-3 flex items-center gap-3 p-3 bg-[#F7F7F7] rounded-[8px] border border-[#E3E3E5]">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E3E3E5] flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-[#71717A]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2F2F33] truncate">
                  Current receipt
                </p>
                <p className="text-xs text-[#71717A] truncate">
                  {existingReceipt.reference || "No reference"}
                </p>
              </div>
            </div>
          )}

          <div
            className={`border-2 border-dashed rounded-[8px] flex flex-col items-center justify-center py-8 px-6 text-center transition-colors
              ${uploadState === "uploading" ? "cursor-default border-[#E3E3E5] bg-[#FAFAFA]" : "cursor-pointer"}
              ${isDragging ? "border-[#E37915] bg-[#FFF9F2]" : uploadState !== "uploading" ? "border-[#E3E3E5] hover:border-[#E37915] hover:bg-[#FFF9F2]" : ""}
            `}
            onClick={() =>
              uploadState !== "uploading" && fileInputRef.current?.click()
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadState === "uploading" ? (
              <>
                <div className="w-11 h-11 rounded-full bg-[#FCF2E8] flex items-center justify-center mb-3">
                  <Loader2 size={22} className="text-[#E37915] animate-spin" />
                </div>
                <p className="text-sm font-medium text-[#2F2F33]">
                  Saving receipt
                </p>
                <p className="text-xs text-[#71717A] mt-1">
                  PDF, images, spreadsheets — all formats accepted
                </p>
              </>
            ) : (
              <>
                <div className="w-11 h-11 rounded-full bg-[#FCF2E8] flex items-center justify-center mb-3">
                  <Upload
                    size={20}
                    className="text-[#E37915]"
                    strokeWidth={2}
                  />
                </div>
                <p className="text-sm text-[#2F2F33]">
                  <span className="font-semibold text-[#E37915]">
                    Drag & drop or click to replace
                  </span>
                </p>
                <p className="text-xs text-[#71717A] mt-1">
                  Leave empty to keep the current file
                </p>
              </>
            )}
          </div>

          <input
            id="edit-receipt-file"
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTS}
            className="hidden"
            onChange={handleInputChange}
          />

          {/* New file preview */}
          {selectedFile && (
            <div className="mt-3 flex items-center gap-3 p-3 bg-[#F7F7F7] rounded-[8px] border border-[#E3E3E5]">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E3E3E5] flex items-center justify-center flex-shrink-0 overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText size={18} className="text-[#71717A]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2F2F33] truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-[#71717A]">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              {uploadState !== "uploading" && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 rounded-lg text-[#71717A] hover:text-[#2F2F33] hover:bg-[#E3E3E5] transition-colors flex-shrink-0"
                  aria-label="Remove file"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3] bg-[#F7F7F7] rounded-b-xl">
          <Button
            variant="secondary"
            onButtonClick={handleClose}
            disabled={uploadState === "uploading"}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onButtonClick={handleSave}
            disabled={!canSave}
          >
            {uploadState === "uploading" ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default EditReceiptModal;
