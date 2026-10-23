"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

const chartConfig = {
  salary: { label: "Salary", color: "#EA7B17" },
  bonus: { label: "Bonus", color: "#3B82F6" },
  tax: { label: "Tax", color: "#8B5CF6" },
} satisfies ChartConfig;

const formatYAxis = (value: number) => `₦${formatCurrencyShort(value)}`;

const PayrollTrendChart = () => {
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
    return <LoadingState message="Loading payroll trend..." />;
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-white rounded-lg border border-[#E3E3E5] text-sm text-red-600">
        Failed to load payroll trend. Please try again.
      </div>
    );
  }

  const trendData = data.payroll_trend;

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5]">
      <div className="px-6 py-5 border-b border-[#E3E3E5] flex flex-col gap-1">
        <h3 className="text-base font-medium leading-6 text-[#2F2F33]">
          Payroll Trend
        </h3>
        <p className="text-sm font-medium leading-5 text-[#71717A]">
          {data.filters.start_date} – {data.filters.end_date}
        </p>
      </div>

      <div className="p-6">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart
            accessibilityLayer
            data={trendData}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#E3E3E5" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#71717A" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#71717A" }}
              tickFormatter={formatYAxis}
              width={56}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `₦${Number(value).toLocaleString()}`,
                    String(name),
                  ]}
                />
              }
            />
            <Line
              dataKey="salary"
              type="monotone"
              stroke="var(--color-salary)"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              dataKey="bonus"
              type="monotone"
              stroke="var(--color-bonus)"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              dataKey="tax"
              type="monotone"
              stroke="var(--color-tax)"
              strokeWidth={1.5}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default PayrollTrendChart;
