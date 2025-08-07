"use client";
import ProtectedRoute from "../common/protectedRoute";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import Button from "../common/Button";
import { BiPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import LeaveRequest from "../components/leave-management/leaveRequest";
import LeaveBalance from "../components/leave-management/leaveBalance";
import { TfiExport } from "react-icons/tfi";
import { getLeaveRequestStore } from "@/stores/leave-request/leaveRequestList";

const LeaveManagement = () => {
  const [activeBtn, setActiveBtn] = useState<string>("Leave Requests");
  const { fetchLeaveRequest } = getLeaveRequestStore();
  useEffect(() => {
    fetchLeaveRequest();
  }, [fetchLeaveRequest]);
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Leave Requests" },
    { id: 2, name: "Leave Balance" },
  ];
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div>
              <Heading
                flexDirection="column"
                subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
                user={"Leave Management"}
              />
            </div>

            {activeBtn === "Leave Requests" ? (
              <Button variant="primary" className="flex items-center gap-x-2">
                {" "}
                <span className="text-white">
                  <BiPlus size={20} />
                </span>{" "}
                Add New Leave Request
              </Button>
            ) : (
              <Button variant="primary" className="flex items-center gap-x-2">
                {" "}
                <span className="text-white">
                  <TfiExport size={14} />
                </span>{" "}
                Export CSV
              </Button>
            )}
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
                  }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer`}
                  onClick={() => setActiveBtn(el.name)}
                  key={i}
                >
                  {el.name}
                </button>
              ))}
            </div>
          </div>

          {activeBtn === "Leave Requests" && <LeaveRequest />}
          {activeBtn === "Leave Balance" && <LeaveBalance />}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default LeaveManagement;
