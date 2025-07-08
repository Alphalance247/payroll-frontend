"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useStore } from "zustand";
import { getPayrollBreakdown } from "@/stores/analytics/getPayrollBreakdown";

const chartConfig = {
  Salary: {
    label: "Salary",
    color: "hsl(195, 30%, 40%)",
  },
  Bonus: {
    label: "Bonus",
    color: "hsl(190, 70%, 70%)",
  },
  Tax: {
    label: "Tax",
    color: "hsl(35, 90%, 75%)",
  },
};

// Custom formatter for Y-axis labels
const formatYAxis = (value: number) => {
  if (value === 0) return "0";
  if (value === 500000) return "500k";
  if (value === 1000000) return "1M";
  if (value === 2000000) return "2M";
  if (value === 3000000) return "3M";
  if (value === 4000000) return "4M";
  return "";
};

function useResponsiveBarSize() {
  const [barSize, setBarSize] = useState(40);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBarSize(25); // Mobile bar size
      } else if (window.innerWidth < 1024) {
        setBarSize(35); // Tablet bar size
      } else {
        setBarSize(40); // Desktop bar size
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return barSize;
}

export function InsightChart() {
  const barSize = useResponsiveBarSize();

  const { data: payrollBreakdownData } = useStore(getPayrollBreakdown);

  const chartData = [
    {
      month: "Jan",
      Salary: payrollBreakdownData?.data?.January?.salary,
      Bonus: payrollBreakdownData?.data?.January?.bonus,
      Tax: payrollBreakdownData?.data?.January?.tax,
    },
    {
      month: "Feb",
      Salary: payrollBreakdownData?.data?.February?.salary,
      Bonus: payrollBreakdownData?.data?.February?.bonus,
      Tax: payrollBreakdownData?.data?.February?.tax,
    },
    {
      month: "Mar",
      Salary: payrollBreakdownData?.data?.March?.salary,
      Bonus: payrollBreakdownData?.data?.March?.bonus,
      Tax: payrollBreakdownData?.data?.March?.tax,
    },
    {
      month: "Apr",
      Salary: payrollBreakdownData?.data?.April?.salary,
      Bonus: payrollBreakdownData?.data?.April?.bonus,
      Tax: payrollBreakdownData?.data?.April?.tax,
    },
    {
      month: "May",
      Salary: payrollBreakdownData?.data?.May?.salary,
      Bonus: payrollBreakdownData?.data?.May?.bonus,
      Tax: payrollBreakdownData?.data?.May?.tax,
    },
    {
      month: "Jun",
      Salary: payrollBreakdownData?.data?.June?.salary,
      Bonus: payrollBreakdownData?.data?.June?.bonus,
      Tax: payrollBreakdownData?.data?.June?.tax,
    },
    {
      month: "Jul",
      Salary: payrollBreakdownData?.data?.July?.salary,
      Bonus: payrollBreakdownData?.data?.July?.bonus,
      Tax: payrollBreakdownData?.data?.July?.tax,
    },
    {
      month: "Aug",
      Salary: payrollBreakdownData?.data?.August?.salary,
      Bonus: payrollBreakdownData?.data?.August?.bonus,
      Tax: payrollBreakdownData?.data?.August?.tax,
    },
    {
      month: "Sep",
      Salary: payrollBreakdownData?.data?.September?.salary,
      Bonus: payrollBreakdownData?.data?.September?.bonus,
      Tax: payrollBreakdownData?.data?.September?.tax,
    },
    {
      month: "Oct",
      Salary: payrollBreakdownData?.data?.October?.salary,
      Bonus: payrollBreakdownData?.data?.October?.bonus,
      Tax: payrollBreakdownData?.data?.October?.tax,
    },
    {
      month: "Nov",
      Salary: payrollBreakdownData?.data?.November?.salary,
      Bonus: payrollBreakdownData?.data?.November?.bonus,
      Tax: payrollBreakdownData?.data?.November?.tax,
    },
    {
      month: "Dec",
      Salary: payrollBreakdownData?.data?.December?.salary,
      Bonus: payrollBreakdownData?.data?.December?.bonus,
      Tax: payrollBreakdownData?.data?.December?.tax,
    },
  ];

  return (
    <Card className="border-0 shadow-none w-full">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px]">
            <ChartContainer config={chartConfig} className="h-[500px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 40, right: 30, left: 60, bottom: 15 }}
                layout="horizontal"
                className="w-full"
                barCategoryGap={8}
                barGap={0}
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
                  tickFormatter={formatYAxis}
                  domain={[0, 4000000]}
                  ticks={[0, 500000, 1000000, 2000000, 3000000, 4000000]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={60}
                  label={{
                    value: "Total Amount (USD)",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                    offset: -40,
                  }}
                  className="font-Graphik text-[#71717A] text-sm font-medium"
                />
                <ChartTooltip
                  cursor={false}
                  // formatter={(value: number) => {
                  //   return `₦ ${formatCurrencyShort(value)}`;
                  // }}
                  content={<ChartTooltipContent className="bg-white" />}
                />
                <Bar
                  dataKey="Salary"
                  fill={chartConfig.Salary.color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />
                <Bar
                  dataKey="Bonus"
                  fill={chartConfig.Bonus.color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />
                <Bar
                  dataKey="Tax"
                  fill={chartConfig.Tax.color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />
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
