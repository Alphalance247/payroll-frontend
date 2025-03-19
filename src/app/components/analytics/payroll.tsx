import HeadingSubHead from "@/app/common/headingSubHead";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { DoughnutChart1 } from "../charts/chart-pie-donut-text";
import { ChartConfig } from "@/components/ui/chart";

const Payroll: React.FC = () => {
  const chartData1 = [
    { browser: "Salary", visitors: 275, fill: "bg-[#F5B971]" },
    { browser: "Loan", visitors: 200, fill: "bg-[#78D6E0]" },
    { browser: "Tax", visitors: 287, fill: "bg-[#2E6171]" },
    { browser: "Bonus", visitors: 173, fill: "bg-[#009BC0]" },
  ];

  const chartData2 = [
    { browser: "Full-time", visitors: 275, fill: "bg-[#78D6E0]" },
    { browser: "Contractor", visitors: 200, fill: "bg-[#2E6171]" },
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

  const data = [
    {
      heading: "Total Salary Paid",
      subhead: "NGN 10,600,000",
    },
    {
      heading: "Total Bonus Paid",
      subhead: "NGN 300,000",
    },
    {
      heading: "Total Expenses",
      subhead: "NGN 500,000",
    },
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
          <div
            className="flex items-center gap-x-4 px-4 py-3 bg-white border border-[#d9d9d9]  rounded-lg cursor-pointer w-fit"
            // onClick={handleOpen}
          >
            <p className="">
              <span className="text-base font-Graphik text-[#2F2F33] tracking-[-0.3px]">
                Last 12 months
              </span>{" "}
              <span className="font-medium text-[15px] leading-5 text-[#262626] ">
                {""}
              </span>
            </p>
            <FaCaretDown size={20} color="black" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 mb-6">
        {data.map((el, i) => {
          return (
            <div
              className="p-4 bg-[#F7F7F7] rounded-xl border border-[#E3E3E5]"
              key={i}
            >
              <p
                className={`font-Graphik font-semibold text-[#71717A]  text-[13px] mb-4`}
              >
                {el?.heading}
              </p>
              <h5
                className={` font-Graphik font-semibold text-[#2F2F33] text-lg`}
              >
                {el?.subhead}
              </h5>
            </div>
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
            <DoughnutChart1 chartConfig={chartConfig1} chartData={chartData1} />
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
            <DoughnutChart1 chartConfig={chartConfig2} chartData={chartData2} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payroll;
