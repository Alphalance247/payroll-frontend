"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";

export interface DonutBreakdownSegment {
  key: string;
  label: string;
  value: number;
  color: string;
  // Backend-provided percentage, when the API already computes it — falls
  // back to a client-side total% when omitted.
  percentage?: number;
}

interface DonutBreakdownCardProps {
  title: string;
  centerLabel: string;
  segments: DonutBreakdownSegment[];
  showPercentage?: boolean;
  // Overrides the sum of segment values — use the API's own total when it's
  // provided, since it's the source of truth (segments may not add up to it
  // exactly due to rounding).
  total?: number;
}

const DonutBreakdownCard = ({
  title,
  centerLabel,
  segments,
  showPercentage = true,
  total: totalOverride,
}: DonutBreakdownCardProps) => {
  const total =
    totalOverride ?? segments.reduce((sum, s) => sum + s.value, 0);

  const chartConfig = segments.reduce<ChartConfig>((config, s) => {
    config[s.key] = { label: s.label, color: s.color };
    return config;
  }, {});

  const chartData = segments.map((s) => ({
    key: s.key,
    value: s.value,
    fill: `var(--color-${s.key})`,
  }));

  return (
    <div className="flex-1 bg-white rounded-xl border border-[#E3E3E5] overflow-hidden">
      <div className="p-6 border-b border-[#E3E3E5]">
        <h3 className="text-base font-medium leading-6 text-[#2F2F33]">
          {title}
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center gap-6">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => [
                    `₦${Number(value).toLocaleString()}`,
                    String(chartConfig[name as string]?.label ?? name),
                  ]}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="key"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={0}
            >
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
                          y={(viewBox.cy ?? 0) - 10}
                          className="fill-[#71717A] text-sm"
                        >
                          {centerLabel}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 14}
                          className="fill-[#2F2F33] text-xl font-semibold"
                        >
                          ₦{formatCurrencyShort(total)}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="w-full flex flex-col gap-4">
          {segments.map((s) => {
            const percentage =
              s.percentage ??
              (total > 0 ? Math.round((s.value / total) * 100) : 0);
            return (
              <div key={s.key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-sm font-normal leading-5 text-[#2F2F33]">
                    {s.label}
                  </span>
                </div>
                <span className="text-sm font-normal leading-5 text-[#2F2F33]">
                  ₦{formatCurrencyShort(s.value)}
                  {showPercentage ? ` (${percentage}%)` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DonutBreakdownCard;
