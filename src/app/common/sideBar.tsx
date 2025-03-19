"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";
import { FaMoneyCheckAlt, FaUserFriends } from "react-icons/fa";
import { HiOutlineReceiptTax } from "react-icons/hi";
import {
  IoDocumentTextOutline,
  IoGitPullRequestOutline,
} from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { TbSettings2 } from "react-icons/tb";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

interface SubHeading {
  text: string;
  icons?: React.ReactNode;
  link?: string;
}

interface sideBarData {
  heading?: string;
  subHeadings: SubHeading[];
}

const Sidebar: React.FC = () => {
  const sideBarData: sideBarData[] = [
    {
      subHeadings: [
        { text: "Home", link: "/", icons: <HiOutlineHome size={20} /> },
        {
          text: "Compliance",
          link: "/compliance",
          icons: <MdOutlinePayment size={20} />,
        },
      ],
    },
    {
      heading: "Payment",
      subHeadings: [
        { text: "Payroll", icons: <MdOutlinePayment size={20} /> },
        { text: "Payment method", icons: <FaMoneyCheckAlt size={20} /> },
        { text: "Tax", icons: <HiOutlineReceiptTax size={20} /> },
        { text: "Loan requests", icons: <FaMoneyCheckAlt size={20} /> },
      ],
    },
    {
      heading: "PEOPLE",
      subHeadings: [
        { text: "People", icons: <FaUserFriends size={20} /> },
        { text: "Documents", icons: <IoDocumentTextOutline size={20} /> },
        { text: "Query", icons: <AiOutlineMessage size={20} /> },
      ],
    },
    {
      heading: "COMPANY",
      subHeadings: [
        {
          text: "Analytics",
          link: "/analytics",
          icons: <BsBarChartLine size={20} />,
        },
        { text: "Time Tracking", icons: <IoMdTime size={20} /> },
        { text: "Integrations", icons: <IoGitPullRequestOutline size={20} /> },
        { text: "Settings", icons: <TbSettings2 size={20} /> },
      ],
    },
  ];

  const [activePage, setActivePage] = useState<string>(
    sideBarData[0]?.subHeadings[0].text || ""
  );

  return (
    <aside className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Logo / Brand Name */}
      <div className="flex flex-col justify-between mb-24">
        <div className="pl-4 py-6 font-bold ">
          <Image
            src="/assets/Home/alluvium.svg"
            width={121}
            height={25}
            alt="alluviumlogo"
          />
        </div>

        {/* Navigation Menu */}
        <div className="mt-4 px-3">
          <div className="mb-4">
            <input
              type="text"
              className="py-[10px] px-3 w-full h-[42px] border border-[#E5E7EB] text-sm font-medium shadow-sm rounded-lg"
              placeholder="Quick search"
            />
          </div>
          <nav className="mt-4">
            <ul className="flex flex-col gap-y-4">
              {sideBarData.map((item, i) => {
                return (
                  <div key={i}>
                    {item?.heading && (
                      <h3 className="mb-3 pl-3 text-xs font-medium text-[#71717A] uppercase font-Graphik ">
                        {item?.heading}
                      </h3>
                    )}

                    <div className="flex flex-col gap-y-2">
                      {item?.subHeadings &&
                        item?.subHeadings?.map((items, i) => (
                          <Link href={items?.link || "/"} passHref key={i}>
                            <div
                              className={`flex gap-x-3 items-center  rounded-lg py-[10px] pl-3 ${
                                activePage === items?.text
                                  ? "bg-[#FCF2E8] text-[#E37915]"
                                  : "bg-transparent text-[#2F2F33]"
                              }`}
                              onClick={() => setActivePage(items?.text)}
                            >
                              <span>{items?.icons}</span>
                              <li className="text-sm  font-medium font-Graphik">
                                {items?.text}
                              </li>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex justify-between items-center bg-[#F7F7F7] py-3 pl-4">
        <div className="flex items-center gap-x-3">
          <Image
            src="/assets/Home/avatar.svg"
            width={40}
            height={40}
            alt="avatar"
          />
          <div>
            <p className="text-[#2F2F33] text-base font-Graphik font-semibold mb-1">
              Olivia Rhye
            </p>
            <p className="text-[#71717A] text-sm">Admin</p>
          </div>
        </div>
        <span>
          <HiOutlineChevronUpDown size={20} />
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
