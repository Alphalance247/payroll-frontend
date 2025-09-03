"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A donut chart";

const chartConfig = {
  leaveType: {
    label: "leave",
  },
  carryOverLeave: {
    label: "Carry Over Leave",
  },
  daysTaken: {
    label: "Days Taken",
  },
  remainingLeave: {
    label: "Remaining Leave",
  },
} satisfies ChartConfig;

interface PieChartProps {
  title: string;
  chartData: {
    leaveType: string;
    daysTaken: number;
    fill: string;
  }[];
  children: any;
}
const LeavePieChart = ({
  title,
  chartData,
  children,
}: // totalLeaveDays,
// CarryOverDays,
// remainingLeaveBalance,
PieChartProps) => {
  return (
    <div className="mb-8 ">
      {" "}
      <div className="h-[396px] border border-[#E3E3E5] rounded-[8px]">
        <div className="border-b border-[#E3E3E5] h-[52px]">
          <div className=" py-4 pl-4 text-[#2F2F33] text-sm font-semibold font-Graphik capitalize">
            {title}
          </div>
        </div>
        <div className="flex justify-between items-center h-[344px] mx-14">
          <CardContent className="flex-1 pb-0 ">
            <ChartContainer
              config={chartConfig}
              className=" aspect-square max-h-[264px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="daysTaken"
                  nameKey="leaveType"
                  innerRadius={60}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LeavePieChart;
