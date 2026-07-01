// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export interface LoanCategoryData {
  monthly_data: {
    month: string;
    categories: {
      category: string;
      total_amount: number;
    }[];
  }[];
}

interface loanCategoryStore {
  data: LoanCategoryData | null;
  loading: boolean;
  error: string | null;
  fetchLoanCategory: (year?: string) => Promise<void>;
}

export const getLoanCategory = create<loanCategoryStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanCategory: async (year?: string) => {
    set({ loading: true, error: null });
    try {
      const url = year
        ? `/employees/loan-category?year=${year}`
        : "/employees/loan-category";
      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
