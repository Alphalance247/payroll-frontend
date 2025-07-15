"use client";
import DashboardLayout from "./common/DashBoardLayout";
import ArrowHead from "@/assets/icons/ArrowHead";
import CardWallet from "@/assets/icons/CardWallet";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Heading from "./common/heading";
import { useAuth } from "./context/authContext";
import ProtectedRoute from "./common/protectedRoute";
import Link from "next/link";
import { getUpcomingPayrollStore } from "@/stores/home/getUpcomingPayroll";
import { useEffect, useState } from "react";
import Spinner from "./common/spinner";
import ErrorFetch from "./common/errorFetch";
import { getLastPayrollStore } from "@/stores/home/getLastPayroll";
import { getPayrollPendingTaskStore } from "@/stores/home/pendingTask";
import { getHolidayStore } from "@/stores/home/getHoliday";

export default function Home() {
  const { user } = useAuth();
  const {
    loading,
    fetchUpcomingPayroll,
    data: upcomingPayrollData,
    error,
  } = getUpcomingPayrollStore();

  const {
    loading: loadingHolidayData,
    fetchPayrollHoliday,
    data: holidayData,
    error: holidayDataError,
  } = getHolidayStore();

  const {
    loading: pendingTaskLoading,
    fetchPayrollPendingTask,
    data: pendingTaskData,
    error: pendingTaskError,
  } = getPayrollPendingTaskStore();

  const {
    loading: loadingLastPayroll,
    fetchLastPayroll,
    data: lastPayrollData,
    error: lastPayrollError,
  } = getLastPayrollStore();

  useEffect(() => {
    fetchUpcomingPayroll();
    fetchLastPayroll();
    fetchPayrollPendingTask();
    fetchPayrollHoliday();
  }, [
    fetchUpcomingPayroll,
    fetchLastPayroll,
    fetchPayrollPendingTask,
    fetchPayrollHoliday,
  ]);

  const [dismissed, setDismissed] = useState<number[]>([]);
  const filteredTasks =
    pendingTaskData?.Tasks?.filter(
      (task, index) => !dismissed.includes(index)
    ) || [];

  const quickActions = [
    // {
    //   id: "1",
    //   icon: "/assets/Home/edit.svg",
    //   btn: "Edit Exchange Rate",
    //   link: "/",
    // },
    {
      id: "2",
      icon: "/assets/Home/calendar.svg",
      btn: "Download Pay slip",
      link: "/",
    },
  ];

  // Show success messag

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-10 overflow-y-scroll">
          <Heading
            flexDirection=""
            user={
              user?.fullname
                ? `Good afternoon, ${user.fullname}`
                : "Good afternoon, James"
            }
          />
          <div className="grid grid-cols-6 gap-6 mt-11">
            {/* Left Section */}
            <div className="col-span-3 space-y-6">
              {/* Upcoming Payroll */}
              <div className="border border-[#E3E3E5] w-full rounded-xl">
                <div className="flex items-center justify-between gap-2 py-4 px-6 w-full border-b border-[#E3E3E5]">
                  <h4 className="text-[16px] leading-6 text-[#2F2F33] font-semibold">
                    Upcoming Payroll
                  </h4>

                  <span>
                    <BsThreeDotsVertical />
                  </span>
                </div>

                {loading ? (
                  <Spinner spinnerSmall={true} />
                ) : error ? (
                  <ErrorFetch
                    message="error fetching upcoming paroll data"
                    smallWindow={true}
                    onRefetch={() => fetchUpcomingPayroll()}
                  />
                ) : (
                  <div className="p-6">
                    <div className="flex gap-[7px] items-center">
                      <h3 className="font-semibold text-[20px] font-Graphik leading-6 tracking-[-0.5px]">
                        Monthly
                      </h3>
                      <p className="bg-[#E7E9EA] border-[#414D57] border rounded-2xl px-2 py-[2px] text-[#0C1720] font-medium text-xs">
                        {upcomingPayrollData?.due_in}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-2 font-Graphik">
                      <div className="font-medium px-4 py-2 border bg-[#F7F7F7] border-[#E3E3E5] space-y-2 rounded-md">
                        <p className="text-sm text-[#71717A]">Pay period</p>
                        <p className="text-base font-semibold text-[#2F2F33]">
                          {upcomingPayrollData?.pay_period}
                        </p>
                      </div>
                      <div className="font-medium px-4 py-2 border bg-[#F7F7F7] border-[#E3E3E5] space-y-2 rounded-md">
                        <p className="text-sm text-[#71717A]">Pay Day</p>
                        <p className="text-base font-semibold text-[#2F2F33]">
                          {upcomingPayrollData?.payday}
                        </p>
                      </div>
                      <div className="font-medium px-4 py-2 border bg-[#F7F7F7] border-[#E3E3E5] space-y-2 rounded-md">
                        <p className="text-sm text-[#71717A]">Total Payroll</p>
                        <p className="text-base font-semibold text-[#2F2F33]">
                          ₦ {upcomingPayrollData?.total_pay}
                        </p>
                      </div>
                    </div>
                    <div className="text-base text- font-semibold mt-4">
                      <Link href="/run-payroll">
                        <button className="bg-[#E37915] text-white py-[10px] px-3 rounded-md w-fit">
                          Run Payroll
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Things to do */}
              <div className="rounded-2xl border border-[#E3E3E5] font-Graphik">
                <div className="flex justify-between items-center py-4 px-6 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[#2F2F33]">
                      Things to do
                    </h2>
                  </div>
                  <a
                    href="#"
                    className="text-[#009BC0] text-[15px] leading-5 flex gap-1 items-center"
                  >
                    View All
                    <ArrowHead />
                  </a>
                </div>

                {pendingTaskLoading ? (
                  <Spinner spinnerSmall={true} />
                ) : pendingTaskError ? (
                  <ErrorFetch
                    message="error fetching pending task data"
                    smallWindow={true}
                    onRefetch={() => fetchPayrollPendingTask()}
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredTasks?.length === 0 ? (
                      <p className="p-6 text-center font-semibold text-base text-[#2F2F33]">
                        No pending Task Available
                      </p>
                    ) : (
                      pendingTaskData?.Tasks?.filter(
                        (task, index) => !dismissed.includes(index)
                      ).map((task, index) => (
                        <div
                          key={index}
                          className="p-6 border-b last:border-none flex items-start justify-between"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-[10px] rounded-lg bg-[#FCF2E8] border-[1.2px] border-[#E37915]">
                              <CardWallet />
                            </div>
                            <div>
                              <p className="font-semibold text-base text-[#2F2F33]">
                                {task?.task}
                              </p>
                              <p className="text-base font-normal text-[#2F2F33] py-1">
                                {task?.due_in}
                                Three pending employee loan requests need
                                review.
                              </p>
                              <div>
                                <span
                                  style={{
                                    color: " #0C1720",
                                    backgroundColor: "#E7E9EA",
                                  }}
                                  className={` rounded-2xl text-sm font-medium py-[3px] px-[10px]`}
                                >
                                  {task?.due_in}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <button
                              className="text-[13px] text-[#E37915] leading-5 font-semibold font-Graphik w-fit py-2 px-3"
                              onClick={() =>
                                setDismissed([...dismissed, index])
                              }
                            >
                              Dismiss
                            </button>

                            <button className="text-[13px] text-[#E37915] leading-5 rounded-[6px] font-semibold font-Graphik py-2 px-3 border-[#E37915] border w-fit">
                              Start
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-[#E3E3E5]">
                <div className="flex justify-between items-center py-4 px-6 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[#2F2F33]">
                      Things to do
                    </h2>
                  </div>
                  <Link
                    href="/holiday-calendar"
                    className="text-[#009BC0] text-[15px] leading-5 flex gap-1 items-center"
                  >
                    View All
                    <ArrowHead />
                  </Link>
                </div>
                {loadingHolidayData ? (
                  <Spinner spinnerSmall={true} />
                ) : holidayDataError ? (
                  <ErrorFetch
                    message="error fetching holiday data"
                    smallWindow={true}
                    onRefetch={() => fetchPayrollHoliday()}
                  />
                ) : (
                  <div className="p-6 flex flex-col gap-y-3">
                    {holidayData?.data?.results?.slice(0, 5).map((holiday) => (
                      <div
                        className="flex justify-between items-center bg-[#F7F7F7] py-3 px-4 border-[#E3E3E5] border rounded-[8px]"
                        key={holiday?.id}
                      >
                        <div className="flex gap-x-4">
                          <Image
                            width={48}
                            height={48}
                            src="/assets/Home/world.jpg"
                            alt="holiday in naija"
                          />
                          <div>
                            <p className="font-Graphik font-medium text-base text-[#2F2F33] mb-1">
                              {holiday?.name}
                            </p>
                            <p className="font-Graphik text-[15px] leading-[21px] text-[#71717A]">
                              {holiday?.country}
                            </p>
                          </div>
                        </div>

                        <p className="font-Graphik font-medium text-[15px] leading-[21px] text-[#2F2F33]">
                          {holiday?.date}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="col-span-3 space-y-6">
              {/* {Quick ACtions} */}
              <div className="border border-[#E3E3E5] rounded-xl">
                <h2 className="text-base text-[#2F2F33] font-semibold py-4 px-6 border-b border-[#E3E3E5]">
                  Quick Actions
                </h2>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((el, i) => {
                      return (
                        <div
                          className="py-6 pl-6 border-[#E3E3E5] border bg-[#F7F7F7] rounded-lg"
                          key={i}
                        >
                          <Image
                            width={40}
                            height={40}
                            src={el?.icon}
                            alt={el?.btn}
                          />
                          <button className="mt-6 text-[#E37915] text-base underline font-Graphik font-medium">
                            {el?.btn}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Last Payroll */}
              <div className="border border-[#E3E3E5] rounded-xl">
                <div className="py-4 px-6 border-b border-[#E3E3E5]">
                  <h2 className="text-base text-[#2F2F33] font-semibold">
                    Last Payroll
                  </h2>
                </div>

                {loadingLastPayroll ? (
                  <Spinner spinnerSmall={true} />
                ) : lastPayrollError ? (
                  <ErrorFetch
                    message="error fetching last paroll data"
                    smallWindow={true}
                    onRefetch={() => fetchLastPayroll()}
                  />
                ) : (
                  <div className="text-sm text-gray-700">
                    <div className="p-6">
                      <div className="flex gap-x-11 mb-4">
                        <div>
                          <p className="text-[#71717A] text-sm font-Graphik font-medium mb-2">
                            Total Payroll Amount
                          </p>
                          <p className="font-semibold font-Graphik text-[#2F2F33] text-lg">
                            ₦ {lastPayrollData?.payroll?.total_payout}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#71717A] text-sm font-Graphik font-medium mb-2">
                            Total Employee Paid
                          </p>
                          <p className="font-semibold font-Graphik text-[#2F2F33] text-lg">
                            {lastPayrollData?.payroll?.payslips?.length}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-x-11 py-3 px-4 border rounded-[8px] mb-4">
                        <div className="flex gap-x-3 items-start">
                          <span>
                            <MdOutlineCalendarMonth size={20} />
                          </span>
                          <div>
                            <p className="text-[#71717A] text-[13px] font-Graphik font-medium mb-2">
                              Pay period
                            </p>
                            <p className="font-medium font-Graphik text-[#2F2F33] text-base">
                              June 1 - June 30, 2025
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-x-3">
                          <span>
                            <MdOutlineCalendarMonth size={20} />
                          </span>
                          <div>
                            <p className="text-[#71717A] text-[13px] font-Graphik font-medium mb-2">
                              Payout Date
                            </p>
                            <p className="font-medium font-Graphik text-[#2F2F33] text-base">
                              {lastPayrollData?.payroll?.payday}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-x-11 py-3 px-4 border rounded-[8px] mb-4">
                        <div className="flex gap-x-3 items-start">
                          <span>
                            <MdOutlineCalendarMonth size={20} />
                          </span>
                          <div>
                            <p className="text-[#71717A] text-[13px] font-Graphik font-medium mb-2">
                              Submitted By
                            </p>
                            <p className="font-medium font-Graphik text-[#2F2F33] text-base">
                              {lastPayrollData?.payroll?.run_by?.fullname}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-x-3">
                          <span>
                            <MdOutlineCalendarMonth size={20} />
                          </span>
                          <div>
                            <p className="text-[#71717A] text-[13px] font-Graphik font-medium mb-2">
                              Payment Method
                            </p>
                            <p className="font-medium font-Graphik text-[#2F2F33] text-base">
                              {lastPayrollData?.payroll?.payment_method}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F7F7F7] flex justify-between rounded-br-xl rounded-bl-xl border-t border-t-[#E3E3E5] px-4 py-5">
                      <p className="text-sm font-Graphik font-medium text-[#71717A]">
                        Want a summary of the last payroll?
                      </p>
                      <div>
                        <Link
                          href="/payroll-history"
                          className="text-[#009BC0] text-[15px] leading-5 flex gap-1 items-center"
                        >
                          View All
                          <ArrowHead />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Employees on leave */}
              <div className="rounded-2xl border border-[#E3E3E5]">
                <div className="flex justify-between items-center py-4 px-6 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-[#2F2F33]">
                      Employees on Leave
                    </h2>
                  </div>
                  <Link
                    href="/leave-management"
                    className="text-[#009BC0] text-[15px] leading-5 flex gap-1 items-center"
                  >
                    View All
                    <ArrowHead />
                  </Link>
                </div>

                <div className="p-6 flex flex-col gap-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-4 items-center">
                      <Image
                        width={48}
                        height={48}
                        src="/assets/Home/nija.svg"
                        alt="holiday in naija"
                      />
                      <p className="font-Graphik font-medium text-base text-[#2F2F33]">
                        Confidence Esther
                      </p>
                    </div>

                    <p className="font-Graphik text-[15px] leading-[21px] text-[#71717A]">
                      Oct 12 - Nov 16
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-4 items-center">
                      <Image
                        width={48}
                        height={48}
                        src="/assets/Home/nija.svg"
                        alt="holiday in naija"
                      />
                      <p className="font-Graphik font-medium text-base text-[#2F2F33]">
                        Confidence Esther
                      </p>
                    </div>

                    <p className="font-Graphik text-[15px] leading-[21px] text-[#71717A]">
                      Oct 12 - Nov 16
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-4 items-center">
                      <Image
                        width={48}
                        height={48}
                        src="/assets/Home/nija.svg"
                        alt="holiday in naija"
                      />
                      <p className="font-Graphik font-medium text-base text-[#2F2F33]">
                        Confidence Esther
                      </p>
                    </div>

                    <p className="font-Graphik text-[15px] leading-[21px] text-[#71717A]">
                      Oct 12 - Nov 16
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
