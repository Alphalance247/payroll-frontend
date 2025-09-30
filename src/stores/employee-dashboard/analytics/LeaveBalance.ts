import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface BalanceData {
    leave_type: string
    total_entitled: number,
    carryover: number,
    days_taken: number,
    remaining_balance: number,
    leave_cycle_end: string
}
interface LeaveBalance {
    data: BalanceData[] | null
    loading: boolean
    error: string
    fetchLeaveBalance: () => Promise<void>
}
export const getLeaveBalance = create<LeaveBalance>((set) => ({
    data: [],
    loading: false,
    error: "",
    fetchLeaveBalance: async () => {
        set({
            loading: true, error: ""
        })
        try {
            const res = await axiosInstance.get(`/leaves/balance`)
            const response = res.data

            const formatted = response.map((item: any) => ({
                leave_type: item.leave_type,
                total_entitled: item.total_entitled,
                days_taken: item.days_taken,
                remaining_balance: item.remaining_balance,
                carryover: item.carryover,
                leave_cycle_end: item.leave_cycle_end
            }));
            console.log(formatted)
            if (res.status === 200 || 201) {
                set({ loading: false, data: formatted })
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                set({ error: err.message })
            }
        }
    }
}))