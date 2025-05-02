"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
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
    "Travel Allowance": 80,
    "Full-time": 50,
  },
  {
    month: "Feb",
    "Travel Allowance": 60,
    "Full-time": 140,
  },
  {
    month: "Mar",
    "Travel Allowance": 70,
    "Full-time": 120,
  },
  {
    month: "Apr",
    "Travel Allowance": 30,
    "Full-time": 30,
  },
  {
    month: "May",
    "Travel Allowance": 75,
    "Full-time": 80,
  },
  {
    month: "Jun",
    "Travel Allowance": 100,
    "Full-time": 70,
  },
  {
    month: "Jul",
    "Travel Allowance": 60,
    "Full-time": 130,
  },
  {
    month: "Aug",
    "Travel Allowance": 40,
    "Full-time": 90,
  },
  {
    month: "Sep",
    "Travel Allowance": 100,
    "Full-time": 150,
  },
  {
    month: "Oct",
    "Travel Allowance": 60,
    "Full-time": 100,
  },
  {
    month: "Nov",
    "Travel Allowance": 30,
    "Full-time": 180,
  },
  {
    month: "Dec",
    ["Travel Allowance"]: 70,
    "Full-time": 80,
  },
];

const chartConfig = {
  "Travel Allowance": {
    label: "Travel Allowance",
    color: "hsl(195, 30%, 40%)",
  },

  "Full-time": {
    label: "Full-time",
    color: "hsl(35, 90%, 75%)",
  },
};

function useResponsiveBarSize() {
  const [barSize, setBarSize] = useState(4000);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBarSize(250); // Mobile bar size
      } else if (window.innerWidth < 1024) {
        setBarSize(350); // Tablet bar size
      } else {
        setBarSize(400); // Desktop bar size
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return barSize;
}

export function LoanAmountsCharts() {
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
                margin={{ top: 40, right: 30, left: -20, bottom: 15 }}
                layout="horizontal"
                className="w-full"
                barCategoryGap={8}
                barGap={0}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="text-[black] bg-black"
                  fontSize={30}
                />
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
                  //   tickFormatter={formatYAxis}
                  domain={[0, 300]}
                  ticks={[0, 50, 100, 150, 200, 250]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={100}
                  //   label={{
                  //     value: "Total Amount (USD)",
                  //     angle: -90,
                  //     position: "insideLeft",
                  //     style: { textAnchor: "middle" },
                  //     offset: -40,
                  //   }}
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
                  dataKey="Full-time"
                  fill={chartConfig["Full-time"].color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />

                <Bar
                  dataKey="'Travel Allowance'"
                  fill={chartConfig["Travel Allowance"].color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                >
                  {/* Add labels on top of the stacked bars */}
                  <LabelList
                    dataKey="Contractors"
                    position="top"
                    style={{
                      fontSize: "11px",
                      fill: "#666",
                      fontWeight: 500,
                    }}
                  />
                </Bar>

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
