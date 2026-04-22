import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface payrollTaxDataStore {
  data: {
    tax_amount_monthly: number;
    tax_amount_yearly: number;
    remmited: boolean;
    payslip: {
      employee: {
        fullname: string;
        id: string;
      };
    };
  }[];
  total_monthly_tax: number;
}

interface payrollTaxStore {
  data: payrollTaxDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollTax: (month?: string, year?: string) => Promise<void>;
}

export const getPayrollTax = create<payrollTaxStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollTax: async (month?: string, year?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/taxes";
      if (year && year) {
        url += `?month=${month}&year=${year}`;
      }
      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
