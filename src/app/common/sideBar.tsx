"use client";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import {
  MdOutlinePayment,
  MdOutlineGavel,
  MdOutlineBusiness,
} from "react-icons/md";
import { FaMoneyCheckAlt, FaUserFriends } from "react-icons/fa";
import { HiOutlineReceiptTax } from "react-icons/hi";
import {
  IoDocumentTextOutline,
  IoRocketOutline,
  IoNotificationsOutline,
  IoChevronBack,
  IoShieldHalf,
} from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { TbSettings2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { Search } from "lucide-react";
import { LuGift } from "react-icons/lu";
import { useAuth } from "../context/authContext";

interface dropDownText {
  link: string;
  text: string;
}

interface SubHeading {
  text: string;
  icons?: React.ReactNode;
  link?: string;
  arrowDown?: React.ReactNode;
  dropdownText?: dropDownText[];
}

interface sideBarData {
  heading?: string;
  subHeadings: SubHeading[];
}

const SIDEBAR_STORAGE_KEY = "sidebar_open_dropdown";

const Sidebar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { user } = useAuth();
  console.log("User from Sidebar:", user?.role); // Log the user object to check its structure

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (stored) setOpenDropdown(stored);
    } catch {}
  }, []);

  const handleDropDown = useCallback((sectionIdx: number, subIdx: number) => {
    const key = `${sectionIdx}-${subIdx}`;
    setOpenDropdown((prev) => {
      const next = prev === key ? null : key;
      try {
        if (next) localStorage.setItem(SIDEBAR_STORAGE_KEY, next);
        else localStorage.removeItem(SIDEBAR_STORAGE_KEY);
      } catch {}
      return next;
    });
  }, []);

  const handleNavClick = useCallback(() => {
    setOpenDropdown(null);
    try {
      localStorage.removeItem(SIDEBAR_STORAGE_KEY);
    } catch {}
  }, []);

  const sideBarData: sideBarData[] = [
    {
      subHeadings: [
        { text: "Home", link: "/admin", icons: <HiOutlineHome size={20} /> },
        {
          text: "Compliance",
          link: "/admin/compliance",
          icons: <MdOutlineGavel size={20} />,
        },
      ],
    },
    {
      heading: "Payment",
      subHeadings: [
        {
          text: "Payroll",
          icons: <MdOutlinePayment size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/admin/run-payroll",
              text: "Run Payroll",
            },

            {
              link: "/admin/payroll-history",
              text: "Payroll History",
            },
            // {
            //   link: "/admin/bonus",
            //   text: "Bonus",
            // },
          ],
        },
        {
          text: "Bonuses",
          icons: <LuGift size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/admin/bonuses/active-bonuses",
              text: "Active Bonuses",
            },

            ...(user?.role === "super_admin"
              ? [
                  {
                    link: "/admin/bonuses/pending-approval",
                    text: "Pending Approval",
                  },
                ]
              : []),
            {
              link: "/admin/bonuses",
              text: "Bonus History",
            },
          ],
        },
        {
          text: "Tax",
          icons: <HiOutlineReceiptTax size={20} />,
          link: "/admin/tax",
        },
        {
          text: "Loan requests",
          icons: <FaMoneyCheckAlt size={20} />,
          link: "/admin/loan",
        },
      ],
    },
    {
      heading: "PEOPLE",
      subHeadings: [
        {
          text: "People",
          icons: <FaUserFriends size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/admin/employee-management",
              text: "Employee Management",
            },
            {
              link: "/admin/employee-management/team-management",
              text: "Team Management",
            },
          ],
        },
        {
          text: "Storage",
          icons: <IoDocumentTextOutline size={20} />,
          link: "/admin/storage",
        },
        {
          text: "Request",
          icons: <AiOutlineMessage size={20} />,
          link: "/admin/request",
        },
      ],
    },
    {
      heading: "COMPANY",
      subHeadings: [
        {
          text: "Analytics",
          link: "/admin/analytics",
          icons: <BsBarChartLine size={20} />,
        },
        {
          text: "Time Tool",
          icons: <MdOutlinePayment size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/admin/time-sheet",
              text: "Timesheet",
            },
            {
              link: "/admin/leave-management",
              text: "Leave Management",
            },
            {
              link: "/admin/holiday-calendar",
              text: "Holiday Calendar",
            },
          ],
        },

        {
          text: "Settings",
          icons: <TbSettings2 size={20} />,
          link: "/admin/settings",
        },
      ],
    },
  ];

  const settingsSideBar: sideBarData[] = [
    {
      subHeadings: [
        {
          text: "Overview",
          icons: <IoRocketOutline fill="white" size={20} />,
          link: "/admin/settings",
        },
      ],
    },

    {
      heading: "Personal settings",
      subHeadings: [
        {
          text: "Your Account",
          link: "/admin/settings/account",
          icons: <FaRegUser size={20} />,
        },
        {
          text: "Notifications",
          link: "/admin/settings/notifications",
          icons: <IoNotificationsOutline size={20} />,
        },
      ],
    },

    {
      heading: "System Settings",
      subHeadings: [
        {
          text: "Payroll Settings",
          link: "/admin/settings/payroll-settings",
          icons: <MdOutlinePayment size={20} />,
        },
        {
          text: "Integrations",
          link: "/admin/settings/integrations",
          icons: <BsBarChartLine size={20} />,
        },
      ],
    },

    {
      heading: "Organization Settings",
      subHeadings: [
        {
          text: "Company Information",
          link: "/admin/settings/company-info",
          icons: <MdOutlineBusiness size={20} />,
        },
        // {
        //   text: "Billing Info",
        //   link: "/admin/settings/billing-info",
        //   icons: <BsBarChartLine size={20} />,
        // },
        {
          text: "Permissions",
          link: "/admin/settings/permissions",
          icons: <IoShieldHalf size={20} />,
        },
        {
          text: "Audit Logs",
          link: "/admin/settings/audit-logs",
          icons: <HiOutlineClipboardCheck size={20} />,
        },
      ],
    },
  ];

  // const { filteredData, setSearchQuery, searchQuery } = useFilter(
  //   settingsSideBar || [],
  //   [""]
  // );

  const SidebarToShow = pathname.startsWith("/admin/settings")
    ? settingsSideBar
    : sideBarData;

  const sideBarType = SidebarToShow;

  return (
    <div className=" bg-[#11202D] h-full border-r border-gray-200 overflow-y-auto">
      {/* Logo / Brand Name */}
      <div className="flex flex-col justify-between mb-12">
        {/* Navigation Menu */}
        <div className="mt-6 px-3">
          {pathname.startsWith("/admin/settings") && (
            <>
              <Link href={"/admin"}>
                <div className="flex gap-x-3 items-center py-[10px] pl-3 text-white font-medium text-sm mb-3">
                  <span>
                    <IoChevronBack size={20} />
                  </span>{" "}
                  <button>Settings</button>
                </div>
              </Link>
              <div className="relative ">
                <input
                  type="text"
                  placeholder="Search settings"
                  // value={searchQuery}
                  // onChange={(e) => {
                  //   setSearchQuery(e.target.value);
                  // }}
                  className="w-full outline-none bg-transparent text-[#BEBEC2] pl-10 p-2 border border-[#606A72] rounded-lg text-base"
                />
                <Search
                  size={20}
                  color="#71717A"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </>
          )}
          <nav className="mt-4">
            <ul className="flex flex-col gap-y-4">
              {sideBarType.map((item, sectionIdx) => {
                return (
                  <div key={sectionIdx}>
                    {item?.heading && (
                      <h3 className="mb-3 pl-3 text-xs font-medium text-[#71717A] uppercase font-Graphik ">
                        {item?.heading}
                      </h3>
                    )}

                    <div className="flex flex-col gap-y-2">
                      {item?.subHeadings &&
                        item?.subHeadings?.map((items, subIdx) => {
                          const isDropdown = !!items?.dropdownText;
                          const isOpen =
                            openDropdown === `${sectionIdx}-${subIdx}`;
                          return (
                            <div key={subIdx}>
                              {items?.link && !isDropdown ? (
                                <Link href={items?.link || "/admin"} passHref>
                                  <div
                                    className={`flex justify-between py-[14px] pl-3 rounded-lg ${
                                      pathname === items?.link
                                        ? "bg-[#414D57] text-white"
                                        : "bg-transparent text-[white]"
                                    }`}
                                    onClick={handleNavClick}
                                  >
                                    <div
                                      className={`flex gap-x-3 items-center`}
                                    >
                                      <span>{items?.icons}</span>
                                      <li className="text-sm  font-medium font-Graphik">
                                        {items?.text}
                                      </li>
                                    </div>
                                  </div>
                                </Link>
                              ) : (
                                <>
                                  <div
                                    className={`flex items-center py-[10px] pl-3 cursor-pointer rounded-lg justify-between bg-transparent text-[white]`}
                                    onClick={() =>
                                      handleDropDown(sectionIdx, subIdx)
                                    }
                                  >
                                    <button
                                      className={`flex items-center gap-x-3`}
                                    >
                                      <span>{items?.icons}</span>
                                      <span>{items?.text}</span>
                                    </button>
                                    {items?.arrowDown && (
                                      <span>{items?.arrowDown}</span>
                                    )}
                                  </div>
                                  {isOpen && (
                                    <div className="flex flex-col gap-y-2 border-l-[#414D57] border-l pl-4 ml-8">
                                      {items?.dropdownText?.map(
                                        (item, dropIdx) => (
                                          <Link
                                            href={item?.link || "/admin"}
                                            passHref
                                            key={dropIdx}
                                          >
                                            <li
                                              className={`text-sm font-medium rounded-lg py-[10px] pl-4 ${
                                                pathname ===
                                                (item?.link?.replace(
                                                  /\/+$/,
                                                  "",
                                                ) ?? "")
                                                  ? "bg-[#414D57] text-white"
                                                  : "bg-transparent text-[white]"
                                              }`}
                                            >
                                              {item?.text}
                                            </li>
                                          </Link>
                                        ),
                                      )}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
