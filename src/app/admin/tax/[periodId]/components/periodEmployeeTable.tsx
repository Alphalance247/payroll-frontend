"use client";
import { useState, useRef } from "react";
import { Search, Upload, Info, CheckCircle2 } from "lucide-react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaCaretDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import CustomDropdown from "@/app/common/customDropdown";
import TableActionMenu from "@/app/common/tableActionMenu";
import {
  useMarkTaxPaid,
  useMarkMultipleTaxPaid,
} from "@/app/hooks/useQueries/tax/useMarkTaxPaid";
import { useExportTaxReport } from "@/app/hooks/useQueries/tax/useExportTaxReport";
import MarkTaxPaidModal from "./markTaxPaidModal";

export interface EmployeeTaxRecord {
  id: string;
  name: string;
  grossSalary: string;
  monthlyTax: string;
  nhis: number;
  status: boolean;
}

const getErrorMessage = (err: AxiosError, fallback: string) =>
  (err.response?.data as { message?: string })?.message || fallback;

const AVATAR_COLORS = [
  "#1C3A52",
  "#2D4739",
  "#3B2D52",
  "#52381C",
  "#1C4B52",
  "#4B1C3A",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getAvatarColor = (name: string) =>
  AVATAR_COLORS[
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
      AVATAR_COLORS.length
  ];

const STATUS_OPTIONS = [
  { label: "Remitted", value: "remitted" },
  { label: "Pending Remittance", value: "pending_remittance" },
];

const StatusBadge = ({ status }: { status: boolean }) =>
  status ? (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0FDF4] text-[#15803D]">
      Remitted
    </span>
  ) : (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF9F2] text-[#CF6E13]">
      Pending Remittance
    </span>
  );

interface PeriodEmployeeTableProps {
  records: EmployeeTaxRecord[];
  month: number | string;
  year: number | string;
}

const PeriodEmployeeTable = ({
  records,
  month,
  year,
}: PeriodEmployeeTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { mutate: markTaxPaid, isPending: isMarkingSingle } = useMarkTaxPaid();
  const { mutate: markMultipleTaxPaid, isPending: isMarkingMultiple } =
    useMarkMultipleTaxPaid();
  const { exportTaxReport, isExporting } = useExportTaxReport();

  const [markPaidTarget, setMarkPaidTarget] = useState<{
    ids: string[];
    name?: string;
  } | null>(null);

  const filtered = records.filter((r) => {
    const matchesSearch = r.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const isAllSelected =
    filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filtered.map((r) => r.id));

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const isMarkingPaid = isMarkingSingle || isMarkingMultiple;

  const handleConfirmMarkPaid = () => {
    if (!markPaidTarget) return;
    const { ids, name } = markPaidTarget;

    if (ids.length === 1) {
      markTaxPaid(ids[0], {
        onSuccess: () => {
          toast.success(`${name ?? "Employee"}'s tax marked as paid.`);
          setMarkPaidTarget(null);
        },
        onError: (err) =>
          toast.error(getErrorMessage(err, "Failed to mark tax as paid.")),
      });
    } else {
      markMultipleTaxPaid(ids, {
        onSuccess: () => {
          toast.success(`${ids.length} tax record(s) marked as paid.`);
          setSelectedIds([]);
          setMarkPaidTarget(null);
        },
        onError: (err) =>
          toast.error(
            getErrorMessage(
              err,
              "Failed to mark selected tax records as paid.",
            ),
          ),
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
        <div className="relative w-[273px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
          <input
            type="text"
            placeholder="Search bonus"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
          />
        </div>

        <div className="flex items-center gap-x-2">
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={() => setMarkPaidTarget({ ids: selectedIds })}
              disabled={isMarkingPaid}
              className="flex items-center gap-x-2 px-4 py-[7px] rounded-[8px] border border-[#15803D] bg-[#F0FDF4] text-sm font-medium text-[#15803D] hover:bg-[#DCFCE7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 size={14} strokeWidth={2} />
              {`Mark as Paid (${selectedIds.length})`}
            </button>
          )}
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
            onClick={() => exportTaxReport(month, year)}
            disabled={isExporting}
            className="flex items-center gap-x-2 px-4 py-[7px] rounded-[8px] border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={14} strokeWidth={2} />
            {isExporting ? "Exporting…" : "Export"}
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 gap-3">
          <p className="text-sm font-semibold text-[#2F2F33]">
            No employees found
          </p>
          <p className="text-sm text-[#71717A] text-center max-w-[320px]">
            There are no employee records matching your search. Try adjusting
            your filters.
          </p>
        </div>
      ) : (
        <div
          className="overflow-x-auto rounded-lg"
          style={{ overflowY: "visible" }}
        >
          <table className="w-full min-w-[900px] border-b border-[#E3E3E5]">
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
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                  <p className="flex items-center gap-x-1 cursor-pointer">
                    Name
                    <RiExpandUpDownFill fill="#2F2F33" size={12} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                  Gross Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                  Monthly Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                  <span className="flex items-center gap-x-1">
                    NHIS
                    <Info size={13} className="text-[#71717A]" />
                  </span>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left">
                  Status
                </th>
                <th className="px-6 py-[14px] w-[60px]" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => {
                const isSelected = selectedIds.includes(record.id);
                const initials = getInitials(record.name);
                const avatarColor = getAvatarColor(record.name);
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
                        aria-label={`Select ${record.name}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: avatarColor }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {initials}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-[#2F2F33]">
                          {record.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      ₦ {record.grossSalary}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      ₦ {record.monthlyTax}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      ₦ {record.nhis}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-6 py-4">
                      <TableActionMenu
                        items={[
                          ...(record.status
                            ? []
                            : [
                                {
                                  label: "Mark as Remitted",
                                  onClick: () =>
                                    setMarkPaidTarget({
                                      ids: [record.id],
                                      name: record.name,
                                    }),
                                },
                              ]),
                        ]}
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

      <MarkTaxPaidModal
        isOpen={!!markPaidTarget}
        onClose={() => setMarkPaidTarget(null)}
        onConfirm={handleConfirmMarkPaid}
        isSubmitting={isMarkingPaid}
        count={markPaidTarget?.ids.length ?? 0}
        name={markPaidTarget?.name}
      />
    </div>
  );
};

export default PeriodEmployeeTable;
