"use client";
import Heading from "@/app/common/heading";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import ClientBonusTable from "@/app/components/bonuses/clientBonusTable";
import ErrorFetch from "@/app/common/errorFetch";
import { formatNaira } from "@/app/utils/formatCurrency";
import type { BonusTabProps } from "@/app/admin/bonuses/page";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const QuarterlyBonusTab = ({ data, isLoading, isError, refetch, filters }: BonusTabProps) => {
  const comparison = data?.metrics?.comparison;
  const bonusValueByType = data?.metrics?.bonus_value_by_type || {};

  return (
    <>
      <div className="mb-8">
        <Heading
          user="Quarterly bonus"
          subHead="Review all approved quarterly bonus payouts, including recipients, amounts, and disbursement history."
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
            title="Total Quarterly Bonuses"
            value={formatNaira(bonusValueByType["Quarterly bonus"] || "0")}
            showInfo
            footer={{
              type: "badge",
              badge: comparison?.total_bonus_paid_change_percent ?? 0,
              label: comparison?.compared_to || "",
            }}
          />
          <BonusStatCard
            title="Total Hours"
            value="2,105 hrs"
            footer={{ type: "badge", badge: "+20%", label: "Vs last month" }}
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
        </div>
      )}

      <ClientBonusTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        showClientHoursColumn={false}
      />
    </>
  );
};

export default QuarterlyBonusTab;
