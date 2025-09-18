"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
const MessageNotification = ({ isMobile = true }: { isMobile: boolean }) => {
  const { loading, error, notifications, fetchNotifications } =
    useNotificationStore();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  const [activeBtn, setActiveBtn] = useState<string | any>("all");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "all" },
    { id: 2, name: "read" },
    { id: 3, name: "unread" },
  ];
  // const toggleReadStatus = (id: any) => {
  //   const read = notifications?.all.map((item) =>
  //     item.id === id ? { ...item, is_read: !item.is_read } : item
  //   );
  //   setActiveBtn(read);

  //   console.log(read);
  // };

  const filteredItems = notifications?.all.filter((item) => {
    if (activeBtn === "read") {
      return item.is_read === true;
    }
    if (activeBtn === "unread") {
      return item.is_read === false;
    }
    return true;
  });
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
              <div className="px-6 pt-6" key={index}>
                <div className="border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
                  <div className="flex items-start gap-x-6 cursor-pointer">
                    <Image
                      src="/assets/notification/notification-fill.svg"
                      width={24}
                      height={24}
                      alt="bell"
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
                    <span>
                      <GoDotFill fill="#E37915" size={10} />
                    </span>
                  </div>
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
