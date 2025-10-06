import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface holidayDataStore {
  data: {
    holidays: {
      results: {
        id: string;
        country: string;
        date: string;
        name: string;
        primary_type: string;
        status: string;
        type: string;
      }[];
    };
    events: {
      id: string;
      type: string;
      start: string;
      title: string;
      location: string;
    }[];
  };
}

interface holidayStore {
  data: holidayDataStore | null;
  loading: boolean;
  error: string | null;
  fetchPayrollHoliday: (
    start_date?: string,
    end_date?: string
  ) => Promise<void>;
}

export const getHolidayStore = create<holidayStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchPayrollHoliday: async (start_date?: string, end_date?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/leaves/holidays";
      if (start_date && end_date) {
        url += `?from_date=${start_date}&to_date=${end_date}`;
      } else {
        url += `?upcoming=true`;
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
