// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface activeLoanListDataStore {
  data: {
    id: string;
  }[];
}

interface activeLoanListStore {
  data: activeLoanListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchActiveLoan: () => Promise<void>;
}

export const getActiveLoan = create<activeLoanListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchActiveLoan: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/employees/active-loans`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
