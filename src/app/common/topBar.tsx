import React from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const TopBar = () => {
  const { user, logout, isLoggingOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full bg-[#F7F7F7] border-b border-[#E3E3E5]">
      <div className="flex items-center justify-between px-6 py-5 max-w-[1440px] mx-auto">
        <div className="font-bold">
          <Image
            src="/assets/Home/alluvium.svg"
            width={121}
            height={25}
            alt="alluviumlogo"
          />
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

          <div className="bg-[#F6F6F6] flex items-center justify-center relative cursor-pointer ">
            <p className="w-4 h-4 text-[10px] flex flex-col items-center justify-center rounded-full absolute bg-[#EA5455] text-white top-3 right-1">
              6+
            </p>
            <IoNotificationsOutline size={38} color="#4E4E4E" />
          </div>

          <div
            className="flex justify-between gap-x-4 items-center bg-[#F6F6F6] cursor-pointer border-l border-l-[#D3D3D6] pl-4"
            onClick={logout}
          >
            <div className="flex items-center gap-x-3">
              <Image
                src="/assets/topbar/Icon.svg"
                width={40}
                height={40}
                alt="avatar"
              />
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
        </div>
      </div>
    </header>
  );
};

export default TopBar;
