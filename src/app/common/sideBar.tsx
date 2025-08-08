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
import { useCallback, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { Search } from "lucide-react";
// import { useFilter } from "../hooks/useFilter";

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

interface employeeDropDownText {
  link: string;
  text: string;
}

interface EmployeeSubHeading {
  text: string;
  icons?: React.ReactNode;
  link?: string;
  arrowDown?: React.ReactNode;
  dropdownText?: employeeDropDownText[];
}

interface employeeSideBarData {
  heading?: string;
  subHeadings: EmployeeSubHeading[];
}

interface propData {
  isAdmin?: boolean;
}

const Sidebar: React.FC<propData> = ({ isAdmin }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<{
    section: number;
    sub: number;
  } | null>(null);
  const handleDropDown = useCallback(
    (sectionIdx: number, subIdx: number) => {
      if (
        openDropdown &&
        openDropdown.section === sectionIdx &&
        openDropdown.sub === subIdx
      ) {
        setOpenDropdown(null); // Close if already open
      } else {
        setOpenDropdown({ section: sectionIdx, sub: subIdx }); // Open the clicked dropdown
      }
    },
    [openDropdown]
  );

  const handleNavClick = useCallback(() => {
    setOpenDropdown(null); // Close any open dropdown when a non-dropdown nav link is clicked
  }, []);

  const sideBarData: sideBarData[] = [
    {
      subHeadings: [
        { text: "Home", link: "/", icons: <HiOutlineHome size={20} /> },
        {
          text: "Compliance",
          link: "/compliance",
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
              link: "/run-payroll",
              text: "Run Payroll",
            },

            {
              link: "/payroll-history",
              text: "Payroll History",
            },
          ],
        },
        {
          text: "Tax",
          icons: <HiOutlineReceiptTax size={20} />,
          link: "/tax",
        },
        {
          text: "Loan requests",
          icons: <FaMoneyCheckAlt size={20} />,
          link: "/loan",
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
              link: "/employee-management",
              text: "Employee Management",
            },
            {
              link: "/employee-management/team-management",
              text: "Team Management",
            },
          ],
        },
        {
          text: "Storage",
          icons: <IoDocumentTextOutline size={20} />,
          link: "/storage",
        },
        {
          text: "Request",
          icons: <AiOutlineMessage size={20} />,
          link: "/request",
        },
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
        {
          text: "Time Tool",
          icons: <MdOutlinePayment size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/time-sheet",
              text: "Timesheet",
            },
            {
              link: "/leave-management",
              text: "Leave Management",
            },
            {
              link: "/holiday-calendar",
              text: "Holiday Calendar",
            },
          ],
        },

        {
          text: "Settings",
          icons: <TbSettings2 size={20} />,
          link: "/settings",
        },
      ],
    },
  ];

  const EmployeeSideBar: employeeSideBarData[] = [
    {
      subHeadings: [
        {
          text: "Employee",
          icons: <IoRocketOutline fill="white" size={20} />,
          link: "/employee",
        },
        {
          text: "Compliance",
          icons: <IoRocketOutline fill="white" size={20} />,
          link: "/employee/compliance",
        },
        {
          text: "Payroll",
          icons: <IoRocketOutline fill="white" size={20} />,
          link: "/employee/payroll",
        },
        {
          text: "Settings",
          icons: <TbSettings2 size={20} />,
          link: "/employee/settings",
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
          link: "/settings",
        },
      ],
    },

    {
      heading: "Personal settings",
      subHeadings: [
        {
          text: "Your Account",
          link: "/settings/account",
          icons: <FaRegUser size={20} />,
        },
        {
          text: "Notifications",
          link: "/settings/notifications",
          icons: <IoNotificationsOutline size={20} />,
        },
      ],
    },

    {
      heading: "System Settings",
      subHeadings: [
        {
          text: "Payroll Settings",
          link: "/settings/payroll-settings",
          icons: <MdOutlinePayment size={20} />,
        },
        {
          text: "Integrations",
          link: "/settings/integrations",
          icons: <BsBarChartLine size={20} />,
        },
      ],
    },

    {
      heading: "Organization Settings",
      subHeadings: [
        {
          text: "Company Information",
          link: "/settings/company-info",
          icons: <MdOutlineBusiness size={20} />,
        },
        {
          text: "Billing Info",
          link: "/settings/billing-info",
          icons: <BsBarChartLine size={20} />,
        },
        {
          text: "Permissions",
          link: "/settings/permissions",
          icons: <IoShieldHalf size={20} />,
        },
        {
          text: "Audit Logs",
          link: "/settings/audit-logs",
          icons: <HiOutlineClipboardCheck size={20} />,
        },
      ],
    },
  ];

  // const { filteredData, setSearchQuery, searchQuery } = useFilter(
  //   settingsSideBar || [],
  //   [""]
  // );

  const SidebarToShow = pathname.startsWith("/settings")
    ? settingsSideBar
    : sideBarData;

  const sideBarType = isAdmin ? SidebarToShow : EmployeeSideBar;

  return (
    <div className=" bg-[#11202D] h-screen border-r border-gray-200 overflow-y-auto">
      {/* Logo / Brand Name */}
      <div className="flex flex-col justify-between mb-24">
        {/* Navigation Menu */}
        <div className="mt-6 px-3">
          {pathname.startsWith("/settings") && (
            <>
              <Link href={"/"}>
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
                            openDropdown &&
                            openDropdown.section === sectionIdx &&
                            openDropdown.sub === subIdx;
                          return (
                            <div key={subIdx}>
                              {items?.link && !isDropdown ? (
                                <Link href={items?.link || "/"} passHref>
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
                                    <div className="flex flex-col gap-y-2 border-l-[#414D57] border-l pl-4">
                                      {items?.dropdownText?.map(
                                        (item, dropIdx) => (
                                          <Link
                                            href={item?.link || "/"}
                                            passHref
                                            key={dropIdx}
                                          >
                                            <li
                                              className={`text-sm font-medium rounded-lg py-[10px] pl-4 ${
                                                pathname?.startsWith(item?.link)
                                                  ? "bg-[#414D57] text-white"
                                                  : "bg-transparent text-[white]"
                                              }`}
                                            >
                                              {item?.text}
                                            </li>
                                          </Link>
                                        )
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
