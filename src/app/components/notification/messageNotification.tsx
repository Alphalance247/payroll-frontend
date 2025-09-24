"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { BsBellFill, BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import useBoolean from "@/app/hooks/useBoolean";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";
interface Items {
  id: string;
  message: string;
  is_read: Boolean;
}
const MessageNotification = ({ isMobile = true }: { isMobile: boolean }) => {
  const { loading, error, all, fetchNotifications } = useNotificationStore();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const [activeBtn, setActiveBtn] = useState<string | any>("all");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "all" },
    { id: 2, name: "read" },
    { id: 3, name: "unread" },
  ];
  const [openNotificationAction, setOpenNoficationAction] = useState(null);
  const toggleNotificationAction = (id: any) => {
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
      }
      fetchNotifications();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <div className="border-b border-[#E3E3E5] flex justify-between px-6">
        <div className="flex gap-x-4 items-center">
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
      {loading ? (
        <>
          <Spinner spinnerSmall={true} />
        </>
      ) : error ? (
        <ErrorFetch
          message="There is an error"
          onRefetch={fetchNotifications}
        />
      ) : (
        <div className={isMobile ? `overflow-y-auto h-[350px]` : ""}>
          {!filteredItems ? (
            <div className=" flex justify-center items-center my-96">
              Notification is not found
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div className="px-6 pt-6 " key={index}>
                <div className="relative border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
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
                      <p className="text-sm text-[#71717A]">
                        {item.created_at}
                      </p>
                    </div>
                  </div>
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
                    <div className="absolute -top-4 -right-56 bg-white shadow-lg h-fit rounded-md w-fit z-auto">
                      <div className="grid gap-y-3 p-4">
                        {" "}
                        <button
                          className="outline-none text-[#71717A] capitalize font-Graphik font-normal text-start"
                          onClick={() => markAsRead(item.id)}
                        >
                          Mark as read
                        </button>
                        <button className="outline-none text-[#71717A] capitalize font-Graphik font-normal text-start">
                          Dismiss Notification
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MessageNotification;
