"use client";
import { Cell, Label, Pie, PieChart } from "recharts";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getPayrollAnalysis } from "@/stores/getPayrollAnalysis";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";

let chartData: {
  team_name: string;
  team_total_money: number;
  fill: string;
}[] = [];

const chartConfig = {
  "AI In Software": {
    label: "AI In Software",
    color: "#8B5CF6",
  },
  "Operational Excellence Team": {
    label: "Operational Excellence Team",
    color: "#118AB2",
  },
  Advocate: {
    label: "Advocate",
    color: "#2E6171",
  },
  "Senior Leadership Team": {
    label: "Senior Leadership Team",
    color: "#FFD166",
  },
  "Enterprise Strategy Team": {
    label: "Enterprise Strategy Team",
    color: "#070D13",
  },
  "Legal & Compliance": {
    label: "Legal & Compliance",
    color: "#F97316",
  },
  "Product Office": {
    label: "Product Office",
    color: "#5F3309",
  },
  "Service Management": {
    label: "Service Management",
    color: "#26547C",
  },
  "Domestic Staff": {
    label: "Domestic Staff",
    color: "#A6B1E1",
  },
  "Cloud Upgrade": {
    label: "Cloud Upgrade",
    color: "#67E8F9",
  },
  Design: {
    label: "Design",
    color: "#8A508F",
  },
} satisfies ChartConfig;

// Format currency in Naira
const formatNaira = (value: number) => {
  return `₦ ${value}`;
};

export function TeamPayrollChart() {
  const { data } = getPayrollAnalysis();
  const backendData = data?.Teams || [];

  // Map backend data to include fill color
  chartData = backendData.map((item) => ({
    ...item,
    team_total_money:
      parseFloat(String(item.team_total_money).replace(/,/g, "")) || 0,
    fill:
      chartConfig[item.team_name as keyof typeof chartConfig]?.color ||
      "#CCCCCC",
  }));

  const COLORS = chartData.map((item) => item.fill);

  return (
    <div className="w-full grid md:grid-cols-2 items-center gap-x-[35rem]">
      <CardContent className="p-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[700px] h-[500px] " // Increased height for better spacing
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-white"
                  formatter={(value, name) => {
                    return [
                      formatNaira(Number(value)).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ",",
                      ),
                      name,
                    ];
                  }}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="team_total_money"
              nameKey="team_name"
              innerRadius={70}
              outerRadius={200}
              strokeWidth={0}
              // labelLine={true}
              // label={renderCustomizedLabel}
              startAngle={90}
              minAngle={2} // guarantees a minimum angular size for tiny slices
              endAngle={-270}
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
                          y={(viewBox.cy ?? 0) - 5}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ₦{" "}
                          {formatCurrencyShort(data?.total_salary_paid || "0")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
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
      <CardFooter className="flex flex-col gap-4 items-start">
        {chartData.map((el, i) => (
          <div key={i} className="flex gap-x-2 items-center">
            <p
              className={`w-3 h-3 rounded-full`}
              style={{ backgroundColor: el?.fill }}
            ></p>{" "}
            <p className="text-[13px] font-Graphik text-[#2F2F33]">
              {el?.team_name}
            </p>
          </div>
        ))}{" "}
      </CardFooter>
    </div>
  );
}
