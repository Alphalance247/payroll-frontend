import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";

const EmployeeAnalytics = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout isAdmin={false}>
        <main className="py-4 md:py-6 lg:pt-10 lg:pb-20 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"Analytics"} />

          <div className="mt-4 grid md:grid-cols-[2fr_1fr] gap-6">
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
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeAnalytics;
