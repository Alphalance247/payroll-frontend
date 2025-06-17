import DropDownBtn from "@/app/common/dropDownBtn";
import { Search } from "lucide-react";

const TeamSearch = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) => {
  
  return (
    <div className="flex gap-x-2 mt-10 justify-between">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[428px] pl-10 pr-4 py-3 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
      </div>

      <div className="flex gap-x-4 items-center">
        <DropDownBtn text="Active" subText="Status" />
        <DropDownBtn
          text="Department"
          subText="Graphic Design"
          width="w-[250px]"
        />
      </div>
    </div>
  );
};

export default TeamSearch;
