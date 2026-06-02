// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface lastPayrollDataStore {
  payroll: {
    total_payout: string;
    payslips: string[];
    payday: string;
    run_by: {
      fullname: string;
    };
    payment_method: string;
  };
  pay_period: string;
}

interface lastPayrollStore {
  data: lastPayrollDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLastPayroll: () => Promise<void>;
}

export const getLastPayrollStore = create<lastPayrollStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLastPayroll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/last-payroll");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
