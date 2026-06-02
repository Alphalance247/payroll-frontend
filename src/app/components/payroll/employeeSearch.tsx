"use client";
import { Search } from "lucide-react";

type SortOption = "firstName" | "lastName" | "team";
type FilterOption = "all" | "active" | "inactive" | "team";
type SortByTeam =
  | "Human Resource Department"
  | "Quality Assurance"
  | "Sales & Marketing Team"
  | "Operations Team"
  | "HR & Admin Team"
  | "Customer Success Team"
  | "All Teams";

interface EmployeeSearchProps {
  searchQuery: string;
  sortBy: SortOption;
  filterBy: FilterOption;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onFilterChange: (value: FilterOption) => void;
  sortByTeam?: SortByTeam;
  onSortChangeTeam: (value: SortByTeam) => void;
  showsortFilter?: boolean;
  showSortByTeam?: boolean;
  teams?: string[];
}

export default function EmployeeSearch({
  searchQuery,
  sortBy,
  // filterBy,
  onSearchChange,
  onSortChange,
  // onFilterChange,
  sortByTeam,
  onSortChangeTeam,
  showSortByTeam = false,
  showsortFilter = true,
  teams,
}: EmployeeSearchProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="relative w-[280px]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
        </div>

        <div className="flex items-center gap-4">
          {/* {showsortFilter && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#71717A]">View</span>
              <select
                value={filterBy}
                onChange={(e) => onFilterChange(e.target.value as FilterOption)}
                className="border border-[#E3E3E5] rounded-lg px-4 py-2 text-base font-medium text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] min-w-[140px]"
              >
                <option value="all" className="">
                  All employees
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )} */}

          {showsortFilter && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#71717A]">
                Sort by
              </span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="border border-[#E3E3E5] rounded-lg px-4 py-2 text-base font-medium text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] min-w-[140px]"
              >
                <option value="firstName">First Names</option>
                <option value="lastName">Last Names</option>
                <option value="team">Team</option>
              </select>
            </div>
          )}

          {/* Sort by team */}

          {showSortByTeam && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#71717A]">
                Sort by
              </span>

              <select
                value={sortByTeam}
                onChange={(e) => onSortChangeTeam(e.target.value as SortByTeam)}
                className="border border-[#E3E3E5] rounded-lg px-4 py-2 text-base font-medium text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] min-w-[140px]"
              >
                <option value="All Teams">All</option>
                {teams?.map((el, i) => {
                  return (
                    <option value={el} key={i}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export types for reuse
export type { SortOption, FilterOption, SortByTeam };
