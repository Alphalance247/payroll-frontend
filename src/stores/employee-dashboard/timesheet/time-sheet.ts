import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeTimesheetDataListStore {
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
  total_hours: string;
  total_overtime: string;
  total_regular_hours: string;
}

interface employeeTimesheetListStore {
  data: employeeTimesheetDataListStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeTimesheet: () => Promise<void>;
}

export const getEmployeeTimesheet = create<employeeTimesheetListStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeTimesheet: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get("/employees/my-timesheet");
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
