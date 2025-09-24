"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Button from "@/app/common/Button";
import MessageNotification from "./messageNotification";
import Link from "next/link";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import { useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
const NotificationModal = () => {
  const { all, fetchNotifications } = useNotificationStore();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const markAllRead = async () => {
    try {
      const res = await axiosInstance.post(`employees/notifications`, {
        mark_all_read: true,
      });
      all.map((item) => ({ ...item, is_read: true }));
      fetchNotifications();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="h-auto py-6 bg-white border border-[#E3E3E5] absolute overflow-y-auto z-40 right-0 mt-2  w-[480px] rounded-xl">
      <div className="">
        <h2 className="text-xl px-6 font-semibold text-[#2F2F33] mb-3">
          Notifications
        </h2>
      </div>
      <MessageNotification isMobile={true} />

      <div
        className="flex justify-between items-center px-6 pt-6 cursor-pointer"
        onClick={() => markAllRead()}
      >
        <p className="text-[#2F2F33] text-sm font-semibold flex gap-x-2 ">
          <IoMdCheckmarkCircleOutline fill="#2F2F33" size={18} /> Mark all as
          read
        </p>

        <Link href={"/admin/notification"}>
          <Button variant="secondary">See all Notifications</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotificationModal;
