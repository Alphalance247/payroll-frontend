import HeadingSubHead from "@/app/common/headingSubHead";
import { FaCaretDown } from "react-icons/fa";
import { EmploymentsTypeChart } from "../charts/employmentTypeChart";
import Image from "next/image";
import PayrollCard from "@/app/common/payrollCard";
import { getTeamAnalytics } from "@/stores/getTeamAnalytics";

const LoggedHours = () => {
  const { data: teamData } = getTeamAnalytics();
  console.log(teamData);

  const data = [
    {
      heading: "Total Teams",
      subhead: teamData?.["total-teams"].toString() || "0",
    },
    {
      heading: "Active Employee",
      subhead: teamData?.active_employee.toString() || "0",
    },
    {
      heading: "Total Hours",
      subhead: teamData?.total_hours.toString() || "0",
    },
  ];

  const data1 = [
    {
      svg: "/assets/analytics/nija.svg",
    },
    {
      svg: "/assets/analytics/kenya.svg",
    },

    {
      svg: "/assets/analytics/germany.svg",
    },
    {
      svg: "/assets/analytics/uk.svg",
    },
    {
      svg: "/assets/analytics/us.svg",
    },
    {
      svg: "/assets/analytics/ghana.svg",
    },
    {
      svg: "/assets/analytics/nija.svg",
    },
    {
      svg: "/assets/analytics/nija.svg",
    },
  ];

  const locationData =
    teamData?.location.map((el) => ({
      ...el,
      svg: data1.find((item) => item.svg)?.svg || "/assets/analytics/nija.svg",
    })) || [];

  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            subHeadClassName="text-sm"
            heading="Teams"
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

      <div className="grid grid-cols-[65%auto] gap-x-4">
        <div className="border border-[#d9d9d9] rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={false}
              headingClassName="text-base"
              heading="Team by Employment Type"
            />
          </div>

          <div className="text-center mb-8">
            <EmploymentsTypeChart />
          </div>
        </div>

        <div className="border border-[#d9d9d9] rounded-lg h-fit">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={false}
              headingClassName="text-base"
              heading="Teams by Location"
            />
          </div>

          <div className="p-6 h-full">
            {locationData.map((el, i) => {
              return (
                <div
                  className={`flex justify-between border-b pb-5   
                  ${2 % 2 === i ? "pt-0" : "pt-4"}
                   ${
                     data1.length - 1 === i
                       ? "border-transparent"
                       : "border-[#E3E3E5]"
                   }
                  `}
                  key={i}
                >
                  <div className="flex gap-x-2">
                    <Image
                      width={24}
                      height={24}
                      src={el?.svg || ""}
                      alt="nigeria"
                    />
                    <p>{el?.country || "No Country"}</p>
                  </div>

                  <p>{el?.team_count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoggedHours;
