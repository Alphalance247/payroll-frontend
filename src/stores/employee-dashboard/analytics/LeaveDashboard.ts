import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface Dashboard {
    approved: number
    awaiting_approval: number
    national_holidays: number
    remaining: number
}
interface LeaveDashboard {
    leaveData: Dashboard | null
    loadingLeaveDashbord: boolean
    LeaveDashboardError: string
    fetchLeaveList: () => Promise<void>
}
export const getLeaveDashboardData = create<LeaveDashboard>((set) => ({
    leaveData: null, loadingLeaveDashbord: false, LeaveDashboardError: "", fetchLeaveList: async () => {
        set({ loadingLeaveDashbord: true, LeaveDashboardError: "" })
        try {
            const res = await axiosInstance(`/leaves/dashboard`)
            // if (res.status === 200 || 201) {
            set({ loadingLeaveDashbord: false, leaveData: res.data })
            console.log(res.data)

            // }


        } catch (err) {
            if (err instanceof AxiosError) {
                set({ LeaveDashboardError: err.message, loadingLeaveDashbord: false })
            }
        }

    }
}))