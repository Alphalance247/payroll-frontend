import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface TaxRecord {
  tax_amount_monthly: number;
  tax_amount_yearly: number;
  remmited: boolean;
  payslip: {
    employee: {
      fullname: string;
      id: string;
    };
  };
}

interface payrollTaxDataStore {
  data: TaxRecord[];
  total_monthly_tax: number;
}

interface payrollTaxStore {
  data: payrollTaxDataStore | null;
  loading: boolean;
  error: string | null;
  updateLoading: boolean;
  updateError: string | null;
  fetchPayrollTax: (month?: string, year?: string) => Promise<void>;
  updateRemittanceStatus: (
    employeeIds: string[],
    remmited: boolean,
  ) => Promise<boolean>;
}

export const getPayrollTax = create<payrollTaxStore>((set) => ({
  data: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,

  fetchPayrollTax: async (month?: string, year?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/taxes";
      if (month && year) {
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

  updateRemittanceStatus: async (employeeIds: string[], remmited: boolean) => {
    set({ updateLoading: true, updateError: null });
    try {
      const url = remmited
        ? "/employees/taxes/mark-multiple-paid"
        : "/employees/taxes/mark-multiple-unpaid/";
      await axiosInstance.post(url, { employee_ids: employeeIds });
      set((state) => ({
        updateLoading: false,
        data: state.data
          ? {
              ...state.data,
              data: state.data.data.map((record) =>
                employeeIds.includes(record.payslip.employee.id)
                  ? { ...record }
                  : record,
              ),
            }
          : null,
      }));
      return true;
    } catch (err) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.message || err.message || "Something went wrong";
        set({ updateError: message, updateLoading: false });
      }
      return false;
    }
  },
}));
