"use client";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useRef, useState } from "react";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { Search, Plus, RefreshCw, X, Check } from "lucide-react";
import SelectionActionBar from "@/app/common/selectionActionBar";
import BonusModal, { type BonusFormData } from "@/app/components/bonuses/bonusModal";
import { useFilter } from "@/app/hooks/useFilter";
import CustomDropdown from "@/app/common/customDropdown";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
// import { Badge, stageBadge, disburseBadge } from "./bonusBadge";
import BonusEmptyState from "@/app/components/Bonus/bonusEmptyState";
import DisburseConfirmationModal from "@/app/components/bonuses/disburseConfirmationModal";
import RequestChangesModal from "@/app/components/bonuses/requestChangesModal";
import ApproveBonusModal from "@/app/components/bonuses/approveBonusModal";
import RejectBonusModal from "@/app/components/bonuses/rejectBonusModal";
import { Badge, disburseBadge } from "@/app/components/bonuses/bonusBadge";
import DashboardLayout from "@/app/common/DashBoardLayout";

const BONUS_TYPE_OPTIONS = [
  { label: "All bonus", value: "all" },
  { label: "Fixed bonus", value: "Fixed bonus" },
  { label: "Client-facing bonus", value: "Client facing bonus" },
  { label: "Quarterly bonus", value: "Quarterly bonus" },
  { label: "Discretionary bonus", value: "Discretionary bonus" },
];

