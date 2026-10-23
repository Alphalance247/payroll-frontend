"use client";
import DonutBreakdownCard from "./donutBreakdownCard";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

// Employment-type colors, keyed by the API's `type` values.
const TYPE_COLORS: Record<string, string> = {
  full_time: "#FBD9AE",
  contractor: "#E37915",
  part_time: "#CF6E13",
};

const SalaryByEmploymentTypeChart = () => {
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
    return <LoadingState message="Loading salary by employment type..." />;
  }

  if (isError || !data) {
    return (
      <div className="flex-1 p-6 bg-white rounded-xl border border-[#E3E3E5] text-sm text-red-600">
        Failed to load salary by employment type. Please try again.
      </div>
    );
  }

  const { total, items } = data.salary_by_employment_type;
  const segments = items.map((item) => ({
    key: item.type,
    label: item.label,
    value: item.amount,
    color: TYPE_COLORS[item.type] ?? "#E37915",
  }));

  return (
    <DonutBreakdownCard
      title="Salary by Employment Type"
      centerLabel="Total Paid"
      segments={segments}
      total={total}
      showPercentage={false}
    />
  );
};

export default SalaryByEmploymentTypeChart;
