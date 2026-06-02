"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import React from "react";
import { DoughnutChart1 } from "../charts/chart-pie-donut-text";
import { ChartConfig } from "@/components/ui/chart";
import PayrollCard from "@/app/common/payrollCard";
import { getPayrollAnalysis } from "@/stores/getPayrollAnalysis";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";
import StartEndDate from "../common/startEndDate";

const Payroll: React.FC<{
  start_date: string;
  end_date: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  onFetch: () => void;
}> = ({ start_date, end_date, setStartDate, setEndDate, onFetch }) => {
  const { data } = getPayrollAnalysis();

  const chartData1 = [
    {
      browser: "Salary",
      visitors: parseFloat(data?.salary || "0"),
      fill: "bg-[#F5B971]",
    },
    {
      browser: "Loan",
      visitors: parseFloat(data?.loan || "0"),
      fill: "bg-[#78D6E0]",
    },
    {
      browser: "Tax",
      visitors: parseFloat(data?.tax || "0"),
      fill: "bg-[#2E6171]",
    },
    {
      browser: "Bonus",
      visitors: parseFloat(data?.bonus || "0"),
      fill: "bg-[#009BC0]",
    },
  ];

  const percentageString = data?.percentage_full_time || "0";
  const percentage_full_time = parseFloat(percentageString.replace("%", ""));

  const percentageString2 = data?.percentage_contractor || "0";
  const percentage_contractor = parseFloat(percentageString2.replace("%", ""));

  const chartData2 = [
    {
      browser: "Full-time",
      visitors: percentage_full_time || 0,
      fill: "bg-[#78D6E0]",
    },
    {
      browser: "Contractor",
      visitors: percentage_contractor || 0,
      fill: "bg-[#2E6171]",
    },
  ];

  const chartConfig1 = {
    //   visitors: {
    //     label: "Visitors",
    //   },
    Salary: {
      label: "Salary",
      color: "#F5B971",
    },
    Loan: {
      label: "Loan",
      color: "#78D6E0",
    },
    Tax: {
      label: "Tax",
      color: "#2E6171",
    },
    Bonus: {
      label: "Bonus",
      color: "#009BC0",
    },
  } satisfies ChartConfig;

  const chartConfig2 = {
    //   visitors: {
    //     label: "Visitors",
    //   },
    "Full-time": {
      label: "Full-time",
      color: "#78D6E0",
    },
    Contractor: {
      label: "Contractor",
      color: "#2E6171",
    },
  } satisfies ChartConfig;

  const payrollData = [
    {
      heading: "Total Salary Paid",
      subhead:
        `NGN ${data?.total_salary_paid.toLocaleString()}` || "NGN 10,600,000",
    },
    {
      heading: "Total Bonus Paid",
      subhead:
        `NGN ${data?.total_bonus_paid.toLocaleString()}` || "NGN 300,000",
    },
    // {
    //   heading: "Total Expenses",
    //   subhead: "Nil",
    // },
  ];
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Payroll"
            subHead="0% of your NGN payroll this year was allocated to paying out salaries"
          />
        </div>

        <div className="relative">
          <StartEndDate
            start_date={start_date}
            end_date={end_date}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onFetch={onFetch}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 mb-6">
        {payrollData.map((el, i) => {
          return (
            <PayrollCard key={i} heading={el?.heading} subhead={el?.subhead} />
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-x-6">
        <div className="border border-[#d9d9d9]  rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Payroll spend breakdown"
              subHead="0% of your NGN payroll this year was allocated to paying out salaries"
            />
          </div>

          <div className="text-center mt-14 mb-8">
            <DoughnutChart1
              chartConfig={chartConfig1}
              chartData={chartData1}
              total_salary_paid={formatCurrencyShort(
                Number(data?.total_salary_paid),
              )}
              text="paid out"
            />
          </div>
        </div>
        <div className="border border-[#d9d9d9] dark:border-[#424E59] rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Payroll spend by Employment Type"
              subHead="0% of your payroll NGN was allocated to paying out employees in teams."
            />
          </div>

          <div className="text-center mt-12">
            <DoughnutChart1
              chartConfig={chartConfig2}
              chartData={chartData2}
              // total_salary_paid={data?.total_salary_paid}
              // text="paid out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payroll;
