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

interface employeeListStore {
  data: employeeListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeList: () => Promise<void>;
}

export const getEmployeeListStore = create<employeeListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchEmployeeList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
