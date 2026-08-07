import { formatNaira, parseAmount } from "@/app/utils/formatCurrency";
import Heading from "@/app/common/heading";
import BonusDonutChart from "@/app/components/charts/bonusDonutChart";
import AllBonusTable from "@/app/components/bonuses/allBonusTable";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import ErrorFetch from "@/app/common/errorFetch";
import type { BonusTabProps } from "@/app/admin/bonuses/page";
import RecentBonusActivities from "./recentBonusActivities";

const STATUS_OPTIONS = [
  {
    label: "Approval status",
    value: "approval_status",
    subOptions: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Rejected", value: "rejected" },
    ],
  },
  {
    label: "Disbursed status",
    value: "disbursed_status",
    subOptions: [
      { label: "Disbursed", value: "disbursed" },
      { label: "Not Disbursed", value: "not_disbursed" },
    ],
  },
];

const AllBonusTab = ({
  data,
  isLoading,
  isError,
  refetch,
  filters,
}: BonusTabProps) => {
  const bonusValueByType = data?.metrics?.bonus_value_by_type || {};
  const compareBonusTypeData = data?.metrics?.comparison;

  const bonusTypeData = [
    {
      label: "Fixed bonus",
      value: parseAmount(bonusValueByType["Fixed bonus"]),
      color: "#F5B971",
    },
    {
      label: "Client bonus",
      value: parseAmount(bonusValueByType["Client bonus"]),
      color: "#78D6E0",
    },
    {
      label: "Quarterly",
      value: parseAmount(bonusValueByType["Quarterly bonus"]),
      color: "#009BC0",
    },
    {
      label: "Discretionary",
      value: parseAmount(bonusValueByType["Discretionary bonus"]),
      color: "#2E6171",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <Heading
          user="All bonus"
          subHead="Review, manage and track bonuses across all bonus types."
          flexDirection="column"
          withGap={false}
        />
      </div>

      <BonusFilterBar
        dateRange={filters.dateRange}
        onDateRangeChange={filters.onDateRangeChange}
        statusOptions={STATUS_OPTIONS}
        selectedStatuses={filters.selectedStatuses}
        onStatusChange={filters.onStatusChange}
        showBonusTypeFilter
        selectedBonusTypes={filters.selectedBonusTypes}
        onBonusTypesChange={filters.onBonusTypesChange}
        showMoreFilters
        moreFiltersValue={filters.moreFilters}
        onMoreFiltersApply={filters.onMoreFiltersApply}
      />

      {isLoading ? (
        <BonusGridSkeleton statCardCount={4} showChart showRecentActivities />
      ) : isError ? (
        <ErrorFetch
          message="Failed to load bonus data. Please try again."
          onRefetch={refetch}
          smallWindow
        />
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4">
            <BonusStatCard
              title="Total Bonus Paid"
              value={data?.metrics?.total_bonus_paid ?? "₦0"}
              showInfo
              footer={{
                type: "badge",
                badge:
                  data?.metrics?.comparison?.total_bonus_paid_change_percent ??
                  0,
                label: compareBonusTypeData?.compared_to || "",
              }}
            />
            <BonusStatCard
              title="Number of Employees"
              value={data?.metrics?.employee_count || "0"}
              footer={{
                type: "badge",
                badge:
                  (data?.metrics?.comparison?.employee_count_change_percent ??
                    0) ||
                  "",
                label: compareBonusTypeData?.compared_to || "",
              }}
            />
            <BonusStatCard
              title="Pending Actions"
              value={
                String(
                  Number(data?.metrics?.pending_actions?.awaiting_approval) +
                    Number(data?.metrics?.pending_actions?.awaiting_payment),
                ) || "0"
              }
              footer={{
                type: "breakdown",
                items: [
                  {
                    count:
                      data?.metrics?.pending_actions?.awaiting_approval ?? 0,
                    label: "awaiting approval",
                  },
                  {
                    count:
                      data?.metrics?.pending_actions?.awaiting_payment ?? 0,
                    label: "awaiting payment",
                  },
                ],
              }}
            />
            <BonusStatCard
              title="Average Bonus"
              value={data?.metrics?.average_bonus ?? "₦0"}
              footer={{
                type: "badge",
                badge:
                  data?.metrics?.comparison?.average_bonus_change_percent ?? "",
                label: compareBonusTypeData?.compared_to || "",
              }}
            />
          </div>

          {/* Chart + Recent activities row */}
          <div className="grid grid-cols-[3fr_2fr] gap-4 mt-4">
            <div className="bg-white rounded-xl border border-[#E3E3E5] flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E3E3E5]">
                <span className="text-sm font-semibold text-[#2F2F33]">
                  Bonus value by type
                </span>
              </div>
              <BonusDonutChart
                data={bonusTypeData}
                formatValue={(v) => formatNaira(v)}
              />
            </div>

            <RecentBonusActivities
              activities={data?.recent_activities ?? []}
              onViewAll={() => {}}
            />
          </div>
        </>
      )}

      <AllBonusTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default AllBonusTab;
