import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface approvalAdminDataStore {
  employees: {
    employee_email: string;
    id: string;
  }[];
}

interface approvalAdminStore {
  data: approvalAdminDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollAprrovalAdmin: () => Promise<void>;
}

export const getPayrollApprovalAdmin = create<approvalAdminStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollAprrovalAdmin: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/payroll-staffs");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
