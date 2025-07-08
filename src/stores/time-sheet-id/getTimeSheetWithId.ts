// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

type TimesheetData = {
  [key in Month]: {
    date_logged: string;
    hours: number;
    overtime: number;
    type: string;
  }[];
};

interface timeSheetDataStore {
  total_hours: number;
  total_overtime: number;
  total_regular_hours: number;
  timesheet_data: TimesheetData;
}

interface timeSheetWithIdStore {
  data: timeSheetDataStore | null;
  loading: boolean;
  error: string | null;
  fetchTimeSheetWithId: (employeeId: string) => Promise<void>;
}

export const getTimeSheetWithId = create<timeSheetWithIdStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTimeSheetWithId: async (employeeId: string) => {
    set({ loading: true, error: null });
    try {
      const url = `/employees/timesheet/${employeeId}`;

      const res = await axiosInstance.get(url);
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
