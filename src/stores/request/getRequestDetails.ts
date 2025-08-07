// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface queryDetailsDataStore {
  query: {
    amount_in_dispute: number;
    assigned_to: string;
    created_at: string;
    created_by: string;
    description: string;
    id: string;
    expected_resolution_date: string;
    jira_ticket_id: string;
    payment_method: string;
    payroll_lifecycle_affected: string;
    query_type: string;
    resolution: string;
    status: string;
    team: string;
    title: string;
    updated_at: string;
  };
  audit_logs: {
    action: string;
    action_by: string;
    created: string;
    subject: string;
  }[];
}

interface queryDetailsStore {
  data: queryDetailsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchQueryDetails: (complianceId: string) => Promise<void>;
}

export const getQueryDetails = create<queryDetailsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchQueryDetails: async (complianceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/employees/queries/${complianceId}`);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
