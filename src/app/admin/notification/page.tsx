"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import TopBar from "../../common/topBar";
import MessageNotification from "../../components/notification/messageNotification";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import { useEffect } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const Notification = () => {
  const { all, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllRead = async () => {
    try {
      const res = await axiosInstance.post(`employees/notifications`, {
        mark_all_read: true,
      });
      if (res.status === 200 || 201) {
        console.log(res.data);
      }
      all.map((item) => ({ ...item, is_read: true }));
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  };
  return (
    <section className="">
      <TopBar />
      <div className="h-full bg-white py-20 max-w-[807px] mx-auto">
        <div className="flex justify-between mb-10">
          <h2 className="text-xl px-6 font-semibold text-[#2F2F33] mb-3">
            Notifications
          </h2>
          <p
            className="text-[#E37915] text-sm font-semibold flex gap-x-2 cursor-pointer"
            onClick={() => markAllRead()}
          >
            <IoMdCheckmarkCircleOutline fill="#E37915" size={18} /> Mark all as
            read
          </p>
        </div>
        <div>
          <MessageNotification />
        </div>
      </div>
    </section>
  );
};

export default Notification;
