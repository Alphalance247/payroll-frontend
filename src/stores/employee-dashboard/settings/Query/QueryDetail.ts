import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface QueryDetails {

    attachments: []
    audit_logs: []
    comments: []
    query: {
        id: string,
        query_type: string,
        title: string,
        description: string,
        amount_in_dispute: string
        assigned_to: string
        created_at: string
        created_by: string
        expected_resolution_date: string
        jira_ticket_id: string
        payroll_lifecycle_affected: string
        resolution: boolean
        status: string
        team: string
        updated_at: string
    }

}
interface QueryStore {
    data: QueryDetails | null
    loading: boolean
    error: string
    fetchQuery: (query_id: string) => Promise<void>
}
export const useQueryStore = create<QueryStore>((set) => ({
    data: null, loading: false, error: "", fetchQuery: async (query_id) => {
        set({ loading: true, error: "" })
        try {
            const res = await axiosInstance.get(`/employees/my-queries/${query_id}`)
            set({ data: res.data, loading: false })
            console.log(res.data);

        } catch (err) {
            if (err instanceof AxiosError) {
                set({ error: err.message, loading: false })
            }
            else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    }
}))