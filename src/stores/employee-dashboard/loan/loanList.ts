// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeLoanListDataStore {
  data: {
    id: string;
    amount: string;
    repayment_schedule: string;
    status: string;
    repay_per_month_percentage: string;
    due_date: string;
    created: string;
  }[];
  eligibility: number;
  loan_limit: number;
  next_repayment_date: string;
  outstanding_balance: number;
  proposed_next_repayment: number;
}

interface employeeLoanListStore {
  data: employeeLoanListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeLoanList: () => Promise<void>;
}

export const getEmployeeLoanList = create<employeeLoanListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchEmployeeLoanList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/employees/loan-request-list`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
