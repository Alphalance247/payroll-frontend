import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface companyInfoStoreDataStore {
  companies: {
    address: string;
    city: string;
    code: string;
    username: string;
    logo: string;
    name: string;
    reg_no: string;
    sector: string;
    state: string;
    zip_code: string;
    country: string;
  };
}

interface companyInfoStore {
  data: companyInfoStoreDataStore | null;
  loading: boolean;
  error: string | null;
  fetCompanyInformation: () => Promise<void>;
}

export const getCompanyInformation = create<companyInfoStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetCompanyInformation: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/company/company-data/"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
