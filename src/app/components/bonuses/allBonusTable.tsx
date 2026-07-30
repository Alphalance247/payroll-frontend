"use client";
import { useRef, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft, FaCaretDown } from "react-icons/fa";
import { Search, Upload } from "lucide-react";
import { useFilter } from "@/app/hooks/useFilter";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
import BonusEmptyState from "@/app/components/Bonus/bonusEmptyState";
import { Badge, stageBadge, disburseBadge } from "@/app/components/bonuses/bonusBadge";

interface AllBonusRecord {
  id: number;
  name: string;
  bonusAmount: string;
  bonusNaira: string;
  disburseStatus: string;
  bonusType: string;
  approvalStatus: string;
  dateAdded: string;
}

const MOCK_DATA: AllBonusRecord[] = [
  { id: 1, name: "Lanre Ademoye", bonusAmount: "$200", bonusNaira: "₦300,000", disburseStatus: "Disbursed", bonusType: "Fixed bonus", approvalStatus: "Approved", dateAdded: "2026-06-26" },
  { id: 2, name: "Lanre Ademoye", bonusAmount: "$200", bonusNaira: "₦300,000", disburseStatus: "Disbursed", bonusType: "Fixed bonus", approvalStatus: "Approved", dateAdded: "2026-06-26" },
  { id: 3, name: "Lanre Ademoye", bonusAmount: "$200", bonusNaira: "₦300,000", disburseStatus: "Disbursed", bonusType: "Fixed bonus", approvalStatus: "Approved", dateAdded: "2026-06-26" },
];

interface AllBonusTableProps {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  setModalMode?: (mode: "add" | "edit" | null) => void;
}

const AllBonusTable = ({
  currentPage = 1,
  totalPages = 2,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  setModalMode,
}: AllBonusTableProps) => {
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawerData, setDrawerData] = useState<BonusDrawerData | null>(null);

  const { filteredData: searchFiltered, setSearchQuery, searchQuery } =
    useFilter(MOCK_DATA, ["name", "bonusType"]);

  const isAllSelected =
    searchFiltered.length > 0 &&
    searchFiltered.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : searchFiltered.map((r) => r.id));

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
        <div className="relative w-[273px]">
          <input
            type="text"
            placeholder="Search bonus"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
        </div>

        <button
          type="button"
          className="flex items-center gap-x-2 px-4 py-2 rounded-lg border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
        >
          <Upload size={14} strokeWidth={2} />
          Export
        </button>
      </div>

      {searchFiltered.length === 0 ? (
        <BonusEmptyState setModalMode={setModalMode ?? (() => {})} />
      ) : (
        <div className="overflow-x-auto rounded-lg relative" style={{ overflowY: "visible" }}>
          <table className="w-full min-w-[1000px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[40px]">
                  <input
                    type="checkbox"
                    ref={selectAllCheckboxRef}
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 cursor-pointer"
                    aria-label="Select all"
                  />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[220px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Employee
                    <RiExpandUpDownFill fill="#2F2F33" size={12} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[180px]">
                  Bonus type
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Amount
                    <TiArrowUnsorted fill="#71717A" size={16} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[180px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Converted (Naira)
                    <TiArrowUnsorted fill="#71717A" size={16} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                  Disburse status
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                  Status
                </th>
                <th className="px-6 py-[14px] w-[60px]" />
              </tr>
            </thead>
            <tbody>
              {searchFiltered.map((record) => {
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
                        className="rounded border-gray-300 cursor-pointer"
                        checked={isSelected}
                        onChange={() => toggleSelect(record.id)}
                        aria-label={`Select ${record.name}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium uppercase flex-shrink-0">
                          {record.name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm font-medium capitalize">
                          {record.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{record.bonusType || "—"}</td>
                    <td className="px-6 py-4 text-sm">{record.bonusAmount}</td>
                    <td className="px-6 py-4 text-sm">{record.bonusNaira}</td>
                    <td className="px-6 py-4">
                      <Badge config={stageBadge(record.approvalStatus)} />
                    </td>
                    <td className="px-6 py-4">
                      <Badge config={disburseBadge(record.disburseStatus)} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <TableActionMenu
                        items={[
                          {
                            label: "View Details",
                            onClick: () =>
                              setDrawerData({
                                employeeName: record.name,
                                employeeRole: "—",
                                bonusType: record.bonusType,
                                totalHours: "—",
                                amount: record.bonusNaira,
                                projects: [],
                                timeline: [],
                              }),
                          },
                          {
                            label: "Send pay slip",
                            onClick: () => {},
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 w-full border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show:</span>
              <div className="relative inline-flex items-center">
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                  className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                >
                  <option value={10}>10</option>
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
                <span className="text-slate-900 font-semibold">{currentPage}</span>
                {" "}of{" "}
                <span className="text-slate-900 font-semibold">{totalPages}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => onPageChange?.(currentPage - 1)}
                  aria-label="Previous page"
                  className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <FaChevronLeft color="#2F2F33" />
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => onPageChange?.(currentPage + 1)}
                  aria-label="Next page"
                  className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <FaChevronRight color="#2F2F33" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {drawerData && (
        <BonusSideDrawer
          data={drawerData}
          onClose={() => setDrawerData(null)}
          onCancel={() => setDrawerData(null)}
          onSubmit={() => setDrawerData(null)}
        />
      )}
    </div>
  );
};

export default AllBonusTable;
