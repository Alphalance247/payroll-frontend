import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface adminPermissionListDataStore {
  employees: {
    last_login: string;
    employee_name: string;
    employee_email: string;
    role: string;
    status: string;
  }[];
}

interface adminPermissionListStore {
  data: adminPermissionListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchAdminPermission: () => Promise<void>;
}

export const getAdminPermissionList = create<adminPermissionListStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchAdminPermission: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get("/employees/payroll-staffs"); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
