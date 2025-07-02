"use client";
import Link from "next/link";
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
import { TbSettings2 } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { MdOutlineGavel } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useCallback, useState } from "react";

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

const Sidebar: React.FC = () => {
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
              link: "/",
              text: "Run Off-Cycle Payroll",
            },
            {
              link: "/payroll-history",
              text: "Payroll History",
            },
            {
              link: "/",
              text: "Payroll Settings",
            },
          ],
        },
        {
          text: "Payment method",
          icons: <FaMoneyCheckAlt size={20} />,
          link: "/nil",
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
          link: "/employee-management",
        },
        {
          text: "Documents",
          icons: <IoDocumentTextOutline size={20} />,
          link: "/nil",
        },
        {
          text: "Query",
          icons: <AiOutlineMessage size={20} />,
          link: "/nil",
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
          text: "Time Tracking",
          icons: <MdOutlinePayment size={20} />,
          arrowDown: <IoIosArrowDown size={20} />,
          dropdownText: [
            {
              link: "/analytics",
              text: "Testing 1",
            },
            {
              link: "/jdjjs",
              text: "Run Off-Cycle Payroll",
            },
            {
              link: "/payroll-history",
              text: "Payroll History",
            },
            {
              link: "/jjsajk",
              text: "Payroll Settings",
            },
          ],
        },

        {
          text: "Integrations",
          icons: <IoGitPullRequestOutline size={20} />,
          link: "/nil",
        },
        {
          text: "Settings",
          icons: <TbSettings2 size={20} />,
          link: "/nil",
        },
      ],
    },
  ];

  return (
    <div className=" bg-[#11202D] border-r border-gray-200 overflow-y-auto">
      {/* Logo / Brand Name */}
      <div className="flex flex-col justify-between mb-24">
        {/* Navigation Menu */}
        <div className="mt-4 px-3">
          <nav className="mt-4">
            <ul className="flex flex-col gap-y-4">
              {sideBarData.map((item, sectionIdx) => {
                return (
                  <div key={sectionIdx}>
                    {item?.heading && (
                      <h3 className="mb-3 pl-3 text-xs font-medium text-[white] uppercase font-Graphik ">
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
                              {/* Top-level nav link (not a dropdown parent) */}
                              {items?.link && !isDropdown ? (
                                <Link href={items?.link || "/"} passHref>
                                  <div
                                    className={`flex justify-between py-[10px] pl-3 rounded-lg ${
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
                                  {/* Dropdown parent: never active */}
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
                                                pathname === item?.link
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
