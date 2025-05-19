"use client";
import ProtectedRoute from "../common/protectedRoute";
import DashboardLayout from "../common/DashBoardLayout";
import { useEffect, useState } from "react";
import HistoryOverview from "../components/payroll-history/historyOverview";
import PayrollHistoryTable from "../components/payroll-history/payrollHistoryTable";
import { GoChevronRight } from "react-icons/go";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";
import { PayrollHistoryTranferData } from "../utils/payrollHistoryType";

const PayrollHistory = () => {
  const [activeTab, setActiveTab] = useState("Payroll Details");
  const [payrollHistory, setPayrollHistory] =
    useState<PayrollHistoryTranferData | null>(null);
  const tabs = [{ name: "Payroll Details" }, { name: "Audit logs" }];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPayrollAdmin = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/employees/transfers`);
        if (res.status === 200) {
          setPayrollHistory(res?.data?.data);
          toast.success("Payroll history fetched");
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
          errorMessage = err.response?.data?.message || errorMessage;
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
              <p className="text-[#71717A] text-sm font-medium">
                Payroll History
              </p>
              <span className="text-[#71717A] text-sm font-medium">
                <GoChevronRight size={20} />
              </span>
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
                      approvedBy={
                        payrollHistory?.payroll?.approved_by?.fullname
                      }
                      approvalTimestamp={payrollHistory?.payroll?.payday}
                      fundStatus={payrollHistory?.payroll?.total_payout}
                      totalHours={payrollHistory?.payroll?.total_hours}
                    />
                    <PayrollHistoryTable
                      teams={payrollHistory?.teams}
                      transferData={payrollHistory?.transfer_data}
                      payroll={payrollHistory}
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

export default PayrollHistory;
