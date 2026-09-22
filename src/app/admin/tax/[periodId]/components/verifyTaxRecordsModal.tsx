"use client";
import { useRef, useState, useEffect } from "react";
import { X, Upload, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import {
  useStartTaxVerification,
  useTaxVerificationProgress,
  useTaxVerificationResult,
} from "@/app/hooks/useQueries/tax/useTaxVerification";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type ModalStep = "upload" | "comparing";

export type VerificationResult =
  | { status: "success"; matchedCount: number; runId: string }
  | { status: "error"; discrepancyCount: number; runId: string }
  | null;

interface VerifyTaxRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: VerificationResult) => void;
  month: number | string;
  year: number | string;
  payrollPeriod?: string;
}

// ─── File type icon ───────────────────────────────────────────────────────────

const FILE_TYPE_CONFIGS: { exts: string[]; bg: string; label: string }[] = [
  { exts: [".xlsx", ".xls"], bg: "#1D7044", label: "XLS" },
  { exts: [".csv"], bg: "#0E7490", label: "CSV" },
  // { exts: [".pdf"], bg: "#DC2626", label: "PDF" },
  // { exts: [".png", ".jpg", ".jpeg", ".webp"], bg: "#7C3AED", label: "IMG" },
];

const FileTypeIcon = ({ name }: { name: string }) => {
  const lower = name.toLowerCase();
  const config = FILE_TYPE_CONFIGS.find((c) =>
    c.exts.some((ext) => lower.endsWith(ext)),
  ) ?? { bg: "#71717A", label: "FILE" };

  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: config.bg }}
    >
      <span className="text-white text-[10px] font-bold leading-none">
        {config.label}
      </span>
    </div>
  );
};

