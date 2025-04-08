"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    name: "Joshua\nEzeoke",
    value: 850000,
  },
  {
    name: "Daniel\nAlade",
    value: 600000,
  },
  {
    name: "Adetayo\nOyebanji",
    value: 750000,
  },
  {
    name: "James\nAdelabu",
    value: 300000,
  },
  {
    name: "Sandra\nOyinmeachi",
    value: 780000,
  },
  {
    name: "Matthew\nKelvin",
    value: 980000,
  },
  {
    name: "Margaret\nOkechukwu",
    value: 580000,
  },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(199, 30%, 50%)",
  },
};

const formatYAxis = (value: number): string => {
  if (value === 0) return "0";
  if (value === 500000) return "500k";
  if (value === 1000000) return "1M";
  if (value === 2000000) return "2M";
  if (value === 3000000) return "3M";
  if (value === 4000000) return "4M";
  return value.toString();
};

function useResponsiveBarSize() {
  const [barSize, setBarSize] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBarSize(50);
      } else if (window.innerWidth < 1024) {
        setBarSize(65);
      } else {
        setBarSize(80);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return barSize;
}

export function SpendingChart() {
  const barSize = useResponsiveBarSize();

  return (
    <Card className="border-0 shadow-none w-full">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-full">
            <ChartContainer
              config={chartConfig}
              className="h-[550px] w-full mx-auto"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 40, right: 30, left: 40, bottom: 20 }}
                layout="horizontal"
                className="w-full"
                barCategoryGap={5} // Reduced spacing between bars
                barGap={0} // Minimal gap between bars in the same category
              >
                <CartesianGrid
                  horizontal
                  vertical
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  interval={0}
                  height={60}
                />
                <YAxis
                  tickFormatter={formatYAxis}
                  domain={[0, 4000000]}
                  ticks={[0, 500000, 1000000, 2000000, 3000000, 4000000]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={50}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="bg-white" />}
                  formatter={(value: number) => {
                    if (value >= 1000000) {
                      return `${(value / 1000000).toFixed(1)}M`;
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(1)}k`;
                    }
                    return value;
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(199, 30%, 50%)"
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
