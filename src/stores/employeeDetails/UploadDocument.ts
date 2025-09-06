import { create } from "zustand"
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios"

interface DocumentState {
    document_name: string,
    document_size: string,
    document_type: string
}
interface DocumentInfo {
    document: DocumentState[] | null,
    error: string | null,
    loading: false
    fetchDocument: () => Promise<void>
}
export const useDocumentsUploaded = create<DocumentInfo>((set) => ({
    document: null,
    error: "", loading: false,
    fetchDocument: async () => {
        set({ loading: false, error: "" })
        try {
            const res = await axiosInstance.get<DocumentState>(`/employees/employee/my-employee-documents`)
            console.log(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.message, loading: false })
            }
            else {
                set({ error: "'An unexpected error occurred'", loading: false })
            }
        }

    }
})
)