"use client";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getYearlyJobType } from "@/stores/analytics/getYearlyJobType";

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartConfig: ChartConfig = {
  "Full Time": { label: "Full Time", color: "#F5B971" },
  "Part Time": { label: "Part Time", color: "#78D6E0" },
  Contract: { label: "Contract", color: "#2E6171" },
  Intern: { label: "Intern", color: "#009BC0" },
};

export function EmploymentsTypeChart({
  selectedTeam,
}: {
  selectedTeam: string;
}) {
  const { data: yearlyJobTypeData } = getYearlyJobType();

  const chartData = ALL_MONTHS.map((month, i) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const teamData = (yearlyJobTypeData?.data as any)?.[month]?.[selectedTeam];
    return {
      month: SHORT_MONTHS[i],
      "Full Time": teamData?.["Full Time"] ?? 0,
      "Part Time": teamData?.["Part Time"] ?? 0,
      Contract: teamData?.Contract ?? 0,
      Intern: teamData?.Intern ?? 0,
    };
  });

  return (
    <Card className="border-0 shadow-none w-full">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <ChartContainer config={chartConfig} className="h-[500px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 20, right: 30, left: -20, bottom: 15 }}
                layout="horizontal"
                className="w-full"
                barCategoryGap="25%"
                barGap={2}
              >
                <CartesianGrid
                  horizontal
                  vertical
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  interval={0}
                  height={40}
                />
                <YAxis
                  domain={[0, "auto"]}
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={40}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="bg-white" />}
                />
                <Bar
                  dataKey="Full Time"
                  fill="#F5B971"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="Part Time"
                  fill="#78D6E0"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="Contract"
                  fill="#2E6171"
                  radius={[2, 2, 0, 0]}
                />
                <Bar dataKey="Intern" fill="#009BC0" radius={[2, 2, 0, 0]} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "12px",
                        marginLeft: "4px",
                      }}
                    >
                      {value}
                    </span>
                  )}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
