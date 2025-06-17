// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface TeamListDataStore {
  data: [
    {
      id: string;
      name: string;
      lead: {
        id: string;
        fullname: string;
      };
      members_count: string;
      members: [name: string, id: string];
    }
  ];
  // Add other fields from your API
}

interface TeamListStore {
  data: TeamListDataStore | null;
  loading: boolean;
  error: string | null;
  fetchTeamList: () => Promise<void>;
}

export const getTeamList = create<TeamListStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchTeamList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/list-teams"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
