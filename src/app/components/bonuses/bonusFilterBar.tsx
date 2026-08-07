"use client";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import CustomDropdown, {
  type DropdownOption,
} from "@/app/common/customDropdown";
import MoreFiltersDropdown, {
  type MoreFiltersValue,
} from "@/app/common/moreFiltersDropdown";

export interface BonusFilterBarProps {
  // Date range — always shown
  dateRange: DateRangeValue;
  onDateRangeChange: (val: DateRangeValue) => void;

  // Status — always shown, options vary per tab
  statusOptions: DropdownOption[];
  selectedStatuses: string[];
  onStatusChange: (val: string[]) => void;

  // Bonus type — All bonus tab only
  showBonusTypeFilter?: boolean;
  bonusTypeOptions?: DropdownOption[];
  selectedBonusTypes?: string[];
  onBonusTypesChange?: (val: string[]) => void;

  // More filters — All bonus tab only
  showMoreFilters?: boolean;
  moreFiltersValue?: MoreFiltersValue;
  onMoreFiltersApply?: (val: MoreFiltersValue) => void;
}

const BonusFilterBar = ({
  dateRange,
  onDateRangeChange,
  statusOptions,
  selectedStatuses,
  onStatusChange,

  showMoreFilters = false,
  onMoreFiltersApply,
}: BonusFilterBarProps) => {
  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mb-4">
      <div className="flex items-center justify-between py-5 px-6">
        <DateRangePicker
          value={dateRange}
          onChange={onDateRangeChange}
          placeholder="Select date range"
          position={false}
        />
        <div className="flex items-center gap-x-2">
          <CustomDropdown
            trigger="Status"
            title="Select a status"
            options={statusOptions}
            selected={selectedStatuses}
            onChange={onStatusChange}
          />
          {showMoreFilters && (
            <MoreFiltersDropdown onApply={onMoreFiltersApply} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BonusFilterBar;
