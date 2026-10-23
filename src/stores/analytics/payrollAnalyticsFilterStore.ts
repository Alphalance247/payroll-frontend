import { create } from "zustand";
import { format, startOfYear } from "date-fns";

export interface PayrollAnalyticsFilters {
  start_date: string;
  end_date: string;
  team: string | null;
  employee: string | null;
  job_type: string | null;
}

interface PayrollAnalyticsFilterStore extends PayrollAnalyticsFilters {
  setDateRange: (start_date: string, end_date: string) => void;
  setTeam: (team: string | null) => void;
  setEmployee: (employee: string | null) => void;
  setJobType: (job_type: string | null) => void;
  reset: () => void;
}

const DEFAULT_START_DATE = format(startOfYear(new Date()), "yyyy-MM-dd");
const DEFAULT_END_DATE = format(new Date(), "yyyy-MM-dd");

/**
 * Shared filter state for the Payroll Analytics page — every chart calls
 * useGeneralAnalytics with these same values, so changing a filter here
 * (date range, team, employee, job type) refetches/re-renders every section
 * from one place instead of each component holding its own copy.
 */
export const usePayrollAnalyticsFilterStore =
  create<PayrollAnalyticsFilterStore>((set) => ({
    start_date: DEFAULT_START_DATE,
    end_date: DEFAULT_END_DATE,
    team: null,
    employee: null,
    job_type: null,

    setDateRange: (start_date, end_date) => set({ start_date, end_date }),
    setTeam: (team) => set({ team }),
    setEmployee: (employee) => set({ employee }),
    setJobType: (job_type) => set({ job_type }),
    reset: () =>
      set({
        start_date: DEFAULT_START_DATE,
        end_date: DEFAULT_END_DATE,
        team: null,
        employee: null,
        job_type: null,
      }),
  }));
