"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import OverviewCard from "@/app/common/employee-dashboard/common/overviewCard";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import Link from "next/link";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";

const EmployeeAnalytics = () => {
  const [activeBtn, setActiveBtn] = useState<string>("My Earnings");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "My Earnings" },
    { id: 2, name: "Timesheet" },
    { id: 3, name: "Leave Calendar" },
  ];
  const cardData = [
    {
      label: "Approved",
      value: `15`,
    },
    {
      label: "Awaiting Approval",
      value: "2",
    },
    {
      label: "Remaining",
      value: "30",
    },
    {
      label: "National Holidays",
      value: "12",
    },
  ];
  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"Analytics"} />

          <div className={`flex gap-x-4 items-center border-b mt-8 mb-10`}>
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-x-[1px] border-t border-b-[0px] border-[#E37915] bg-transparent"
                    : "text-[#71717A] border border-b-[0px] bg-[#F7F7F7]"
                }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer rounded-tl-lg rounded-tr-lg `}
                onClick={() => {
                  setActiveBtn(el?.name);
                }}
                key={i}
              >
                {el.name}
              </button>
            ))}
          </div>

          {activeBtn === "My Earnings" && (
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <div className="border border-[#E3E3E5] rounded-xl pb-3">
                <div className="py-4 px-4 border-b border-[#E3E3E5] flex items-center justify-between">
                  <p className="text-base font-medium text-[#2F2F33]">
                    Transaction History
                  </p>
                  <Link href={"/employee/analytics/transaction-history"}>
                    <p className="text-[#009BC0] text-[15px] font-medium tracking-[-0.3%] flex items-center gap-x-2">
                      See Full Transaction History{" "}
                      <span>
                        {" "}
                        <GoArrowRight size={20} fill="#009BC0" />
                      </span>
                    </p>
                  </Link>
                </div>

                {/* Transaction Date */}
                <div className="border-b border-[#E3E3E5]">
                  <div className="py-4 px-6 bg-[#F7F7F7] border-[#E3E3E5]">
                    <p className="text-sm font-medium text-[#71717A]">
                      May 25, 2025
                    </p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Salary</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Bonus</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Loan</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                </div>

                {/* 2nd Transaction */}
                <div className="border-b border-[#E3E3E5]">
                  <div className="py-4 px-6 bg-[#F7F7F7] border-[#E3E3E5]">
                    <p className="text-sm font-medium text-[#71717A]">
                      April 26, 2025
                    </p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Salary</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Bonus</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                  <div className="flex justify-between py-4 px-6 items-center border-t border-[#E3E3E5]">
                    <div className="flex gap-x-2 items-center text-base">
                      <div className="bg-[#E6F5F9] border-[#B0E0EB] border-[1.2px] p-[10px] items-center flex justify-center rounded-full w-8 h-8">
                        <span>
                          <MdOutlinePayment size={20} fill="#009BC0" />
                        </span>
                      </div>
                      <p className="text-[#71717A] ">Loan</p>
                    </div>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>
                </div>
              </div>

              <div className="h-fit">
                <div className="border border-[#E3E3E5] rounded-xl pb-3">
                  <div className="py-4 px-6 border-b border-[#E3E3E5] flex items-center justify-between">
                    <p className="text-base font-medium text-[#2F2F33]">
                      Summary
                    </p>
                  </div>
                  <div className="flex justify-between py-4 px-6">
                    <p className="text-[#71717A] ">Total Payroll</p>
                    <p className="text-[#2F2F33] font-medium">N 10,000,000</p>
                  </div>

                  <div className="flex justify-between py-4 px-6">
                    <p className="text-[#71717A] ">Total Bonus</p>
                    <p className="text-[#2F2F33] font-medium">N 500,000</p>
                  </div>

                  <div className="flex justify-between py-4 px-6">
                    <p className="text-[#71717A] ">Last Payment</p>
                    <p className="text-[#2F2F33] font-medium">May 26, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeBtn === "Timesheet" && (
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <h1>Timesheet</h1>
            </div>
          )}
          {activeBtn === "Leave Calendar" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
              {cardData.map((card, index) => (
                <OverviewCard
                  image="/assets/employee-dashboard/home/people.svg"
                  label={card?.label}
                  value={card?.value}
                  key={index}
                />
              ))}
            </div>
          )}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeAnalytics;
