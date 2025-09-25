"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, LabelList, Label, Cell } from "recharts";
import { getLeaveBalance } from "@/stores/employee-dashboard/analytics/LeaveBalance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import React, { useEffect, useMemo } from "react";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";

export const description = "A donut chart";
interface PieChartProps {
  // title: string;
  // chartData: {
  //   leave_type: string;
  //   days_taken: number;
  //   total_entitled: number;
  //   remaining_balance: number;
  //   leave_cycle_end: number;
  // }[];
  children: any;
}

const LeavePieChart = () =>
  // { children }: PieChartProps
  {
    const { error, loading, fetchLeaveBalance, data } = getLeaveBalance();
    useEffect(() => {
      fetchLeaveBalance();
    }, [fetchLeaveBalance]);
    //
    // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    const chartConfig = {
      value: {
        label: "Value",
      },
      total_entitled: {
        label: "Total Entitled",
        color: "#0088FE",
      },
      carry_over: {
        label: "Carry Over",
        color: "#FF8042",
      },
      days_taken: {
        label: "Days Taken",
        color: "#00C49F",
      },
      remaining_balance: {
        label: "Remaining Balance",
        color: "#FFBB28",
      },
    } satisfies ChartConfig;
    return (
      <>
        {loading ? (
          <Spinner spinnerSmall={true} />
        ) : error ? (
          <ErrorFetch onRefetch={fetchLeaveBalance} message={error} />
        ) : (
          <div className="mb-8 ">
            <>
              {data?.map((leave, index) => {
                const chartData = [
                  {
                    name: "Total Entitled",
                    value: leave.total_entitled,
                    fill: "#0088FE",
                  },
                  {
                    name: " days_taken",
                    value: leave.days_taken,
                    fill: "#00C49F",
                  },
                  {
                    name: " remaining_balance",
                    value: leave.remaining_balance,
                    fill: "#FFBB28",
                  },
                  {
                    name: " carry_over",
                    value: leave.carryover,
                    fill: "#FF8042",
                  },
                ];
                return (
                  <div className="h-[396px] border border-[#E3E3E5] rounded-[8px] my-8">
                    <div>
                      <div className="border-b border-[#E3E3E5] h-[52px]">
                        <div className=" py-4 pl-4 text-[#2F2F33] text-sm font-semibold font-Graphik capitalize">
                          {leave.leave_type}
                        </div>
                      </div>
                      <div
                        className="flex justify-between items-center h-[344px] mx-14"
                        key={index}
                      >
                        <CardContent className="flex-1 pb-0 ">
                          <ChartContainer
                            config={chartConfig}
                            className=" aspect-square max-h-[264px]"
                          >
                            <PieChart>
                              <ChartTooltip
                                cursor={false}
                                content={
                                  <ChartTooltipContent
                                    hideLabel
                                    className="bg-black opacity-95 capitalize  font-medium text-white "
                                  />
                                }
                              />
                              <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                              />
                            </PieChart>
                          </ChartContainer>
                        </CardContent>
                        <div className="border border-[#E3E3E5] rounded-[8px] ">
                          <table className="h-[264px] w-[502px]  table-auto font-Graphik text-sm ">
                            <thead className="bg-[#E3E3E5] h-[44px]">
                              <tr className="">
                                <th className="text-left text-[#71717A]  font-medium  px-6 capitalize ">
                                  {leave.leave_type}
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody className=" divide-y divide-[#EAECF0] capitalize">
                              <tr>
                                <td className="px-6 capitalize bg-[#F1F1F2] ">
                                  total Leave Days
                                </td>
                                <td className="px-6 capitalize bg-[#F1F1F2] ">
                                  {leave.total_entitled}
                                </td>
                              </tr>
                              <tr
                                className={
                                  index % 2 ? " bg-[#F1F1F2] " : "bg-[#F7F7F7]"
                                }
                              >
                                <td className="px-6 capitalize ">
                                  Remaining Balance
                                </td>
                                <td className="px-6 capitalize">
                                  {leave.remaining_balance}
                                </td>
                              </tr>
                              <tr
                                className={
                                  index % 2 ? " bg-[#F1F1F2] " : "bg-[#F7F7F7]"
                                }
                              >
                                <td className="px-6 capitalize ">Days Taken</td>
                                <td className="px-6 capitalize">
                                  {leave.days_taken}
                                </td>
                              </tr>
                              <tr
                                className={
                                  index % 2 ? " bg-[#F1F1F2] " : "bg-[#F7F7F7]"
                                }
                              >
                                <td className="px-6 capitalize ">Carry Over</td>
                                <td className="px-6 capitalize">
                                  {leave.carryover}
                                </td>
                              </tr>
                            </tbody>
                            <tfoot className="h-[44px] bg-[#E3E3E5] text-[#2F2F33]">
                              <tr className="">
                                <td className="px-6  font-medium ">
                                  Leave Cycle Ends
                                </td>
                                <td className="px-6  font-medium ">
                                  {leave.leave_cycle_end}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        )}
      </>
    );
  };

export default LeavePieChart;
