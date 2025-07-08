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
// const chartData = [
//   {
//     month: "Jan",
//     "Travel Allowance": 80,
//     "Official Fund": 50,
//     "Personal Loan": 100,
//   },
//   {
//     month: "Feb",
//     "Travel Allowance": 60,
//     "Official Fund": 140,
//     "Personal Loan": 100,
//   },
//   {
//     month: "Mar",
//     "Travel Allowance": 70,
//     "Official Fund": 120,
//     "Personal Loan": 300,
//   },
//   {
//     month: "Apr",
//     "Travel Allowance": 30,
//     "Official Fund": 30,
//     "Personal Loan": 200,
//   },
//   {
//     month: "May",
//     "Travel Allowance": 75,
//     "Official Fund": 80,
//     "Personal Loan": 60,
//   },
//   {
//     month: "Jun",
//     "Travel Allowance": 100,
//     "Official Fund": 70,
//     "Personal Loan": 90,
//   },
//   {
//     month: "Jul",
//     "Travel Allowance": 60,
//     "Official Fund": 130,
//     "Personal Loan": 110,
//   },
//   {
//     month: "Aug",
//     "Travel Allowance": 40,
//     "Official Fund": 90,
//     "Personal Loan": 120,
//   },
//   {
//     month: "Sep",
//     "Travel Allowance": 100,
//     "Official Fund": 150,
//     "Personal Loan": 130,
//   },
//   {
//     month: "Oct",
//     "Travel Allowance": 60,
//     "Official Fund": 100,
//     "Personal Loan": 80,
//   },
//   {
//     month: "Nov",
//     "Travel Allowance": 30,
//     "Official Fund": 180,
//     "Personal Loan": 120,
//   },
//   {
//     month: "Dec",
//     ["Travel Allowance"]: 70,
//     "Official Fund": 80,
//     "Personal Loan": 100,
//   },
// ];

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

export function LoanAmountsCharts() {
  const barSize = useResponsiveBarSize();
  const { data } = getLoanCategory();
  console.log(data?.monthly_data);

  const chartData = data?.monthly_data.map((item) => ({
    month: item.month,
    ...item.categories.reduce(
      (
        acc: Record<string, number>,
        curr: { category: string; total_amount: number }
      ) => {
        acc[curr.category] = curr.total_amount;
        return acc;
      },
      {}
    ),
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
                  domain={[0, 8000000]}
                  ticks={[0, 2000000, 4000000, 6000000, 8000000]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={100}
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
