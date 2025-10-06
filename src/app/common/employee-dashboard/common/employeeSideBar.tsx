"use client";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import {
  MdOutlinePayment,
  MdOutlineGavel,
  MdOutlineLuggage,
} from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BsBarChartLine } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Search } from "lucide-react";
import { TbSettings2 } from "react-icons/tb";
import { IoIosArrowDown, IoMdTime } from "react-icons/io";
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

const EmployeeSideBar: React.FC<propData> = () => {
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

  const EmployeeSideBar: employeeSideBarData[] = [
    {
      subHeadings: [
        { text: "Home", link: "/employee", icons: <HiOutlineHome size={20} /> },
        {
          text: "Compliance",
          link: "/employee/compliance",
          icons: <MdOutlineGavel size={20} />,
        },
        {
          text: "Payroll",
          icons: <MdOutlinePayment size={20} />,
          link: "/employee/payroll",
        },
        {
          text: "Loan requests",
          icons: <FaMoneyCheckAlt size={20} />,
          link: "/employee/loan-request",
        },
        {
          text: "Request",
          icons: <AiOutlineMessage size={20} />,
          link: "/employee/query",
        },
        {
          icons: <IoMdTime size={20} />,
          link: "/employee/time-sheet",
          text: "Timesheet",
        },
        {
          icons: <MdOutlineLuggage size={20} />,
          link: "/employee/leave-request",
          text: "Leave",
        },
        {
          text: "Analytics",
          link: "/employee/analytics",
          icons: <BsBarChartLine size={20} />,
        },
        {
          text: "Settings",
          arrowDown: <IoIosArrowDown size={20} />,
          icons: <TbSettings2 size={20} />,
          dropdownText: [
            {
              link: "/employee/profile-settings",
              text: "Profile Settings",
            },
            {
              link: "/employee/notifications",
              text: "Notification settings",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className=" bg-[#11202D] h-full border-r border-gray-200 overflow-y-auto">
      {/* Logo / Brand Name */}
      <div className="flex flex-col justify-between mb-12">
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
              {EmployeeSideBar.map((item, sectionIdx) => {
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
                                      (
                                        items.text === "Home"
                                          ? pathname === items?.link
                                          : pathname.startsWith(
                                              items?.link || ""
                                            )
                                      )
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

export default EmployeeSideBar;
