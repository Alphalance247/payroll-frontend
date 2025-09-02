// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeLeaveListDataStore {
  results: {
    id: string;
    start_date: string;
    reason: string;
    end_date: string;
    status: string;
    duration: string;
    leave_type: string;
  }[];
}

interface employeeLeaveListStore {
  data: employeeLeaveListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeLeaveList: () => Promise<void>;
}

export const getEmployeeLeaveList = create<employeeLeaveListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchEmployeeLeaveList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/leaves/leave-requests`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
