import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface noticationCategoriesDataStore {
  data: {
    name: string;
    code: string;
    description: string;
    notification_types: {
      name: string;
      description: string;
      code: string;
      id: number;
    }[];
  }[];
}

interface noticationCategoriesStore {
  data: noticationCategoriesDataStore | null;
  loading: boolean;
  error: string | null;
  fetchNotificationCategory: () => Promise<void>;
}

export const getNotificationCategories = create<noticationCategoriesStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchNotificationCategory: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          "/company/notifications/categories"
        ); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
