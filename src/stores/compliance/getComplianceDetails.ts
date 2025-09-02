// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface complianceListDataStore {
  content: string;
  detail_image: string;
  title: string;
  effective_date: string;
  id: string;
  updated_at: string;
  category: string;
}

interface complianceDetailsStore {
  data: complianceListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchComplianceDetails: (complianceId: string) => Promise<void>;
}

export const getComplianceDetails = create<complianceDetailsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchComplianceDetails: async (complianceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/compliance/posts/${complianceId}`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
