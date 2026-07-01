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

  trends: {
    period: string;
    total_applications: number;
    approved: number;
    rejected: number;
  }[];
}

interface loanAnalyticsStore {
  data: loanAnalyticsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanAnalytics: (start_date?: string, end_date?: string) => Promise<void>;
}

export const getLoanAnalytics = create<loanAnalyticsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanAnalytics: async (start_date?: string, end_date?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/loan-analytics";
      if (start_date && end_date) {
        url += `?start_date=${start_date}&end_date=${end_date}`;
      }
      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
