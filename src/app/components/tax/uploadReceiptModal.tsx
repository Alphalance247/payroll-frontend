"use client";
import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

type UploadState = "idle" | "file_selected" | "uploading";

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  payrollPeriod?: string;
}

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTS = ".pdf,.jpg,.jpeg,.png";

const formatFileSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(0)}MB`
    : `${(bytes / 1024).toFixed(0)}KB`;

const UploadReceiptModal = ({
  isOpen,
  onClose,
  onSuccess,
  payrollPeriod,
}: UploadReceiptModalProps) => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    if (uploadState === "uploading") return;
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadState("idle");
    setIsDragging(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const pickFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are supported.");
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

  const handleUpload = async () => {
    if (!selectedFile || uploadState !== "file_selected") return;
    setUploadState("uploading");

    // Simulated upload delay — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadState("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";

    onClose();
    onSuccess?.();

    toast.custom(
      (t) => (
        <div
          className={`flex items-start gap-3 bg-[#1C1C1E] text-white rounded-[8px] px-4 py-3 shadow-2xl max-w-sm transition-opacity ${
            t.visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold leading-snug">
              Receipt uploaded successfully.
            </p>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              The remittance status has been updated to Remitted.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => toast.dismiss(t.id)}
                className="text-xs font-semibold text-white hover:text-[#E3E3E5] transition-colors"
              >
                View Receipt
              </button>
              <button
                type="button"
                onClick={() => toast.dismiss(t.id)}
                className="text-xs text-[#71717A] hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ),
      { duration: 6000, position: "bottom-center" },
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
            Upload Tax Receipt
          </h2>
          <p className="text-sm text-[#71717A] leading-relaxed">
            Upload the payment receipt for{" "}
            <span className="font-medium text-[#2F2F33]">
              {payrollPeriod ?? "this period"}
            </span>
            . This receipt will be stored as proof of tax remittance for this
            payroll period.
          </p>
        </div>

        {/* Upload zone */}
        <div className="px-6 pb-4">
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
                  Uploading receipt
                </p>
                <p className="text-xs text-[#71717A] mt-1">
                  Supports PDF, JPG or PNG up to 10MB
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
                    Click to upload
                  </span>{" "}
                  or drag your Receipt here
                </p>
                <p className="text-xs text-[#71717A] mt-1">
                  Supports PDF, JPG or PNG up to 10MB
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTS}
            className="hidden"
            onChange={handleInputChange}
          />

          {/* File preview */}
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
            onButtonClick={handleUpload}
            disabled={uploadState !== "file_selected"}
          >
            {uploadState === "uploading" ? "Uploading…" : "Upload Receipt"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default UploadReceiptModal;
