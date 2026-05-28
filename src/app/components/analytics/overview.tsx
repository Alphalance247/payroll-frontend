"use client";
import { getPayrollAnalysis } from "@/stores/getPayrollAnalysis";
import { getTeamAnalytics } from "@/stores/getTeamAnalytics";

const Overview = () => {
  const { data } = getPayrollAnalysis();
  const { data: teamData } = getTeamAnalytics();

  const overviewData = [
    {
      heading: "Total Payroll",
      subHead: `NGN ${data?.total_salary_paid.toLocaleString()}` || "NGN 0",
      feature: "Total payroll paid out in the last 12 months",
    },
    {
      heading: "Active Employees",
      subHead: data?.active_employees || 0,
      feature: "Number of employees currently on the payroll",
    },
    {
      heading: "Total Hours Logged",
      subHead: teamData?.total_hours?.toFixed(2) || 0,
      feature: "Total hours logged by all employees in the last 12 months",
    },
  ];
  return (
    <section className="mb-10 mt-10">
      <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-4">
        Updates
      </p>

      <div className="grid grid-cols-3 gap-x-4">
        {overviewData.map((el, i) => (
          <div className="px-4 py-6 border border-[#E3E3E5] rounded-xl" key={i}>
            <p className="text-[#71717A] font-Graphik font-semibold mb-4">
              {el?.heading}
            </p>
            <h5 className="text-[#2F2F33] text-xl font-Graphik border-b border-[#E3E3E5] pb-3">
              {el?.subHead}
            </h5>
            <p className="mt-4 text-[#71717A] font-semibold text-sm">
              {el?.feature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
