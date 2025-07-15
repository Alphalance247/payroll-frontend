// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface holidayDataStore {
  data: {
    results: {
      id: string;
      country: string;
      date: string;
      name: string;
    }[];
  };
}

interface holidayStore {
  data: holidayDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollHoliday: () => Promise<void>;
}

export const getHolidayStore = create<holidayStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollHoliday: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/leaves/holidays?upcoming=true");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
