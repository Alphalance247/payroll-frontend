import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface loanListDataStore {
  loan_by_status: {
    approved: string;
    "not approved": string;
    pending: string;
    total_loan: string;
  };

  data: {
    amount: string;
    category: string;
    date_disburse: string;
    due_date: string;
    employee: string;
    id: string;
    repayment_schedule: string;
    status: string;
  }[];
}

interface loanRequestListStore {
  data: loanListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLoanRequestList: () => Promise<void>;
}

export const getLoanRequestList = create<loanRequestListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLoanRequestList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/loans");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
