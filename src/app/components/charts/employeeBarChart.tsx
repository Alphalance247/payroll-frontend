"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { getEmployeeYearlyPayroll } from "@/stores/employee-dashboard/analytics/yearlyPayroll";
import { useEffect } from "react";

const chartConfig = {
  total_base_salary: { label: "Base Salary", color: "#009BC0" },
  total_bonus: { label: "Bonus", color: "#E37915" },
  total_deductions: { label: "Deductions", color: "#11202D" },
} satisfies ChartConfig;

export default function DashboardLayout() {
  const { data, fetchEmployeeYearlyPayroll } = getEmployeeYearlyPayroll();
  useEffect(() => {
    fetchEmployeeYearlyPayroll();
  }, [fetchEmployeeYearlyPayroll]);

  const chartData = data?.data.map((yearItem) => ({
    year: yearItem.year,
    total_base_salary: yearItem.totals.total_base_salary,
    total_bonus: yearItem.totals.total_bonus,
    total_deductions: yearItem.totals.total_deductions,
  }));

  return (
    <div className="">
      <ChartContainer
        config={chartConfig}
        className="h-min-[200px]  overflow-x-scroll px-6"
      >
        <BarChart accessibilityLayer data={chartData} className="mt-5">
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={(value) => value.slice(0, 4)}
          />
          <YAxis
            domain={[100000, 2000000]}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            width={100}
            tickSize={0}
            label={{
              value: "Total Amount (NGN)",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
              offset: 5,
            }}
          />
          <ChartLegend
            verticalAlign="top"
            align="left"
            content={
              <ChartLegendContent className="text-sm font-medium font-Graphik flex justify-start text-[#2F2F33] " />
            }
            wrapperStyle={{ paddingBottom: "20px" }}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent className="opacity-100 capitalize font-medium shadow-md w-fit h-fit" />
            }
          />
          <Bar
            dataKey="total_base_salary"
            fill="#009BC0"
            stackId="a"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="total_bonus"
            stackId="a"
            fill="#E37915"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="total_deductions"
            fill="#11202D"
            stackId="a"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
