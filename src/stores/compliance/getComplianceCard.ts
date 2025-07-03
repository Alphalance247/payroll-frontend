// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface complianceCardDataStore {
  title: string;
  author: string;
  content: string;
  list_image: string;
  id: number;
}

interface complianceCardStore {
  data: complianceCardDataStore[];
  loading: boolean;
  error: string | null;
  fetchComplianceCard: () => Promise<void>;
}

export const getComplianceCardStore = create<complianceCardStore>((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchComplianceCard: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/compliance/posts");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
