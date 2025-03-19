"use client";
import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";
import { CardContent, CardFooter } from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DoughnutChartProps {
  chartConfig: ChartConfig;
  chartData: { browser: string; visitors: number; fill: string }[];
}

// Custom label component to render percentages
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}) => {
  const RADIAN = Math.PI / 180;
  // Position the label in the middle of each segment
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const lineHeight = 40;
  return (
    <g>
      <text
        x={x}
        y={y - lineHeight / 2}
        fill="white"
        textAnchor="middle"
        dominantBaseline="bottom"
        className="font-normal text-[13px] font-Graphik md:text-xs"
      >
        {name}
      </text>

      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-semibold text-[13px] font-Graphik md:text-sm"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export function DoughnutChart1({ chartConfig, chartData }: DoughnutChartProps) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  // Calculate percentages for each data point
  const dataWithPercentages = React.useMemo(() => {
    return chartData.map((item) => ({
      ...item,
      percentage: (item?.visitors / totalVisitors) * 100,
    }));
  }, [chartData, totalVisitors]);

  // Get colors from the chart config
  const COLORS = Object.values(chartConfig)
    .filter(
      (config): config is { label: string; color: string } => "color" in config
    )
    .map((config) => config.color);

  return (
    <>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full h-[full]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  nameKey="visitors"
                  formatter={(value, name) => {
                    const item = dataWithPercentages.find(
                      (d) => d?.browser === name
                    );
                    return [
                      `${value.toLocaleString()} (${item?.percentage.toFixed(
                        1
                      )}%)`,
                      name,
                    ];
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={75}
              strokeWidth={5}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ₦ {totalVisitors.toLocaleString()}K
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          paid out
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-4 font-medium leading-none">
          {chartData.map((el, i) => (
            <div key={i} className="flex gap-x-2 items-center">
              <p className={`w-3 h-3 rounded-full ${el?.fill}`}></p>
              <p className="text-[13px] font-Graphik text-[#2F2F33]">
                {el?.browser}
              </p>
            </div>
          ))}
        </div>
      </CardFooter>
    </>
  );
}
