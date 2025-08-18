// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeDocumentsDataStore {
  data: {
    id: number;
    month: string;
    label: string;
    documents: {
      id: number;
      document: string;
      doc_name: string;
      uploaded_at: string;
      filename: string;
    }[];
  }[];
}

interface employeeDocumentsStore {
  data: employeeDocumentsDataStore | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeDocuments: () => Promise<void>;
}

export const getEmployeeDocuments = create<employeeDocumentsStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchEmployeeDocuments: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/employees/employee-documents"); // Adjust endpoint
      set({ data: res.data, loading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        set({ error: err.message, loading: false });
      }
    }
  },
}));
