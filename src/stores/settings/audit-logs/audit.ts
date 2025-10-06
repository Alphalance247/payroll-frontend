import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface adminAuditDataStore {
  data: {
    action: string;
    created: string;
    username: string;
  }[];
}

interface adminAuditListStore {
  data: adminAuditDataStore | null;
  loading: boolean;
  error: string | null;
  fetchAdminAuditLog: () => Promise<void>;
}

export const getAdminAuditList = create<adminAuditListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAdminAuditLog: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/company/audit-logs"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
