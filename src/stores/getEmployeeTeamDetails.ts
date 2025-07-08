// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeTeamDataStore {
  id: string;
  name: string;
  // Add other fields from your API
}

interface employeeTeamStore {
  data: employeeTeamDataStore[] | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeTeamDetailsList: () => Promise<void>;
}

export const getEmployeeTeamDetails = create<employeeTeamStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchEmployeeTeamDetailsList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/employee"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
