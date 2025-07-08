"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
// import { FaCaretDown } from "react-icons/fa";
import { SpendingChart } from "../charts/spendingChart";
import DropDownBtn from "@/app/common/dropDownBtn";
import { useState } from "react";
import { getPayrollAnalysis } from "@/stores/getPayrollAnalysis";

const SpendPerTeam = () => {
  const [selectedTeam, setSelectedTeam] = useState("Development");
  const { data } = getPayrollAnalysis();
  return (
    <section className="mt-8">
      <div className="border border-[#d9d9d9] rounded-lg">
        <div className="flex justify-between items-center mb-6 border-b border-[#d9d9d9] py-[14px] px-6">
          <div>
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Payroll"
              subHead="0% of your NGN payroll this year was allocated to paying out salaries"
            />
          </div>

          <DropDownBtn
            className="w-full"
            subText="Select Team"
            selectedValue={selectedTeam}
            options={data?.Teams.map((team) => team.team_name) || []}
            isSubTextAvailable={false}
            onSelectOption={setSelectedTeam}
            placeholder="Select Team"
            btnHeight="h-[400px]"
          />
        </div>

        <div className="text-center">
          <SpendingChart selectedTeam={selectedTeam} />
        </div>
      </div>
    </section>
  );
};

export default SpendPerTeam;
