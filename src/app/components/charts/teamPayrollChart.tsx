// "use client";

// import * as React from "react";
// import { Label, Pie, PieChart } from "recharts";

// import { CardContent, CardFooter } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "bg-[#F5B971]" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig;

// export function TeamPayrollChart() {
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
//   }, []);

//   return (
//     <div className="grid md:grid-cols-2 items-center">
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square [&_.recharts-pie-label-text]:fill-foreground w-full h-[full]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="visitors"
//               nameKey="browser"
//               innerRadius={75}
//               strokeWidth={5}
//               label
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Visitors
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex flex-col gap-4">
//         {chartData.map((el, i) => (
//           <div key={i} className="flex gap-x-2 items-center">
//             <p className={`w-3 h-3 rounded-full ${el?.fill}`}></p>
//             <p className="text-[13px] font-Graphik text-[#2F2F33]">
//               {el?.browser}
//             </p>
//           </div>
//         ))}
//       </CardFooter>
//     </div>
//   );
// }

"use client";
import { Cell, Label, Pie, PieChart } from "recharts";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { department: "Design & Development", amount: 1500000, fill: "#8b5cf6" },
  { department: "DEVOPS", amount: 200000, fill: "#0ea5e9" },
  { department: "Advocate", amount: 1500000, fill: "#1e293b" },
  { department: "Cloud", amount: 1000000, fill: "#fcd34d" },
  { department: "Quality Assurance", amount: 1000000, fill: "#0f172a" },
  { department: "Legal & Compliance", amount: 300000, fill: "#f97316" },
  { department: "Product Office", amount: 500000, fill: "#78350f" },
  { department: "ITSM", amount: 500000, fill: "#334155" },
  { department: "Domestic Staff", amount: 500000, fill: "#cbd5e1" },
  { department: "Artificial Intelligence", amount: 500000, fill: "#67e8f9" },
];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  "Design & Development": {
    label: "Design & Development",
    color: "#8b5cf6",
  },
  DEVOPS: {
    label: "DEVOPS",
    color: "#0ea5e9",
  },
  Advocate: {
    label: "Advocate",
    color: "#1e293b",
  },
  Cloud: {
    label: "Cloud",
    color: "#fcd34d",
  },
  "Quality Assurance": {
    label: "Quality Assurance",
    color: "#0f172a",
  },
  "Legal & Compliance": {
    label: "Legal & Compliance",
    color: "#f97316",
  },
  "Product Office": {
    label: "Product Office",
    color: "#78350f",
  },
  ITSM: {
    label: "ITSM",
    color: "#334155",
  },
  "Domestic Staff": {
    label: "Domestic Staff",
    color: "#cbd5e1",
  },
  "Artificial Intelligence": {
    label: "Artificial Intelligence",
    color: "#67e8f9",
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
  const formattedAmount = formatNaira(data.amount);

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
        fill={data.department === "Cloud" ? "#fbbf24" : data.fill}
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
  // Get colors from the chart data
  const COLORS = chartData.map((item) => item.fill);

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
              dataKey="amount"
              nameKey="department"
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
                          ₦ 300K
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
            <p className={`w-3 h-3 rounded-full bg-[${el?.fill}]`}></p>{" "}
            <p className="text-[13px] font-Graphik text-[#2F2F33]">
              {el?.department}
            </p>
          </div>
        ))}{" "}
      </CardFooter>
    </div>
  );
}
