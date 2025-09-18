import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface Notification {
    all: [
        {
            id: string,
            message: string,
            created_at: string,
            is_read: boolean
        }
    ],
    read: [{
        id: string,
        message: string,
        created_at: string,
        is_read: boolean
    }],
    unread: [
        {
            id: string,
            message: string,
            created_at: string,
            is_read: boolean
        }
    ];

}
interface employeeNotifications {
    notifications: Notification | null
    error: string
    loading: boolean
    fetchNotifications: () => Promise<void>
}
// /employees/my-queries/id
export const useNotificationStore = create<employeeNotifications>((set) => ({
    notifications: null, error: "", loading: false,
    fetchNotifications: async () => {
        set({ loading: true, error: "" })
        try {
            const res = await axiosInstance.get(`employees/notifications`)
            set({
                loading: false, notifications: res.data
            })

            console.log(res.data)
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
    }
}))