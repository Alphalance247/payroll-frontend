"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    month: "Jan",
    Salary: 800000,
    Bonus: 900000,
    Tax: 500000,
  },
  {
    month: "Feb",
    Salary: 600000,
    Bonus: 400000,
    Tax: 1400000,
  },
  {
    month: "Mar",
    Salary: 700000,
    Bonus: 600000,
    Tax: 1200000,
  },
  {
    month: "Apr",
    Salary: 300000,
    Bonus: 200000,
    Tax: 300000,
  },
  {
    month: "May",
    Salary: 750000,
    Bonus: 450000,
    Tax: 800000,
  },
  {
    month: "Jun",
    Salary: 1000000,
    Bonus: 100000,
    Tax: 700000,
  },
  {
    month: "Jul",
    Salary: 600000,
    Bonus: 300000,
    Tax: 1300000,
  },
  {
    month: "Aug",
    Salary: 400000,
    Bonus: 200000,
    Tax: 900000,
  },
  {
    month: "Sep",
    Salary: 1000000,
    Bonus: 700000,
    Tax: 1500000,
  },
  {
    month: "Oct",
    Salary: 600000,
    Bonus: 1400000,
    Tax: 1000000,
  },
  {
    month: "Nov",
    Salary: 300000,
    Bonus: 600000,
    Tax: 1800000,
  },
  {
    month: "Dec",
    Salary: 700000,
    Bonus: 200000,
    Tax: 800000,
  },
];

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
                  content={<ChartTooltipContent className="bg-white" />}
                  formatter={(value: number) => {
                    if (value >= 1000000) {
                      return `${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}k`;
                    }
                    return value;
                  }}
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
