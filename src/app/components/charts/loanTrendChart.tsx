"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  {
    month: "Total applications",
    ["Total applications"]: 6,
    Approved: 40,
    Rejected: 17,
  },
  { month: "Approved", ["Total applications"]: 30, Approved: 20, Rejected: 6 },
  { month: "Rejected", ["Total applications"]: 23, Approved: 12, Rejected: 77 },
];

const chartConfig = {
  ["Total applications"]: {
    label: "Total applications",
    color: "#8A508F",
  },
  Approved: {
    label: "Approved",
    color: "#F4A261",
  },
  Rejected: {
    label: "Rejected",
    color: "#F4A261",
  },
} satisfies ChartConfig;

export function LoanTrendChart() {
  return (
    <div>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[550px] w-full mx-auto text-[#642968]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
            }}
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
              tickMargin={8}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              width={50}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="Approved"
              type="natural"
              fill="#F4A2614D"
              fillOpacity={0.4}
              stroke="#F4A2614D"
              stackId="a"
            />
            <Area
              dataKey="Rejected"
              type="natural"
              fill="#118AB2"
              fillOpacity={0.4}
              stroke="#118AB2"
              stackId="a"
            />
            <Area
              dataKey="Total applications"
              type="natural"
              fill="#8A508F"
              fillOpacity={0.4}
              stroke="#642968"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </div>
  );
}
