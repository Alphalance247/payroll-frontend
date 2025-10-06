"use client";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Button from "@/app/common/Button";
import Link from "next/link";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { BsBellFill, BsThreeDotsVertical } from "react-icons/bs";
const NotificationModal = () => {
  const { all, fetchNotifications } = useNotificationStore();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const [activeBtn, setActiveBtn] = useState<string>("all");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "all" },
    { id: 2, name: "read" },
    { id: 3, name: "unread" },
  ];
  const [openNotificationAction, setOpenNoficationAction] = useState(null);
  const toggleNotificationAction = (id: string | any) => {
    setOpenNoficationAction(openNotificationAction === id ? null : id);
  };

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
        setOpenNoficationAction(null);
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
      if (res.status === 200 || 201) {
        console.log(res.data);
      }
      all.map((item) => ({ ...item, is_read: true }));
      fetchNotifications();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="relative">
      <div className="h-auto py-6 bg-white border border-[#E3E3E5] absolute z-10 right-0 mt-2  w-[480px] rounded-xl">
        <div className="">
          <h2 className="text-xl px-6 font-semibold text-[#2F2F33] mb-3">
            Notifications
          </h2>
        </div>
        <div className="border-b border-[#E3E3E5] flex justify-between px-6">
          <div className="flex gap-x-4 items-center ">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                    : "text-[#71717A] border-transparent "
                }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer capitalize`}
                key={i}
                onClick={() => {
                  setActiveBtn(el.name);
                }}
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
        <div className=" h-[300px] overflow-y-auto">
          {filteredItems.map((item, index) => (
            <div className="px-6 pt-6  " key={index}>
              <div className=" border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
                <div
                  className="flex items-start gap-x-6 cursor-pointer"
                  onClick={() => markAsRead(item.id)}
                >
                  <BsBellFill
                    className={
                      item.is_read
                        ? "text-[#71717A] w-6 h-6"
                        : "text-[#E37915] w-6 h-6"
                    }
                  />
                  <div>
                    <p className="text-base font-semibold text-[#2F2F33] mb-2">
                      {item.message}
                    </p>
                    <p className="text-sm text-[#71717A]">{item.created_at}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="relative">
                      <BsThreeDotsVertical
                        className={
                          !item.is_read
                            ? "cursor-pointer text-[#71717A]"
                            : "hidden"
                        }
                        onClick={() => toggleNotificationAction(item.id)}
                      />
                    </span>
                  </div>

                  {openNotificationAction === item.id && (
                    <div className="absolute top-44 -right-56 bg-white shadow-lg h-fit rounded-md w-fit z-30 ">
                      <div className="grid gap-y-3 p-4">
                        {" "}
                        <button
                          className="outline-none text-[#71717A] capitalize font-Graphik font-normal text-start"
                          onClick={() => markAsRead(item.id)}
                        >
                          Mark as read
                        </button>
                        {/* <button className="outline-none text-[#71717A] capitalize font-Graphik font-normal text-start">
                          Dismiss Notification
                        </button> */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default NotificationModal;
