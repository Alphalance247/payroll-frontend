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

// chartData = [
//   {
//     department: "Development",
//     amount: 500000,
//     fill: "#8b5cf6",
//   },
//   {
//     department: "DEVOPS",
//     amount: 200000,
//     fill: "#0ea5e9",
//   },
//   {
//     department: "Advocate",
//     amount: 1500000,
//     fill: "#1e293b",
//   },
//   {
//     department: "Cloud",
//     amount: 1000000,
//     fill: "#fcd34d",
//   },
//   {
//     department: "Quality Assurance",
//     amount: 1000000,
//     fill: "#0f172a",
//   },
//   {
//     department: "Product Office",
//     amount: 500000,
//     fill: "#78350f",
//   },
//   {
//     department: "ITSM",
//     amount: 500000,
//     fill: "#334155",
//   },
//   {
//     department: "Domestic Staff",
//     amount: 500000,
//     fill: "#cbd5e1",
//   },
//   {
//     department: "Design",
//     amount: 500000,
//     fill: "#67e8f9",
//   },
//   {
//     department: "Management",
//     amount: 500000,
//     fill: "#67e8f9",
//   },
// ];

const chartConfig = {
  Development: {
    label: "Design & Development",
    color: "#8b5cf6",
  },
  DEVOPS: {
    label: "DEVOPS",
    color: "#118AB2",
  },
  Advocate: {
    label: "Advocate",
    color: "#2E6171",
  },
  Cloud: {
    label: "Cloud",
    color: "#FFD166",
  },
  "Quality  Assurance": {
    label: "Quality Assurance",
    color: "#070D13",
  },
  "Legal & Compliance": {
    label: "Legal & Compliance",
    color: "#f97316",
  },
  "Product Office": {
    label: "Product Office",
    color: "#5F3309",
  },
  ITSM: {
    label: "ITSM",
    color: "#26547C",
  },
  "Domestic Staff": {
    label: "Domestic Staff",
    color: "#A6B1E1",
  },
  Management: {
    label: "Artificial Intelligence",
    color: "#67e8f9",
  },
  Design: {
    label: "Design",
    color: "#8A508F",
  },
} satisfies ChartConfig;

// Format currency in Naira
const formatNaira = (value: number) => {
  return `₦ ${value.toLocaleString()}`;
};

// Custom label component with improved spacing
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  index,
  name,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}) => {
  const RADIAN = Math.PI / 180;
  const data = chartData[index];

  // Calculate angle in radians
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);

  // Calculate outer point of the pie segment
  const outerX = cx + outerRadius * cos;
  const outerY = cy + outerRadius * sin;

  // Increase the distance for better spacing
  // Adjust the vertical position based on the angle to prevent overlap
  const verticalOffset = getVerticalOffset(midAngle, index);

  // Calculate the mid point for the horizontal line with vertical offset
  const midX = cx + (outerRadius + 30) * cos;
  const midY = outerY + verticalOffset;

  // Calculate the end point for the horizontal line
  // Make lines extend further for better spacing with text
  const extendFactor = cos >= 0 ? 80 : -80;
  const endX = midX + extendFactor;
  const endY = midY;

  // Determine text anchor based on position
  const textAnchor = cos >= 0 ? "start" : "end";

  // Text position (slightly offset from line end)
  const textOffsetX = cos >= 0 ? 5 : -5;
  const labelX = endX + textOffsetX;

  // Format the amount
  const formattedAmount = formatNaira(data?.team_total_money);

  return (
    <g>
      {/* Connector line from pie to label with vertical offset */}
      <path
        d={`M${outerX},${outerY}L${midX},${midY}L${endX},${endY}`}
        stroke={data.fill}
        fill="none"
        strokeWidth={1}
      />

      {/* Department name */}
      <text
        x={labelX}
        y={endY - 10}
        fill="#000"
        textAnchor={textAnchor}
        className="text-sm font-medium"
        dominantBaseline="auto"
      >
        {name}
      </text>

      {/* Amount with Naira symbol */}
      <text
        x={labelX}
        y={endY + 10}
        fill={data?.team_name === "Cloud" ? "#fbbf24" : data.fill}
        textAnchor={textAnchor}
        className="text-sm font-medium"
        dominantBaseline="auto"
      >
        {formattedAmount}
      </text>
    </g>
  );
};

// Helper function to calculate vertical offset based on angle
// This helps prevent label overlap by adjusting vertical position
function getVerticalOffset(midAngle: number, index: number): number {
  // Convert angle to 0-360 range
  const angle = (midAngle + 360) % 360;

  // Create spacing based on which quadrant the label is in
  if (angle >= 0 && angle < 90) {
    // Top right quadrant
    return -30 * (index % 3);
  } else if (angle >= 90 && angle < 180) {
    // Top left quadrant
    return -30 * (index % 3);
  } else if (angle >= 180 && angle < 270) {
    // Bottom left quadrant
    return 30 * (index % 3);
  } else {
    // Bottom right quadrant
    return 30 * (index % 3);
  }
}

export function TeamPayrollChart() {
  const { data } = getPayrollAnalysis();
  const backendData = data?.Teams || [];

  // Map backend data to include fill color
  chartData = backendData.map((item) => ({
    ...item,
    fill:
      chartConfig[item.team_name as keyof typeof chartConfig]?.color ||
      "#cccccc", // fallback color
  }));

  const COLORS = chartData.map((item) => item.fill);

  // chartData = [
  //   {
  //     department: "Development",
  //     amount: 500000,
  //     fill: "#8b5cf6",
  //   },
  //   {
  //     department: "DEVOPS",
  //     amount: 200000,
  //     fill: "#0ea5e9",
  //   },
  //   {
  //     department: "Advocate",
  //     amount: 1500000,
  //     fill: "#1e293b",
  //   },
  //   {
  //     department: "Cloud",
  //     amount: 1000000,
  //     fill: "#fcd34d",
  //   },
  //   {
  //     department: "Quality Assurance",
  //     amount: 1000000,
  //     fill: "#0f172a",
  //   },
  //   {
  //     department: "Product Office",
  //     amount: 500000,
  //     fill: "#78350f",
  //   },
  //   {
  //     department: "ITSM",
  //     amount: 500000,
  //     fill: "#334155",
  //   },
  //   {
  //     department: "Domestic Staff",
  //     amount: 500000,
  //     fill: "#cbd5e1",
  //   },
  //   {
  //     department: "Design",
  //     amount: 500000,
  //     fill: "#67e8f9",
  //   },
  //   {
  //     department: "Management",
  //     amount: 500000,
  //     fill: "#67e8f9",
  //   },
  // ];

  return (
    <div className="w-full grid md:grid-cols-2 items-center gap-x-[35rem]">
      <CardContent className="p-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[800px] h-[550px] " // Increased height for better spacing
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="bg-white"
                  formatter={(value, name) => {
                    return [formatNaira(Number(value)), name];
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
              labelLine={false}
              label={renderCustomizedLabel}
              startAngle={90}
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
                          {formatCurrencyShort(Number(data?.total_salary_paid))}
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
