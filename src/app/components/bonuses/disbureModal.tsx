"use client";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { format } from "date-fns";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { Search } from "lucide-react";
import { useFilter } from "@/app/hooks/useFilter";
import CustomDropdown from "@/app/common/customDropdown";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
import DisburseEmptyState from "./disburseEmptyState";
import DisburseConfirmationModal, {
  type BonusTypeSummary,
} from "./disburseConfirmationModal";
import DisburseSingleModal from "./disburseSingleModal";
import { Badge, stageBadge, disburseBadge } from "./bonusBadge";
import LoadingState from "@/app/common/loadingState";
import ErrorFetch from "@/app/common/errorFetch";
import { useApprovedBonusList } from "@/app/hooks/useQueries/bonuses/useApprovedBonusList";
import { formatNaira, sumNairaAmount } from "@/app/utils/formatCurrency";
import {
  useDisburseBonus,
  useDisburseMultipleBonuses,
} from "@/app/hooks/useQueries/bonuses/useDisburseBonus";

const BONUS_TYPE_OPTIONS = [
  { label: "All bonus", value: "all" },
  { label: "Fixed bonus", value: "fixed" },
  { label: "Client-facing bonus", value: "client" },
  { label: "Quarterly bonus", value: "quarterly" },
  { label: "Discretionary bonus", value: "non-client" },
];

