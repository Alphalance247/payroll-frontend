"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import OverviewCard from "@/app/common/employee-dashboard/common/overviewCard";
import Heading from "@/app/common/heading";
import EmployeeBarChart from "../../components/charts/employeeBarChart";
import LeavePieChart from "../../components/charts/LeavePieChart";
import ProtectedRoute from "@/app/common/protectedRoute";
import { getEmployeeYearlyPayroll } from "@/stores/employee-dashboard/analytics/yearlyPayroll";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import ErrorFetch from "@/app/common/errorFetch";
import Spinner from "@/app/common/spinner";
import { useLeaveStore } from "@/stores/employee-dashboard/analytics/LeaveCalendar";
import { getLeaveDashboardData } from "@/stores/employee-dashboard/analytics/LeaveDashboard";

const EmployeeAnalytics = () => {
  const [activeBtn, setActiveBtn] = useState<string>("My Earnings");
  const {
    data: yearlyPayroll,
    fetchEmployeeYearlyPayroll,
    error,
  } = getEmployeeYearlyPayroll();
  const { fetchLeaves } = useLeaveStore();
  //card Data store
  const {
    fetchLeaveList,
    leaveData,
    loadingLeaveDashbord,
    LeaveDashboardError,
  } = getLeaveDashboardData();

  useEffect(() => {
    fetchEmployeeYearlyPayroll();
    fetchLeaves();
    fetchLeaveList();
  }, [fetchEmployeeYearlyPayroll, fetchLeaves, fetchLeaveList]);

  console.log(yearlyPayroll);

  const cardData = [
    {
      label: "Approved",
      value: leaveData?.approved,
    },
    {
      label: "Awaiting Approval",
      value: leaveData?.awaiting_approval,
    },
    {
      label: "Remaining",
      value: leaveData?.remaining,
    },
    {
      label: "National Holidays",
      value: leaveData?.national_holidays,
    },
  ];

  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "My Earnings" },
    { id: 3, name: "Leave Calendar" },
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

          {/* {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              onRefetch={fetchEmployeeYearlyPayroll}
              message="Error fetching employee yearly payroll data"
            />
          ) : ( */}
          <>
            {activeBtn === "My Earnings" && (
              <div>
                <div className="h-fit border border-[#E3E3E5] rounded-[8px]  my-8  ">
                  <div className="h-[76px] border-b border-[#E3E3E5] px-6 flex justify-between items-center ">
                    <div className=" items-center ">
                      <div className="text-base text-[#2F2F33] font-medium font-Graphik">
                        Payroll Insights
                      </div>
                    </div>
                    <button className="h-[44px] w-[177px] border border-[#E3E3E5] rounded-[8px] flex justify-between items-center px-[17.5px] font-Graphik">
                      <p className="text-[#2F2F33] text-base">Last 12 months</p>
                      <IoMdArrowDropdown />
                    </button>
                  </div>
                  <EmployeeBarChart />
                </div>
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
                            <GoArrowRight size={20} fill="#009BC0" />
                          </span>
                        </p>
                      </Link>
                    </div>

                    {/* Transaction Date */}
                    {yearlyPayroll?.current_data?.months?.map((el, i) => (
                      <div className="border-b border-[#E3E3E5]" key={i}>
                        <div className="py-4 px-6 bg-[#F7F7F7] border-[#E3E3E5]">
                          <p className="text-sm font-medium text-[#71717A]">
                            {el?.month}
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
                          <p className="text-[#2F2F33] font-medium">
                            N {el?.total_base_salary}
                          </p>
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
                          <p className="text-[#2F2F33] font-medium">
                            N {el?.total_bonus}
                          </p>
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
                          <p className="text-[#2F2F33] font-medium">
                            N {el?.total_deductions}
                          </p>
                        </div>
                      </div>
                    ))}
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
                        <p className="text-[#2F2F33] font-medium">
                          N{" "}
                          {yearlyPayroll?.current_data?.totals
                            ?.total_base_salary || 0}
                        </p>
                      </div>

                      <div className="flex justify-between py-4 px-6">
                        <p className="text-[#71717A] ">Total Bonus</p>
                        <p className="text-[#2F2F33] font-medium">
                          N{" "}
                          {yearlyPayroll?.current_data?.totals?.total_bonus.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex justify-between py-4 px-6">
                        <p className="text-[#71717A] ">Last Payment</p>
                        <p className="text-[#2F2F33] font-medium">
                          {" "}
                          {yearlyPayroll?.current_data?.totals?.last_payment ||
                            "Not Specified"}
                        </p>
                      </div>
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
              <div>
                {loadingLeaveDashbord ? (
                  <Spinner spinnerSmall={true} />
                ) : error ? (
                  <ErrorFetch
                    onRefetch={fetchLeaveList}
                    message={LeaveDashboardError}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
                    {cardData.map((card, index) => (
                      <OverviewCard
                        image="/assets/employee-dashboard/home/people.svg"
                        label={card?.label}
                        value={card?.value?.toString() || "0"}
                        key={index}
                      />
                    ))}
                  </div>
                )}
                {/* {loadingBalance ? (
                    <Spinner spinnerSmall={true} />
                  ) : error ? (
                    <ErrorFetch
                      onRefetch={fetchLeaveBalance}
                      message={balanceError}
                    />
                  ) : ( */}
                <>
                  <LeavePieChart />
                </>
                {/* )} */}
              </div>
            )}
          </>
          {/* )} */}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeAnalytics;
