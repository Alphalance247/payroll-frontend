"use client";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
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
  baseSalary: {
    label: "base salary",
    color: "#009BC0",
  },
  bonus: {
    label: "bonus",
    color: "#E37915",
  },
  deduction: {
    label: "deduction",
    color: "#11202D",
  },
} satisfies ChartConfig;

export default function DashboardLayout({
  chartData,
}: {
  chartData: {
    year: string;
    months: {
      total_base_salary: string;
      total_bonus: string;
      total_deductions: string;
      month: string;
    }[];
    totals: {
      total_base_salary: number;
      total_bonus: number;
      total_deductions: number;
    };
  }[];
}) {
  // const chartData = [{
  // year:"2025", baseSalary:"10000",bonus:"3000", deductions:"5000"
  // }]
  // const chartData = [
  //   {
  //     year: 2025,
  //     months: [
  //       {
  //         total_base_salary: "10000",
  //         total_bonus: "2000",
  //         total_deductions: "5000",
  //         month: "january",
  //       },
  //     ],
  //     totals: {
  //       total_base_salary: "5000",
  //       total_bonus: "3000",
  //       total_deductions: "1500",
  //     },
  //   },
  // ];
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
            // domain={[1000, 10000]}
            tickLine={false}
            tickMargin={1}
            axisLine={false}
            width={40}
            label={{
              value: "Total Amount (NGN)",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
            }}
            // tickFormatter={}
          />
          {/* <Legend
            verticalAlign="top"
            height={36}
            align="left"
            iconSize={20}
            textAnchor="uppercase"
            className="rounded-md capitalize"
          /> */}

          <ChartTooltip
            content={
              <ChartTooltipContent className="opacity-100 capitalize font-medium shadow-md" />
            }
          />
          <Bar dataKey="baseSalary" fill="var(--color-baseSalary)" radius={4} />
          <Bar dataKey="bonus" fill="var(--color-bonus" radius={4} />
          <Bar dataKey="deduction" fill="var(--color-deduction" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
