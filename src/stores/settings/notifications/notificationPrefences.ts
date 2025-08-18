import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface adminNotificationPreferenceDataStore {
  data: {
    channels: {
      name: string;
      description: string;
      code: string;
      id: number;
    }[];
  }[];
}

interface adminNotificationPreferenceStore {
  data: adminNotificationPreferenceDataStore | null;
  loading: boolean;
  error: string | null;
  fetchAdminNoticationPreferences: () => Promise<void>;
}

export const getAdminNotificationPreferences =
  create<adminNotificationPreferenceStore>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchAdminNoticationPreferences: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          "/company/notifications/preferences"
        ); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  }));
