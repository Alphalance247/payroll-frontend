"use client";
import Heading from "@/app/common/heading";
import DiscretionaryBonusTable from "@/app/components/bonuses/discretionaryBonusTable";
import BonusFilterBar from "@/app/components/bonuses/bonusFilterBar";
import type { BonusTabProps } from "@/app/admin/bonuses/page";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Disbursed", value: "disbursed" },
  { label: "Pending", value: "pending" },
];

const DiscretionaryBonusTab = ({ data, isLoading, isError, filters }: BonusTabProps) => {
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
      />

      <DiscretionaryBonusTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default DiscretionaryBonusTab;
