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
import { getTeamHoursLogged } from "@/stores/getTeamHoursLogged";
import { useEffect, useState } from "react";
import Heading from "../common/heading";
import { Loader2 } from "lucide-react";
import StartEndDate from "../components/common/startEndDate";
import { getPayrollBreakdown } from "@/stores/analytics/getPayrollBreakdown";
import { getYearlyJobType } from "@/stores/analytics/getYearlyJobType";
import { getLoanCategory } from "@/stores/analytics/getLoanCategory";

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
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedYearJobType, setSelectedYearJobType] = useState<string>("");
  const [timeTrackingStartDate, setTimeTrackingStartDate] =
    useState<string>("");
  const [timeTrackingEndDate, setTimeTrackingEndDate] = useState<string>("");
  const {
    fetchPayrollBreakdown,
    loading: payrollBreakdownLoading,
    error: payrollBreakdownError,
  } = getPayrollBreakdown();
  const { fetchYearlyJobType, loading: yearlyJobTypeLoading } =
    getYearlyJobType();
  const { fetchLoanCategory } = getLoanCategory();

  useEffect(() => {
    fetchPayrollAnalysis();
    fetchTeamAnalytics();
    fetchLoanAnalytics();
    fetchTeamHoursLogged();
    fetchPayrollBreakdown();
    fetchYearlyJobType();
    fetchLoanCategory();
  }, [
    fetchTeamAnalytics,
    fetchLoanAnalytics,
    fetchTeamHoursLogged,
    fetchPayrollAnalysis,
    fetchPayrollBreakdown,
    fetchYearlyJobType,
    fetchLoanCategory,
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
              onFetch={() => {
                fetchPayrollAnalysis(start_date, end_date);
              }}
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
              onFetch={() => {
                fetchPayrollAnalysis(start_date, end_date);
              }}
            />
            <PayrollPerTeam />
            <SpendPerTeam />
          </>
        )}

        {payrollBreakdownLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : payrollBreakdownError ? (
          <div className="flex justify-center items-center h-full mt-10">
            <p className="text-sm text-[#2F2F33] flex items-center gap-x-2">
              Error fetching payroll breakdown data
            </p>
          </div>
        ) : (
          <PayrollInsights
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        )}

        {/* Team Group */}
        {teamLoading || yearlyJobTypeLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <LoggedHours
              selectedYearJobType={selectedYearJobType}
              setSelectedYearJobType={setSelectedYearJobType}
            />
            <EachTeamEmployee />
          </>
        )}

        {teamHoursLoggedLoading ? (
          <div className="flex justify-center items-center h-full mt-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <TimeTracking
              start_date={timeTrackingStartDate}
              end_date={timeTrackingEndDate}
              setStartDate={setTimeTrackingStartDate}
              setEndDate={setTimeTrackingEndDate}
              onFetch={() => {
                fetchTeamHoursLogged(
                  timeTrackingStartDate,
                  timeTrackingEndDate
                );
              }}
            />
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
