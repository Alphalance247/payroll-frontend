// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface payrollSummaryDataStore {
  total_base_salary: string;
  total_net_pay: string;
  total_time_booked: string;
}

interface employeePayrollSummaryDetailsStore {
  data: payrollSummaryDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeePayrollSummary: () => Promise<void>;
}

export const getEmployeePayrollSummary =
  create<employeePayrollSummaryDetailsStore>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeePayrollSummary: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(`/employees/my-payroll-summary`);
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  }));
