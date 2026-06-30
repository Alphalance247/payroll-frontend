import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface loanAnalyticsDataStore {
  total_loans_disbursed: string;
  total_repayments_collected: string;
  outstanding_loan_balance: string;
  "pending %": number;
  "approved %": number;
  "rejected %": number;
  pending: string;
  approved: string;
  rejected: string;
  "disbursed %": number;
  disbursed: string;
}

interface loanAnalyticsStore {
  data: loanAnalyticsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanAnalytics: () => Promise<void>;
}

export const getLoanAnalytics = create<loanAnalyticsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/loan-analytics");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
