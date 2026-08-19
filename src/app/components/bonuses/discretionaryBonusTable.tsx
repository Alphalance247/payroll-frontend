"use client";
import { useMemo, useRef, useState } from "react";
import { RiExpandUpDownFill } from "react-icons/ri";
import { TiArrowUnsorted } from "react-icons/ti";
import { Search, Upload } from "lucide-react";
import TablePagination from "@/app/common/tablePagination";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
import BonusEmptyState from "@/app/components/Bonus/bonusEmptyState";
import {
  Badge,
  stageBadge,
  disburseBadge,
} from "@/app/components/bonuses/bonusBadge";
import LoadingState from "@/app/common/loadingState";
import type { BonusHistoryData } from "@/app/hooks/useQueries/bonuses/useAllBonusHistory";

interface DiscretionaryBonusTableProps {
  data?: BonusHistoryData | null;
  isLoading?: boolean;
  isError?: boolean;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  setModalMode?: (mode: "add" | "edit" | null) => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  onExport?: () => void;
  isExporting?: boolean;
}

const DiscretionaryBonusTable = ({
  data,
  isLoading = false,
  isError = false,
  currentPage = 1,
  totalPages = 2,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  setModalMode,
  emptyTitle,
  emptySubtitle,
  onExport,
  isExporting = false,
}: DiscretionaryBonusTableProps) => {
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [drawerData, setDrawerData] = useState<BonusDrawerData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rawData = data?.data ?? [];

  const filteredData = useMemo(() => {
    if (!searchQuery) return rawData;
    const q = searchQuery.toLowerCase();
    return rawData.filter((r) => r.employee.fullname.toLowerCase().includes(q));
  }, [rawData, searchQuery]);

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filteredData.map((r) => r.id));

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
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
        </div>

        <button
          type="button"
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-x-2 px-4 py-2 rounded-lg border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload size={14} strokeWidth={2} />
          {isExporting ? "Exporting…" : "Export"}
        </button>
      </div>

      {isLoading ? (
        <LoadingState message="Loading bonuses..." />
      ) : isError ? (
        <p className="text-sm text-center text-[#CF6E13] py-10">
          Failed to load bonuses. Please try again.
        </p>
      ) : filteredData.length === 0 ? (
        <BonusEmptyState
          setModalMode={setModalMode ?? undefined}
          title={emptyTitle}
          subtitle={emptySubtitle}
        />
      ) : (
        <div
          className="overflow-x-auto rounded-lg relative"
          style={{ overflowY: "visible" }}
        >
          <table className="w-full min-w-[1100px] border-b border-[#E3E3E5]">
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
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Employee
                    <RiExpandUpDownFill fill="#2F2F33" size={12} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[180px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Amount
                    <TiArrowUnsorted fill="#71717A" size={16} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  <p className="flex gap-x-1 cursor-pointer items-center">
                    Converted (₦)
                    <TiArrowUnsorted fill="#71717A" size={16} />
                  </p>
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Stage
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Payment
                </th>
                <th className="px-6 py-[14px] w-[60px]" />
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => {
                const isSelected = selectedIds.includes(record.id);
                const name = record.employee.fullname;
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
                        aria-label={`Select ${name}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium uppercase flex-shrink-0">
                          {name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm font-medium capitalize">
                          {name.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {record?.pay_deno === "naira" ? "₦ " : "$ "}
                      {record?.amount || "—"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {record?.converted_amount || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <Badge config={disburseBadge(record.paid)} />
                    </td>

                    <td className="px-6 py-4">
                      <Badge config={stageBadge(record?.approval_status)} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <TableActionMenu
                        items={[
                          {
                            label: "View Details",
                            onClick: () =>
                              setDrawerData({
                                bonusId: record.id,
                                employeeName: name,
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

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={(page) => onPageChange?.(page)}
            onPageSizeChange={(size) => onPageSizeChange?.(size)}
          />
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

export default DiscretionaryBonusTable;
