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
}

interface payrollTaxStore {
  data: payrollTaxDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollTax: () => Promise<void>;
}

export const getPayrollTax = create<payrollTaxStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollTax: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/taxes");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
