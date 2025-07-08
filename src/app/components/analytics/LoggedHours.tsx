import HeadingSubHead from "@/app/common/headingSubHead";
import { EmploymentsTypeChart } from "../charts/employmentTypeChart";
import Image from "next/image";
import PayrollCard from "@/app/common/payrollCard";
import { getTeamAnalytics } from "@/stores/getTeamAnalytics";
import Button from "@/app/common/Button";
import { getYearlyJobType } from "@/stores/analytics/getYearlyJobType";

const LoggedHours = ({
  selectedYearJobType,
  setSelectedYearJobType,
}: {
  selectedYearJobType: string;
  setSelectedYearJobType: (year: string) => void;
}) => {
  const { fetchYearlyJobType } = getYearlyJobType();
  const { data: teamData } = getTeamAnalytics();

  const data = [
    {
      heading: "Total Teams",
      subhead: teamData?.total_teams || "0",
    },
    {
      heading: "Active Employee",
      subhead: teamData?.active_employee || "0",
    },
    {
      heading: "Total Hours",
      subhead: teamData?.total_hours?.toFixed(2) || "0",
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

        <div className="flex items-center gap-2">
          <div>
            <select
              name=""
              id=""
              className="border  rounded-md px-4 py-[10px] focus:outline-none"
              value={selectedYearJobType}
              onChange={(e) => setSelectedYearJobType(e.target.value)}
            >
              <option value="">Select year</option>
              <option value="2000">2000</option>
              <option value="2001">2001</option>
              <option value="2002">2002</option>
              <option value="2003">2003</option>
              <option value="2004">2004</option>
              <option value="2005">2005</option>
              <option value="2006">2006</option>
              <option value="2007">2007</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
              <option value="2034">2034</option>
              <option value="2035">2035</option>
              <option value="2036">2036</option>
              <option value="2037">2037</option>
            </select>
          </div>

          <Button
            variant="primary"
            className={`w-[100px] h-[40px] ${
              !selectedYearJobType || selectedYearJobType === ""
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onButtonClick={() => {
              fetchYearlyJobType(selectedYearJobType);
            }}
            disabled={!selectedYearJobType || selectedYearJobType === ""}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 mb-6">
        {data.map((el, i) => {
          return (
            <PayrollCard
              key={i}
              heading={el?.heading}
              subhead={el?.subhead.toString()}
            />
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
