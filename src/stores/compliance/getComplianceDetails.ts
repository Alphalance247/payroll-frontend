// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeesData {
  id: string;
  email: string;
  fullname: string;
  job_role: string;
  job_type: string;
  country: string;
  team: {
    name: string;
  };
}

interface employeeListDataStore {
  employees: employeesData[];
}

interface complianceDetailsStore {
  data: employeeListDataStore | null;
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
