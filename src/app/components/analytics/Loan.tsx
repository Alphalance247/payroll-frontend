import HeadingSubHead from "@/app/common/headingSubHead";
import { FaCaretDown } from "react-icons/fa";
import PayrollCard from "@/app/common/payrollCard";
import { DoughnutChart1 } from "../charts/chart-pie-donut-text";
import { ChartConfig } from "@/components/ui/chart";
import { LoanTrendChart } from "../charts/loanTrendChart";
import { getLoanAnalytics } from "@/stores/getLoanAnalytics";
import { formatCurrencyShort } from "@/app/utils/formatCurrency";

const Loan = () => {
  const { data: loanData } = getLoanAnalytics();

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

  const chartData1 = [
    {
      browser: "Approved",
      visitors: loanData?.approved || 0,
      fill: "bg-[#F5B971]",
    },
    {
      browser: "Pending",
      visitors: loanData?.pending || 0,
      fill: "bg-[#78D6E0]",
    },
    {
      browser: "Rejected",
      visitors: loanData?.rejected || 0,
      fill: "bg-[#2E6171]",
    },
    {
      browser: "Disbursed",
      visitors: loanData?.disbursed || 0,
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
                  Number(loanData?.disbursed) || 0
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
