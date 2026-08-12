"use client";
import { useState, useRef } from "react";
import { Search, Upload, Info } from "lucide-react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaCaretDown } from "react-icons/fa";
import CustomDropdown from "@/app/common/customDropdown";
import TableActionMenu from "@/app/common/tableActionMenu";

export type EmployeeTaxStatus = "pending_remittance" | "remitted";

export interface EmployeeTaxRecord {
  id: number;
  name: string;
  grossSalary: string;
  monthlyTax: string;
  nhis: string;
  status: EmployeeTaxStatus;
}

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

const StatusBadge = ({ status }: { status: EmployeeTaxStatus }) =>
  status === "remitted" ? (
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
}

const PeriodEmployeeTable = ({ records }: PeriodEmployeeTableProps) => {
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = records.filter((r) => {
    const matchesSearch = r.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(r.status);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const isAllSelected =
    filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filtered.map((r) => r.id));

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

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
            No employees found
          </p>
          <p className="text-sm text-[#71717A] text-center max-w-[320px]">
            There are no employee records matching your search. Try adjusting
            your filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg" style={{ overflowY: "visible" }}>
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
                    <Info
                      size={13}
                      className="text-[#71717A]"
                      title="National Health Insurance Scheme contribution"
                    />
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
                      ₦{record.grossSalary}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      ₦{record.monthlyTax}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      ₦{record.nhis}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-6 py-4">
                      <TableActionMenu
                        items={[
                          { label: "View Details", onClick: () => {} },
                          { label: "Mark as Remitted", onClick: () => {} },
                          { label: "Download Tax Slip", onClick: () => {} },
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
    </div>
  );
};

export default PeriodEmployeeTable;
