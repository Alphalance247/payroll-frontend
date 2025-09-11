import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeNoticationCategoriesDataStore {
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
  data: employeeNoticationCategoriesDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeesNotificationCategory: () => Promise<void>;
}

export const getEmployeesNotificationCategories =
  create<noticationCategoriesStore>((set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeesNotificationCategory: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          "/employees/notifications/categories"
        ); // Adjust endpoint
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  }));
