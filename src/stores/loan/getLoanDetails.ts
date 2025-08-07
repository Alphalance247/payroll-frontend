// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface loanListDataStore {
  data: {
    amount: string;
    category: string;
    date_disburse: string;
    due_date: string;
    employee: string;
    id: string;
    repayment_schedule: string;
    loan_to_salary_ratio: number;
    purpose: string;
    team: string;
    status: string;
    disburse: boolean;
  };

  loan_history: {
    amount: string;
    date_disburse: string;
    due_date: string;
    id: string;
  }[];
}

interface loanDetailsStore {
  data: loanListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanDetails: (complianceId: string) => Promise<void>;
}

export const getLoanDetails = create<loanDetailsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanDetails: async (complianceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(
        `/employees/loan-request/${complianceId}`
      );
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
