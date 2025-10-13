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
  current_week_data: {
    name: string;
    week_hours: {
      Mon: string;
      Tue: string;
      Wed: string;
      Thu: string;
      Fri: string;
      Sat: string;
      Sun: string;
    };
  }[];
  avg_hours: number;
  total_hours: number;
  missing: number;
}

interface adminTimesheetListStore {
  data: adminTimesheetDataListStore | null;
  loading: boolean;
  error: string | null;
  fetchAdminTimesheet: (start?: string, end?: string) => Promise<void>;
}

export const getAdminTimesheet = create<adminTimesheetListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchAdminTimesheet: async (start?: string, end?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/timesheet?week=true";

      if (start && end) {
        url = "/employees/timesheet";
        url += `?start_date=${start}&end_date=${end}`;
      }
      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
