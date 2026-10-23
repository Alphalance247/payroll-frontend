"use client";
import SummaryListCard from "./summaryListCard";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

const LoansSummaryCard = () => {
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
    return <LoadingState message="Loading loans summary..." />;
  }

  if (isError || !data) {
    return (
      <div className="flex-1 p-6 bg-white rounded-xl border border-[#E3E3E5] text-sm text-red-600">
        Failed to load loans summary. Please try again.
      </div>
    );
  }

  const { total, outstanding, repaid } = data.loans;
  const rows = [
    { label: "Total Loan", value: `₦${formatCurrencyShort(total)}` },
    { label: "Outstanding", value: `₦${formatCurrencyShort(outstanding)}` },
    { label: "Repaid", value: `₦${formatCurrencyShort(repaid)}` },
  ];

  return <SummaryListCard title="Loans" rows={rows} />;
};

export default LoansSummaryCard;
