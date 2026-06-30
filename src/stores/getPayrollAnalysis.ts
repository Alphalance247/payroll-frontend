// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  total_salary: string;
  total_payout: string;
  total_bonus: string;
}

interface TeamData {
  team_total_money: number;
  team_name: string;
  employees: {
    name: string;
    amount: number;
  }[];
}

interface employeeListDataStore {
  data: data[];
  total_bonus_paid: string;
  total_payroll: string;
  total_salary_paid: string;
  total_tax_paid: string;
  total_loan_repaid: string;
  active_employees: number;
  tax: string;
  loan: string;
  bonus: string;
  salary: string;
  percentage_contractor: string;
  percentage_full_time: string;
  Teams: TeamData[];
}

interface payrollAnalysisStore {
  data: employeeListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollAnalysis: (
    start_date?: string,
    end_date?: string,
  ) => Promise<void>;
}

export const getPayrollAnalysis = create<payrollAnalysisStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollAnalysis: async (start_date?: string, end_date?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/payroll_analysis";
      if (start_date && end_date) {
        url += `?start_date=${start_date}&end_date=${end_date}`;
      }
      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
