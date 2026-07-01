import { useState } from "react";
import HeadingSubHead from "@/app/common/headingSubHead";
import PayrollCard from "@/app/common/payrollCard";
import { DoughnutChart1 } from "../charts/chart-pie-donut-text";
import { ChartConfig } from "@/components/ui/chart";
import { LoanTrendChart } from "../charts/loanTrendChart";
import { getLoanAnalytics } from "@/stores/getLoanAnalytics";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";
import StartEndDate from "../common/startEndDate";

const Loan = () => {
  const { data: loanData, fetchLoanAnalytics } = getLoanAnalytics();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const data = [
    {
      heading: "Total Loans Disbursed",
      subhead: `NGN ${loanData?.total_loans_disbursed || 0}`,
    },
    {
      heading: "Total Repayments Collected",
      subhead: `NGN ${loanData?.total_repayments_collected || 0}`,
    },
    {
      heading: "Outstanding Loan Balance",
      subhead: `NGN ${loanData?.outstanding_loan_balance || 0}`,
    },
  ];

  const toNum = (val: string | number | undefined) =>
    parseFloat(String(val ?? "0").replace(/,/g, "")) || 0;

  const chartData1 = [
    {
      browser: "Approved",
      visitors: toNum(loanData?.approved),
      fill: "bg-[#F5B971]",
    },
    {
      browser: "Pending",
      visitors: toNum(loanData?.pending),
      fill: "bg-[#78D6E0]",
    },
    {
      browser: "Rejected",
      visitors: toNum(loanData?.rejected),
      fill: "bg-[#2E6171]",
    },
    {
      browser: "Disbursed",
      visitors: toNum(loanData?.disbursed),
      fill: "bg-[#009BC0]",
    },
  ];

  const chartConfig1 = {
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

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Loan"
            subHead=" Shows a breakdown of loan distribution and trends over time."
          />
        </div>

        <StartEndDate
          start_date={start_date}
          end_date={end_date}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onFetch={() => {
            fetchLoanAnalytics(start_date, end_date);
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-x-4 mb-6">
        {data.map((el, i) => {
          return (
            <PayrollCard key={i} heading={el?.heading} subhead={el?.subhead} />
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-[#d9d9d9]  rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Loan Distribution by Status"
              subHead="Shows a breakdown of loans based on their status."
            />
          </div>
          <div>
            <div className="text-center mt-14 mb-8">
              <DoughnutChart1
                chartConfig={chartConfig1}
                chartData={chartData1}
                total_salary_paid={formatCurrencyShort(
                  toNum(loanData?.disbursed),
                )}
                text="disbursed"
              />
            </div>
          </div>
        </div>
        <div className="border border-[#d9d9d9]  rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Loan Trends Over Time"
              subHead="Visualize loan activity trends over time"
            />
          </div>
          <div>
            <div className="text-center mt-14 mb-8">
              <LoanTrendChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loan;
