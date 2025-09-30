import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface Leaves {
    name: string
    value: string
}
interface HolidayLeave {
    items: Leaves[]
    errorValue: string
    loadingState: boolean
    fetchLeaves: () => Promise<void>
}
export const useLeaveStore = create<HolidayLeave>((set) => ({
    items: [], errorValue: "", loadingState: false, fetchLeaves: async () => {
        set({ loadingState: true, errorValue: "" })
        try {
            const res = await axiosInstance.get(`/leaves/calendar`);
            if (res.status === 200 || 201) {
                set({ loadingState: false, items: res.data })
            }
            set({ loadingState: false, items: res.data })
        } catch (error) {
            if (error instanceof AxiosError) {
                set({ loadingState: false, errorValue: error.message })
            }
        }
    }
}))