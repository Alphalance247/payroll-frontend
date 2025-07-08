import HeadingSubHead from "@/app/common/headingSubHead";
import { EmployeesPerTeamChart } from "../charts/employeesPerTeamChart";
import { getTeamHoursLogged } from "@/stores/getTeamHoursLogged";

const WorkHoursBreakDown = () => {
  // const chartData = [
  //   {
  //     name: "Artificial Intelligence",
  //     value: 800,
  //   },
  //   {
  //     name: "Advocate",
  //     value: 600,
  //   },
  //   {
  //     name: "Cloud",
  //     value: 700,
  //   },
  //   {
  //     name: "Design & Development",
  //     value: 300,
  //   },
  //   {
  //     name: "Domestics ",
  //     value: 700,
  //   },
  //   {
  //     name: "Devops",
  //     value: 900,
  //   },
  //   {
  //     name: "ITSM",
  //     value: 500,
  //   },
  //   {
  //     name: "Product",
  //     value: 600,
  //   },
  //   {
  //     name: "Quality Assurance",
  //     value: 200,
  //   },
  //   {
  //     name: "Legal & Compliance",
  //     value: 100,
  //   },
  // ];

  const { data: teamHoursLoggedData } = getTeamHoursLogged();

  const chartData = teamHoursLoggedData?.employee_data.map((el) => {
    return {
      team_name: el.team_name,
      count: el.total_team_hours,
    };
  });
  return (
    <section className="mt-10">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="flex justify-between items-center border-b border-[#d9d9d9] px-4 py-6 mb-6">
          <div>
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Time Tracking"
              subHead="0% of your NGN payroll this year was allocated to paying out salaries"
            />
          </div>

          {/* <div className="relative">
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
          </div> */}
        </div>
        <div>
          <EmployeesPerTeamChart
            dataKeyBar="count"
            dataKeyX="team_name"
            chartData={chartData?.flat() || []}
            domain={[100, 1000]}
            ticks={[100, 200, 400, 600, 800, 1000]}
          />
        </div>
      </div>
    </section>
  );
};

export default WorkHoursBreakDown;
