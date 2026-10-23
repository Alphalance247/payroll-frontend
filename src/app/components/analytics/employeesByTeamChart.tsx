"use client";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGeneralAnalytics } from "@/app/hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";
import LoadingState from "@/app/common/loadingState";

const chartConfig = {
  count: { label: "Employees", color: "#54BCD5" },
} satisfies ChartConfig;

interface TeamTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

// Team names can run to two words ("Operational Excellence") — wrap them
// onto two lines, right-aligned and vertically centered on their row.
const TeamCategoryTick = ({ x = 0, y = 0, payload }: TeamTickProps) => {
  const words = String(payload?.value ?? "").split(" ");
  const lineHeight = 14;
  const offset = ((words.length - 1) * lineHeight) / 2;
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={word}
          x={-8}
          y={index * lineHeight - offset}
          dy={4}
          textAnchor="end"
          fontSize={12}
          fill="#71717A"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

const EmployeesByTeamChart = () => {
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
    return <LoadingState message="Loading employees by team..." />;
  }

  if (isError || !data) {
    return (
      <div className="p-6 bg-white rounded-xl border border-[#E3E3E5] text-sm text-red-600">
        Failed to load employees by team. Please try again.
      </div>
    );
  }

  const teamData = data.employees_by_team.map((item) => ({
    team: item.team,
    count: item.count,
  }));

  return (
    <div className="grid grid-cols-2">
      <div className="bg-white rounded-xl border border-[#E3E3E5]">
        <div className="p-6 border-b border-[#E3E3E5]">
          <h3 className="text-base font-medium leading-6 text-[#2F2F33]">
            Employees by Team
          </h3>
        </div>

        <div className="p-6">
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <BarChart
              accessibilityLayer
              data={teamData}
              layout="vertical"
              margin={{ top: 4, right: 24, left: 0, bottom: 4 }}
              barCategoryGap="30%"
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="team"
                width={110}
                axisLine={{ stroke: "#D6D3D1" }}
                tickLine={false}
                tick={<TeamCategoryTick />}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      `${Number(value).toLocaleString()}`,
                      String(name),
                    ]}
                  />
                }
              />
              <Bar
                dataKey="count"
                name="Employees"
                fill="var(--color-count)"
                radius={[0, 2, 2, 0]}
                barSize={28}
              >
                <LabelList
                  dataKey="count"
                  position="right"
                  style={{ fill: "#2F2F33", fontSize: 14 }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default EmployeesByTeamChart;
