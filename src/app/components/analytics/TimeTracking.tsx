"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import PayrollCard from "@/app/common/payrollCard";
import { EmployeesPerTeamChart } from "../charts/employeesPerTeamChart";
import { getTeamHoursLogged } from "@/stores/getTeamHoursLogged";
import DropDownBtn from "@/app/common/dropDownBtn";
import { useState } from "react";
import StartEndDate from "../common/startEndDate";

interface TimeTrackingProps {
  start_date: string;
  end_date: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  onFetch: () => void;
}
const TimeTracking = ({
  start_date,
  end_date,
  setStartDate,
  setEndDate,
  onFetch,
}: TimeTrackingProps) => {
  const { data: teamHoursLoggedData } = getTeamHoursLogged();
  const [selectedTeam, setSelectedTeam] = useState(
    teamHoursLoggedData?.employee_data?.[0]?.team_name || "",
  );

  const data = [
    {
      heading: "Total Hours",
      subhead: teamHoursLoggedData?.total_hours?.toFixed(2) || "0",
    },
    {
      heading: "Avg Hours Logged",
      subhead: teamHoursLoggedData?.avg_hours?.toFixed(2) || "0",
    },
    {
      heading: "Billed Hours",
      subhead: teamHoursLoggedData?.client_hours?.toFixed(2) || "0",
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
            heading="Time Tracking"
            subHead=" Shows a breakdown of time tracking distribution and trends over time."
          />
        </div>

        <StartEndDate
          start_date={start_date}
          end_date={end_date}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onFetch={onFetch}
        />
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

      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9] flex justify-between items-center">
          <div>
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Total Hours Logged by Team"
              subHead=""
            />
          </div>

          <DropDownBtn
            className="w-full"
            subText="Select Team"
            selectedValue={selectedTeam}
            options={
              teamHoursLoggedData?.employee_data?.map(
                (team) => team?.team_name,
              ) || []
            }
            isSubTextAvailable={false}
            onSelectOption={setSelectedTeam}
            placeholder="Select Team"
            btnHeight="h-[400px]"
          />
        </div>
        <div>
          <EmployeesPerTeamChart
            dataKeyBar="count"
            dataKeyX="team_name"
            chartData={
              teamHoursLoggedData?.employee_data
                ?.find((team) => team.team_name === selectedTeam)
                ?.employees?.map((employee) => ({
                  team_name: employee.name,
                  count: employee.hours,
                })) || []
            }
            domain={[100, 1000]}
            ticks={[100, 200, 400, 600, 800, 1000]}
          />
        </div>
      </div>
    </section>
  );
};

export default TimeTracking;
