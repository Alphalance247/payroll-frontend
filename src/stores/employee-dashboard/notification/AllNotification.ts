import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface Item {
    id: string,
    message: string,
    created_at: string,
    is_read: boolean
}

interface employeeNotifications {
    all: Item[],
    read: Item[],
    unread: Item[],
    error: string
    loading: boolean
    fetchNotifications: () => Promise<void>
}
export const useNotificationStore = create<employeeNotifications>((set) => ({
    all: [], read: [], unread: [], error: "", loading: false,
    fetchNotifications: async () => {
        set({ loading: true, error: "" })
        try {
            const res = await axiosInstance.get(`employees/notifications`)
            set({
                loading: false, all: res.data.all, read: res.data.read, unread: res.data.unread
            })
        } catch (err) {
            if (err instanceof AxiosError) {
                set({ error: err.message, loading: false })
            }
            else {
                set({
                    error: "An unexpected error occurred", loading: false
                })
            }
        }
    },

}))