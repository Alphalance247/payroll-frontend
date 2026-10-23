"use client";
import DonutBreakdownCard from "./donutBreakdownCard";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

// Bonus-type colors, keyed by the API's `type` values.
const TYPE_COLORS: Record<string, string> = {
  fixed: "#FBD9AE",
  client: "#F5B971",
  quarterly: "#E37915",
  discretionary: "#CF6E13",
};

const BonusBreakdownChart = () => {
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
    return <LoadingState message="Loading bonus breakdown..." />;
  }

  if (isError || !data) {
    return (
      <div className="flex-1 p-6 bg-white rounded-xl border border-[#E3E3E5] text-sm text-red-600">
        Failed to load bonus breakdown. Please try again.
      </div>
    );
  }

  const { total, items } = data.bonus_breakdown;
  const segments = items.map((item) => ({
    key: item.type,
    label: item.label,
    value: item.amount,
    percentage: item.percentage,
    color: TYPE_COLORS[item.type] ?? "#F5B971",
  }));

  return (
    <DonutBreakdownCard
      title="Bonus Breakdown"
      centerLabel="Total Bonus"
      segments={segments}
      total={total}
    />
  );
};

export default BonusBreakdownChart;
