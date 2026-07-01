// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface yearlyJobTypeDataStore {
  data: {
    January: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    February: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    March: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    April: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    May: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    June: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };

    July: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };
    August: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };

    September: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };

    October: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };

    November: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
    };

    December: {
      "AI In Software": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };

      Advocate: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Cloud Upgrade": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      Design: {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Domestic Staff": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Enterprise Strategy Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Operational Excellence Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Senior Leadership Team": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
      "Service Management": {
        "Full Time": number;
        "Part Time": number;
        Contract: number;
        Intern: number;
      };
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
