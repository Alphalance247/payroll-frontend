// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeLeaveTypeDataStore {
  results: {
    id: string;
    name: string;
  }[];
}

interface employeeLeaveTypeStore {
  data: employeeLeaveTypeDataStore | null;
  loading: boolean;
  error: string | null;
  fetchLeaveType: () => Promise<void>;
}

export const getLeaveType = create<employeeLeaveTypeStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchLeaveType: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/leaves/leave-types`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
