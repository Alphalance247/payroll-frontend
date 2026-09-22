import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useAllBonusHistory } from "./useAllBonusHistory";
import type { BonusFilters } from "@/app/admin/bonuses/page";

const APPROVAL_STATUS_VALUES = new Set(["pending", "approved", "rejected"]);

export const useBonusTabData = (
  bonusType: string | undefined,
  filters: BonusFilters,
) => {
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);

  const startDate = filters.dateRange.from
    ? format(filters.dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDate = filters.dateRange.to
    ? format(filters.dateRange.to, "yyyy-MM-dd")
    : undefined;

  const approvalStatuses = filters.selectedStatuses.filter((s) =>
    APPROVAL_STATUS_VALUES.has(s),
  );
  const approvalStatusParam =
    approvalStatuses.length > 0 ? approvalStatuses.join(",") : undefined;

  const hasDisbursed = filters.selectedStatuses.includes("disbursed");
  const hasNotDisbursed = filters.selectedStatuses.includes("not_disbursed");
  const paidParam =
    hasDisbursed && !hasNotDisbursed
      ? "true"
      : hasNotDisbursed && !hasDisbursed
        ? "false"
        : undefined;

  const teamIdParam =
    filters.moreFilters.teams.length > 0
      ? filters.moreFilters.teams.join(",")
      : undefined;
  const countryParam =
    filters.moreFilters.countries.length > 0
      ? filters.moreFilters.countries.join(",")
      : undefined;

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setPage(undefined);
  }, [startDate, endDate, approvalStatusParam, paidParam, teamIdParam, countryParam]);

  const { data, isLoading, isError, refetch } = useAllBonusHistory(
    undefined,
    undefined,
    bonusType,
    startDate,
    endDate,
    approvalStatusParam,
    paidParam,
    teamIdParam,
    countryParam,
    page,
    pageSize,
  );

  const onPageChange = (newPage: number) => setPage(newPage);
  const onPageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return {
    data,
    isLoading,
    isError,
    refetch,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
  };
};
