import HeadingSubHead from "@/app/common/headingSubHead";
import { EmployeesPerTeamChart } from "../charts/employeesPerTeamChart";
import { getTeamAnalytics } from "@/stores/getTeamAnalytics";

const EachTeamEmployee = () => {
  const { data: teamData } = getTeamAnalytics();

  const chartData =
    teamData?.team_count.map((el) => ({
      team_name: el.team_name,
      count: el.Count,
    })) || [];

  return (
    <section className="mt-10">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Total Number of Employees in Each Team"
            subHead="Shows a breakdown of the total number of employees in each team."
          />
        </div>
        <div>
          <EmployeesPerTeamChart
            chartData={chartData}
            dataKeyX="team_name"
            dataKeyBar="count"
          />
        </div>
      </div>
    </section>
  );
};

export default EachTeamEmployee;
