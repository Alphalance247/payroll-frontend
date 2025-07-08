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
import { getYearlyJobType } from "@/stores/analytics/getYearlyJobType";

const chartConfig = {
  Contractors: {
    label: "Contractors",
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

export function EmploymentsTypeChart() {
  const barSize = useResponsiveBarSize();

  const { data: yearlyJobTypeData } = getYearlyJobType();

  const chartData = [
    {
      month: "Jan",
      Contractors: yearlyJobTypeData?.data?.January?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.January?.["Full time"],
    },
    {
      month: "Feb",
      Contractors: yearlyJobTypeData?.data?.February?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.February?.["Full time"],
    },
    {
      month: "Mar",
      Contractors: yearlyJobTypeData?.data?.March?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.March?.["Full time"],
    },
    {
      month: "Apr",
      Contractors: yearlyJobTypeData?.data?.April?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.April?.["Full time"],
    },
    {
      month: "May",
      Contractors: yearlyJobTypeData?.data?.May?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.May?.["Full time"],
    },
    {
      month: "Jun",
      Contractors: yearlyJobTypeData?.data?.June?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.June?.["Full time"],
    },
    {
      month: "Jul",
      Contractors: yearlyJobTypeData?.data?.July?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.July?.["Full time"],
    },
    {
      month: "Aug",
      Contractors: yearlyJobTypeData?.data?.August?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.August?.["Full time"],
    },
    {
      month: "Sep",
      Contractors: yearlyJobTypeData?.data?.September?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.September?.["Full time"],
    },
    {
      month: "Oct",
      Contractors: yearlyJobTypeData?.data?.October?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.October?.["Full time"],
    },
    {
      month: "Nov",
      Contractors: yearlyJobTypeData?.data?.November?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.November?.["Full time"],
    },
    {
      month: "Dec",
      Contractors: yearlyJobTypeData?.data?.December?.Contractors,
      "Full-time": yearlyJobTypeData?.data?.December?.["Full time"],
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
                  domain={[0, 70]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
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
                />

                <Bar
                  dataKey="Full-time"
                  fill={chartConfig["Full-time"].color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                />

                <Bar
                  dataKey="Contractors"
                  fill={chartConfig.Contractors.color}
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                  stackId="a"
                ></Bar>

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
