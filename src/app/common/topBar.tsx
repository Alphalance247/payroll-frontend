"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import Link from "next/link";
import NotificationModal from "../components/notification/notificationModal";
import { useNotificationStore } from "@/stores/employee-dashboard/notification/AllNotification";
import { useMemo } from "react";

const TopBar = () => {
  const { user, logout, isLoggingOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openNotification, setOpenNofication] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { all, read, unread, fetchNotifications } = useNotificationStore();
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="sticky top-0 z-10 w-full bg-[#F7F7F7] border-b border-[#E3E3E5]">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1440px] mx-auto">
        <div className="font-bold">
          <Link href="/">
            <Image
              src="/assets/Home/alluvium.svg"
              width={121}
              height={25}
              alt="alluviumlogo"
            />
          </Link>
        </div>

        <div className="flex gap-x-6">
          <div className="relative">
            <BiSearch
              className="absolute top-3 left-3"
              size={14.28}
              color="#71717A"
            />

            <input
              type="text"
              className="py-[12px] pl-8 pr-3 w-[329px] h-[42px] border border-[#E5E7EB] text-sm font-medium shadow-sm rounded-lg"
              placeholder="Search for people and payroll"
            />
          </div>
          <div className="relative">
            <div
              className="bg-[#F6F6F6] flex items-center justify-center relative cursor-pointer "
              onClick={() => setOpenNofication(!openNotification)}
            >
              <p className="w-4 h-4 text-[10px] flex flex-col items-center justify-center rounded-full absolute bg-[#EA5455] text-white top-3 right-1">
                {(unread.length as any) > 9 ? "9+" : unread.length}
              </p>
              <IoNotificationsOutline size={38} color="#4E4E4E" />
            </div>
            {/* Notification Modal */}
            {openNotification && <NotificationModal />}
          </div>

          <div className="relative" ref={dropdownRef}>
            <div
              className="flex justify-between gap-x-4 items-center bg-[#F6F6F6] cursor-pointer border-l border-l-[#D3D3D6] pl-4"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center gap-x-3">
                <div className="h-10 w-10 rounded-full bg-[#009BC0] text-white flex items-center justify-center text-sm font-medium">
                  {user?.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <p className="text-[#2F2F33] text-base font-medium font-Graphik mb-1">
                    {user?.fullname || "Admin"}
                  </p>
                  <p className="text-[#71717A] text-[13px] leading-5 font-Graphik">
                    {user?.is_payroll_staff ? "Admin" : "Staff"}
                  </p>
                </div>
              </div>
              <span>
                {isLoggingOut ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#E37915]"></div>
                ) : (
                  <FaChevronDown color="#7C7C7C" size={20} />
                )}
              </span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
