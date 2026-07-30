import CustomDropdown from "@/app/common/customDropdown";
import DateRangePicker, { DateRangeValue } from "@/app/common/dateRangePicker";
import Heading from "@/app/common/heading";
import BonusDonutChart from "@/app/components/charts/bonusDonutChart";
import RecentBonusActivities, {
  type BonusActivity,
} from "@/app/components/bonuses/recentBonusActivities";
import AllBonusTable from "@/app/components/bonuses/allBonusTable";
import { Info } from "lucide-react";
import { useState } from "react";

const AllBonusTab = () => {
  const BONUS_TYPE_OPTIONS = [
    { label: "All bonus", value: "all" },
    { label: "Fixed bonus", value: "Fixed bonus" },
    { label: "Client-facing bonus", value: "Client facing bonus" },
    { label: "Quarterly bonus", value: "Quarterly bonus" },
    { label: "Discretionary bonus", value: "Discretionary bonus" },
  ];
  const [dateRange, setDateRange] = useState<DateRangeValue>({
    from: null,
    to: null,
  });
  const [selectedBonusTypes, setSelectedBonusTypes] = useState<string[]>([]);

  const bonusTypeData = [
    { label: "Fixed bonus",       value: 1_800_000, color: "#22C55E" },
    { label: "Client bonus",      value: 1_800_000, color: "#A78BFA" },
    { label: "Quarterly",         value: 1_800_000, color: "#F87171" },
    { label: "Discretionary",     value: 1_800_000, color: "#FB923C" },
  ];

  const recentActivities: BonusActivity[] = [
    { id: 1, employeeName: "Lanre Ademoye", description: "Lanre Ademoye received fixed bonus", amount: "₦300,000", timeAgo: "2 mins ago" },
    { id: 2, employeeName: "Lanre Ademoye", description: "Lanre Ademoye received fixed bonus", amount: "₦300,000", timeAgo: "2 mins ago" },
    { id: 3, employeeName: "Lanre Ademoye", description: "Lanre Ademoye received fixed bonus", amount: "₦300,000", timeAgo: "2 mins ago" },
  ];

  return (
    <>
      <div className="mb-8">
        <Heading
          user="All bonus"
          subHead="Review, manage and track bonuses across all bonus types."
          flexDirection="column"
        />
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-lg border border-[#E3E3E5] mb-4">
        <div className="flex items-center justify-between py-5 px-6">
          <div className="flex gap-x-2 justify-between">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
              position={false}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <CustomDropdown
              trigger="All bonus"
              title="Select a bonus type"
              options={BONUS_TYPE_OPTIONS}
              selected={selectedBonusTypes}
              onChange={setSelectedBonusTypes}
            />

            <CustomDropdown
              trigger="Status"
              title="Select a bonus type"
              options={BONUS_TYPE_OPTIONS}
              selected={selectedBonusTypes}
              onChange={setSelectedBonusTypes}
            />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        {/* Total Bonus Paid */}
        <div className="bg-white rounded-lg border border-[#E3E3E5] p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#71717A]">Total Bonus Paid</span>
            <Info size={14} className="text-[#71717A] flex-shrink-0" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-[#2F2F33]">₦1,000,000</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-[#E9F9EF] rounded-full text-xs font-medium text-[#188C43]">
                +20%
              </span>
              <span className="text-xs text-[#71717A]">Vs last month</span>
            </div>
          </div>
        </div>

        {/* Number of Employees */}
        <div className="bg-white rounded-lg border border-[#E3E3E5] p-5 flex flex-col gap-3">
          <span className="text-sm font-medium text-[#71717A]">Number of Employees</span>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-[#2F2F33]">40</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-[#E9F9EF] rounded-full text-xs font-medium text-[#188C43]">
                +20%
              </span>
              <span className="text-xs text-[#71717A]">Vs last month</span>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-lg border border-[#E3E3E5] px-6 py-4 flex flex-col gap-3">
          <span className="text-sm font-medium text-[#71717A]">Pending Actions</span>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-[#2F2F33]">8</span>
            <div className="flex flex-col gap-1">
              <p className="text-xs">
                <span className="font-medium text-[#2F2F33]">5</span>
                <span className="text-[#71717A]"> awaiting approval</span>
              </p>
              <p className="text-xs">
                <span className="font-medium text-[#2F2F33]">3</span>
                <span className="text-[#71717A]"> awaiting payment</span>
              </p>
            </div>
          </div>
        </div>

        {/* Average Bonus */}
        <div className="bg-white rounded-lg border border-[#E3E3E5] p-5 flex flex-col gap-3">
          <span className="text-sm font-medium text-[#71717A]">Average Bonus</span>
          <div className="flex flex-col gap-2">
            <span className="text-lg font-medium text-[#2F2F33]">₦108,000</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-[#E9F9EF] rounded-full text-xs font-medium text-[#188C43]">
                +20%
              </span>
              <span className="text-xs text-[#71717A]">Vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Recent activities row */}
      <div className="grid grid-cols-[3fr_2fr] gap-4 mt-4">
        {/* Bonus value by type */}
        <div className="bg-white rounded-xl border border-[#E3E3E5] flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E3E3E5]">
            <span className="text-sm font-semibold text-[#2F2F33]">Bonus value by type</span>
          </div>
          <BonusDonutChart
            data={bonusTypeData}
            formatValue={(v) => `₦${v.toLocaleString()}`}
          />
        </div>

        {/* Recent activities */}
        <RecentBonusActivities
          activities={recentActivities}
          onViewAll={() => {}}
        />
      </div>

      <AllBonusTable />
    </>
  );
};

export default AllBonusTab;
