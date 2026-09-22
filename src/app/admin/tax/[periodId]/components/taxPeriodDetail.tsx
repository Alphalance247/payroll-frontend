"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Info, XCircle, CheckCircle } from "lucide-react";
import { GoChevronRight } from "react-icons/go";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Button from "@/app/common/Button";
import PeriodEmployeeTable, {
  type EmployeeTaxRecord,
} from "./periodEmployeeTable";
import VerifyTaxRecordsModal, {
  VerificationToast,
  type VerificationResult,
} from "./verifyTaxRecordsModal";
import { useGetTaxDetails } from "@/app/hooks/useQueries/tax/useTaxDetails";
import { useMarkMultipleTaxPaid } from "@/app/hooks/useQueries/tax/useMarkTaxPaid";
import { useGetYearTaxRecord } from "@/app/hooks/useQueries/tax/useTaxList";
import { useGetTaxVerificationsByPeriod } from "@/app/hooks/useQueries/tax/useTaxVerification";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import MarkTaxPaidModal from "./markTaxPaidModal";
import UploadReceiptModal from "@/app/components/tax/uploadReceiptModal";
import ViewReceiptModal from "@/app/components/tax/viewReceiptModal";
import VerificationHistoryModal from "./verificationHistoryModal";
import { useReceiptModalStore } from "@/stores/Tax/receiptModalStore";

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

const fromSlug = (slug: string) => {
  const [monthNumberRaw, year] = slug.split("-");
  const monthNumber = Number(monthNumberRaw);
  const monthName = MONTH_NAMES[monthNumber - 1];

  if (!monthName || !year)
    return { full: slug, short: slug, monthNumber, year };
  return {
    full: `${monthName} ${year}`,
    short: `${monthName.slice(0, 3)} ${year}`,
    monthNumber,
    year,
  };
};

type SummaryCardType = "currency" | "number" | "verification";

interface SummaryCardConfig {
  label: string;
  type: SummaryCardType;
  value?: string | number;
  prefix?: string;
  showInfo?: boolean;
  verified?: boolean;
}

const buildSummaryCards = (
  totalMonthlyTax: number,
  employeeCount: number,
  totalGrossSalary: number,
  isVerified: boolean,
): SummaryCardConfig[] => [
  {
    label: "Total Tax",
    type: "currency",
    value: totalMonthlyTax.toLocaleString(),
    prefix: "₦ ",
  },
  { label: "Number of Employee", type: "number", value: employeeCount },
  {
    label: "Total Gross Salary",
    type: "currency",
    value: totalGrossSalary.toLocaleString(),
    prefix: "₦ ",
  },
  {
    label: "Verification Status",
    type: "verification",
    showInfo: true,
    verified: isVerified,
  },
];

const SummaryCard = ({ card }: { card: SummaryCardConfig }) => (
  <div className="flex-1 bg-white rounded-lg border border-[#E3E3E5] p-4">
    <p className="flex items-center gap-x-1 text-xs font-medium text-[#71717A] mb-3">
      {card.label}
      {card.showInfo && (
        <Info size={13} className="text-[#71717A] flex-shrink-0" />
      )}
    </p>
    {card.type === "verification" ? (
      <div className="flex items-center gap-x-2">
        {card.verified ? (
          <>
            <CheckCircle
              size={20}
              className="text-[#15803D] flex-shrink-0"
              fill="#15803D"
              color="white"
            />
            <span className="text-lg font-medium text-[#2F2F33] tracking-tight">
              Verified
            </span>
          </>
        ) : (
          <>
            <XCircle
              size={20}
              className="text-[#DC2626] flex-shrink-0"
              fill="#DC2626"
              color="white"
            />
            <span className="text-lg font-medium text-[#2F2F33] tracking-tight">
              Not verified
            </span>
          </>
        )}
      </div>
    ) : (
      <p className="text-lg font-medium text-[#2F2F33] tracking-tight">
        {card.prefix ?? ""}
        {card.value}
      </p>
    )}
  </div>
);

