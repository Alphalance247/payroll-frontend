import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface queryListDataStore {
  data: {
    amount_in_dispute: string;
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
  }[];
}

interface queryListStore {
  data: queryListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchQueryList: () => Promise<void>;
}

export const getQueryList = create<queryListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchQueryList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/queries");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
