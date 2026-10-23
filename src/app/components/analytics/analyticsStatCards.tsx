"use client";
import { Info } from "lucide-react";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import { formatNaira } from "@/app/utils/formatCurrency";
import LoadingState from "@/app/common/loadingState";

interface ChangeBadge {
  label: string;
  bg: string;
  text: string;
}

const getChangeBadge = (changePct: number | null): ChangeBadge => {
  if (changePct === null) {
    return { label: "N/A", bg: "#F3F4F6", text: "#6B7280" };
  }
  const rounded = Math.round(changePct * 10) / 10;
  if (rounded > 0) {
    return { label: `+${rounded}%`, bg: "#F0FDF4", text: "#15803D" };
  }
  if (rounded < 0) {
    return { label: `${rounded}%`, bg: "#FEF2F2", text: "#DC2626" };
  }
  return { label: "0%", bg: "#F3F4F6", text: "#6B7280" };
};

const AnalyticsStatCards = () => {
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
    return <LoadingState message="Loading analytics..." />;
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-white rounded-lg border border-[#E3E3E5] text-sm text-red-600">
        Failed to load analytics summary. Please try again.
      </div>
    );
  }

  const { summary } = data;

  const stats = [
    {
      label: "Total Salary",
      value: summary.total_salary.value,
      changePct: summary.total_salary?.previous,
      withInfo: true,
    },
    {
      label: "Total Bonus",
      value: summary.total_bonus.value,
      changePct: summary.total_bonus?.previous,
    },
    {
      label: "Total Loan",
      value: summary.total_loan.value,
      changePct: summary.total_loan?.previous,
    },
    {
      label: "Total Tax",
      value: summary.total_tax.value,
      changePct: summary.total_tax?.previous,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const badge = getChangeBadge(stat.changePct);
        return (
          <div
            key={stat.label}
            className="p-6 bg-white rounded-lg border border-[#E3E3E5] flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium leading-5 text-[#71717A]">
                {stat.label}
              </span>
              {stat.withInfo && (
                <Info size={14} strokeWidth={2} className="text-[#A0A0A8]" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium leading-6 text-[#2F2F33]">
                {formatNaira(stat.value)}
              </span>
              <div className="flex items-center gap-1">
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-medium leading-4"
                  style={{ backgroundColor: badge.bg, color: badge.text }}
                >
                  {badge.label}
                </span>
                <span className="text-xs font-normal leading-4 text-[#71717A]">
                  Vs last month
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsStatCards;
