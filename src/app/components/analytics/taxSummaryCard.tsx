"use client";
import SummaryListCard from "./summaryListCard";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

const TaxSummaryCard = () => {
  const { start_date, end_date, team, employee, job_type } =
    usePayrollAnalyticsFilterStore();
  const { data, isLoading, isError } = useGeneralAnalytics({
    start_date,
    end_date,
    team,
    employee,
    job_type,
  });

  if (isLoading) {
    return <LoadingState message="Loading tax summary..." />;
  }

  if (isError || !data) {
    return (
      <div className="flex-1 p-6 bg-white rounded-xl border border-[#E3E3E5] text-sm text-red-600">
        Failed to load tax summary. Please try again.
      </div>
    );
  }

  const { total, remitted, pending_remittance } = data.tax;
  const rows = [
    { label: "Total Tax", value: `₦${formatCurrencyShort(total)}` },
    { label: "Remitted", value: `₦${formatCurrencyShort(remitted)}` },
    {
      label: "Pending Remittance",
      value: `₦${formatCurrencyShort(pending_remittance)}`,
    },
  ];

  return <SummaryListCard title="Tax" rows={rows} />;
};

export default TaxSummaryCard;
