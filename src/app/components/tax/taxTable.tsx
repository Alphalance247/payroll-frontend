"use client";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, Upload, Eye } from "lucide-react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaCaretDown } from "react-icons/fa";
import toast from "react-hot-toast";
import CustomDropdown from "@/app/common/customDropdown";
import TableActionMenu from "@/app/common/tableActionMenu";
import UploadReceiptModal from "@/app/components/tax/uploadReceiptModal";
import EditReceiptModal from "@/app/components/tax/editReceiptModal";
import { useGetYearTaxRecord } from "@/app/hooks/useQueries/tax/useTaxList";
import RemoveReceiptModal from "@/app/components/tax/removeReceiptModal";
import ViewReceiptModal from "@/app/components/tax/viewReceiptModal";
import { useDeleteTaxReceipt } from "@/app/hooks/useQueries/tax/useTaxReceipts";
import { useExportTaxReport } from "@/app/hooks/useQueries/tax/useExportTaxReport";
import { useReceiptModalStore } from "@/stores/Tax/receiptModalStore";
import { useRouter } from "next/navigation";

const YEAR_RANGE = 6;
const YEAR_OPTIONS = Array.from({ length: YEAR_RANGE }, (_, i) => {
  const year = (new Date().getFullYear() - i).toString();
  return { label: year, value: year };
});

const VERIFICATION_BADGE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  verified: { label: "Verified", bg: "#F0FDF4", text: "#15803D" },
  in_progress: { label: "In Progress", bg: "#EFF6FF", text: "#3B82F6" },
  failed: { label: "Failed", bg: "#FEF2F2", text: "#DC2626" },
  not_verified: { label: "Not Verified", bg: "#F3F4F6", text: "#6B7280" },
  needs_review: { label: "Needs Review", bg: "#FFF9F2", text: "#CF6E13" },
};

const REMITTANCE_BADGE_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  remitted: { label: "Remitted", bg: "#F0FDF4", text: "#15803D" },
  partial: { label: "Partial", bg: "#FFF9F2", text: "#CF6E13" },
  pending: { label: "Pending", bg: "#F3F4F6", text: "#6B7280" },
};

const VerificationBadge = ({ status }: { status?: string }) => {
  const config =
    VERIFICATION_BADGE_CONFIG[status ?? ""] ??
    VERIFICATION_BADGE_CONFIG.not_verified;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
};

const RemittanceBadge = ({ status }: { status?: string }) => {
  const config =
    REMITTANCE_BADGE_CONFIG[status ?? ""] ?? REMITTANCE_BADGE_CONFIG.pending;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
};

