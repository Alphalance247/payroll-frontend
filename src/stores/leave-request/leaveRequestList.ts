// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface leaveRequestDataStore {
  leaves: {
    admin_note: string;
    created_at: string;
    employee: string;
    end_date: string;
    id: string;
    leave_type: string;
    reason: string;
    start_date: string;
    updated_at: string;
    remaining: number;
    status: string;
  }[];
}

interface leaveRequestStore {
  data: leaveRequestDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLeaveRequest: () => Promise<void>;
}

export const getLeaveRequestStore = create<leaveRequestStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLeaveRequest: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/leaves/leave-requests");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
