"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import TeamAxisTick from "./teamAxisTick";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

const chartConfig = {
  hours: { label: "Hours Logged", color: "#54BCD5" },
} satisfies ChartConfig;

const TotalHoursLoggedChart = () => {
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
    return <LoadingState message="Loading hours logged..." />;
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-white rounded-lg border border-[#E3E3E5] text-sm text-red-600">
        Failed to load hours logged. Please try again.
      </div>
    );
  }

  const teamData = data.hours_by_team.map((item) => ({
    team: item.team,
    hours: item.hours,
  }));

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5]">
      <div className="px-6 py-5 border-b border-[#E3E3E5]">
        <h3 className="text-base font-medium leading-6 text-[#2F2F33]">
          Total Hours Logged
        </h3>
      </div>

      <div className="p-6">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            accessibilityLayer
            data={teamData}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} stroke="#E3E3E5" />
            <XAxis
              dataKey="team"
              tickLine={false}
              axisLine={false}
              interval={0}
              height={40}
              tick={<TeamAxisTick />}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#71717A" }}
              width={40}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()}h`,
                    String(name),
                  ]}
                />
              }
            />
            <Bar
              dataKey="hours"
              name="Hours Logged"
              fill="var(--color-hours)"
              radius={4}
              maxBarSize={48}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TotalHoursLoggedChart;