const TaxTable = () => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const currentYear = useMemo(() => new Date().getFullYear().toString(), []);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {
    data: yearTaxRecords,
    isLoading: isLoadingTaxRecords,
    isError: isTaxRecordsError,
  } = useGetYearTaxRecord(selectedYear);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();

  const uploadReceiptTarget = useReceiptModalStore((s) => s.uploadTarget);
  const editReceiptTarget = useReceiptModalStore((s) => s.editTarget);
  const viewReceiptTarget = useReceiptModalStore((s) => s.viewTarget);
  const removeReceiptTarget = useReceiptModalStore((s) => s.removeTarget);
  const openUploadReceipt = useReceiptModalStore((s) => s.openUploadReceipt);
  const closeUploadReceipt = useReceiptModalStore((s) => s.closeUploadReceipt);
  const openEditReceipt = useReceiptModalStore((s) => s.openEditReceipt);
  const closeEditReceipt = useReceiptModalStore((s) => s.closeEditReceipt);
  const openViewReceipt = useReceiptModalStore((s) => s.openViewReceipt);
  const closeViewReceipt = useReceiptModalStore((s) => s.closeViewReceipt);
  const openRemoveReceipt = useReceiptModalStore((s) => s.openRemoveReceipt);
  const closeRemoveReceipt = useReceiptModalStore((s) => s.closeRemoveReceipt);
  const applyReceiptAndView = useReceiptModalStore(
    (s) => s.applyReceiptAndView,
  );

  const { mutate: deleteReceipt, isPending: isRemovingReceipt } =
    useDeleteTaxReceipt();
  const { exportTaxReport } = useExportTaxReport();

  const filtered = yearTaxRecords?.filter((r) =>
    r?.month_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleConfirmRemoveReceipt = () => {
    const receiptId = removeReceiptTarget?.remittance?.receipt?.id;
    if (!receiptId) {
      closeRemoveReceipt();
      return;
    }
    deleteReceipt(receiptId, {
      onSuccess: () => {
        toast.success("Receipt removed successfully.");
        closeRemoveReceipt();
      },
      onError: (err) => {
        const message =
          (err.response?.data as { message?: string })?.message ||
          "Failed to remove receipt. Please try again.";
        toast.error(message);
      },
    });
  };

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
          <CustomDropdown
            trigger="Year"
            title="Select a year"
            options={YEAR_OPTIONS}
            selected={[selectedYear]}
            onChange={(values) => setSelectedYear(values[0] ?? currentYear)}
          />
          {/* <CustomDropdown
            trigger="Status"
            title="Select a status"
            options={STATUS_OPTIONS}
            selected={selectedStatuses}
            onChange={setSelectedStatuses}
            multiSelect
          /> */}
          {/* <button
            type="button"
            className="flex items-center gap-x-2 px-4 py-[7px] rounded-[8px] border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
          >
            <Upload size={14} strokeWidth={2} />
            Export
          </button> */}
        </div>
      </div>

      {/* Table */}
      {isLoadingTaxRecords ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#E37915]" />
          <p className="text-sm text-[#71717A]">Loading tax records...</p>
        </div>
      ) : isTaxRecordsError ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-3">
          <p className="text-sm font-semibold text-[#2F2F33]">
            Failed to load tax records
          </p>
          <p className="text-sm text-[#71717A] text-center max-w-[320px]">
            Something went wrong while fetching tax records. Please try again.
          </p>
        </div>
      ) : filtered?.length === 0 ? (
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
                    // checked={isAllSelected}
                    // onChange={toggleSelectAll}
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
              {filtered?.map((record) => {
                const isSelected = selectedIds.includes(record.month_number);
                return (
                  <tr
                    key={`${record.year}-${record.month_number}`}
                    className={`border-b border-[#E3E3E5] last:border-b-0 text-[#2F2F33] ${
                      isSelected ? "bg-[#FFF9F2]" : ""
                    }`}
                  >
                    <td className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(record.month_number)}
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label={`Select ${record?.month}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/tax/${record.month_number}-${record.year}`}
                        className="text-sm font-medium text-[#E37915] underline"
                      >
                        {record.month_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2F2F33]">
                      ₦{record?.total_tax}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {record?.num_of_employees}
                    </td>
                    <td className="px-6 py-4">
                      <VerificationBadge
                        status={record?.verification?.status}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <RemittanceBadge status={record?.remittance?.status} />
                    </td>
                    <td className="px-6 py-4">
                      {record?.remittance?.receipt?.receipt ? (
                        <button
                          type="button"
                          onClick={() => openViewReceipt(record)}
                          className="inline-flex items-center gap-x-1.5 px-3 py-1.5 rounded-lg border border-[#D3D3D6] text-xs font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
                        >
                          <Eye size={12} strokeWidth={2} />
                          View Receipt
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openUploadReceipt(record)}
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
                          record?.remittance?.receipt?.receipt
                            ? [
                                {
                                  label: "View Receipt",
                                  onClick: () => openViewReceipt(record),
                                },
                                {
                                  label: "Replace Receipt",
                                  onClick: () => openEditReceipt(record),
                                },
                                {
                                  label: "Remove Receipt",
                                  onClick: () => openRemoveReceipt(record),
                                },
                                {
                                  label: "View Tax Details",
                                  onClick: () => {
                                    router.push(
                                      `/admin/tax/${record.month_number}-${record.year}`,
                                    );
                                  },
                                },
                                {
                                  label: "Export Tax Report",
                                  onClick: () =>
                                    exportTaxReport(
                                      record.month_number,
                                      record.year,
                                    ),
                                },
                              ]
                            : [
                                // record?.remittance?.status === "remitted"
                                //   ? {
                                //       label: "Undo Remittance",
                                //       onClick: () => {},
                                //       // onClick: () =>
                                //       //   openRemittanceModal(record, "undo"),
                                //     }
                                //   : {
                                //       label: "Mark as Remitted",
                                //       // onClick: () =>
                                //       //   openRemittanceModal(record, "mark"),
                                //       onClick: () => {},
                                //     },
                                {
                                  label: "Upload Receipt",
                                  onClick: () => openUploadReceipt(record),
                                },
                                {
                                  label: "View Tax Details",
                                  onClick: () => {
                                    router.push(
                                      `/admin/tax/${record.month_number}-${record.year}`,
                                    );
                                  },
                                },
                                {
                                  label: "Export Tax Report",
                                  onClick: () =>
                                    exportTaxReport(
                                      record.month_number,
                                      record.year,
                                    ),
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
                  {/* {totalPages} */}
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
                  // disabled={currentPage >= totalPages}
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

      {/* <MarkAsRemittedModal
        isOpen={!!markAsRemittedTarget}
        onClose={() => setMarkAsRemittedTarget(null)}
        onConfirm={handleConfirmMarkRemitted}
        // isSubmitting={isMarkingRemitted}
        payrollPeriod={markAsRemittedTarget?.month_name}
        // mode={remittanceModalMode}
      /> */}

      <UploadReceiptModal
        isOpen={!!uploadReceiptTarget}
        onClose={closeUploadReceipt}
        onSuccess={(receipt) =>
          uploadReceiptTarget &&
          applyReceiptAndView(uploadReceiptTarget, receipt)
        }
        payrollPeriod={uploadReceiptTarget?.month_name}
        month={uploadReceiptTarget?.month_number}
        year={uploadReceiptTarget?.year}
      />

      <EditReceiptModal
        isOpen={!!editReceiptTarget}
        onClose={closeEditReceipt}
        onSuccess={(receipt) =>
          editReceiptTarget && applyReceiptAndView(editReceiptTarget, receipt)
        }
        record={editReceiptTarget}
      />

      <ViewReceiptModal
        isOpen={!!viewReceiptTarget}
        onClose={closeViewReceipt}
        onRemove={() =>
          viewReceiptTarget && openRemoveReceipt(viewReceiptTarget)
        }
        payrollPeriod={viewReceiptTarget?.month_name}
        meta={viewReceiptTarget?.remittance?.receipt}
      />

      <RemoveReceiptModal
        isOpen={!!removeReceiptTarget}
        onClose={closeRemoveReceipt}
        onConfirm={handleConfirmRemoveReceipt}
        isSubmitting={isRemovingReceipt}
        payrollPeriod={removeReceiptTarget?.month_name}
      />
    </div>
  );
};

export default TaxTable;