const PendingApproval = ({
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

  const toggleSelectEmployee = (id: number) =>
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [drawerData, setDrawerData] = useState<BonusDrawerData | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editInitialData, setEditInitialData] = useState<Partial<BonusFormData>>({});
  const [requestChangesOpen, setRequestChangesOpen] = useState(false);
  const [requestChangesSubmitting, setRequestChangesSubmitting] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [approving, setApproving] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [disburseOpen, setDisburseOpen] = useState(false);
  const [disbursing, setDisbursing] = useState(false);

  const bonusData: {
    id: 1;
    name: string;
    bonusAmount: string;
    bonusNaira: string;
    disburseStatus: string;
    bonusType: string;
    approvalStatus: string;
    dateAdded: string;
    reason: string;
    datePaid: string;
    deno: string;
  }[] = [
    {
      id: 1,
      name: "John Doe",
      bonusAmount: "$500",
      bonusNaira: "₦200,000",
      disburseStatus: "Disbursed",
      bonusType: "Client facing bonus",
      approvalStatus: "Approved",
      dateAdded: "2023-08-01",
      reason: "Exceeded sales targets",
      datePaid: "2023-08-15",
      deno: "Dollars",
    },
    {
      id: 1,
      name: "John Doe",
      bonusAmount: "$500",
      bonusNaira: "₦200,000",
      disburseStatus: "Disbursed",
      bonusType: "Client facing bonus",
      approvalStatus: "Approved",
      dateAdded: "2023-08-01",
      reason: "Exceeded sales targets",
      datePaid: "2023-08-15",
      deno: "Dollars",
    },
    {
      id: 1,
      name: "John Doe",
      bonusAmount: "$500",
      bonusNaira: "₦200,000",
      disburseStatus: "Disbursed",
      bonusType: "Client facing bonus",
      approvalStatus: "Approved",
      dateAdded: "2023-08-01",
      reason: "Exceeded sales targets",
      datePaid: "2023-08-15",
      deno: "Dollars",
    },
  ];

  const {
    filteredData: searchFiltered,
    setSearchQuery,
    searchQuery,
  } = useFilter(bonusData || [], ["name"]);

  const filteredData =
    selectedBonusTypes.length === 0 || selectedBonusTypes.includes("all")
      ? searchFiltered
      : searchFiltered.filter((item) =>
          selectedBonusTypes.includes(item.bonusType),
        );

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((emp) => selectedEmployeeIds.includes(emp.id));

  const toggleSelectAll = () =>
    setSelectedEmployeeIds(isAllSelected ? [] : filteredData.map((emp) => emp.id));
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex items-center justify-between z-0 mb-8">
          <Heading
            user="Pending Approval"
            subHead="Review and approve submitted bonus records before they proceed to payroll."
            flexDirection="column"
          />

          <div className="flex items-center gap-x-2">
            <TableActionMenu
              trigger="More Actions"
              items={[
                {
                  label: "Add bonus",
                  icon: <Plus size={14} strokeWidth={2.5} />,
                  onClick: () => {
                    setEditInitialData({});
                    setModalMode("add");
                  },
                },
                {
                  label: "Request change",
                  icon: <RefreshCw size={14} strokeWidth={2} />,
                  onClick: () => setRequestChangesOpen(true),
                },
                {
                  label: "Reject bonus",
                  icon: <X size={14} strokeWidth={2.5} />,
                  onClick: () => setRejectOpen(true),
                  variant: "danger",
                },
              ]}
            />

            <Button
              className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
              variant="primary"
              onButtonClick={() => setApproveOpen(true)}
            >
              Approve Bonus
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E3E3E5]">
          <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
            {selectedEmployeeIds.length > 0 ? (
              <SelectionActionBar
                selectedCount={selectedEmployeeIds.length}
                onClear={() => setSelectedEmployeeIds([])}
                actions={[
                  {
                    label: "Approve bonus",
                    icon: <Check size={14} strokeWidth={2.5} />,
                    onClick: () => setApproveOpen(true),
                  },
                  {
                    label: "Request for change",
                    icon: <RefreshCw size={14} strokeWidth={2} />,
                    onClick: () => setRequestChangesOpen(true),
                  },
                  {
                    label: "Reject bonus",
                    icon: <X size={14} strokeWidth={2.5} />,
                    onClick: () => setRejectOpen(true),
                    variant: "danger",
                  },
                ]}
              />
            ) : (
              <>
                <div className="flex gap-x-2 justify-between">
                  <div className="relative w-[273px]">
                    <input
                      type="text"
                      placeholder="Search bonus"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
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
              </>
            )}
          </div>
          {filteredData.length === 0 ? (
            <BonusEmptyState setModalMode={setModalMode} />
          ) : (
            <div
              className="overflow-x-auto rounded-lg z-0 relative"
              style={{ overflowY: "visible" }}
            >
              <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        ref={selectAllCheckboxRef}
                        className="rounded border-gray-300 cursor-pointer"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        aria-label="Select all employees"
                      />
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px] ">
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
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Amount
                        <span>
                          <TiArrowUnsorted fill="#71717A" size={16} />
                        </span>
                      </p>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Converted (Naira)
                        <span>
                          <TiArrowUnsorted fill="#71717A" size={16} />
                        </span>
                      </p>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                      Submitted On
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
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
                              aria-label={`Select ${emp?.name || "employee"}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full uppercase bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                {emp?.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className=" capitalize text-sm font-medium">
                                {emp?.name?.split(" ").slice(0, 2).join(" ")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {emp?.bonusType || "—"}
                          </td>

                          <td className="px-6 py-4 text-sm">$200</td>

                          <td className="px-6 py-4 text-sm ">₦300,000</td>

                          <td className="px-6 py-4">Jun 26th, 2026</td>
                          <td className="px-6 py-4">
                            <Badge config={disburseBadge(emp.disburseStatus)} />
                          </td>

                          <td className="px-6 py-4 text-sm text-[#2F2F33]">
                            <TableActionMenu
                              items={[
                                {
                                  label: "View Details",
                                  onClick: () =>
                                    setDrawerData({
                                      employeeName: emp.name,
                                      employeeRole: "—",
                                      bonusType: emp.bonusType,
                                      totalHours: "—",
                                      amount: emp.bonusNaira,
                                      projects: [],
                                      timeline: [],
                                    }),
                                },
                                {
                                  label: "Approve bonus",
                                  onClick: () => setApproveOpen(true),
                                },
                                {
                                  label: "Request for change",
                                  onClick: () => setRequestChangesOpen(true),
                                },
                                {
                                  label: "Reject bonus",
                                  onClick: () => setRejectOpen(true),
                                  variant: "danger",
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
                      onChange={(e) =>
                        onPageSizeChange?.(Number(e.target.value))
                      }
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
        <RejectBonusModal
          isOpen={rejectOpen}
          onClose={() => setRejectOpen(false)}
          isSubmitting={rejecting}
          onConfirm={async (reason) => {
            setRejecting(true);
            try {
              // TODO: call reject API with reason
              console.log("Reject reason:", reason);
            } finally {
              setRejecting(false);
              setRejectOpen(false);
            }
          }}
        />

        <ApproveBonusModal
          isOpen={approveOpen}
          onClose={() => setApproveOpen(false)}
          isSubmitting={approving}
          recordCount={filteredData.length}
          totalValue="₦0"
          onConfirm={async () => {
            setApproving(true);
            try {
              // TODO: call approve API
            } finally {
              setApproving(false);
              setApproveOpen(false);
            }
          }}
        />

        <RequestChangesModal
          isOpen={requestChangesOpen}
          onClose={() => setRequestChangesOpen(false)}
          isSubmitting={requestChangesSubmitting}
          recordCount={selectedEmployeeIds.length || filteredData.length}
          onConfirm={async (reason) => {
            setRequestChangesSubmitting(true);
            try {
              // TODO: call request-changes API with reason
              console.log("Request changes reason:", reason);
            } finally {
              setRequestChangesSubmitting(false);
              setRequestChangesOpen(false);
            }
          }}
        />

        {modalMode && (
          <BonusModal
            mode={modalMode}
            initialData={editInitialData}
            onClose={() => setModalMode(null)}
            onSubmit={() => setModalMode(null)}
          />
        )}

        <DisburseConfirmationModal
          isOpen={disburseOpen}
          onClose={() => setDisburseOpen(false)}
          isSubmitting={disbursing}
          recordCount={filteredData.length}
          totalValue="₦0"
          bonusTypeSummary={[]}
          onConfirm={async () => {
            setDisbursing(true);
            try {
              // TODO: call disburse API with _file
            } finally {
              setDisbursing(false);
              setDisburseOpen(false);
            }
          }}
        />

        {drawerData && (
          <BonusSideDrawer
            data={drawerData}
            onClose={() => setDrawerData(null)}
            onCancel={() => setDrawerData(null)}
            onSubmit={() => setDrawerData(null)}
          />
        )}
      </main>
    </DashboardLayout>
  );
};

export default PendingApproval;
