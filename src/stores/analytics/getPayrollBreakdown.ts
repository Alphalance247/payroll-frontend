// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface payrollBreakdownDataStore {
  data: {
    January: {
      bonus: string;
      salary: string;
      tax: string;
    };
    February: {
      bonus: string;
      salary: string;
      tax: string;
    };
    March: {
      bonus: string;
      salary: string;
      tax: string;
    };
    April: {
      bonus: string;
      salary: string;
      tax: string;
    };
    May: {
      bonus: string;
      salary: string;
      tax: string;
    };
    June: {
      bonus: string;
      salary: string;
      tax: string;
    };
    July: {
      bonus: string;
      salary: string;
      tax: string;
    };
    August: {
      bonus: string;
      salary: string;
      tax: string;
    };
    September: {
      bonus: string;
      salary: string;
      tax: string;
    };
    October: {
      bonus: string;
      salary: string;
      tax: string;
    };
    November: {
      bonus: string;
      salary: string;
      tax: string;
    };
    December: {
      bonus: string;
      salary: string;
      tax: string;
    };
  };
}

interface payrollBreakdownStore {
  data: payrollBreakdownDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollBreakdown: (year?: string) => Promise<void>;
}

export const getPayrollBreakdown = create<payrollBreakdownStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollBreakdown: async (year?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/yearly_payroll_breakdown";
      if (year) {
        url += `?year=${year}`;
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
