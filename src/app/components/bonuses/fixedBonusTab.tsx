"use client";
import Heading from "@/app/common/heading";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import AllBonusTable from "@/app/components/bonuses/allBonusTable";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import ErrorFetch from "@/app/common/errorFetch";
import { useMemo } from "react";
import { formatNaira } from "@/app/utils/formatCurrency";
import type { BonusTabProps } from "@/app/admin/bonuses/page";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const FixedBonusTab = ({
  data,
  isLoading,
  isError,
  refetch,
  filters,
}: BonusTabProps) => {
  const comparison = data?.metrics?.comparison;
  const bonusValueByType = data?.metrics?.bonus_value_by_type || {};

  const lastDisbursed = useMemo(() => {
    const paid = data?.data?.filter((r) => r.date_paid);
    if (!paid?.length) return "—";
    const latest = paid.reduce((a, b) =>
      new Date(a.date_paid) > new Date(b.date_paid) ? a : b,
    );
    return new Date(latest.date_paid).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [data?.data]);

  return (
    <>
      <div className="mb-8">
        <Heading
          user="Fixed bonus"
          subHead="View previously approved and disbursed fixed bonuses."
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
            title="Total Fixed Bonuses"
            value={formatNaira(bonusValueByType["Fixed bonus"] || "0")}
            showInfo
            footer={{
              type: "badge",
              badge: comparison?.total_bonus_paid_change_percent ?? 0,
              label: comparison?.compared_to || "",
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
          <BonusStatCard
            title="Average Bonus"
            value={formatNaira(data?.metrics?.average_bonus)}
            footer={{
              type: "badge",
              badge: comparison?.average_bonus_change_percent ?? 0,
              label: comparison?.compared_to || "",
            }}
          />
          <BonusStatCard
            title="Last Disbursed"
            value={lastDisbursed}
            footer={{ type: "badge", badge: "", label: "" }}
          />
        </div>
      )}

      <AllBonusTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        showBonusTypeColumn={false}
      />
    </>
  );
};

export default FixedBonusTab;
