// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  team_name: string;
  Count: number;
  total_bonus: string;
}

interface teamAnalyticsDataStore {
  team_count: data[];
  total_teams: number;
  active_employees: number;
  Full_time: number;
  contractors: number;
  total_hours: number;
  location: [
    {
      country: string;
      team_count: number;
    },
  ];
}

interface teamAnalyticsStore {
  data: teamAnalyticsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchTeamAnalytics: () => Promise<void>;
}

export const getTeamAnalytics = create<teamAnalyticsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTeamAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/team_analysis"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
