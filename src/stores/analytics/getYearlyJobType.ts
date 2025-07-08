// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface yearlyJobTypeDataStore {
  data: {
    January: {
      "Full time": number;
      Contractors: number;
    };
    February: {
      "Full time": number;
      Contractors: number;
    };
    March: {
      "Full time": number;
      Contractors: number;
    };
    April: {
      "Full time": number;
      Contractors: number;
    };
    May: {
      "Full time": number;
      Contractors: number;
    };
    June: {
      "Full time": number;
      Contractors: number;
    };
    July: {
      "Full time": number;
      Contractors: number;
    };
    August: {
      "Full time": number;
      Contractors: number;
    };
    September: {
      "Full time": number;
      Contractors: number;
    };
    October: {
      "Full time": number;
      Contractors: number;
    };
    November: {
      "Full time": number;
      Contractors: number;
    };
    December: {
      "Full time": number;
      Contractors: number;
    };
  };
}

interface yearlyJobTypeStore {
  data: yearlyJobTypeDataStore | null;
  loading: boolean;
  error: string | null;
  fetchYearlyJobType: (year?: string) => Promise<void>;
}

export const getYearlyJobType = create<yearlyJobTypeStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchYearlyJobType: async (year?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/yearly_jobtype";
      if (year) {
        url += `?year=${year}`;
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
