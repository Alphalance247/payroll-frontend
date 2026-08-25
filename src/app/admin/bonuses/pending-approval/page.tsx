"use client";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import { format } from "date-fns";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import { TiArrowUnsorted } from "react-icons/ti";
import { Search, Plus, RefreshCw, X, Check } from "lucide-react";
import TablePagination from "@/app/common/tablePagination";
import SelectionActionBar from "@/app/common/selectionActionBar";
import BonusModal, {
  type BonusFormData,
} from "@/app/components/bonuses/bonusModal";
import CustomDropdown from "@/app/common/customDropdown";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
import BonusEmptyState from "@/app/components/Bonus/bonusEmptyState";
import DisburseConfirmationModal from "@/app/components/bonuses/disburseConfirmationModal";
import RequestChangesModal from "@/app/components/bonuses/requestChangesModal";
import ApproveBonusModal from "@/app/components/bonuses/approveBonusModal";
import RejectBonusModal from "@/app/components/bonuses/rejectBonusModal";
import { Badge, stageBadge } from "@/app/components/bonuses/bonusBadge";
import DashboardLayout from "@/app/common/DashBoardLayout";
import LoadingState from "@/app/common/loadingState";
import ErrorFetch from "@/app/common/errorFetch";
import { useInReviewBonusList } from "@/app/hooks/useQueries/bonuses/useInReviewBonusList";
import { sumNairaAmount } from "@/app/utils/formatCurrency";
import {
  useReviewBonus,
  useReviewMultipleBonuses,
  type ReviewAction,
} from "@/app/hooks/useQueries/bonuses/useReviewBonus";

const BONUS_TYPE_OPTIONS = [
  { label: "All bonus", value: "all" },
  { label: "Fixed bonus", value: "fixed" },
  { label: "Client-facing bonus", value: "client" },
  { label: "Quarterly bonus", value: "quarterly" },
  { label: "Discretionary bonus", value: "non-client" },
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
};

