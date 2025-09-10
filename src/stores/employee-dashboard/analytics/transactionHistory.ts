// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeTransactionDataStore {
  data: {
    id: string;
    amount: string;
    repayment_schedule: string;
    status: string;
    due_date: string;
  }[];
}

interface employeeTransactionHistoryListStore {
  data: employeeTransactionDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeTransactionHistory: () => Promise<void>;
}

export const getEmployeeTransactionHistory =
  create<employeeTransactionHistoryListStore>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeTransactionHistory: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          `/employees/my-transaction-history`
        );
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  }));
