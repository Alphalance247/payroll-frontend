import DropDownBtn from "@/app/common/dropDownBtn";
import { Search } from "lucide-react";

const EmployeeSearchManagement = () => {
  return (
    <div className="flex gap-x-2 mt-10">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          // value={searchQuery}
          // onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-4 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
      </div>

      <DropDownBtn />
      <DropDownBtn />
      <DropDownBtn />
    </div>
  );
};

export default EmployeeSearchManagement;
