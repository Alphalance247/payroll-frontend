"use client";
import Button from "@/app/common/Button";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import OverviewCard from "@/app/common/employee-dashboard/common/overviewCard";
import ErrorFetch from "@/app/common/errorFetch";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import Spinner from "@/app/common/spinner";
import LeaveRequestModal from "@/app/components/Employee-Dashboard/leave-request/requestModal";
import ShowCommentSideBar from "@/app/components/Employee-Dashboard/leave-request/showCommentSideBar";
import { useFilter } from "@/app/hooks/useFilter";
import { getEmployeeLeaveList } from "@/stores/employee-dashboard/leave/getEmployeeLeaveRequest";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const EmployeeLeaveRequest = () => {
  const {
    data: leaveData,
    fetchEmployeeLeaveList,
    loading,
    error,
  } = getEmployeeLeaveList();

  useEffect(() => {
    fetchEmployeeLeaveList();
  }, [fetchEmployeeLeaveList]);

  const cardData = [
    {
      label: "Approved",
      value: leaveData?.summary?.approved,
    },
    {
      label: "Awaiting Approval",
      value: leaveData?.summary?.pending,
    },
    {
      label: "Remaining",
      value: leaveData?.remaining,
    },
  ];
  const [requestModal, setRequestModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [leaveId, setLeaveId] = useState<string>("");
  const { filteredData, setSearchQuery, searchQuery } = useFilter(
    leaveData?.leaves || [],
    ["leave_type"]
  );
  const [requestStatus, setRequestStatus] = useState<string>("");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"My Leave Request"} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-8">
            {cardData.map((card, index) => (
              <OverviewCard
                image="/assets/employee-dashboard/home/people.svg"
                label={card?.label}
                value={card?.value || "0"}
                key={index}
              />
            ))}
          </div>

          <div className="bg-white rounded-lg border  border-[#E3E3E5] mt-10">
            <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
              My Requests
            </h3>

            <div className=" border-y flex px-6 py-3  justify-between border-[#E3E3E5]">
              <div className="relative w-[380px]">
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

              <Button
                variant="primary"
                className="flex items-center gap-x-2"
                onButtonClick={() => setRequestModal(true)}
              >
                {" "}
                <span className="text-white">
                  <BiPlus fill="white" size={14} />
                </span>{" "}
                Add New Leave Request
              </Button>
            </div>

            {loading ? (
              <Spinner spinnerSmall={true} />
            ) : error ? (
              <ErrorFetch
                message="Error Fetching leave request"
                onRefetch={() => fetchEmployeeLeaveList()}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] overflow-hidden shadow-sm ">
                  <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                    <tr>
                      <th
                        className="px-6 py-3 text-left"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Start Date
                      </th>
                      <th
                        className="px-6 py-3 text-left "
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        End Date
                      </th>
                      <th
                        className="px-6 py-3 text-left"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Leave Type
                      </th>
                      <th
                        className="px-6 py-3 text-left w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Duration
                      </th>

                      <th
                        className="px-6 py-3 text-left w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Reason
                      </th>

                      <th
                        className="px-6 py-3 text-left w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Status
                      </th>

                      <th
                        className="px-6 py-3 text-left "
                        style={{ paddingLeft: "1.5rem" }}
                      ></th>
                    </tr>
                  </thead>

                  {filteredData.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          No Leave Request found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                      {filteredData.map((data, i) => (
                        <tr
                          className="hover:bg-gray-50 even:bg-[#F7F7F7] dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                          key={i}
                        >
                          <td className="px-6 py-6 text-sm text-[#2F2F33]">
                            {data?.start_date}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.end_date}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.leave_type}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.duration} days
                          </td>

                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.reason}
                          </td>

                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium ${
                                data?.status === "pending"
                                  ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                                  : data?.status === "approved"
                                  ? "border-green-500 bg-green-100 text-green-600"
                                  : "border-red-500 bg-red-100 text-red-600"
                              }`}
                            >
                              {data?.status}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm text-[#2F2F33]">
                            <div className="relative">
                              <button
                                onClick={() => {
                                  setOpenDropdown(
                                    openDropdown === i ? null : i
                                  );
                                  setRequestStatus(data?.status);
                                  setLeaveId(data?.id);
                                }}
                                className="p-2 hover:bg-[#F0F0F3] rounded-lg transition-colors"
                              >
                                <BsThreeDotsVertical />
                              </button>

                              {/* Dropdown Menu */}
                              {openDropdown === i && (
                                <div
                                  ref={(el) => {
                                    dropdownRefs.current[i] = el;
                                  }}
                                  className="absolute right-0 top-0 z-50 bg-white border border-[#E3E3E5] rounded-lg shadow-md w-[180px]"
                                >
                                  <button
                                    onClick={() => {
                                      setShowCommentDrawer(true);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-3 text-sm text-[#2F2F33] hover:bg-[#F0F0F3] transition-colors border-b border-[#E3E3E5] last:border-b-0"
                                  >
                                    View Comments
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            )}
          </div>

          {requestModal && (
            <LeaveRequestModal
              onModalClose={() => {
                setRequestModal(!requestModal);
              }}
            />
          )}

          {showCommentDrawer && (
            <ShowCommentSideBar
              id={leaveId}
              status={requestStatus}
              onCloseSideDrawer={() => setShowCommentDrawer(false)}
            />
          )}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeLeaveRequest;
