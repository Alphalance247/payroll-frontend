"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Search, Upload, Eye } from "lucide-react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaCaretDown } from "react-icons/fa";
import toast from "react-hot-toast";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import CustomDropdown from "@/app/common/customDropdown";
import TableActionMenu from "@/app/common/tableActionMenu";
import MarkAsRemittedModal from "@/app/components/tax/markAsRemittedModal";
import UploadReceiptModal from "@/app/components/tax/uploadReceiptModal";
import ViewReceiptModal, {
  type ReceiptMeta,
} from "@/app/components/tax/viewReceiptModal";
import RemoveReceiptModal from "@/app/components/tax/removeReceiptModal";

export type VerificationStatus = "pending_remittance" | "remitted";
export type RemittanceStatus = "pending_remittance" | "remitted";
export type ReceiptStatus = "upload" | "view";

export interface TaxRecord {
  id: number;
  payrollPeriod: string;
  totalTax: string;
  employees: number;
  verification: VerificationStatus;
  remittance: RemittanceStatus;
  receipt: ReceiptStatus;
  receiptMeta?: ReceiptMeta;
}

const STATUS_OPTIONS = [
  { label: "Remitted", value: "remitted" },
  { label: "Pending Remittance", value: "pending_remittance" },
];

const DUMMY_RECORDS: TaxRecord[] = [
  {
    id: 1,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 2,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "remitted",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 3,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "remitted",
    remittance: "pending_remittance",
    receipt: "view",
    receiptMeta: {
      filename: "July_Tax_Receipt",
      uploadedBy: "Admin",
      uploadedOn: "31st Jul 2026",
      fileType: "PDF",
    },
  },
  {
    id: 4,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 5,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 6,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 7,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 8,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 9,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
  {
    id: 10,
    payrollPeriod: "July 2026",
    totalTax: "793,670",
    employees: 42,
    verification: "pending_remittance",
    remittance: "pending_remittance",
    receipt: "upload",
  },
];

const VerificationBadge = ({ status }: { status: VerificationStatus }) =>
  status === "remitted" ? (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D]">
      Remitted
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF9F2] text-[#CF6E13]">
      Pending Remittance
    </span>
  );

const RemittanceBadge = ({ status }: { status: RemittanceStatus }) =>
  status === "remitted" ? (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D]">
      Remitted
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF9F2] text-[#CF6E13]">
      Pending Remittance
    </span>
  );

