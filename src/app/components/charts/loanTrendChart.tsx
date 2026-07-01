"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getLoanAnalytics } from "@/stores/getLoanAnalytics";

const chartConfig = {
  total_applications: {
    label: "Total Applications",
    color: "#8A508F",
  },
  approved: {
    label: "Approved",
    color: "#F4A261",
  },
  rejected: {
    label: "Rejected",
    color: "#118AB2",
  },
} satisfies ChartConfig;

export function LoanTrendChart() {
  const { data: loanData } = getLoanAnalytics();

  const chartData = (loanData?.trends ?? []).map((item) => ({
    month: item.period,
    total_applications: item.total_applications,
    approved: item.approved,
    rejected: item.rejected,
  }));

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
            margin={{ left: 0, right: 12 }}
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
            />
            <YAxis
              domain={[0, "auto"]}
              allowDecimals={false}
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
              dataKey="total_applications"
              type="natural"
              fill="#8A508F"
              fillOpacity={0.2}
              stroke="#8A508F"
            />
            <Area
              dataKey="approved"
              type="natural"
              fill="#F4A261"
              fillOpacity={0.2}
              stroke="#F4A261"
            />
            <Area
              dataKey="rejected"
              type="natural"
              fill="#118AB2"
              fillOpacity={0.2}
              stroke="#118AB2"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
