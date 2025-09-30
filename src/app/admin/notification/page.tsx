"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import TopBar from "../../common/topBar";
import MessageNotification from "../../components/notification/messageNotification";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { BsBellFill, BsThreeDotsVertical } from "react-icons/bs";
const Notification = ({ isMobile }: { isMobile: boolean }) => {
  const { all, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const [openNotificationAction, setOpenNoficationAction] = useState(null);

  const toggleNotificationAction = (id: any) => {
    setOpenNoficationAction(openNotificationAction === id ? null : id);
  };
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "all" },
    { id: 2, name: "read" },
    { id: 3, name: "unread" },
  ];
  const [activeBtn, setActiveBtn] = useState<string | any>("all");

  const filteredItems = all.filter((item) => {
    if (activeBtn === "read") {
      return item.is_read === true;
    }
    if (activeBtn === "unread") {
      return item.is_read === false;
    }
    return true;
  });
  const markAsRead = async (id: string) => {
    try {
      const read = all.map((item) =>
        item.id === id ? { ...item, is_read: !item.is_read } : item
      );
      const res = await axiosInstance.patch(`employees/notifications/${id}`, {
        is_read: true,
      });
      if (res.status === 200 || 201) {
        console.log(read);
      }
      fetchNotifications();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  };
  const markAllRead = async () => {
    try {
      const res = await axiosInstance.post(`employees/notifications`, {
        mark_all_read: true,
      });
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
        <div className={isMobile ? "hidden" : "relative"}>
          <MessageNotification />
        </div>
      </div>
    </section>
  );
};

export default Notification;
