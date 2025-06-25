"use client";
import DashboardLayout from "../common/DashBoardLayout";
import EachTeamEmployee from "../components/analytics/EachTeamEmployee";
import Loan from "../components/analytics/Loan";
import LoanAmounts from "../components/analytics/loanAmounts";
import LoggedHours from "../components/analytics/LoggedHours";
import Overview from "../components/analytics/overview";
import Payroll from "../components/analytics/payroll";
import PayrollInsights from "../components/analytics/payrollInsights";
import PayrollPerTeam from "../components/analytics/payrollPerTeam";
import SpendPerTeam from "../components/analytics/spendPerTeam";
import TimeTracking from "../components/analytics/TimeTracking";
import WorkHoursBreakDown from "../components/analytics/WorkHoursBreakDown";
import { getPayrollAnalysis } from "@/stores/getPayrollAnalysis";
import { getTeamAnalytics } from "@/stores/getTeamAnalytics";
import { getLoanAnalytics } from "@/stores/getLoanAnalytics";
import { getTeamHoursLogged } from "@/stores/getTeamHousLogged";
import { useEffect, useState } from "react";
import Heading from "../common/heading";
import { Loader2 } from "lucide-react";
import StartEndDate from "../components/common/startEndDate";

const PayrollAnalytics = () => {
  const {
    data: payrollData,
    fetchPayrollAnalysis,
    loading,
  } = getPayrollAnalysis();
  const { fetchTeamAnalytics, loading: teamLoading } = getTeamAnalytics();
  const { fetchLoanAnalytics, loading: loanLoading } = getLoanAnalytics();
  const { fetchTeamHoursLogged, loading: teamHoursLoggedLoading } =
    getTeamHoursLogged();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  useEffect(() => {
    fetchPayrollAnalysis();
    fetchTeamAnalytics();
    fetchLoanAnalytics();
    fetchTeamHoursLogged();
  }, [
    fetchTeamAnalytics,
    fetchLoanAnalytics,
    fetchTeamHoursLogged,
    fetchPayrollAnalysis,
  ]);

  // Global data not found check for payroll-related analytics
  const isPayrollDataEmpty =
    !payrollData ||
    (Array.isArray(payrollData.data) && payrollData.data.length === 0);

  return (
    <DashboardLayout>
      <main className="p-10 overflow-auto">
        {/* Heading */}

        <div className="flex justify-between items-center">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
            user={"Payroll Analysis"}
          />

          {isPayrollDataEmpty && !loading && (
            <StartEndDate
              start_date={start_date}
              end_date={end_date}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              fetchPayrollAnalysis={fetchPayrollAnalysis}
            />
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : isPayrollDataEmpty ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-500 text-lg font-medium">
              Data not found for the selected month(s)
            </span>
          </div>
        ) : (
          <>
            <Overview />
            <Payroll
              start_date={start_date}
              end_date={end_date}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              fetchPayrollAnalysis={fetchPayrollAnalysis}
            />
            <PayrollPerTeam />
            <SpendPerTeam />
            <PayrollInsights />
          </>
        )}

        {/* Team Group */}
        {teamLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <LoggedHours />
            <EachTeamEmployee />
          </>
        )}

        {teamHoursLoggedLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <TimeTracking />
            <WorkHoursBreakDown />
          </>
        )}

        {loanLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <Loan />
            <LoanAmounts />
          </>
        )}
      </main>
    </DashboardLayout>
  );
};

export default PayrollAnalytics;
