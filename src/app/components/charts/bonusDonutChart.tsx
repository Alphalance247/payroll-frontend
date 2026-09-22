"use client";
import { useMemo } from "react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface BonusTypeSlice {
  label: string;
  value: number;
  color: string;
}

interface BonusDonutChartProps {
  data: BonusTypeSlice[];
  totalLabel?: string;
  formatValue?: (v: number) => string;
  formatTotal?: (total: number) => string;
  totalDisplay?: string;
}

function defaultFormat(v: number) {
  if (v >= 1_000_000) return `₦${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `₦${(v / 1_000).toFixed(0)}K`;
  return `₦${v.toLocaleString()}`;
}

export default function BonusDonutChart({
  data,
  totalLabel = "Total paid out",
  formatValue = (v) => `₦${v.toLocaleString()}`,
  formatTotal = defaultFormat,
  totalDisplay,
}: BonusDonutChartProps) {
  const total = useMemo(
    () => data.reduce((acc, d) => acc + d.value, 0),
    [data],
  );

  const chartConfig = useMemo(
    () =>
      Object.fromEntries(
        data.map((d) => [d.label, { label: d.label, color: d.color }]),
      ),
    [data],
  );

  return (
    <div className="grid grid-cols-[50%_50%] justify-between items-center gap-6 py-6 pr-8 pl-2">
      {/* Donut */}
      <ChartContainer
        config={chartConfig}
        className="w-[276px] h-[210px] flex-shrink-0"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                className="bg-white"
                formatter={(value, name) => {
                  const pct =
                    total > 0
                      ? ((Number(value) / total) * 100).toFixed(1)
                      : "0";
                  return [`${formatValue(Number(value))} (${pct}%)`, name];
                }}
              />
            }
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={72}
            outerRadius={104}
            strokeWidth={2}
            stroke="#fff"
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={entry.color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                  return null;
                return (
                  <text textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) - 10}
                      className="fill-[#2F2F33] text-lg font-semibold"
                      fontSize={18}
                      fontWeight={600}
                    >
                      {totalDisplay ?? formatTotal(total)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 12}
                      className="fill-[#71717A]"
                      fontSize={12}
                      fill="#71717A"
                    >
                      {totalLabel}
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Legend */}
      <div className="flex flex-col gap-4">
        {data.map((d) => {
          const pct = total > 0 ? ((d.value / total) * 100).toFixed(0) : "0";
          return (
            <div key={d.label} className="flex items-center gap-10">
              <div className="flex items-center gap-1.5 min-w-[120px]">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: d.color }}
                />
                <span className="text-xs font-medium text-[#2F2F33]">
                  {d.label}
                </span>
              </div>
              <span className="text-xs text-right whitespace-nowrap">
                <span className="font-medium text-[#2F2F33]">
                  {formatValue(d.value)}{" "}
                </span>
                <span className="text-[#71717A]">({pct}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
