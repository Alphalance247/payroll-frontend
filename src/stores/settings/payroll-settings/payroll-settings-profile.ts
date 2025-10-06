import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface payrollSettingsProfileDataStore {
  settings: {
    cutt_off_day: string;
    leave_allowance: string;
    loan_repayment_freq: string;
    loan_repayment_percentage: string;
    username: string;
    payroll_approvals: { employee__account__email: string; id: string }[];
    pay_day: string;
    payment_mode: string;
    payroll_extra_month_percentage: string;
    payslip_send_mode: string;
    payroll_extra_month_payout_month: string;
    send_payslip_to: string;
    approval_req_channel: { id: string }[];
    time_sheet_cut_off_day: string;
  };
}

interface payrollSettingsProfileStore {
  data: payrollSettingsProfileDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollSettingsProfile: () => Promise<void>;
}

export const getPayrollSettingsProfile = create<payrollSettingsProfileStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchPayrollSettingsProfile: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get("/company/payroll/settings/"); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
