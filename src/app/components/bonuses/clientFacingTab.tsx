"use client";
import Heading from "@/app/common/heading";
import ClientBonusTable from "@/app/components/bonuses/clientBonusTable";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import ErrorFetch from "@/app/common/errorFetch";
import { formatNaira } from "@/app/utils/formatCurrency";
import type { BonusTabProps } from "@/app/admin/bonuses/page";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const ClientBonusTab = ({
  data,
  isLoading,
  isError,
  refetch,
  filters,
}: BonusTabProps) => {
  const comparison = data?.metrics?.comparison;
  const bonusValueByType = data?.metrics?.bonus_value_by_type || {};

  return (
    <>
      <div className="mb-8">
        <Heading
          user="Client-facing bonus"
          subHead="View approved client-related bonus payments calculated from eligible billable hours."
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
        showMoreFilters
        moreFiltersValue={filters.moreFilters}
        onMoreFiltersApply={filters.onMoreFiltersApply}
      />

      {isLoading ? (
        <BonusGridSkeleton statCardCount={4} />
      ) : isError ? (
        <ErrorFetch
          message="Failed to load bonus data. Please try again."
          onRefetch={refetch}
          smallWindow
        />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <BonusStatCard
            title="Total Client Bonus"
            value={formatNaira(bonusValueByType["Client bonus"] || "0")}
            showInfo
            footer={{
              type: "badge",
              badge: comparison?.total_bonus_paid_change_percent ?? 0,
              label: comparison?.compared_to || "",
            }}
          />
          <BonusStatCard
            title="Total Client Hours"
            value="2,105 hrs"
            footer={{ type: "badge", badge: "+20%", label: "Vs last month" }}
          />
          <BonusStatCard
            title="Client Bonus Rate"
            value="$4/hr"
            footer={{
              type: "breakdown",
              items: [
                {
                  count: data?.metrics?.pending_actions?.awaiting_approval ?? 5,
                  label: "awaiting approval",
                },
                {
                  count: data?.metrics?.pending_actions?.awaiting_payment ?? 3,
                  label: "awaiting payment",
                },
              ],
            }}
          />
          <BonusStatCard
            title="Number of Employee"
            value={data?.metrics?.employee_count || "0"}
            footer={{
              type: "badge",
              badge: comparison?.employee_count_change_percent ?? 0,
              label: comparison?.compared_to || "",
            }}
          />
        </div>
      )}

      <ClientBonusTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default ClientBonusTab;
