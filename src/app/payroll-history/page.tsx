"use client";
import ProtectedRoute from "../common/protectedRoute";
import DashboardLayout from "../common/DashBoardLayout";
import { useState } from "react";
import HistoryOverview from "../components/payroll-history/historyOverview";
import PayrollHistoryTable from "../components/payroll-history/payrollHistoryTable";

const PayrollHistory = () => {
  const [activeTab, setActiveTab] = useState("Payroll Details");
  const tabs = [{ name: "Payroll Details" }, { name: "Audit logs" }];
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
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
