"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

const chartConfig = {
  value: {
    label: "Value",
    color: "#009BC0",
  },
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

export function EmployeesPerTeamChart({
  chartData,
  domain,
  ticks,
  dataKeyX,
  dataKeyBar,
}: {
  chartData: { team_name: string; count: number }[];
  domain?: [number, number];
  ticks?: number[];
  dataKeyX?: string;
  dataKeyBar?: string;
}) {
  const barSize = useResponsiveBarSize();

  return (
    <Card className="border-0 shadow-none w-full">
      <CardContent className="p-0 ">
        <div className="w-full overflow-x-auto">
          <div className="min-w-full ">
            <ChartContainer
              config={chartConfig}
              className="h-[550px] w-full mx-auto "
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
                  // dataKey="team_name"
                  dataKey={dataKeyX || "name"}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  interval={0}
                  height={60}
                />
                <YAxis
                  domain={domain || [0, 8]}
                  ticks={ticks || [0, 2, 4, 6, 8]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  width={50}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent className="bg-white" />}
                />

                <Bar
                  // dataKey="count"
                  dataKey={dataKeyBar || "value"}
                  fill="#009BC0"
                  radius={[0, 0, 0, 0]}
                  barSize={barSize}
                >
                  <LabelList
                    dataKey="count"
                    position="insideTop"
                    className="fill-[white] p-3 m-4"
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
