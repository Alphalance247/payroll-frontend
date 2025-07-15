// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface pendingTaskDataStore {
  Tasks: {
    due_in: string;
    task: string;
  }[];
}

interface pendingTaskStore {
  data: pendingTaskDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollPendingTask: () => Promise<void>;
}

export const getPayrollPendingTaskStore = create<pendingTaskStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollPendingTask: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/pending-tasks");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
