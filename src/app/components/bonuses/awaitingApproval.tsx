"use client";
import { RiExpandUpDownFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import { TiArrowUnsorted } from "react-icons/ti";
import { Search, Send } from "lucide-react";
import TablePagination from "@/app/common/tablePagination";
import CustomDropdown from "@/app/common/customDropdown";
import SelectionActionBar from "@/app/common/selectionActionBar";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import TableActionMenu from "@/app/common/tableActionMenu";
import BonusSideDrawer, {
  type BonusDrawerData,
} from "@/app/common/sideDrawer/bonusSideDrawer";
import BonusModal, { type BonusFormData } from "./bonusModal";
import BonusEmptyState from "../Bonus/bonusEmptyState";
import SendApprovalModal from "@/app/common/sendApprovalModal";
import ReturnedBonusBanner from "@/app/common/returnedBonusBanner";
import DeleteBonusModal from "./deleteBonusModal";
import { Badge, stageBadge } from "@/app/components/bonuses/bonusBadge";
import LoadingState from "@/app/common/loadingState";
import ErrorFetch from "@/app/common/errorFetch";
import { useAllBonusRetrieveList } from "@/app/hooks/useQueries/bonuses/useAllBonusRetrieve";
import { useDeleteBonus } from "@/app/hooks/useQueries/bonuses/useDeleteBonus";

const isRejected = (state?: string) => {
  const s = state?.toLowerCase();
  return s === "rejected" || s === "declined";
};

const isDraft = (state?: string) => state?.toLowerCase() === "draft";
const isReturned = (state?: string) =>
  state?.toLowerCase() === "change requested";

const BONUS_TYPE_OPTIONS = [
  { label: "All bonus", value: "all" },
  { label: "Fixed bonus", value: "fixed" },
  { label: "Client-facing bonus", value: "client" },
  { label: "Quarterly bonus", value: "quarterly" },
  { label: "Discretionary bonus", value: "non-client" },
];

const AwaitingApproval = ({}) => {
  const queryClient = useQueryClient();
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number | undefined>(undefined);

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
  const [sendApprovalOpen, setSendApprovalOpen] = useState(false);
  const [showReturnedBanner, setShowReturnedBanner] = useState(true);
  const [editInitialData, setEditInitialData] = useState<
    Partial<BonusFormData>
  >({});
  const [editBonusId, setEditBonusId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { mutate: deleteBonus, isPending: isDeleting } = useDeleteBonus(() => {
    if (deleteTarget) {
      setSelectedEmployeeIds((prev) =>
        prev.filter((id) => id !== deleteTarget.id),
      );
    }
    setDeleteTarget(null);
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
    data: inReviewBonusData,
    isLoading,
    isError,
    error,
    refetch,
  } = useAllBonusRetrieveList(
    bonusTypeParam,
    startDate,
    endDate,
    page,
    pageSize,
  );

  // Apply search on top of the API-filtered data
  const rawBonusData = inReviewBonusData?.data || [];

  const returnedCount = rawBonusData.filter(
    (emp) => emp.approved_state?.toLowerCase() === "change requested",
  ).length;
  const filteredData = searchQuery
    ? rawBonusData.filter(
        (emp) =>
          emp.employee?.fullname
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          emp.bonus_type?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : rawBonusData;

  const selectableData = filteredData.filter(
    (emp) => !isRejected(emp.approved_state),
  );

  const isAllSelected =
    selectableData.length > 0 &&
    selectableData.every((emp) => selectedEmployeeIds.includes(emp.id));

  const toggleSelectAll = () =>
    setSelectedEmployeeIds(
      isAllSelected ? [] : selectableData.map((emp) => emp.id),
    );

  return (
    <div>
      {/* {rawBonusData.length === 0 ? (
        <div>
          <Heading user="Awaiting Approval" subHead="" flexDirection="column" />
          <BonusEmptyState setModalMode={setModalMode} />
        </div>
      ) : ( */}
      <div>
        {showReturnedBanner && returnedCount > 0 && (
          <ReturnedBonusBanner
            count={returnedCount}
            onClose={() => setShowReturnedBanner(false)}
          />
        )}

        <div className="flex items-center justify-between z-0 mb-8">
          <Heading
            user="Awaiting Approval"
            subHead="Track bonus progress from review through approval and final disbursement."
            flexDirection="column"
          />

          <div className="flex items-center gap-x-2">
            <Button
              variant="secondary"
              onButtonClick={() => setModalMode("add")}
            >
              Add Bonus
            </Button>

            <Button
              className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
              variant="primary"
              onButtonClick={() => {
                if (selectedEmployeeIds.length === 0) {
                  setSelectedEmployeeIds(
                    filteredData
                      .filter((emp) =>
                        returnedCount > 0
                          ? isReturned(emp.approved_state)
                          : isDraft(emp.approved_state),
                      )
                      .map((emp) => emp.id),
                  );
                }
                setSendApprovalOpen(true);
              }}
            >
              {returnedCount > 0
                ? "Resubmit bonus for Approval"
                : "Submit for Approval"}
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
                    label: "Submit for Approval",
                    icon: <Send size={14} strokeWidth={2} />,
                    onClick: () => setSendApprovalOpen(true),
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
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label="Select all employees"
                      />
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px] ">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Employee
                        <span>
                          <RiExpandUpDownFill fill="#D0D5DD" size={16} />
                        </span>
                      </p>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                      Bonus type
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                      Hours
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Amount
                        <span>
                          <TiArrowUnsorted fill="#D0D5DD" size={16} />
                        </span>
                      </p>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Converted (Naira)
                        <span>
                          <TiArrowUnsorted fill="#D0D5DD" size={16} />
                        </span>
                      </p>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                      Stage
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                  </tr>
                </thead>
                {filteredData?.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        <BonusEmptyState setModalMode={setModalMode} />
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
                              className="rounded border-gray-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                              checked={isSelected}
                              onChange={() => toggleSelectEmployee(emp?.id)}
                              disabled={isRejected(emp?.approved_state)}
                              title={
                                isRejected(emp?.approved_state)
                                  ? "Rejected bonuses can't be resubmitted"
                                  : undefined
                              }
                              aria-label={`Select ${emp?.employee?.fullname || "employee"}`}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full uppercase bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                {emp?.employee?.fullname
                                  .split(" ")
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
                            {emp?.total_hours || "—"} h
                          </td>

                          <td className="px-6 py-4 text-sm">
                            {emp?.pay_deno === "naira" ? "₦ " : "$ "}
                            {emp?.amount || "—"}
                          </td>

                          <td className="px-6 py-4 text-sm">
                            ₦ {emp?.naira_amount || "—"}
                          </td>

                          <td className="px-6 py-4">
                            <Badge config={stageBadge(emp?.approved_state)} />
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
                                  label: "Edit Bonus",
                                  onClick: () => {
                                    setEditInitialData({
                                      employeeId: String(emp?.employee?.id),
                                      bonusType: emp?.bonus_type,
                                      currency:
                                        emp?.pay_deno?.toLowerCase() === "naira"
                                          ? "NGN"
                                          : "USD",
                                      amount: emp?.naira_amount,
                                      rate: emp?.employee?.rate,
                                      // emp?.naira_amount != null
                                      //   ? String(emp.naira_amount)
                                      //   : emp?.naira_amount != null
                                      //     ? String(emp.naira_amount)
                                      //     : undefined,
                                      notes: emp?.reason,
                                    });
                                    setEditBonusId(emp.id);
                                    setModalMode("edit");
                                  },
                                },
                                {
                                  label: "Submit for Approval",
                                  disabled: isRejected(emp?.approved_state),
                                  onClick: () => {
                                    setSelectedEmployeeIds([emp.id]);
                                    setSendApprovalOpen(true);
                                  },
                                },
                                {
                                  label: "Delete Bonus",
                                  variant: "danger",
                                  onClick: () =>
                                    setDeleteTarget({
                                      id: emp.id,
                                      name:
                                        emp.employee?.fullname ||
                                        "this employee",
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
              <TablePagination
                currentPage={inReviewBonusData?.pagination?.page ?? 1}
                totalPages={inReviewBonusData?.pagination?.total_pages ?? 1}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {/* )} */}

      <SendApprovalModal
        isOpen={sendApprovalOpen}
        onClose={() => setSendApprovalOpen(false)}
        title="Send for Approval"
        Subtitle="Select one or more approvers to review the selected bonus records."
        endpoint="/employees/bonuses/send-review"
        recordCount={selectedEmployeeIds.length}
        recordLabel="bonus record"
        bonus_ids={selectedEmployeeIds.map(String)}
        onSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: ["all-bonus-retrieve-list"],
          });
          queryClient.invalidateQueries({ queryKey: ["in-review-bonus-list"] });
          setSelectedEmployeeIds([]);
        }}
      />

      {modalMode && (
        <BonusModal
          mode={modalMode}
          bonusId={
            modalMode === "edit" ? (editBonusId ?? undefined) : undefined
          }
          initialData={modalMode === "edit" ? editInitialData : undefined}

          onClose={() => setModalMode(null)}
          onSaveDraft={() => setModalMode(null)}
          onSubmit={(_data, createAnother) => {
            if (!createAnother) setModalMode(null);
          }}
        />
      )}

      {drawerData && (
        <BonusSideDrawer
          data={drawerData}
          onClose={() => setDrawerData(null)}
          onCancel={() => setDrawerData(null)}
          onSubmit={() => {
            setSelectedEmployeeIds([drawerData.bonusId]);
            setDrawerData(null);
            setSendApprovalOpen(true);
          }}
        />
      )}

      <DeleteBonusModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        isSubmitting={isDeleting}
        employeeName={deleteTarget?.name ?? ""}
        onConfirm={() => {
          if (deleteTarget) deleteBonus(deleteTarget.id);
        }}
      />
    </div>
  );
};

export default AwaitingApproval;