const PendingApproval = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== "super_admin") {
      router.replace("/admin/bonuses/active-bonuses");
    }
  }, [user, router]);

  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerData, setDrawerData] = useState<BonusDrawerData | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editInitialData, setEditInitialData] = useState<
    Partial<BonusFormData>
  >({});
  const [requestChangesOpen, setRequestChangesOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const { mutate: reviewSingle, isPending: singlePending } = useReviewBonus();
  const { mutate: reviewMultiple, isPending: multiplePending } =
    useReviewMultipleBonuses();
  const isReviewing = singlePending || multiplePending;

  const handleReview = (
    action: ReviewAction,
    comment: string,
    ids: number[],
    onDone: () => void,
  ) => {
    if (ids.length === 0) return;
    const opts = {
      onSuccess: () => {
        onDone();
        setSelectedEmployeeIds([]);
      },
    };
    if (ids.length === 1) {
      reviewSingle({ bonusId: ids[0], action, comment }, opts);
    } else {
      reviewMultiple({ action, comment, bonus_ids: ids.map(String) }, opts);
    }
  };
  const [disburseOpen, setDisburseOpen] = useState(false);
  const [disbursing, setDisbursing] = useState(false);

  // Pass bonus_type to the API — backend handles that filter
  const bonusTypeParam =
    selectedBonusTypes.length > 0 && !selectedBonusTypes.includes("all")
      ? selectedBonusTypes[0]
      : undefined;

  const startDate = dateRange.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

  const {
    data: inReviewBonusData,
    isLoading,
    isError,
    error,
    refetch,
  } = useInReviewBonusList(
    undefined,
    undefined,
    bonusTypeParam,
    startDate,
    endDate,
    currentPage,
    pageSize,
  );

  const rawBonusData = inReviewBonusData?.data || [];

  // Only search stays on the frontend
  const filteredData = searchQuery
    ? rawBonusData.filter(
        (emp) =>
          emp.employee?.fullname
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          emp.bonus_type?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : rawBonusData;

  const toggleSelectEmployee = (id: number) =>
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((emp) => selectedEmployeeIds.includes(emp.id));

  const toggleSelectAll = () =>
    setSelectedEmployeeIds(
      isAllSelected ? [] : filteredData.map((emp) => emp.id),
    );

  // Bulk actions target the checked rows, or all filtered rows when none are checked
  const targetRecords =
    selectedEmployeeIds.length > 0
      ? filteredData.filter((emp) => selectedEmployeeIds.includes(emp.id))
      : filteredData;

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex items-center justify-between z-0 mb-8">
          <Heading
            user="Pending Approval"
            subHead="Review and approve submitted bonus records before they proceed to payroll."
            flexDirection="column"
            withGap={false}
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
                  onClick: () => {
                    // bulk — target every record currently in the list
                    setSelectedEmployeeIds(rawBonusData.map((emp) => emp.id));
                    setRequestChangesOpen(true);
                  },
                },
                {
                  label: "Reject bonus",
                  icon: <X size={14} strokeWidth={2.5} />,
                  onClick: () => {
                    // bulk — target every record currently in the list
                    setSelectedEmployeeIds(rawBonusData.map((emp) => emp.id));
                    setRejectOpen(true);
                  },
                  variant: "danger",
                },
              ]}
            />

            <Button
              className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
              variant="primary"
              onButtonClick={() => {
                if (selectedEmployeeIds.length === 0) {
                  setSelectedEmployeeIds(filteredData.map((emp) => emp.id));
                }
                setApproveOpen(true);
              }}
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

          {isLoading ? (
            <LoadingState message="Loading bonus data..." />
          ) : isError ? (
            <ErrorFetch
              message={
                error?.message || "Error fetching bonuses, please try again."
              }
              onRefetch={() => refetch()}
            />
          ) : rawBonusData.length === 0 && bonusTypeParam ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 gap-3 text-center">
              <p className="text-sm font-semibold text-[#2F2F33]">
                No{" "}
                {BONUS_TYPE_OPTIONS.find((o) => o.value === bonusTypeParam)
                  ?.label ?? "bonus"}{" "}
                records pending approval
              </p>
              <p className="text-sm text-[#71717A] max-w-[320px]">
                There are no pending bonuses matching the selected filter. Try a
                different type or clear the filter to see all records.
              </p>
              <button
                type="button"
                onClick={() => setSelectedBonusTypes([])}
                className="mt-1 text-sm font-medium text-[#E37915] hover:underline"
              >
                Clear filter
              </button>
            </div>
          ) : rawBonusData.length === 0 ? (
            <BonusEmptyState setModalMode={setModalMode} />
          ) : (
            <div
              className="overflow-x-auto rounded-lg z-0 relative"
              style={{ overflowY: "visible" }}
            >
              <table className="w-full min-w-[1400px] border-b border-[#E3E3E5]">
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
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
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
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Converted (Naira)
                        <span>
                          <TiArrowUnsorted fill="#71717A" size={16} />
                        </span>
                      </p>
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                      Submitted On
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                      Payment
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-12 text-sm text-[#71717A]"
                      >
                        No results found for &ldquo;{searchQuery}&rdquo;
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((emp) => {
                      const isSelected = selectedEmployeeIds.includes(emp.id);
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
                              onChange={() => toggleSelectEmployee(emp.id)}
                              aria-label={`Select ${emp.employee?.fullname || "employee"}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full uppercase bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                {emp.employee?.fullname
                                  ?.split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="capitalize text-sm font-medium">
                                {emp.employee?.fullname
                                  ?.split(" ")
                                  .slice(0, 2)
                                  .join(" ")}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {emp.bonus_type || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {emp?.pay_deno === "naira" ? "₦ " : "$ "}
                            {emp?.amount || "—"}
                          </td>

                          <td className="px-6 py-4 text-sm">
                            ₦{emp?.naira_amount?.toLocaleString() || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {formatDate(emp.created)}
                          </td>
                          <td className="px-6 py-4">
                            <Badge config={stageBadge(emp.approval_status)} />
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
                                {
                                  label: "Approve bonus",
                                  onClick: () => {
                                    setSelectedEmployeeIds([emp.id]);
                                    setApproveOpen(true);
                                  },
                                },
                                {
                                  label: "Request for change",
                                  onClick: () => {
                                    setSelectedEmployeeIds([emp.id]);
                                    setRequestChangesOpen(true);
                                  },
                                },
                                {
                                  label: "Reject bonus",
                                  onClick: () => {
                                    setSelectedEmployeeIds([emp.id]);
                                    setRejectOpen(true);
                                  },
                                  variant: "danger",
                                },
                              ]}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>

              <TablePagination
                currentPage={inReviewBonusData?.pagination?.page ?? 1}
                totalPages={inReviewBonusData?.pagination?.total_pages ?? 1}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>

        <RejectBonusModal
          isOpen={rejectOpen}
          onClose={() => setRejectOpen(false)}
          isSubmitting={isReviewing}
          onConfirm={(reason) =>
            handleReview("rejected", reason, selectedEmployeeIds, () =>
              setRejectOpen(false),
            )
          }
        />

        <ApproveBonusModal
          isOpen={approveOpen}
          onClose={() => setApproveOpen(false)}
          isSubmitting={isReviewing}
          recordCount={selectedEmployeeIds.length || filteredData.length}
          totalValue={sumNairaAmount(targetRecords)}
          onConfirm={() =>
            handleReview("approved", "Bonus", selectedEmployeeIds, () =>
              setApproveOpen(false),
            )
          }
        />

        <RequestChangesModal
          isOpen={requestChangesOpen}
          onClose={() => setRequestChangesOpen(false)}
          isSubmitting={isReviewing}
          recordCount={selectedEmployeeIds.length || filteredData.length}
          onConfirm={(reason) =>
            handleReview("change_requested", reason, selectedEmployeeIds, () =>
              setRequestChangesOpen(false),
            )
          }
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
          recordCount={selectedEmployeeIds.length || filteredData.length}
          totalValue="₦0"
          bonusTypeSummary={[]}
          onConfirm={async () => {
            setDisbursing(true);
            try {
              // TODO: call disburse API
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
