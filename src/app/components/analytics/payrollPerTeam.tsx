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
            subHead="0% of your NGN payroll this year was allocated to paying out salaries"
          />
        </div>

        <div className="text-center mt-14 mb-8">
          <TeamPayrollChart />
        </div>
      </div>
    </section>
  );
};

export default PayrollPerTeam;
