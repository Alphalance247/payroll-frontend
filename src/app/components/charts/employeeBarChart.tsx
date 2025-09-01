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
    baseSalary: number;
    bonus: number;
    deduction: number;
  }[];
}) {
  return (
    <div className="">
      <ChartContainer
        config={chartConfig}
        className="h-min-[200px]  overflow-x-scroll"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 4)}
          />
          <YAxis
            domain={[0, 40]}
            tickLine={false}
            tickMargin={1}
            axisLine={false}
            width={40}
            // tickFormatter={}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="baseSalary" fill="var(--color-baseSalary)" radius={4} />
          <Bar dataKey="bonus" fill="var(--color-bonus" radius={4} />
          <Bar dataKey="deduction" fill="var(--color-deduction" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
