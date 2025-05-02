import HeadingSubHead from "@/app/common/headingSubHead";
import { FaCaretDown } from "react-icons/fa";
import { EmploymentsTypeChart } from "../charts/employmentTypeChart";
import Image from "next/image";
import PayrollCard from "@/app/common/payrollCard";

const LoggedHours = () => {
  const data = [
    {
      heading: "Total Teams",
      subhead: "10",
    },
    {
      heading: "Active Employee",
      subhead: "100",
    },
    {
      heading: "Total Hours",
      subhead: "40:10:00",
    },
  ];

  const data1 = [
    {
      country: "Nigeria",
      svg: "/assets/analytics/nija.svg",
      subhead: "20",
    },
    {
      country: "Kenya",
      svg: "/assets/analytics/kenya.svg",
      subhead: "10",
    },

    {
      country: "Germany",
      svg: "/assets/analytics/germany.svg",
      subhead: "10",
    },
    {
      country: "United Kingdom",
      svg: "/assets/analytics/uk.svg",
      subhead: "10",
    },
    {
      country: "United States",
      svg: "/assets/analytics/us.svg",
      subhead: "10",
    },
    {
      country: "Ghana",
      svg: "/assets/analytics/ghana.svg",
      subhead: "10",
    },
    {
      country: "Nigeria",
      svg: "/assets/analytics/nija.svg",
      subhead: "20",
    },
    {
      country: "Nigeria",
      svg: "/assets/analytics/nija.svg",
      subhead: "20",
    },
  ];

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

        <div className="border border-[#d9d9d9] rounded-lg">
          <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
            <HeadingSubHead
              withSubHead={false}
              headingClassName="text-base"
              heading="Teams by Location"
            />
          </div>

          <div className="p-6 h-full">
            {data1.map((el, i) => {
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
                    <Image width={24} height={24} src={el?.svg} alt="nigeria" />
                    <p>{el?.country}</p>
                  </div>

                  <p>{el?.subhead}</p>
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
