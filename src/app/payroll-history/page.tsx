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

const PayrollHistory = () => {
  const [activeTab, setActiveTab] = useState("Payroll Details");
  const tabs = [{ name: "Payroll Details" }, { name: "Audit logs" }];

  useEffect(() => {
    const fetchPayrollAdmin = async () => {
      try {
        const res = await axiosInstance.get(`/employees/transfers`);
        if (res.status === 200) {
          // setGetPaystackBalance(res?.data);
          toast.success("Paystack balance fetched");
        } else {
          toast.error(
            res?.data?.message ||
              "Error fetching paystack balance please refresh or contact Admin"
          );
        }
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
                <HistoryOverview />
                <PayrollHistoryTable />
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
