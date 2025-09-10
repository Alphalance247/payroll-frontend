import { create } from "zustand"
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios"

interface DocumentState {
    data: [{
        doc_name: string,
        file_size: string,
        document: string,
        id: string,
    }]

}
interface DocumentInfo {
    documents: DocumentState | null,
    error: string | null,
    loading: false,
    fetchDocument: () => Promise<void>,
}
export const useDocumentsUploaded = create<DocumentInfo>((set) => ({
    documents: null,
    error: "", loading: false,
    fetchDocument: async () => {
        set({ loading: false, error: "" })
        try {
            const res = await axiosInstance.get<DocumentState>(`/employees/my-employee-documents`)
            set({ documents: res.data, loading: false })
            console.log(res.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ error: error.message, loading: false })
            }
            else {
                set({ error: "'An unexpected error occurred'", loading: false })
            }
        }

    },

})
)
