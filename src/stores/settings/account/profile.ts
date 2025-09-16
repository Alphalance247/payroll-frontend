import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface companyProfileDataStore {
  data: {
    email: string;
    fullname: string;
    prof_img: string;
    employee_data: {
      phone: string;
    };
    username: string;
    payroll_staff_role: {
      role: string;
    };
  };
}

interface companyProfileStore {
  data: companyProfileDataStore | null;
  loading: boolean;
  error: string | null;
  fetchCompanyProfle: () => Promise<void>;
}

export const getCompanyProfile = create<companyProfileStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchCompanyProfle: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/account/profile"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
