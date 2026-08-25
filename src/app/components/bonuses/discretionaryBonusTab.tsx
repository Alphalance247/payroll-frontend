"use client";
import Heading from "@/app/common/heading";
import DiscretionaryBonusTable from "@/app/components/bonuses/discretionaryBonusTable";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import type { BonusTabProps } from "@/app/admin/bonuses/page";
import { useExportBonuses } from "@/app/hooks/useQueries/bonuses/useExportBonuses";
import { useBonusTabData } from "@/app/hooks/useQueries/bonuses/useBonusTabData";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const DiscretionaryBonusTab = ({ filters }: BonusTabProps) => {
  const { exportBonuses, isExporting } = useExportBonuses();
  const { data, isLoading, isError, pageSize, onPageChange, onPageSizeChange } =
    useBonusTabData("non_client", filters);

  return (
    <>
      <div className="mb-8">
        <Heading
          user="Discretionary bonus"
          subHead="View manually awarded discretionary bonuses, including approvals, recipients, and payment history."
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

      <DiscretionaryBonusTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        currentPage={data?.pagination?.page ?? 1}
        totalPages={data?.pagination?.total_pages ?? 1}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        emptyTitle="No discretionary bonuses yet"
        emptySubtitle="There are no discretionary bonus records to display. These bonuses are manually awarded and will appear here once created and approved."
        onExport={() => exportBonuses("discretionary")}
        isExporting={isExporting}
      />
    </>
  );
};

export default DiscretionaryBonusTab;
