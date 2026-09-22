"use client";
import Heading from "@/app/common/heading";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import ClientBonusTable from "@/app/components/bonuses/clientBonusTable";
import ErrorFetch from "@/app/common/errorFetch";
import { formatNaira } from "@/app/utils/formatCurrency";
import type { BonusTabProps } from "@/app/admin/bonuses/page";
import { useExportBonuses } from "@/app/hooks/useQueries/bonuses/useExportBonuses";
import { useBonusTabData } from "@/app/hooks/useQueries/bonuses/useBonusTabData";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const QuarterlyBonusTab = ({ filters }: BonusTabProps) => {
  const { exportBonuses, isExporting } = useExportBonuses();
  const {
    data,
    isLoading,
    isError,
    refetch,
    pageSize,
    onPageChange,
    onPageSizeChange,
  } = useBonusTabData("quarterly", filters);
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
        showMoreFilters
        moreFiltersValue={filters.moreFilters}
        onMoreFiltersApply={filters.onMoreFiltersApply}
        onClearFilters={filters.onClearFilters}
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
            value={data?.metrics?.total_hours || "0"}
            footer={{ type: "badge", badge: "0", label: " last month" }}
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
        currentPage={data?.pagination?.page ?? 1}
        totalPages={data?.pagination?.total_pages ?? 1}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        emptyTitle="No quarterly bonuses yet"
        emptySubtitle="There are no quarterly bonus records to display. Quarterly bonuses will appear here once they've been added and approved."
        onExport={() => exportBonuses("quarterly")}
        isExporting={isExporting}
      />
    </>
  );
};

export default QuarterlyBonusTab;