const DisburseModal = ({
  currentPage = 1,
  totalPages = 2,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: {
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}) => {
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [drawerData, setDrawerData] = useState<BonusDrawerData | null>(null);
  const [disburseOpen, setDisburseOpen] = useState(false);
  const [disburseSingleOpen, setDisburseSingleOpen] = useState(false);

  const toggleSelectEmployee = (id: number) =>
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleDisburseClick = () => {
    let idsToDisburse = selectedEmployeeIds;
    if (idsToDisburse.length === 0) {
      idsToDisburse = filteredData
        .filter((emp) => !emp.paid)
        .map((emp) => emp.id);
      setSelectedEmployeeIds(idsToDisburse);
    }
    if (idsToDisburse.length === 1) {
      setDisburseSingleOpen(true);
    } else if (idsToDisburse.length > 0) {
      setDisburseOpen(true);
    }
  };

  const { mutate: disburseSingle, isPending: isDisbursingSingle } =
    useDisburseBonus(() => {
      setDisburseSingleOpen(false);
      setSelectedEmployeeIds([]);
    });

  const { mutate: disburseMultiple, isPending: isDisbursingMultiple } =
    useDisburseMultipleBonuses(() => {
      setDisburseOpen(false);
      setSelectedEmployeeIds([]);
    });

  // Derive a single bonus_type param — "all" or empty means no filter
  const bonusTypeParam =
    selectedBonusTypes.length > 0 && !selectedBonusTypes.includes("all")
      ? selectedBonusTypes[0]
      : undefined;

  const startDate = dateRange.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

  const {
    data: approvedBonusData,
    isLoading,
    isError,
    error,
    refetch,
  } = useApprovedBonusList(
    undefined,
    undefined,
    bonusTypeParam,
    startDate,
    endDate,
  );

  const rawBonusData = approvedBonusData?.data || [];

  const { filteredData, setSearchQuery, searchQuery } = useFilter(
    rawBonusData,
    ["employee.fullname", "bonus_type"],
  );

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((emp) => selectedEmployeeIds.includes(emp.id));

  const toggleSelectAll = () =>
    setSelectedEmployeeIds(
      isAllSelected ? [] : filteredData.map((emp) => emp.id),
    );

  const selectedRecords = filteredData.filter((emp) =>
    selectedEmployeeIds.includes(emp.id),
  );
  const bonusTypeSummary: BonusTypeSummary[] = BONUS_TYPE_OPTIONS.filter(
    (opt) => opt.value !== "all",
  )
    .map((opt) => ({
      label: opt.label,
      count: selectedRecords.filter((emp) => emp.bonus_type === opt.value)
        .length,
    }))
    .filter((s) => s.count > 0);

  const singleTarget = selectedRecords.length === 1 ? selectedRecords[0] : null;

  return (
    <div>
      <div className="flex items-center justify-between z-0 mb-8">
        <Heading
          user="Ready for Disbursement"
          subHead="Track bonus progress from review through approval and final disbursement."
          flexDirection="column"
        />

        <Button
          className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
          variant="primary"
          onButtonClick={handleDisburseClick}
        >
          Disburse Bonus
        </Button>
      </div>

      <div className="bg-white rounded-md border border-[#E3E3E5]">
        <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
          <div className="flex gap-x-2 justify-between">
            <div className="relative w-[273px]">
              <input
                type="text"
                placeholder="Search bonus"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
            />
            <CustomDropdown
              trigger="All bonus"
              title="Select a bonus type"
              options={BONUS_TYPE_OPTIONS}
              selected={selectedBonusTypes}
              onChange={setSelectedBonusTypes}
            />
          </div>
        </div>
        {isLoading ? (
          <LoadingState message="Loading bonus data..." />
        ) : isError ? (
          <ErrorFetch
            message={
              error?.message || "Error fetching bonuses, please try again."
            }
            onRefetch={() => refetch()}
          />
        ) : filteredData.length === 0 ? (
          <DisburseEmptyState />
        ) : (
          <div
            className="overflow-x-auto rounded-lg z-0 relative"
            style={{ overflowY: "visible" }}
          >
            <table className="w-full min-w-[1300px] border-b border-[#E3E3E5]">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-6 py-[14px] w-[40px]">
                    <input
                      type="checkbox"
                      ref={selectAllCheckboxRef}
                      className="rounded border-gray-300 cursor-pointer"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      disabled={filteredData.length === 0}
                      aria-label="Select all employees"
                    />
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px] ">
                    <p className="flex gap-x-1 cursor-pointer items-center">
                      Employee
                      <span>
                        <RiExpandUpDownFill fill="#2F2F33" size={12} />
                      </span>
                    </p>
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                    Bonus type
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                    Hours
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                    <p className="flex gap-x-1 cursor-pointer items-center">
                      Amount
                      <span>
                        <TiArrowUnsorted fill="#71717A" size={16} />
                      </span>
                    </p>
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                    <p className="flex gap-x-1 cursor-pointer items-center">
                      Converted (Naira)
                      <span>
                        <TiArrowUnsorted fill="#71717A" size={16} />
                      </span>
                    </p>
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                    Status
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                    {" "}
                    Payment
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                </tr>
              </thead>
              {filteredData?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      No Details found for the selected month
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredData?.map((emp) => {
                    const isSelected = selectedEmployeeIds.includes(emp?.id);
                    return (
                      <tr
                        key={emp.id}
                        className={`border-b text-[#2F2F33] border-[#E3E3E5] last:border-b-0 ${
                          isSelected ? "bg-[#FFF9F2]" : ""
                        }`}
                      >
                        <td className="px-6 py-[14px] w-[40px]">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 cursor-pointer"
                            checked={isSelected}
                            onChange={() => toggleSelectEmployee(emp?.id)}
                            aria-label={`Select ${emp?.employee?.fullname || "employee"}`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full uppercase bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                              {emp?.employee?.fullname
                                ?.split(" ")
                                .slice(0, 2)
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className=" capitalize text-sm font-medium">
                              {emp?.employee?.fullname
                                ?.split(" ")
                                .slice(0, 2)
                                .join(" ")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {emp?.bonus_type || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {emp?.total_hours ? `${emp.total_hours} h` : "—"}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          {emp?.pay_deno === "naira" ? "₦ " : "$ "}
                          {emp?.amount || "—"}
                        </td>

                        <td className="px-6 py-4 text-sm ">
                          ₦ {emp?.naira_amount?.toLocaleString() || "—"}
                        </td>

                        <td className="px-6 py-4">
                          <Badge config={stageBadge(emp.approved_state)} />
                        </td>
                        <td className="px-6 py-4">
                          <Badge config={disburseBadge(emp.paid)} />
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          <TableActionMenu
                            items={[
                              {
                                label: "View Details",
                                onClick: () =>
                                  setDrawerData({
                                    bonusId: emp.id,
                                    employeeName: emp.employee?.fullname,
                                  }),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 w-full border-t border-slate-200 bg-white">
              {/* Items per page selector */}
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
                  {/* Chevron Down Icon */}

                  <FaCaretDown
                    className="w-4 h-4 text-slate-500 absolute right-2.5 pointer-events-none"
                    color="#000000"
                    size={16}
                  />
                </div>
                <span>per page</span>
              </div>

              {/* Page Info and Navigation Buttons */}
              <div className="flex items-center gap-4">
                {/* Page counter text */}
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

                {/* Navigation buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                    aria-label="Previous Page"
                    className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <FaChevronLeft color="#2F2F33" />
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange?.(currentPage + 1)}
                    aria-label="Next Page"
                    className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <FaChevronRight color="#2F2F33" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <DisburseConfirmationModal
        isOpen={disburseOpen}
        onClose={() => setDisburseOpen(false)}
        isSubmitting={isDisbursingMultiple}
        recordCount={selectedRecords.length}
        totalValue={sumNairaAmount(selectedRecords)}
        bonusTypeSummary={bonusTypeSummary}
        onConfirm={() => disburseMultiple(selectedEmployeeIds.map(String))}
      />

      {singleTarget && (
        <DisburseSingleModal
          isOpen={disburseSingleOpen}
          onClose={() => setDisburseSingleOpen(false)}
          isSubmitting={isDisbursingSingle}
          employeeName={singleTarget.employee?.fullname || "this employee"}
          amount={formatNaira(singleTarget.naira_amount)}
          onConfirm={() => disburseSingle(singleTarget.id)}
        />
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

export default DisburseModal;
