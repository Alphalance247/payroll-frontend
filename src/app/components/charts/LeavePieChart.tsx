"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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
const annualLeave = [
  {
    name: "Total Leave Days Entitled",
    days: "20",
  },
  {
    name: "Carryover Days",
    days: "5",
  },
  {
    name: "Days Taken",
    days: "3",
  },
  {
    name: "Remaining Leave Balance",
    days: "7",
  },
];
const sickLeave = [
  {
    name: "Total Leave Days Entitled",
    days: "20",
  },
  {
    name: "Carryover Days",
    days: "5",
  },
  {
    name: "Days Taken",
    days: "3",
  },
  {
    name: "Remaining Leave Balance",
    days: "7",
  },
];
interface PieChartProps {
  title: string;
  chartData: {
    leaveType: string;
    daysTaken: number;
    fill: string;
  }[];
}
const LeavePieChart = ({ title, chartData }: PieChartProps) => {
  return (
    <div className="mb-8">
      {" "}
      <div className="h-[396px]">
        <Card className="h-full w-full">
          <CardHeader className=" border-b border-[#E3E3E5] h-[52px]">
            <CardTitle className="-mt-2 text-[#2F2F33] text-sm font-semibold font-Graphik capitalize">
              {title}
            </CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}
          </CardHeader>
          <CardContent className="flex items-center justify-between  pb-0 h-[344px]">
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
            <div className="border border-[#E3E3E5] rounded-[8px]">
              <table className="h-[264px] w-[502px]  table-auto font-Graphik text-sm ">
                <thead className="bg-[#E3E3E5] h-[44px]">
                  <tr className="">
                    <th className="text-left text-[#71717A]  font-medium  px-6 capitalize ">
                      {title}
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-[#EAECF0]">
                  {annualLeave.map((leave, index) => (
                    <tr
                      key={index}
                      className={index % 2 ? "bg-[#F7F7F7] " : "bg-[#F1F1F2]"}
                    >
                      <td className="px-6">{leave.name}</td>
                      <td className="px-6">{leave.days}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="h-[44px] bg-[#E3E3E5] text-[#2F2F33]">
                  <tr className="">
                    <td className="px-6  font-medium ">Leave Cycle Ends</td>
                    <td className="px-6  font-medium ">Dec 31, 2025</td>
                  </tr>
                </tfoot>
              </table>
            </div>{" "}
          </CardContent>
          {/* <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default LeavePieChart;
