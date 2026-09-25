"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Upload } from "lucide-react";
import { GoChevronRight } from "react-icons/go";
import { ChevronDown } from "lucide-react";
import { FaCaretDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Button from "@/app/common/Button";
// import TableActionMenu from "@/app/common/tableActionMenu";
import VerifyTaxRecordsModal, {
  type VerificationResult,
} from "../../components/verifyTaxRecordsModal";
import {
  useTaxVerificationResult,
  type TaxVerificationRecordItem,
} from "@/app/hooks/useQueries/tax/useTaxVerification";

const STATUS_BADGE_STYLES: Record<string, string> = {
  // Remittance statuses
  remitted: "bg-[#E9F9EF] text-[#1FB356]",
  partial: "bg-[#FFF9EC] text-[#B07A0C]",
  pending: "bg-[#F3F4F6] text-[#6B7280]",
  // Verification (comparison) statuses
  match: "bg-[#E9F9EF] text-[#1FB356]",
  discrepancy: "bg-[#FFF9EC] text-[#B07A0C]",
  missing_in_payroll: "bg-[#FDEBEB] text-[#D42626]",
  missing_in_spreadsheet: "bg-[#FDEBEB] text-[#D42626]",
};

const STATUS_BADGE_CLASS = (status?: string) =>
  STATUS_BADGE_STYLES[(status ?? "").toLowerCase()] ??
  "bg-[#F3F4F6] text-[#6B7280]";

const formatStatusLabel = (status?: string) =>
  (status ?? "—")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const fromSlug = (slug: string) => {
  const parts = slug.split("-");
  if (parts.length < 2) return { full: slug, short: slug };
  const month = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const year = parts[1];
  return { full: `${month} ${year}`, short: `${month.slice(0, 3)} ${year}` };
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const BADGE_BASE =
  "inline-flex items-center text-xs font-medium rounded-[1rem] px-2.5 py-1";

const SummaryCard = ({ label, value }: { label: string; value: number }) => (
  <div className="flex-1 bg-white rounded-lg border border-[#E3E3E5] p-4">
    <p className="text-xs font-medium text-[#71717A] mb-3">{label}</p>
    <p className="text-lg font-semibold text-[#2F2F33]">{value}</p>
  </div>
);

// ─── Status dropdown ──────────────────────────────────────────────────────────

const StatusDropdown = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-x-1.5 px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm font-medium text-[#2F2F33] bg-white hover:bg-[#F7F7F7] transition-colors"
      >
        Status
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-[#E3E3E5] rounded-xl shadow-lg py-1 min-w-[140px]">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#F7F7F7] ${
                opt.value === value
                  ? "font-semibold text-[#E37915]"
                  : "text-[#2F2F33]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {/* invisible backdrop */}
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface VerificationResultsDetailProps {
  periodId: string;
}

const VerificationResultsDetail = ({
  periodId,
}: VerificationResultsDetailProps) => {
  const { short } = fromSlug(periodId);
  const [monthNumberRaw, yearRaw] = periodId.split("-");
  const router = useRouter();
  const searchParams = useSearchParams();
  const runId = searchParams.get("run_id");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const { data, isLoading, isError } = useTaxVerificationResult(runId, !!runId);

  const records: TaxVerificationRecordItem[] = useMemo(
    () => data?.report ?? [],
    [data],
  );

  const statusFilterOptions = useMemo(() => {
    const unique = Array.from(new Set(records.map((r) => r.status)));
    return [
      { label: "All", value: "all" },
      ...unique.map((status) => ({
        label: formatStatusLabel(status),
        value: status,
      })),
    ];
  }, [records]);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        r.name.toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

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
          <Link
            href={`/admin/tax/${periodId}`}
            className="text-sm text-[#71717A] font-medium hover:text-[#2F2F33] transition-colors"
          >
            {short}
          </Link>
          <GoChevronRight size={16} className="text-[#71717A]" />
          <p className="text-sm text-[#A0A0A6]">Verification Results</p>
        </div>

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-semibold text-[#2F2F33] tracking-[-0.3px]">
              Tax Verification Results
            </h2>
            <p className="text-sm text-[#71717A] mt-2 max-w-[520px] leading-relaxed">
              Compare payroll tax records with the uploaded government
              spreadsheet and review any discrepancies before completing
              verification.
            </p>
          </div>
          <Button
            variant="primary"
            onButtonClick={() => setVerifyOpen(true)}
            className="flex-shrink-0 mt-1 shadow-sm hover:shadow-md transition-shadow"
          >
            Upload Different File
          </Button>
        </div>

        {/* Summary cards */}
        <div className="flex items-stretch gap-4 mb-6">
          <SummaryCard
            label="Records Compared"
            value={data?.compared_count ?? 0}
          />
          <SummaryCard label="Matched" value={data?.records_matched ?? 0} />
          <SummaryCard
            label="Discrepancies"
            value={data?.discrepancy_count ?? 0}
          />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-lg border border-[#E3E3E5]">
          {/* Toolbar */}
          <div className="flex items-center justify-between py-4 px-6 border-b border-[#E3E3E5]">
            <div className="relative w-[240px]">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-[7px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>

            <div className="flex items-center gap-2">
              <StatusDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusFilterOptions}
              />
              <button
                type="button"
                className="flex items-center gap-x-1.5 px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm font-medium text-[#2F2F33] bg-white hover:bg-[#F7F7F7] transition-colors"
              >
                <Upload size={14} strokeWidth={2} />
                Export
              </button>
            </div>
          </div>

          {!runId ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-sm font-semibold text-[#2F2F33]">
                No verification run selected
              </p>
              <p className="text-sm text-[#71717A] text-center max-w-[320px]">
                Upload a spreadsheet to run a new verification and view its
                results here.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E37915]" />
              <p className="text-sm text-[#71717A]">
                Loading verification results...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-sm font-semibold text-[#2F2F33]">
                Failed to load verification results
              </p>
              <p className="text-sm text-[#71717A] text-center max-w-[320px]">
                Something went wrong while fetching this period&apos;s
                verification report. Please try again.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#71717A]">
              {records.length === 0
                ? "No verification has been run for this period yet."
                : "No records match your filter."}
            </div>
          ) : (
            <div className="overflow-x-auto" style={{ overflowY: "visible" }}>
              <table className="w-full min-w-[1000px] border-b border-[#E3E3E5]">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left  w-[250px]">
                      Name
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                      Payroll
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                      Excel
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                      Difference
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                      Status
                    </th>

                    <th className="px-6 py-[14px] w-[60px]" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => (
                    <tr
                      key={record?.email}
                      className="border-b border-[#E3E3E5] last:border-b-0 text-[#2F2F33]"
                    >
                      <td className="px-6 py-[14px] w-[40px]">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 cursor-pointer"
                          aria-label={`Select ${record.name}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                            {getInitials(record.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">
                              {record.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        ₦ {record?.fields?.monthly_tax?.payroll || "0"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        ₦ {record?.fields?.monthly_tax?.spreadsheet || "0"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        ₦ {record?.fields?.monthly_tax?.diff || "0"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`${BADGE_BASE} ${STATUS_BADGE_CLASS(record?.status)}`}
                        >
                          {formatStatusLabel(record.status)}
                        </span>
                      </td>

                      {/* <td className="px-6 py-4">
                        <TableActionMenu
                          items={[{ label: "View Details", onClick: () => {} }]}
                        />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 w-full border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Show:</span>
                  <div className="relative inline-flex items-center">
                    <select
                      value={pageSize ?? 20}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <FaCaretDown
                      className="absolute right-2.5 pointer-events-none"
                      color="#000000"
                      size={14}
                    />
                  </div>
                  <span>per page</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-500 font-medium">
                    Page{" "}
                    <span className="text-slate-900 font-semibold">
                      {page ?? 1}
                    </span>{" "}
                    of <span className="text-slate-900 font-semibold">1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={(page ?? 1) <= 1}
                      onClick={() => setPage((p) => Math.max(1, (p ?? 1) - 1))}
                      aria-label="Previous page"
                      className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronLeft color="#2F2F33" />
                    </button>
                    <button
                      type="button"
                      disabled
                      aria-label="Next page"
                      className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronRight color="#2F2F33" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <VerifyTaxRecordsModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        onComplete={(result: VerificationResult) => {
          setVerifyOpen(false);
          if (result) {
            router.replace(
              `/admin/tax/${periodId}/verification-results?run_id=${result.runId}`,
            );
          }
        }}
        month={Number(monthNumberRaw)}
        year={yearRaw}
        payrollPeriod={short}
      />
    </DashboardLayout>
  );
};

export default VerificationResultsDetail;
