"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  // ChartLegend,
  // ChartLegendContent,
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
    totals: {
      total_base_salary: number;
      total_bonus: number;
      total_deductions: number;
    };
  }[];
}) {
  return (
    <div className="">
      <ChartContainer
        config={chartConfig}
        className="h-min-[200px]  overflow-x-scroll px-6"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={(value) => value.slice(0, 4)}
          />
          <YAxis
            domain={[0, 40]}
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
          {/* <Legend>
            {chartData.map((item) => (
              <div key={item.name} style={{ color: item.color }}>
                <span style={{ marginRight: "8px" }}>{item.icon}</span>
                {item.name}: {item.value}
              </div>
            ))}
          </Legend> */}
          {/* <Legend verticalAlign="top" height={36} align="left" iconSize={20} /> */}

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
