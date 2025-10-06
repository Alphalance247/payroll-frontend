import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeNotificationPreferenceDataStore {
  data: {
    channels: {
      channel: {
        name: string;
        description: string;
        code: string;
        id: number;
      };
    }[];
    notification_type: {
      id: number;
    };
  }[];
}

interface employeeNotificationPreferenceStore {
  data: employeeNotificationPreferenceDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeNoticationPreferences: () => Promise<void>;
}

export const getEmployeeNotificationPreferences =
  create<employeeNotificationPreferenceStore>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeNoticationPreferences: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          "/employees/notifications/preferences/"
        ); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  }));
