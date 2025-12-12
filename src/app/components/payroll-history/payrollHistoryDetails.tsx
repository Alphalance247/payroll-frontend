"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import { PayrollHistoryTranferData } from "@/app/utils/payrollHistoryType";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoChevronRight } from "react-icons/go";
import HistoryOverview from "./historyOverview";
import PayrollHistoryTable from "./payrollHistoryTable";
import DashboardLayout from "@/app/common/DashBoardLayout";
import axiosInstance from "@/app/utils/axios";
import Link from "next/link";
import { usePayrollHistoryDetails } from "@/app/hooks/useQueries/payroll-history/usePayrollHistoryDetails";

const PayrollHistoryDetailsPage = ({ historyID }: { historyID: string }) => {
  const [activeTab, setActiveTab] = useState("Payroll Details");
  const [payrollHistory, setPayrollHistory] =
    useState<PayrollHistoryTranferData | null>(null);
  const tabs = [{ name: "Payroll Details" }];
  const [isLoading, setIsLoading] = useState(false);
  const { data } = usePayrollHistoryDetails({ id: historyID });

  useEffect(() => {
    const fetchPayrollAdmin = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/employees/transfers`);
        if (res.status === 200) {
          setPayrollHistory(res?.data?.data);
        } else {
          toast.error(
            res?.data?.message ||
              "Error fetching payroll history please refresh or contact Admin"
          );
        }
        setIsLoading(false);
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.statusmessage || errorMessage;
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayrollAdmin();
  }, []);

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
                PR-2025-01-15
              </p>
            </div>
            <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-10 mt-4">
              PR-2025-01-15
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
                ) : payrollHistory ? (
                  <>
                    <HistoryOverview
                      approvedBy={data?.data?.approved_by?.fullname || "N/A"}
                      approvalTimestamp={data?.data?.payday || "N/A"}
                      fundStatus={
                        Number(data?.data?.total_payout)?.toLocaleString() ||
                        "N/A"
                      }
                      totalHours={data?.data?.total_hours || "N/A"}
                    />
                    <PayrollHistoryTable
                      teams={payrollHistory?.teams}
                      payroll={payrollHistory}
                      id={historyID as string}
                    />
                  </>
                ) : (
                  <div className="text-center py-10 text-[#71717A]">
                    No payroll history data available
                  </div>
                )}
              </>
            )}

            {activeTab === "Audit logs" && <p>Audit logs</p>}
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollHistoryDetailsPage;