const TaxTable = () => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [records, setRecords] = useState<TaxRecord[]>(DUMMY_RECORDS);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [markAsRemittedTarget, setMarkAsRemittedTarget] =
    useState<TaxRecord | null>(null);
  const [remittanceModalMode, setRemittanceModalMode] = useState<
    "mark" | "undo"
  >("mark");
  const [isMarkingRemitted, setIsMarkingRemitted] = useState(false);
  const [uploadReceiptTarget, setUploadReceiptTarget] =
    useState<TaxRecord | null>(null);
  const [viewReceiptTarget, setViewReceiptTarget] = useState<TaxRecord | null>(
    null,
  );
  const [removeReceiptTarget, setRemoveReceiptTarget] =
    useState<TaxRecord | null>(null);
  const [isRemovingReceipt, setIsRemovingReceipt] = useState(false);

  const handleConfirmRemoveReceipt = async () => {
    if (!removeReceiptTarget) return;
    const { id, payrollPeriod } = removeReceiptTarget;
    setIsRemovingReceipt(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              receipt: "upload",
              remittance: "pending_remittance",
              receiptMeta: undefined,
            }
          : r,
      ),
    );
    setIsRemovingReceipt(false);
    setRemoveReceiptTarget(null);
    toast.success(`Receipt for ${payrollPeriod} has been removed.`);
  };

  const openRemittanceModal = (record: TaxRecord, mode: "mark" | "undo") => {
    setMarkAsRemittedTarget(record);
    setRemittanceModalMode(mode);
  };

  const handleConfirmMarkRemitted = async () => {
    if (!markAsRemittedTarget) return;
    const { id, payrollPeriod } = markAsRemittedTarget;
    const isUndo = remittanceModalMode === "undo";
    setIsMarkingRemitted(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, remittance: isUndo ? "pending_remittance" : "remitted" }
          : r,
      ),
    );
    setIsMarkingRemitted(false);
    setMarkAsRemittedTarget(null);
    toast.success(
      isUndo
        ? `Remittance for ${payrollPeriod} has been undone.`
        : `${payrollPeriod} marked as remitted.`,
    );
  };

  const handleUploadSuccess = () => {
    if (!uploadReceiptTarget) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === uploadReceiptTarget.id
          ? { ...r, receipt: "view", remittance: "remitted" }
          : r,
      ),
    );
  };

  const totalPages = Math.ceil(records.length / pageSize);

  const filtered = records.filter((r) =>
    r.payrollPeriod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isAllSelected =
    filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filtered.map((r) => r.id));

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
        {/* Search */}
        <div className="relative w-[273px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or bonus type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
          />
        </div>

        {/* Filters + Export */}
        <div className="flex items-center gap-x-2">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            placeholder="Select date range"
          />
          <CustomDropdown
            trigger="Status"
            title="Select a status"
            options={STATUS_OPTIONS}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
            multiSelect
          />
          <button
            type="button"
            className="flex items-center gap-x-2 px-4 py-[7px] rounded-[8px] border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
          >
            <Upload size={14} strokeWidth={2} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-3">
          <p className="text-sm font-semibold text-[#2F2F33]">
            No tax records found
          </p>
          <p className="text-sm text-[#71717A] text-center max-w-[320px]">
            There are no tax records matching your search. Try adjusting your
            filters.
          </p>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-lg"
          style={{ overflowY: "visible" }}
        >
          <table className="w-full min-w-[1100px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[40px]">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 cursor-pointer"
                    aria-label="Select all"
                  />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  <p className="flex items-center gap-x-1 cursor-pointer">
                    Payroll Period
                    <RiExpandUpDownFill fill="#2F2F33" size={12} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                  Total Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[130px]">
                  Employees
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Verification
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Remittance
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[170px]">
                  Receipt
                </th>
                <th className="px-6 py-[14px] w-[60px]" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => {
                const isSelected = selectedIds.includes(record.id);
                return (
                  <tr
                    key={record.id}
                    className={`border-b border-[#E3E3E5] last:border-b-0 text-[#2F2F33] ${
                      isSelected ? "bg-[#FFF9F2]" : ""
                    }`}
                  >
                    <td className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(record.id)}
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label={`Select ${record.payrollPeriod}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/tax/${record.payrollPeriod.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm font-medium text-[#E37915] underline"
                      >
                        {record.payrollPeriod}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2F2F33]">
                      ₦{record.totalTax}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {record.employees}
                    </td>
                    <td className="px-6 py-4">
                      <VerificationBadge status={record.verification} />
                    </td>
                    <td className="px-6 py-4">
                      <RemittanceBadge status={record.remittance} />
                    </td>
                    <td className="px-6 py-4">
                      {record.receipt === "view" ? (
                        <button
                          type="button"
                          onClick={() => setViewReceiptTarget(record)}
                          className="inline-flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg border border-[#D3D3D6] text-xs font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
                        >
                          <Eye size={12} strokeWidth={2} />
                          View Receipt
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setUploadReceiptTarget(record)}
                          className="inline-flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg border border-[#D3D3D6] text-xs font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
                        >
                          <Upload size={12} strokeWidth={2} />
                          Upload Receipt
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <TableActionMenu
                        items={
                          record.receipt === "view"
                            ? [
                                {
                                  label: "View Receipt",
                                  onClick: () => setViewReceiptTarget(record),
                                },
                                {
                                  label: "Replace Receipt",
                                  onClick: () => setUploadReceiptTarget(record),
                                },
                                {
                                  label: "Remove Receipt",
                                  onClick: () => setRemoveReceiptTarget(record),
                                },
                                {
                                  label: "View Tax Details",
                                  onClick: () => {},
                                },
                                {
                                  label: "Export Tax Report",
                                  onClick: () => {},
                                },
                              ]
                            : [
                                record.remittance === "remitted"
                                  ? {
                                      label: "Undo Remittance",
                                      onClick: () =>
                                        openRemittanceModal(record, "undo"),
                                    }
                                  : {
                                      label: "Mark as Remitted",
                                      onClick: () =>
                                        openRemittanceModal(record, "mark"),
                                    },
                                {
                                  label: "Upload Receipt",
                                  onClick: () => setUploadReceiptTarget(record),
                                },
                                {
                                  label: "View Tax Details",
                                  onClick: () => {},
                                },
                                {
                                  label: "Export Tax Report",
                                  onClick: () => {},
                                },
                              ]
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show:</span>
              <div className="relative inline-flex items-center">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <FaCaretDown
                  className="absolute right-2.5 pointer-events-none"
                  color="#000"
                  size={14}
                />
              </div>
              <span>per page</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500 font-medium">
                Page{" "}
                <span className="text-slate-900 font-semibold">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 font-semibold">
                  {totalPages}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  aria-label="Previous page"
                  className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none"
                >
                  <FaChevronLeft color="#2F2F33" />
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  aria-label="Next page"
                  className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none"
                >
                  <FaChevronRight color="#2F2F33" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MarkAsRemittedModal
        isOpen={!!markAsRemittedTarget}
        onClose={() => setMarkAsRemittedTarget(null)}
        onConfirm={handleConfirmMarkRemitted}
        isSubmitting={isMarkingRemitted}
        payrollPeriod={markAsRemittedTarget?.payrollPeriod}
        mode={remittanceModalMode}
      />

      <UploadReceiptModal
        isOpen={!!uploadReceiptTarget}
        onClose={() => setUploadReceiptTarget(null)}
        onSuccess={handleUploadSuccess}
        payrollPeriod={uploadReceiptTarget?.payrollPeriod}
      />

      <ViewReceiptModal
        isOpen={!!viewReceiptTarget}
        onClose={() => setViewReceiptTarget(null)}
        onRemove={() => setRemoveReceiptTarget(viewReceiptTarget)}
        payrollPeriod={viewReceiptTarget?.payrollPeriod}
        meta={viewReceiptTarget?.receiptMeta}
      />

      <RemoveReceiptModal
        isOpen={!!removeReceiptTarget}
        onClose={() => setRemoveReceiptTarget(null)}
        onConfirm={handleConfirmRemoveReceipt}
        isSubmitting={isRemovingReceipt}
        payrollPeriod={removeReceiptTarget?.payrollPeriod}
      />
    </div>
  );
};

export default TaxTable;
