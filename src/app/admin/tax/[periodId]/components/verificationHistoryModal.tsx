"use client";
import {
  CheckCircle2,
  AlertTriangle,
  MinusCircle,
  Eye,
  Download,
} from "lucide-react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import {
  useDownloadTaxVerification,
  type VerificationHistoryEntry,
} from "@/app/hooks/useQueries/tax/useTaxVerification";

type BadgeStatus = "verified" | "needs_review" | "not_verified";

// `outcome` values beyond "needs_review" are unconfirmed — "verified" is a
// best guess for the success case; anything else falls back to "not_verified".
const getBadgeStatus = (entry: VerificationHistoryEntry): BadgeStatus => {
  if (entry.outcome === "verified") return "verified";
  if (entry.outcome === "needs_review") return "needs_review";
  return "not_verified";
};

const STATUS_CONFIG: Record<
  BadgeStatus,
  {
    label: string;
    badgeClass: string;
    icon: typeof CheckCircle2;
    iconClass: string;
  }
> = {
  verified: {
    label: "Verified",
    badgeClass: "bg-[#F0FDF4] text-[#15803D]",
    icon: CheckCircle2,
    iconClass: "text-white bg-[#15803D]",
  },
  needs_review: {
    label: "Needs review",
    badgeClass: "bg-[#FFF9F2] text-[#CF6E13]",
    icon: AlertTriangle,
    iconClass: "text-white bg-[#E37915]",
  },
  not_verified: {
    label: "Not verified",
    badgeClass: "bg-[#F3F4F6] text-[#6B7280]",
    icon: MinusCircle,
    iconClass: "text-white bg-[#6B7280]",
  },
};

interface VerificationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  payrollPeriod?: string;
  entries?: VerificationHistoryEntry[];
  isLoading?: boolean;
  isError?: boolean;
  onViewReport?: (runId: number) => void;
  onDownload?: (entry: VerificationHistoryEntry) => void;
}

const VerificationHistoryModal = ({
  isOpen,
  onClose,
  payrollPeriod,
  entries = [],
  isLoading = false,
  isError = false,
  onViewReport,
  onDownload,
}: VerificationHistoryModalProps) => {
  const { downloadTaxVerification, isDownloading } =
    useDownloadTaxVerification();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="relative z-50 w-full max-w-[797px] bg-white rounded-2xl shadow-xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-6 flex flex-col gap-2">
          <h2 className="text-base font-semibold leading-6 text-[#2F2F33]">
            Verification History
          </h2>
          <p className="text-base font-normal leading-6 text-[#71717A]">
            View previous tax verification attempts
            {payrollPeriod ? ` for ${payrollPeriod}` : ""} and their outcomes.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 pb-2 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-[#E37915]" />
              <p className="text-sm text-[#71717A]">Loading history...</p>
            </div>
          ) : isError ? (
            <p className="text-sm text-[#71717A] text-center py-8">
              Failed to load verification history. Please try again.
            </p>
          ) : entries.length === 0 ? (
            <p className="text-sm text-[#71717A] text-center py-8">
              No verification attempts yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {entries.map((entry, index) => {
                const badgeStatus = getBadgeStatus(entry);
                const config = STATUS_CONFIG[badgeStatus];
                const Icon = config.icon;
                const isLast = index === entries.length - 1;
                const hasOutcome =
                  badgeStatus === "verified" || badgeStatus === "needs_review";

                return (
                  <div key={entry.id} className="flex gap-6">
                    {/* Timeline rail */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${config.iconClass}`}
                      >
                        <Icon size={15} strokeWidth={2.5} />
                      </span>
                      {!isLast && (
                        <span className="w-px flex-1 bg-[#E3E3E5] my-1" />
                      )}
                    </div>

                    {/* Entry card */}
                    <div className="flex-1 border border-[#E3E3E5] rounded-lg p-4 flex items-center justify-between gap-3 overflow-hidden">
                      {/* Left: badge + content */}
                      <div className="flex flex-col items-start gap-2">
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 rounded-2xl text-xs font-medium leading-4 ${config.badgeClass}`}
                        >
                          {config.label}
                        </span>
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex flex-col items-start gap-1">
                            <p className="text-base font-medium leading-6 text-[#2F2F33]">
                              {hasOutcome
                                ? `Verified by ${entry.run_by?.fullname ?? "—"}`
                                : "No verification run yet"}
                            </p>
                            <p className="text-sm font-normal leading-5 text-[#71717A]">
                              {entry.created}
                            </p>
                          </div>

                          {badgeStatus === "verified" && (
                            <p className="text-sm font-medium leading-5 text-[#15803D]">
                              {entry.records_matched} records matched
                            </p>
                          )}
                          {badgeStatus === "needs_review" && (
                            <p className="text-sm font-medium leading-5 text-[#CF6E13]">
                              {entry.discrepancy_count} discrepanc
                              {entry.discrepancy_count === 1 ? "y" : "ies"}{" "}
                              found
                            </p>
                          )}

                          {entry.file_name && (
                            <p className="text-sm font-normal leading-5 text-[#71717A]">
                              Compared: {entry.file_name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: actions */}
                      {hasOutcome && (
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => onViewReport?.(entry.id)}
                            className="h-9 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#D3D3D6] text-sm font-medium leading-5 text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
                          >
                            <Eye size={16} strokeWidth={2} />
                            View Report
                          </button>
                          <button
                            type="button"
                            disabled={isDownloading(entry.id)}
                            onClick={() =>
                              onDownload
                                ? onDownload(entry)
                                : downloadTaxVerification(
                                    entry.id,
                                    entry.file_name,
                                  )
                            }
                            className="h-9 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#D3D3D6] text-sm font-medium leading-5 text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Download size={16} strokeWidth={2} />
                            {isDownloading(entry.id)
                              ? "Downloading…"
                              : "Download"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#F0F0F3]">
          <Button variant="secondary" onButtonClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default VerificationHistoryModal;
