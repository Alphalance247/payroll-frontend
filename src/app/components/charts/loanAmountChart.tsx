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
import { getLoanCategory } from "@/stores/analytics/getLoanCategory";

const chartConfig = {
  "Travel Allowance": {
    label: "Travel Allowance",
    color: "#FFD166",
  },

  "Official Fund": {
    label: "Official Fund",
    color: "#2E6171",
  },

  "Personal Loan": {
    label: "Personal Loan",
    color: "#8A508F",
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

const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function LoanAmountsCharts() {
  const barSize = useResponsiveBarSize();
  const { data } = getLoanCategory();

  // Index backend data by month name for O(1) lookup
  const backendByMonth: Record<string, Record<string, number>> = {};
  data?.monthly_data.forEach((item) => {
    const shortMonth = item.month?.slice(0, 3);
    backendByMonth[shortMonth] = item.categories.reduce(
      (
        acc: Record<string, number>,
        curr: { category: string; total_amount: number },
      ) => {
        acc[curr.category] =
          parseFloat(String(curr.total_amount).replace(/,/g, "")) || 0;
        return acc;
      },
      {},
    );
  });

  // Always render all 12 months; missing months get 0 for all categories
  const chartData = ALL_MONTHS.map((month) => ({
    month,
    "Official Fund": 0,
    "Travel Allowance": 0,
    "Personal Loan": 0,
    ...(backendByMonth[month] ?? {}),
  }));

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
                  domain={[0, 5000000]}
                  ticks={[0, 1000000, 2000000, 3000000, 4000000, 5000000]}
                  tickFormatter={(v: number) => v === 0 ? "0" : `${v / 1000000}M`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={50}
                  className="font-Graphik text-[#71717A] text-sm font-medium"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="bg-white" />}
                />

                <Bar
                  dataKey="Official Fund"
                  fill={chartConfig["Official Fund"].color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />

                <Bar
                  dataKey="Travel Allowance"
                  fill={chartConfig["Travel Allowance"].color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />

                <Bar
                  dataKey="Personal Loan"
                  fill={chartConfig["Personal Loan"].color}
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
