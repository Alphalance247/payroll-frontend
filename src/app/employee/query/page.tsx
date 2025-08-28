"use client";
import Heading from "../../common/heading";
import { useEffect, useState } from "react";
import Button from "../../common/Button";
import { TfiExport } from "react-icons/tfi";
import { Search } from "lucide-react";
import DropDownBtn from "../../common/dropDownBtn";
import { FiRefreshCw } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { getQueryList } from "@/stores/request/getQueryList";
import Spinner from "../../common/spinner";
import { getQueryDetails } from "@/stores/request/getRequestDetails";
import { useFilter } from "../../hooks/useFilter";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Image from "next/image";

const EmployeeRequest = () => {
  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);
  const { data, fetchQueryList, loading } = getQueryList();
  const { fetchQueryDetails } = getQueryDetails();
  useEffect(() => {
    fetchQueryList();
  }, [fetchQueryList]);

  const statusList = [
    { id: 1, name: "All" },
    { id: 2, name: "Open" },
    { id: 3, name: "In Progress" },
    { id: 4, name: "Blocked" },
    { id: 5, name: "Resolved" },
    { id: 6, name: "Closed" },
  ];

  const tabs = statusList.map((status) => ({
    id: status.id,
    name: status.name,
    notification:
      status.name === "All"
        ? data?.data?.length || 0
        : data?.data?.filter((item) => item.status === status.name).length || 0,
  }));

  const { filteredData, setSearchQuery, searchQuery, setFilter } = useFilter(
    data?.data || [],
    ["created_by"]
  );
  const [selectedTeam, setSelectedTeam] = useState("");
  const [requestType, setRequestType] = useState("");
  const [markAll, setMarkAll] = useState(false);
  const requestOption = ["All", "Salary", "Tax"];

  useEffect(() => {
    setFilter("team", selectedTeam);
    setFilter("team", selectedTeam === "All" ? "" : selectedTeam);
    setFilter("query_type", requestType);
    setFilter("query_type", requestType === "All" ? "" : requestType);
  }, [selectedTeam, requestType, setFilter]);

  return (
    <EmployeeDashboardLayout>
      <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
        <div className="flex justify-between items-center">
          <div>
            <Heading
              flexDirection="column"
              subHead="Track and resolve queries by status, type, team, and date—search, filter and export."
              user={"My Requests"}
            />
          </div>

          <Button variant="primary" className="flex items-center gap-x-2">
            {" "}
            New Requests
          </Button>
        </div>

        <div className="border border-[#E3E3E5] bg-white p-6 rounded-xl max-w-[60%] mt-14">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-4 items-center">
              <Image
                src="/assets/employee-dashboard/query/mark.svg"
                width={42}
                height={42}
                alt="question"
              />
              <div>
                <h3 className="text-2xl text-[#2F2F33] tracking-[-1px] font-semibold mb-2">
                  Have a concern?
                </h3>
                <p className="text-base text-[#71717A]">
                  Submit your Issue or request now
                </p>
              </div>
            </div>
            <Button variant="primary" className="flex items-center gap-x-2">
              {" "}
              New Requests
            </Button>
          </div>
        </div>

        {/* Requests Types Tab */}
        <div className="border-b border-[#E3E3E5] mt-12 flex justify-between">
          <div className="flex gap-x-4 items-center">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                    : "text-[#71717A] border-transparent "
                }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer flex items-center gap-x-2`}
                onClick={() => {
                  setActiveBtn(el.name);
                  if (el.name === "All") setFilter("status", "");
                  else if (el.name === "In Progress")
                    setFilter("status", "In Progress");
                  else if (el.name === "Blocked")
                    setFilter("status", "Blocked");
                  else if (el.name === "Resolved")
                    setFilter("status", "Resolved");
                  else if (el.name === "Open") setFilter("status", "Open");
                }}
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
            <button
              className="border border-[#E3E3E5] rounded-md bg-white py-1 px-3 text-[#71717A] flex gap-x-2 items-center shadow-md"
              onClick={() => fetchQueryList()}
            >
              <FiRefreshCw size={18} /> Refresh Tables
            </button>
          </div>
        </div>

        <section className="mt-4">
          <div className="flex items-center gap-x-3 justify-between">
            <div className="flex items-center gap-x-2">
              <div className="relative w-[200px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              </div>

              <DropDownBtn
                subText="Type"
                btnHeight="h-auto"
                width="w-auto"
                placeholder="Salary"
                onSelectOption={setRequestType}
                options={requestOption}
                selectedValue={requestType}
              />
            </div>

            <div>
              <DropDownBtn
                subText="Nov 1 – Nov 31, 2024"
                btnHeight="h-[350px]"
                //   placeholder="Teams"
                onSelectOption={setSelectedTeam}
                options={requestOption}
                selectedValue={selectedTeam}
              />
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>
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
                    {filteredData?.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6} className="text-center py-8">
                            No Request found
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {filteredData.map((emp) => (
                          <tr
                            key={emp?.id}
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
                              onClick={() => {
                                fetchQueryDetails(emp?.id);
                                setIsOpen(true);
                              }}
                            >
                              CMP-2024020{emp?.id}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                  {emp?.created_by
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </div>
                                <span className="text-[#2F2F33] text-sm font-medium">
                                  {emp?.created_by}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-[#2F2F33]">
                              {emp?.team}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#2F2F33]">
                              {emp?.query_type}
                            </td>
                            <td className="px-6 py-4 text-sm text-[#2F2F33]">
                              {emp?.created_at}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                              >
                                {emp?.status}
                              </span>
                            </td>

                            <td className="px-6 py-4 text-sm text-[#2F2F33]">
                              {" "}
                              <BsThreeDotsVertical />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </EmployeeDashboardLayout>
  );
};

export default EmployeeRequest;
