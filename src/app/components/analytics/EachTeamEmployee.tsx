import HeadingSubHead from "@/app/common/headingSubHead";
import { EmployeesPerTeamChart } from "../charts/employeesPerTeamChart";

const EachTeamEmployee = () => {
  const chartData = [
    {
      name: "Artificial Intelligence",
      value: 8,
    },
    {
      name: "Advocate",
      value: 6,
    },
    {
      name: "Cloud",
      value: 7,
    },
    {
      name: "Design & Development",
      value: 3,
    },
    {
      name: "Domestics ",
      value: 7,
    },
    {
      name: "Devops",
      value: 9,
    },
    {
      name: "ITSM",
      value: 5,
    },
    {
      name: "Product",
      value: 6,
    },
    {
      name: "Quality Assurance",
      value: 2,
    },
    {
      name: "Legal & Compliance",
      value: 1,
    },
  ];
  return (
    <section className="mt-10">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Total Number of Employees in Each Team"
            subHead="0% of your NGN payroll this year was allocated to paying out salaries"
          />
        </div>
        <div>
          <EmployeesPerTeamChart chartData={chartData} />
        </div>
      </div>
    </section>
  );
};

export default EachTeamEmployee;
