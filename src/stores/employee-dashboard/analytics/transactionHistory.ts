// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeTransactionDataStore {
  transaction_id: string;
  amount: string;
  created: string;
  related_file: string;
  status: string;
  tran_type: string;
}

interface employeeTransactionHistoryListStore {
  data: employeeTransactionDataStore[] | null;
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
