"use client";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import { useState } from "react";
import Button from "../common/Button";
import { TfiExport } from "react-icons/tfi";
import { Search } from "lucide-react";
import DropDownBtn from "../common/dropDownBtn";
import { FiRefreshCw } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import SideDrawer from "../common/sideDrawer/sideDrawer";
import { LiaTimesSolid } from "react-icons/lia";
import { FaChevronDown } from "react-icons/fa";

const Request = () => {
  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);
  const tabs: { id: number; name: string; notification: string }[] = [
    { id: 1, name: "All", notification: "30" },
    { id: 3, name: "In Progress", notification: "8" },
    { id: 2, name: "Unresolved", notification: "2" },
    { id: 4, name: "Resolved", notification: "2" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [markAll, setMarkAll] = useState(false);
  const teamOptions = [
    "All",
    "DevOps",
    "ITSM",
    "Design",
    "Cloud",
    "Quality  Assurance",
    "Development",
    "Management",
    "Domestic Staff",
    "Advocate",
    "Product Office",
  ];
  const filteredData = [
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
    {
      id: 1,
      fullname: "Lanre Ademoye",
      email: "",
    },
  ];
  return (
    <DashboardLayout>
      <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
        <div className="flex justify-between items-center">
          <div>
            <Heading
              flexDirection="column"
              subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
              user={"Request"}
            />
          </div>

          <Button variant="primary" className="flex items-center gap-x-2">
            {" "}
            <span className="text-white">
              <TfiExport fill="white" size={14} />
            </span>{" "}
            Export CSV
          </Button>
        </div>

        {/* Requests Types Tab */}
        <div className="border-b border-[#E3E3E5] mt-8 flex justify-between">
          <div className="flex gap-x-4 items-center">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                    : "text-[#71717A] border-transparent "
                }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer flex items-center gap-x-2`}
                onClick={() => setActiveBtn(el.name)}
                key={i}
              >
                {el.name}{" "}
                <span className="bg-[#F1F1F2] border-[#E3E3E5] border text-[#71717A] rounded-full py-1 px-2 text-xs font-semibold">
                  {el?.notification}
                </span>
              </button>
            ))}
          </div>

          <div className="pb-2">
            <button className="border border-[#E3E3E5] rounded-md bg-white py-1 px-3 text-[#71717A] flex gap-x-2 items-center shadow-md">
              <FiRefreshCw size={18} /> Refresh Table
            </button>
          </div>
        </div>

        {activeBtn === "All" && (
          <section className="mt-4">
            <div className="flex items-center gap-x-3 justify-between">
              <div className="flex items-center gap-x-2">
                <div className="relative w-[200px]">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={() => {}}
                    className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
                </div>

                <DropDownBtn
                  subText="Team"
                  btnHeight="h-[350px]"
                  placeholder="Teams"
                  onSelectOption={setSelectedTeam}
                  options={teamOptions}
                  selectedValue={selectedTeam}
                />

                <DropDownBtn
                  subText="Team"
                  btnHeight="h-[350px]"
                  placeholder="Teams"
                  onSelectOption={setSelectedTeam}
                  options={teamOptions}
                  selectedValue={selectedTeam}
                />
              </div>

              <div>
                <DropDownBtn
                  subText="Nov 1 – Nov 31, 2024"
                  btnHeight="h-[350px]"
                  //   placeholder="Teams"
                  onSelectOption={setSelectedTeam}
                  options={teamOptions}
                  selectedValue={selectedTeam}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
              <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
                Query Details
              </h2>
              <div className="py-4 pl-4 flex items-center gap-x-8">
                <div className="flex items-center cursor-pointer bg-[#F7F7F7] w-fit gap-x-2 rounded-sm px-1 py-1 border border-[#E3E3E5]">
                  <input
                    type="checkbox"
                    className="rounded w-[13px] h-[13px] border-gray-300 cursor-pointer"
                    checked={markAll}
                    onChange={() => setMarkAll(!markAll)}
                  />
                  {markAll && (
                    <p className="text-[#71717A] text-sm font-medium">
                      20 selected
                    </p>
                  )}
                  <span>
                    {" "}
                    <TiArrowSortedDown size={20} />
                  </span>
                </div>

                {markAll && (
                  <div className="flex items-center gap-x-2">
                    <Button
                      variant="primaryWhite"
                      className="flex items-center gap-x-2"
                    >
                      <IoCheckmarkOutline
                        size={18}
                        color="#71717A"
                        fill="#71717A"
                      />{" "}
                      Mark as Resolved
                    </Button>

                    <Button
                      variant="primaryWhite"
                      className="flex items-center gap-x-2"
                    >
                      <FaRegUser size={18} color="#71717A" fill="#71717A" />{" "}
                      Assign to
                      <TiArrowSortedDown
                        size={18}
                        color="#71717A"
                        fill="#71717A"
                      />{" "}
                    </Button>

                    <Button
                      variant="primaryWhite"
                      className="flex items-center gap-x-2"
                    >
                      <IoArchiveOutline size={18} color="#71717A" /> Archive
                    </Button>

                    <Button
                      variant="primaryWhite"
                      className="flex items-center gap-x-2"
                    >
                      <TfiExport size={14} color="#71717A" /> Export
                    </Button>

                    <Button
                      variant="primaryWhite"
                      className="flex items-center gap-x-2"
                    >
                      <RiDeleteBinLine size={18} color="#71717A" /> Delete
                    </Button>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1300px] border-b border-[#E3E3E5]">
                  <thead className="bg-[#F7F7F7]">
                    <tr>
                      <th className="px-6 py-[14px] w-[40px]">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                        Complaint ID
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Name
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Team
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[120px]">
                        Type
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                        Date
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                        Status
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[50px]"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((emp, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#E3E3E5] last:border-b-0"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-[#2F2F33] hover:underline hover:underline-offset-1 cursor-pointer"
                          onClick={() => setIsOpen(true)}
                        >
                          CMP-20240201
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                              {emp?.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </div>
                            <span className="text-[#2F2F33] text-sm font-medium">
                              {emp?.fullname}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          Design & Development
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          Salary
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          January 24, 2024
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                          >
                            Resolved
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {" "}
                          <BsThreeDotsVertical />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isOpen && (
                <SideDrawer
                  onClose={() => {
                    setIsOpen(false);
                  }}
                >
                  <div className="relative z-50  w-[600px] h-full bg-white border border-[#E3E3E5] overflow-y-auto">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#E3E3E5] outline-4 outline-[#E3E3E5] outline">
                      <h2 className="text-xl font-semibold text-[#2F2F33]">
                        Query Details
                      </h2>
                      <LiaTimesSolid
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      />
                    </div>

                    {/* Query Overview */}
                    <div className="border-t border-[E3E3E5] px-6">
                      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] py-6">
                        <span className="cursor-pointer">
                          <FaChevronDown size={20} />
                        </span>{" "}
                        Request Details
                      </h4>

                      <div>
                        <div className="py-3 flex justify-between items-center">
                          <p>Query ID</p>
                          <p>CMP-20240201</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SideDrawer>
              )}
            </div>
          </section>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Request;
