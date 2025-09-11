// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeLoanCategoryDataStore {
  data: {
    id: string;
    name: string;
  }[];
}

interface employeeLoanCategoryStore {
  data: employeeLoanCategoryDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanCategory: () => Promise<void>;
}

export const getLoanCategory = create<employeeLoanCategoryStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanCategory: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/employees/loan-request-categories`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
