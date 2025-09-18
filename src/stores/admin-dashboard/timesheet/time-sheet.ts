import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface adminTimesheetDataListStore {
  timesheet: {
    id: string;
    date_logged: string;
    description: string;
    hours: string;
    overtime: string;
  }[];
  timesheet_data: {
    id: string;
  };
  avg_hours: number;
  total_hours: number;
  missing: number;
}

interface adminTimesheetListStore {
  data: adminTimesheetDataListStore | null;
  loading: boolean;
  error: string | null;
  fetchAdminTimesheet: () => Promise<void>;
}

export const getAdminTimesheet = create<adminTimesheetListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAdminTimesheet: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/timesheet");
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