interface MoreActionItem {
  label: string;
  onClick: () => void;
}

const MoreActionsDropdown = ({ items }: { items: MoreActionItem[] }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="secondary"
        onButtonClick={() => setOpen((p) => !p)}
        className="flex items-center gap-x-2"
      >
        More Actions
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg py-1 min-w-[180px]">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface TaxPeriodDetailProps {
  periodId: string;
}

const TaxPeriodDetail = ({ periodId }: TaxPeriodDetailProps) => {
  const router = useRouter();
  const { full, short, monthNumber, year } = fromSlug(periodId);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult>(null);
  const [markAllPaidOpen, setMarkAllPaidOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const uploadReceiptTarget = useReceiptModalStore((s) => s.uploadTarget);
  const viewReceiptTarget = useReceiptModalStore((s) => s.viewTarget);
  const openUploadReceipt = useReceiptModalStore((s) => s.openUploadReceipt);
  const closeUploadReceipt = useReceiptModalStore((s) => s.closeUploadReceipt);
  const openViewReceipt = useReceiptModalStore((s) => s.openViewReceipt);
  const closeViewReceipt = useReceiptModalStore((s) => s.closeViewReceipt);
  const applyReceiptAndView = useReceiptModalStore(
    (s) => s.applyReceiptAndView,
  );

  const monthParam = monthNumber
    ? String(monthNumber).padStart(2, "0")
    : undefined;
  const {
    data: taxDetails,
    isLoading: isLoadingTaxDetails,
    isError: isTaxDetailsError,
  } = useGetTaxDetails(monthParam, year);

  const { data: yearTaxRecords } = useGetYearTaxRecord(year);
  const periodRecord = yearTaxRecords?.find(
    (r) => r.month_number === monthNumber,
  );
  const hasReceipt = !!periodRecord?.remittance?.receipt?.receipt;

  const {
    data: verificationHistory,
    isLoading: isLoadingVerificationHistory,
    isError: isVerificationHistoryError,
  } = useGetTaxVerificationsByPeriod(
    historyOpen ? monthNumber : undefined,
    historyOpen ? year : undefined,
  );

  const { mutate: markMultipleTaxPaid, isPending: isMarkingAllPaid } =
    useMarkMultipleTaxPaid();

  const employeeRecords: EmployeeTaxRecord[] = (taxDetails?.data ?? []).map(
    (record) => ({
      id: record.id,
      name: record.payslip.employee.fullname,
      grossSalary: record.gross_pay,
      monthlyTax: (record.tax_amount_monthly ?? 0).toLocaleString(),
      nhis: record.nhis_relief ?? 0,
      status: record.remmited,
    }),
  );

  const unpaidTaxIds = employeeRecords
    .filter((r) => !r.status)
    .map((r) => r.id);

  const handleConfirmMarkAllPaid = () => {
    if (unpaidTaxIds.length === 0) {
      setMarkAllPaidOpen(false);
      return;
    }
    markMultipleTaxPaid(unpaidTaxIds, {
      onSuccess: () => {
        toast.success(`${unpaidTaxIds.length} tax record(s) marked as paid.`);
        setMarkAllPaidOpen(false);
      },
      onError: (err: AxiosError) => {
        const message =
          (err.response?.data as { message?: string })?.message ||
          "Failed to mark tax records as paid. Please try again.";
        toast.error(message);
      },
    });
  };

  const summaryCards = buildSummaryCards(
    taxDetails?.total_monthly_tax ?? 0,
    taxDetails?.["number_of employee"] ?? 0,
    taxDetails?.total_gross_pay ?? 0,
    taxDetails?.verification_status === "verified",
  );

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-x-1.5 mb-4">
          <Link
            href="/admin/tax"
            className="text-sm text-[#71717A] font-medium hover:text-[#2F2F33] transition-colors"
          >
            Tax
          </Link>
          <GoChevronRight size={16} className="text-[#71717A]" />
          <p className="text-sm text-[#A0A0A6]">{short}</p>
        </div>

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-semibold text-[#2F2F33] tracking-[-0.3px]">
              {full} Tax
            </h2>
            <p className="text-sm text-[#71717A] mt-2">
              Review and verify {full} employee payroll tax records.
            </p>
          </div>
          <div className="flex items-center gap-x-2 flex-shrink-0 mt-1">
            <MoreActionsDropdown
              items={[
                {
                  label: "Mark as Remitted",
                  onClick: () => {
                    if (unpaidTaxIds.length === 0) {
                      toast.success(
                        "All employees for this period are already remitted.",
                      );
                      return;
                    }
                    setMarkAllPaidOpen(true);
                  },
                },
                {
                  label: hasReceipt ? "View Receipt" : "Upload Receipt",
                  onClick: () => {
                    if (!periodRecord) return;
                    if (hasReceipt) {
                      openViewReceipt(periodRecord);
                    } else {
                      openUploadReceipt(periodRecord);
                    }
                  },
                },
                {
                  label: "Compare History",
                  onClick: () => setHistoryOpen(true),
                },
              ]}
            />
            <Button variant="primary" onButtonClick={() => setVerifyOpen(true)}>
              Verify with Excel
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="flex items-stretch gap-4 mb-6">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} card={card} />
          ))}
        </div>

        {/* Employee table */}
        {isLoadingTaxDetails ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 gap-3 bg-white rounded-lg border border-[#E3E3E5] mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E37915]" />
            <p className="text-sm text-[#71717A]">
              Loading employee records...
            </p>
          </div>
        ) : isTaxDetailsError ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 gap-3 bg-white rounded-lg border border-[#E3E3E5] mt-6">
            <p className="text-sm font-semibold text-[#2F2F33]">
              Failed to load employee tax records
            </p>
            <p className="text-sm text-[#71717A] text-center max-w-[320px]">
              Something went wrong while fetching this period&apos;s records.
              Please try again.
            </p>
          </div>
        ) : (
          <PeriodEmployeeTable
            records={employeeRecords}
            month={monthNumber}
            year={year}
          />
        )}
      </main>

      <MarkTaxPaidModal
        isOpen={markAllPaidOpen}
        onClose={() => setMarkAllPaidOpen(false)}
        onConfirm={handleConfirmMarkAllPaid}
        isSubmitting={isMarkingAllPaid}
        count={unpaidTaxIds.length}
      />

      <UploadReceiptModal
        isOpen={!!uploadReceiptTarget}
        onClose={closeUploadReceipt}
        onSuccess={(receipt) =>
          uploadReceiptTarget &&
          applyReceiptAndView(uploadReceiptTarget, receipt)
        }
        payrollPeriod={uploadReceiptTarget?.month_name ?? full}
        month={uploadReceiptTarget?.month_number ?? monthNumber}
        year={uploadReceiptTarget?.year ?? year}
      />

      <ViewReceiptModal
        isOpen={!!viewReceiptTarget}
        onClose={closeViewReceipt}
        payrollPeriod={viewReceiptTarget?.month_name ?? full}
        meta={viewReceiptTarget?.remittance?.receipt}
      />

      <VerifyTaxRecordsModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        onComplete={(result) => setVerificationResult(result)}
        month={monthNumber}
        year={year}
        payrollPeriod={full}
      />

      <VerificationHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        payrollPeriod={full}
        entries={verificationHistory?.data}
        isLoading={isLoadingVerificationHistory}
        isError={isVerificationHistoryError}
        onViewReport={(runId) => {
          setHistoryOpen(false);
          router.push(
            `/admin/tax/${periodId}/verification-results?run_id=${runId}`,
          );
        }}
      />

      <VerificationToast
        result={verificationResult}
        onDismiss={() => setVerificationResult(null)}
        onViewReport={() => {
          const runId = verificationResult?.runId;
          setVerificationResult(null);
          router.push(
            `/admin/tax/${periodId}/verification-results${runId ? `?run_id=${runId}` : ""}`,
          );
        }}
      />
    </DashboardLayout>
  );
};

export default TaxPeriodDetail;
