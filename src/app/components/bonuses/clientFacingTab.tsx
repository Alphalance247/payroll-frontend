"use client";
import Heading from "@/app/common/heading";
import ClientBonusTable from "@/app/components/bonuses/clientBonusTable";
import BonusStatCard from "@/app/components/bonuses/bonusStatCard";
import BonusGridSkeleton from "@/app/components/bonuses/bonusGridSkeleton";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
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

const ClientBonusTab = ({ filters }: BonusTabProps) => {
  const { exportBonuses, isExporting } = useExportBonuses();
  const {
    data,
    isLoading,
    isError,
    refetch,
    pageSize,
    onPageChange,
    onPageSizeChange,
  } = useBonusTabData("client", filters);
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
            value={data?.metrics?.total_hours || "0"}
            footer={{ type: "badge", badge: "0", label: " last month" }}
          />

          <BonusStatCard
            title="Client Bonus Rate"
            value={`$${data?.metrics?.client_bonus_rate || "0"}/hr`}
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

      <ClientBonusTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        currentPage={data?.pagination?.page ?? 1}
        totalPages={data?.pagination?.total_pages ?? 1}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        emptyTitle="No client bonuses yet"
        emptySubtitle="There are no client-facing bonus records to display. Client bonuses are calculated from eligible billable hours and will appear here once processed."
        onExport={() => exportBonuses("client_facing")}
        isExporting={isExporting}
      />
    </>
  );
};

export default ClientBonusTab;
