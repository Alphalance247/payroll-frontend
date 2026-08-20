"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Upload } from "lucide-react";
import { GoChevronRight } from "react-icons/go";
import { ChevronDown } from "lucide-react";
import { FaCaretDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Button from "@/app/common/Button";
import TableActionMenu from "@/app/common/tableActionMenu";
import VerifyTaxRecordsModal, {
  type VerificationResult,
} from "../../components/verifyTaxRecordsModal";

// ─── Types ────────────────────────────────────────────────────────────────────

type RecordStatus = "matched" | "difference" | "missing";

interface VerificationRecord {
  id: number;
  name: string;
  payroll: string | null;
  excel: string;
  difference: string | null;
  status: RecordStatus;
}

// ─── Dummy data ───────────────────────────────────────────────────────────────

const DUMMY_RECORDS: VerificationRecord[] = [
  { id: 1, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "0",       status: "matched"    },
  { id: 2, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "160,000", status: "difference" },
  { id: 3, name: "Lanre Ademoye", payroll: null,       excel: "40,000",  difference: null,      status: "missing"    },
  { id: 4, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "160,000", status: "matched"    },
  { id: 5, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "160,000", status: "matched"    },
  { id: 6, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "160,000", status: "matched"    },
  { id: 7, name: "Lanre Ademoye", payroll: "200,000", excel: "40,000",  difference: "160,000", status: "matched"    },
];

const SUMMARY = {
  compared: 50,
  matched: 40,
  discrepancies: 3,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fromSlug = (slug: string) => {
  const parts = slug.split("-");
  if (parts.length < 2) return { full: slug, short: slug };
  const month = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const year = parts[1];
  return { full: `${month} ${year}`, short: `${month.slice(0, 3)} ${year}` };
};

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const STATUS_CONFIG: Record<RecordStatus, { label: string; className: string }> = {
  matched:    { label: "Matched",    className: "bg-[#E9F9EF] text-[#1FB356]" },
  difference: { label: "Difference", className: "bg-[#FFF9EC] text-[#B07A0C]" },
  missing:    { label: "Missing",    className: "bg-[#FDEBEB] text-[#D42626]" },
};

const BADGE_BASE = "inline-flex items-center text-xs font-medium rounded-[1rem] px-2.5 py-1";

const STATUS_FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "All",        value: "all"        },
  { label: "Matched",    value: "matched"    },
  { label: "Difference", value: "difference" },
  { label: "Missing",    value: "missing"    },
];

// ─── Summary card ─────────────────────────────────────────────────────────────

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
}: {
  value: string;
  onChange: (v: string) => void;
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
        <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-[#E3E3E5] rounded-xl shadow-lg py-1 min-w-[140px]">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[#F7F7F7] ${
                opt.value === value ? "font-semibold text-[#E37915]" : "text-[#2F2F33]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {/* invisible backdrop */}
      {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface VerificationResultsDetailProps {
  periodId: string;
}

const VerificationResultsDetail = ({ periodId }: VerificationResultsDetailProps) => {
  const { short } = fromSlug(periodId);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const filtered = useMemo(() => {
    return DUMMY_RECORDS.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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
              Compare payroll tax records with the uploaded government spreadsheet and review
              any discrepancies before completing verification.
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
          <SummaryCard label="Records Compared" value={SUMMARY.compared} />
          <SummaryCard label="Matched" value={SUMMARY.matched} />
          <SummaryCard label="Discrepancies" value={SUMMARY.discrepancies} />
        </div>

        {/* Table card */}
        <div className="bg-white rounded-lg border border-[#E3E3E5]">
          {/* Toolbar */}
          <div className="flex items-center justify-between py-4 px-6 border-b border-[#E3E3E5]">
            <div className="relative w-[240px]">
              <input
                type="text"
                placeholder="Search bonus"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-[7px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>

            <div className="flex items-center gap-2">
              <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
              <button
                type="button"
                className="flex items-center gap-x-1.5 px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm font-medium text-[#2F2F33] bg-white hover:bg-[#F7F7F7] transition-colors"
              >
                <Upload size={14} strokeWidth={2} />
                Export
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#71717A]">
              No records match your filter.
            </div>
          ) : (
            <div className="overflow-x-auto" style={{ overflowY: "visible" }}>
              <table className="w-full min-w-[800px] border-b border-[#E3E3E5]">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                      <p className="flex items-center gap-1 cursor-pointer">Name</p>
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
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[140px]">
                      Status
                    </th>
                    <th className="px-6 py-[14px] w-[60px]" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => {
                    const badge = STATUS_CONFIG[record.status];
                    return (
                      <tr
                        key={record.id}
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
                            <span className="text-sm font-medium">{record.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {record.payroll ? `₦ ${record.payroll}` : (
                            <span className="text-[#D42626] font-medium">Missing</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">₦ {record.excel}</td>
                        <td className="px-6 py-4 text-sm">
                          {record.difference !== null ? `₦ ${record.difference}` : "---"}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`${BADGE_BASE} ${badge.className}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <TableActionMenu
                            items={[
                              { label: "View Details", onClick: () => {} },
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 w-full border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>Show:</span>
                  <div className="relative inline-flex items-center">
                    <select
                      value={pageSize ?? 20}
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                      className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <FaCaretDown className="absolute right-2.5 pointer-events-none" color="#000000" size={14} />
                  </div>
                  <span>per page</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-slate-500 font-medium">
                    Page{" "}
                    <span className="text-slate-900 font-semibold">{page ?? 1}</span>
                    {" "}of{" "}
                    <span className="text-slate-900 font-semibold">1</span>
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
        onComplete={(_result: VerificationResult) => {
          setVerifyOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default VerificationResultsDetail;
