"use client";
import DashboardLayout from "@/app/common/DashBoardLayout";
import AllBonusTab from "@/app/components/bonuses/allBonus";
import ClientBonusTab from "@/app/components/bonuses/clientFacingTab";
import FixedBonusTab from "@/app/components/bonuses/fixedBonusTab";
import QuarterlyBonusTab from "@/app/components/bonuses/quarterlyBonusTab";
import DiscretionaryBonusTab from "@/app/components/bonuses/discretionaryBonusTab";
import { useState } from "react";
import type { DateRangeValue } from "@/app/common/dateRangePicker";
import type { MoreFiltersValue } from "@/app/common/moreFiltersDropdown";

export interface BonusFilters {
  dateRange: DateRangeValue;
  onDateRangeChange: (val: DateRangeValue) => void;
  selectedStatuses: string[];
  onStatusChange: (val: string[]) => void;
  selectedBonusTypes: string[];
  onBonusTypesChange: (val: string[]) => void;
  moreFilters: MoreFiltersValue;
  onMoreFiltersApply: (val: MoreFiltersValue) => void;
  onClearFilters: () => void;
}

export interface BonusTabProps {
  filters: BonusFilters;
}

const BonusHistory = () => {
  const [activeTab, setActiveTab] = useState("All bonus");
  const tabs = [
    { name: "All bonus" },
    { name: "Fixed bonus" },
    { name: "Client-facing bonus" },
    { name: "Quarterly bonus" },
    { name: "Discretionary bonus" },
  ];

  // Shared filter state — persists across tab switches
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);
  const [moreFilters, setMoreFilters] = useState<MoreFiltersValue>({
    teams: [],
    countries: [],
  });

  const handleClearFilters = () => {
    setDateRange({ from: null, to: null });
    setSelectedStatuses([]);
    setSelectedBonusTypes([]);
    setMoreFilters({ teams: [], countries: [] });
  };

  const filters: BonusFilters = {
    dateRange,
    onDateRangeChange: setDateRange,
    selectedStatuses,
    onStatusChange: setSelectedStatuses,
    selectedBonusTypes,
    onBonusTypesChange: setSelectedBonusTypes,
    moreFilters,
    onMoreFiltersApply: setMoreFilters,
    onClearFilters: handleClearFilters,
  };

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex gap-x-5 items-center border-b border-[#E4E7EC] mb-6">
          {tabs.map((el, i) => (
            <button
              className={`${
                activeTab === el.name
                  ? "text-[#E37915] border-b-[1.5px] border-[#E37915] bg-white text-sm"
                  : "text-[#71717A] border-transparent"
              }   font-semibold text-sm px-2 py-4`}
              onClick={() => setActiveTab(el.name)}
              key={i}
            >
              {el.name}
            </button>
          ))}
        </div>

        {activeTab === "All bonus" && <AllBonusTab filters={filters} />}
        {activeTab === "Fixed bonus" && <FixedBonusTab filters={filters} />}
        {activeTab === "Client-facing bonus" && (
          <ClientBonusTab filters={filters} />
        )}
        {activeTab === "Quarterly bonus" && <QuarterlyBonusTab filters={filters} />}
        {activeTab === "Discretionary bonus" && (
          <DiscretionaryBonusTab filters={filters} />
        )}
      </main>
    </DashboardLayout>
  );
};

export default BonusHistory;
