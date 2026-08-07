"use client";
import DashboardLayout from "@/app/common/DashBoardLayout";
import AllBonusTab from "@/app/components/bonuses/allBonus";
import ClientBonusTab from "@/app/components/bonuses/clientFacingTab";
import FixedBonusTab from "@/app/components/bonuses/fixedBonusTab";
import QuarterlyBonusTab from "@/app/components/bonuses/quarterlyBonusTab";
import DiscretionaryBonusTab from "@/app/components/bonuses/discretionaryBonusTab";
import { useState } from "react";
import { format } from "date-fns";
import {
  useAllBonusHistory,
  type BonusHistoryData,
} from "@/app/hooks/useQueries/bonuses/useAllBonusHistory";
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
}

export interface BonusTabProps {
  data: BonusHistoryData | null | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  filters: BonusFilters;
}

const TAB_BONUS_TYPE: Record<string, string | undefined> = {
  "All bonus": undefined,
  "Fixed bonus": "fixed",
  "Client-facing bonus": "client",
  "Quarterly bonus": "quarterly",
  "Discretionary bonus": "non_client",
};

// Values that map to approval_status API param
const APPROVAL_STATUS_VALUES = new Set(["pending", "approved", "rejected"]);

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

  // Derive API params from filter state
  const startDate = dateRange.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : undefined;
  const endDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;
  const approvalStatusParam = selectedStatuses.find((s) =>
    APPROVAL_STATUS_VALUES.has(s),
  );
  const paidParam = selectedStatuses.includes("disbursed")
    ? "true"
    : selectedStatuses.includes("not_disbursed")
      ? "false"
      : undefined;

  const bonusTypeParam = TAB_BONUS_TYPE[activeTab];
  const teamIdParam = moreFilters.teams[0] ?? undefined;
  const countryParam = moreFilters.countries[0] ?? undefined;

  const { data, isLoading, isError, refetch } = useAllBonusHistory(
    undefined,
    undefined,
    bonusTypeParam,
    startDate,
    endDate,
    approvalStatusParam,
    paidParam,
    teamIdParam,
    countryParam,
  );

  const filters: BonusFilters = {
    dateRange,
    onDateRangeChange: setDateRange,
    selectedStatuses,
    onStatusChange: setSelectedStatuses,
    selectedBonusTypes,
    onBonusTypesChange: setSelectedBonusTypes,
    moreFilters,
    onMoreFiltersApply: setMoreFilters,
  };

  const tabProps: BonusTabProps = {
    data,
    isLoading,
    isError,
    refetch,
    filters,
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

        {activeTab === "All bonus" && <AllBonusTab {...tabProps} />}
        {activeTab === "Fixed bonus" && <FixedBonusTab {...tabProps} />}
        {activeTab === "Client-facing bonus" && (
          <ClientBonusTab {...tabProps} />
        )}
        {activeTab === "Quarterly bonus" && <QuarterlyBonusTab {...tabProps} />}
        {activeTab === "Discretionary bonus" && (
          <DiscretionaryBonusTab {...tabProps} />
        )}
      </main>
    </DashboardLayout>
  );
};

export default BonusHistory;
