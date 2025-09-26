// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface adminPaymentIntegrationData {
  env: {
    paystack_secret: string;
    flutterwave_secret: string;
  };
}

interface adminPaymentIntegration {
  data: adminPaymentIntegrationData | null;
  loading: boolean;
  error: string | null;
  fetchPaymentIntegration: () => Promise<void>;
}

export const getPaymentIntegration = create<adminPaymentIntegration>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPaymentIntegration: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/company/env/"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
