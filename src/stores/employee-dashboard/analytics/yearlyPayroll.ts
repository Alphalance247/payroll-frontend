// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeYearlyPayrollDataStore {
  data: {
    months: {
      total_base_salary: string;
      total_bonus: string;
      total_deductions: string;
      month: string;
    }[];
  }[];
}

interface employeeYearlyPayrollListStore {
  data: employeeYearlyPayrollDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeYearlyPayroll: () => Promise<void>;
}

export const getEmployeeYearlyPayroll = create<employeeYearlyPayrollListStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeYearlyPayroll: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          `/employees/my-yearly-employee-payroll`
        );
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
