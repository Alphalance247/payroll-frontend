import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employees {
  employees: {
    name: string;
    hours: number;
  }[];
  team_name: string;
  total_team_hours: number;
}

interface teamHoursLoggedDataStore {
  avg_hours: number;
  total_hours: number;
  employee_data: employees[];
}

interface teamHoursLoggedStore {
  data: teamHoursLoggedDataStore | null;
  loading: boolean;
  error: string | null;
  fetchTeamHoursLogged: (
    start_date?: string,
    end_date?: string
  ) => Promise<void>;
}

export const getTeamHoursLogged = create<teamHoursLoggedStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTeamHoursLogged: async (start_date?: string, end_date?: string) => {
    set({ loading: true, error: null });
    try {
      let url = "/employees/timesheet";
      if (start_date && end_date) {
        url += `?start_date=${start_date}&end_date=${end_date}`;
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
