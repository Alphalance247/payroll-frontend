"use client";
import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import DateRangePicker, {
  type DateRangeValue,
} from "@/app/common/dateRangePicker";
import CustomDropdown, {
  type DropdownOption,
} from "@/app/common/customDropdown";
import MoreFiltersDropdown, {
  type MoreFiltersValue,
} from "@/app/common/moreFiltersDropdown";
import { useTeamList } from "@/app/hooks/useQueries/useTeamList";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";

// job_type values match the enum the payroll_analysis endpoint already
// returns under salary_by_employment_type.items[].type.
const JOB_TYPE_OPTIONS: DropdownOption[] = [
  { label: "Full-time", value: "full_time" },
  { label: "Contractor", value: "contractor" },
  { label: "Part-time", value: "part_time" },
];

const AnalyticsFilters = () => {
  const { data: teamList = [] } = useTeamList();
  const { start_date, end_date, team, job_type, setDateRange, setTeam, setJobType } =
    usePayrollAnalyticsFilterStore();

  // Local-only, not wired to the payroll_analysis endpoint yet.
  const [moreFilters, setMoreFilters] = useState<MoreFiltersValue>({
    teams: [],
    countries: [],
  });

  const teamOptions: DropdownOption[] = useMemo(
    () => teamList.map((t) => ({ label: t.name, value: String(t.id) })),
    [teamList],
  );

  const dateRangeValue: DateRangeValue = useMemo(
    () => ({
      from: start_date ? parseISO(start_date) : null,
      to: end_date ? parseISO(end_date) : null,
    }),
    [start_date, end_date],
  );

  const handleDateRangeChange = (value: DateRangeValue) => {
    if (!value.from || !value.to) return;
    setDateRange(
      format(value.from, "yyyy-MM-dd"),
      format(value.to, "yyyy-MM-dd"),
    );
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <DateRangePicker
        value={dateRangeValue}
        onChange={handleDateRangeChange}
        placeholder="Select date range"
        position={false}
      />
      <CustomDropdown
        trigger="All Teams"
        title="Select a team"
        options={teamOptions}
        selected={team ? [team] : []}
        onChange={(values) => setTeam(values[0] ?? null)}
      />
      <CustomDropdown
        trigger="All Employees"
        title="Select an employee type"
        options={JOB_TYPE_OPTIONS}
        selected={job_type ? [job_type] : []}
        onChange={(values) => setJobType(values[0] ?? null)}
      />
      <MoreFiltersDropdown value={moreFilters} onApply={setMoreFilters} />
    </div>
  );
};

export default AnalyticsFilters;
