import HeadingSubHead from "@/app/common/headingSubHead";
import { TeamPayrollChart } from "../charts/teamPayrollChart";

const PayrollPerTeam = () => {
  return (
    <section className="mt-8">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Payroll spend breakdown"
            subHead="Shows a breakdown of payroll expenses by team."
          />
        </div>

        <div className="text-center">
          <TeamPayrollChart />
        </div>
      </div>
    </section>
  );
};

export default PayrollPerTeam;
