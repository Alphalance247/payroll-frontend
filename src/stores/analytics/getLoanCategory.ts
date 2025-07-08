// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface loanCategoryDataStore {
  monthly_data: {
    month: string;
    categories: {
      category: string;
      total_amount: number;
    }[];
  }[];
}

interface loanCategoryStore {
  data: loanCategoryDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanCategory: (start_date?: string, end_date?: string) => Promise<void>;
}

export const getLoanCategory = create<loanCategoryStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanCategory: async (start_date?: string, end_date?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/loan-category";
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
