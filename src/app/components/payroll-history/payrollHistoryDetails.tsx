"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import HistoryOverview from "./historyOverview";
import PayrollHistoryTable from "./payrollHistoryTable";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Link from "next/link";
import { usePayrollHistoryDetails } from "@/app/hooks/useQueries/payroll-history/usePayrollHistoryDetails";

const PayrollHistoryDetailsPage = ({ historyID }: { historyID: string }) => {
  const [activeTab, setActiveTab] = useState("Payroll Details");
  const tabs = [{ name: "Payroll Details" }];
  const { data, isLoading } = usePayrollHistoryDetails({ id: historyID });

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <Link
                href={"/admin/payroll-history"}
                className=" cursor-pointer flex items-center gap-x-2"
              >
                <p className="text-[#71717A] text-sm font-medium">
                  Payroll History
                </p>
                <span className="text-[#71717A] text-sm font-medium">
                  <GoChevronRight size={20} />
                </span>
              </Link>

              <p className="text-[#71717A] text-sm font-medium">
                PR-{historyID}
              </p>
            </div>
            <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-10 mt-4">
              PR-{historyID}
            </h2>
          </div>
          <div className="flex gap-x-5 items-center border-b border-[#E4E7EC] mb-6">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeTab === el.name
                    ? "text-[#E37915] border-b-[1.5px] border-[#E37915] bg-white text-sm"
                    : "text-[#71717A] border-transparent"
                }   font-semibold text-sm px-2 py-4`}
                onClick={() => setActiveTab(el.name)}
                key={i}
              >
                {el.name}
              </button>
            ))}
          </div>

          <div className="">
            {activeTab === "Payroll Details" && (
              <>
                {isLoading ? (
                  <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                  </div>
                ) : (
                  <>
                    <HistoryOverview
                      historyID={historyID}
                      approvedOn={data?.data?.data?.approved_on || "N/A"}
                      approvedBy={
                        data?.data?.data?.approved_by?.fullname || "N/A"
                      }
                      approvalTimestamp={data?.data?.data?.payday || "N/A"}
                      fundStatus={data?.data?.data?.total_payout || "N/A"}
                      totalHours={data?.data?.data?.total_hours || "N/A"}
                    />
                    <PayrollHistoryTable id={historyID as string} />
                  </>
                )}
              </>
            )}

            {/* {activeTab === "Audit logs" && <p>Audit logs</p>} */}
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollHistoryDetailsPage;