export default function VerifyTaxRecordsModal({
  isOpen,
  onClose,
  onComplete,
  month,
  year,
  payrollPeriod,
}: VerifyTaxRecordsModalProps) {
  const [step, setStep] = useState<ModalStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const monthName = MONTH_NAMES[Number(month) - 1];
  const periodLabel = monthName ? `${monthName} ${year}` : payrollPeriod;

  const { mutate: startVerification, isPending: isStarting } =
    useStartTaxVerification();

  const { data: progress } = useTaxVerificationProgress(runId);
  const isTerminal =
    progress?.status === "completed" || progress?.status === "failed";

  const { data: result } = useTaxVerificationResult(runId, isTerminal);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setStep("upload");
      setFile(null);
      setIsDragging(false);
      setRunId(null);
    }
  }, [isOpen]);

  // A run that failed outright (bad file, server error) — bounce back to upload
  useEffect(() => {
    if (progress?.status === "failed") {
      toast.error("Verification failed. Please try again.");
      setStep("upload");
      setRunId(null);
    }
  }, [progress?.status]);

  // Once the full report is in, hand it off and close
  useEffect(() => {
    if (!result) return;
    onClose();
    onComplete(
      result?.status === "completed"
        ? {
            status: "success",
            matchedCount: result?.records_matched ?? 0,
            runId: result?.id,
          }
        : {
            status: "error",
            discrepancyCount: result.discrepancy_count ?? 0,
            runId: result?.id,
          },
    );
  }, [result, onClose, onComplete]);

  if (!isOpen) return null;

  const ACCEPTED_EXTENSIONS = [".csv"];

  const acceptFile = (f: File) => {
    const lower = f.name.toLowerCase();
    const valid = ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
    if (valid) setFile(f);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) acceptFile(e.target.files[0]);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) acceptFile(e.dataTransfer.files[0]);
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
    return `${(bytes / 1024).toFixed(0)}KB`;
  };

  const handleClose = () => {
    if (step === "comparing") return; // can't close while comparing
    onClose();
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-2xl shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-base font-semibold text-[#2F2F33]">
            Verify Tax Records
          </h2>
          <p className="text-sm text-[#71717A] mt-1 leading-relaxed">
            {step === "upload"
              ? `Upload the government tax spreadsheet to compare it with the payroll tax records${periodLabel ? ` for ${periodLabel}` : ""}.`
              : "Please wait while we compare the uploaded spreadsheet with your payroll tax records."}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 pb-2">
          {step === "upload" ? (
            <>
              {/* Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors ${
                  isDragging
                    ? "border-[#E37915] bg-[#FFF9F2]"
                    : "border-[#E3E3E5] hover:border-[#E37915] hover:bg-[#FFF9F2]"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Upload
                    size={28}
                    className="text-[#E37915]"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm text-center text-[#2F2F33]">
                  <span className="text-[#E37915] font-medium">
                    Click to upload
                  </span>{" "}
                  or drag your Excel file here
                </p>
                <p className="text-xs text-[#71717A]">Supports only .csv,</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,"
                  className="hidden"
                  onChange={onInputChange}
                />
              </div>

              {/* File preview */}
              {file && (
                <div className="mt-3 flex items-center gap-3 px-4 py-3 border border-[#E3E3E5] rounded-xl bg-[#F7F7F7]">
                  {/* Excel icon */}
                  <FileTypeIcon name={file.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2F2F33] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#71717A]">
                      {formatSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-[#71717A] hover:text-[#2F2F33] transition-colors flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Comparing state */
            <div className="flex flex-col items-center gap-4 py-4">
              {/* Spinner */}
              <div className="w-12 h-12 rounded-full border-4 border-[#F0E0CE] border-t-[#E37915] animate-spin" />

              <p className="text-sm font-semibold text-[#2F2F33]">
                {progress?.step ?? "Comparing payroll records..."}
              </p>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#F0F0F3] overflow-hidden">
                <div
                  className="h-full bg-[#E37915] transition-all duration-300"
                  style={{ width: `${progress?.percentage ?? 0}%` }}
                />
              </div>

              {/* File chip */}
              {file && (
                <div className="w-full flex items-center gap-3 px-4 py-3 border border-[#E3E3E5] rounded-xl bg-[#F7F7F7] opacity-60">
                  <FileTypeIcon name={file.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2F2F33] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#71717A]">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#F0F0F3] mt-2">
          <Button
            variant="secondary"
            onButtonClick={handleClose}
            disabled={step === "comparing"}
          >
            Cancel
          </Button>
          {step === "upload" ? (
            <Button
              variant="primary"
              onButtonClick={() => {
                if (!file) return;
                startVerification(
                  { file, month, year },
                  {
                    onSuccess: (data) => {
                      setRunId(data.run_id);
                      setStep("comparing");
                    },
                    onError: (err) => {
                      const message =
                        (err.response?.data as { message?: string })?.message ||
                        "Failed to start verification. Please try again.";
                      toast.error(message);
                    },
                  },
                );
              }}
              disabled={!file || isStarting}
            >
              {isStarting ? "Starting…" : "Compare with Excel"}
            </Button>
          ) : (
            <Button variant="primary" disabled>
              Comparing...
            </Button>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
}

interface VerificationToastProps {
  result: VerificationResult;
  onDismiss: () => void;
  onViewReport: () => void;
}

export function VerificationToast({
  result,
  onDismiss,
  onViewReport,
}: VerificationToastProps) {
  if (!result) return null;

  const isSuccess = result.status === "success";

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-[360px] w-full bg-[#1C1C1E] text-white rounded-xl px-5 py-4 shadow-2xl flex items-start gap-3">
      {isSuccess ? (
        <CheckCircle
          size={20}
          className="text-[#22C55E] flex-shrink-0 mt-0.5"
          fill="#22C55E"
          color="#1C1C1E"
        />
      ) : (
        <XCircle
          size={20}
          className="text-[#EF4444] flex-shrink-0 mt-0.5"
          fill="#EF4444"
          color="#1C1C1E"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold mb-0.5">Verification Complete</p>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">
          {isSuccess
            ? `All ${result.matchedCount} employee tax records match the uploaded Excel spreadsheet. No discrepancies were found.`
            : `We found ${result.discrepancyCount} discrepanc${result.discrepancyCount === 1 ? "y" : "ies"} between the uploaded spreadsheet and the payroll records.`}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={onViewReport}
            className="text-xs font-medium text-white hover:text-[#E37915] transition-colors"
          >
            {isSuccess ? "View Report" : "Review Report"}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
