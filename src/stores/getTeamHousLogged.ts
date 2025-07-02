import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface teamHoursLoggedDataStore {
  "total_loans_disbursed ": number;
  total_repayments_collected: number;
  outstanding_loan_balance: number;
  "pending %": number;
  "approved %": number;
  "rejected %": number;
  pending: number;
  approved: number;
  rejected: number;
}

interface teamHoursLoggedStore {
  data: teamHoursLoggedDataStore | null;
  loading: boolean;
  error: string | null;
  fetchTeamHoursLogged: () => Promise<void>;
}

export const getTeamHoursLogged = create<teamHoursLoggedStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTeamHoursLogged: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/timesheet");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
