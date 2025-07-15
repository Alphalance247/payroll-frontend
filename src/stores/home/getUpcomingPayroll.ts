// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface upcomingPayrollDataStore {
  due_in: string;
  pay_period: string;
  payday: string;
  total_pay: string;
}

interface upcomingPayrollStore {
  data: upcomingPayrollDataStore | null;
  loading: boolean;
  error: string | null;
  fetchUpcomingPayroll: () => Promise<void>;
}

export const getUpcomingPayrollStore = create<upcomingPayrollStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchUpcomingPayroll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/payroll/upcoming");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
