// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeLoansDetailsDataStore {
  amount: string;
  category: string;
  created: string;
  date_disburse: string;
  disburse: string;
  due_date: string;
  employee: string;
}

interface employeeLoansDetailsStore {
  data: employeeLoansDetailsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeLoanDetails: (loanId: string) => Promise<void>;
}

export const getEmployeeLoanDetails = create<employeeLoansDetailsStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeLoanDetails: async (loanId: string) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          `/employees/loan-request/${loanId}`
        );
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
