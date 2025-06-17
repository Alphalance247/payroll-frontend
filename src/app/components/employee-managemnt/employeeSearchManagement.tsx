"use client";
import DropDownBtn from "@/app/common/dropDownBtn";
import { Search } from "lucide-react";

const EmployeeSearchManagement = ({
  searchQuery,
  onSearchChange,
  selectedEmployeeType,
  selectedCountry,
  selectedTeam,
  setSelectedEmployeeType,
  setSelectedCountry,
  setSelectedTeam,
}: {
  searchQuery: string;
  selectedEmployeeType: string;
  selectedTeam: string;
  selectedCountry: string;
  setSelectedEmployeeType: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  setSelectedTeam: (value: string) => void;
  onSearchChange: (value: string) => void;
}) => {
  const employeeTypeOptions = [
    "Contractor",
    "Casual",
    "Staff",
    "Domestice staff",
    "Legal",
  ];
  const countryOptions = ["Nigeria", "Ghana", "Kenya"];
  const teamOptions = ["Design & Development", "Marketing", "Sales", "Legal"];

  return (
    <div className="flex gap-x-2 mt-10">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
      </div>

      <DropDownBtn
        selectedValue={selectedEmployeeType}
        subText="Type"
        onSelectOption={setSelectedEmployeeType}
        options={employeeTypeOptions}
        placeholder="Employees"
      />

      <DropDownBtn
        selectedValue={selectedCountry}
        subText={"Country"}
        onSelectOption={setSelectedCountry}
        options={countryOptions}
        placeholder="Nigeria"
      />
      <DropDownBtn
        subText="Team"
        placeholder="Design &  Development"
        onSelectOption={setSelectedTeam}
        options={teamOptions}
        selectedValue={selectedTeam}
      />
    </div>
  );
};

export default EmployeeSearchManagement;
