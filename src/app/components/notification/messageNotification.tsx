"use client";
import Image from "next/image";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";

const MessageNotification = ({ isMobile = true }: { isMobile: boolean }) => {
  const [activeBtn, setActiveBtn] = useState<string>("All");

  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All" },
    { id: 2, name: "Read" },
    { id: 3, name: "Unread" },
  ];
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
              }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer`}
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

      <div className={isMobile ? `overflow-y-auto h-[350px]` : ""}>
        <div className="px-6 pt-6">
          <div className="border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
            <div className="flex items-start gap-x-6">
              <Image
                src="/assets/notification/notification-fill.svg"
                width={24}
                height={24}
                alt="bell"
              />
              <div>
                <p className="text-base font-semibold text-[#2F2F33] mb-2">
                  You submitted your timesheet for April 1–7. HR will review it
                  shortly.
                </p>
                <p className="text-sm text-[#71717A]">17 hours ago</p>
              </div>
            </div>
            <div>
              <span>
                <GoDotFill fill="#E37915" size={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6">
          <div className="border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
            <div className="flex items-start gap-x-6">
              <Image
                src="/assets/notification/notification-fill.svg"
                width={24}
                height={24}
                alt="bell"
              />
              <div>
                <p className="text-base font-semibold text-[#2F2F33] mb-2">
                  You submitted your timesheet for April 1–7. HR will review it
                  shortly.
                </p>
                <p className="text-sm text-[#71717A]">17 hours ago</p>
              </div>
            </div>
            <div>
              <span>
                <GoDotFill fill="#E37915" size={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6">
          <div className="border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
            <div className="flex items-start gap-x-6">
              <Image
                src="/assets/notification/notification-fill.svg"
                width={24}
                height={24}
                alt="bell"
              />
              <div>
                <p className="text-base font-semibold text-[#2F2F33] mb-2">
                  You submitted your timesheet for April 1–7. HR will review it
                  shortly.
                </p>
                <p className="text-sm text-[#71717A]">17 hours ago</p>
              </div>
            </div>
            <div>
              <span>
                <GoDotFill fill="#E37915" size={10} />
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6">
          <div className="border-b border-[#E3E3E5] pb-6 flex gap-x-5 items-center justify-between">
            <div className="flex items-start gap-x-6">
              <Image
                src="/assets/notification/notification-fill.svg"
                width={24}
                height={24}
                alt="bell"
              />
              <div>
                <p className="text-base font-semibold text-[#2F2F33] mb-2">
                  You submitted your timesheet for April 1–7. HR will review it
                  shortly.
                </p>
                <p className="text-sm text-[#71717A]">17 hours ago</p>
              </div>
            </div>
            <div>
              <span>
                <GoDotFill fill="#E37915" size={10} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageNotification;
