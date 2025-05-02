import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";
import TopBar from "../common/topBar";
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

const PayrollAnalytics = () => {
  return (
    <DashboardLayout>
      <main className="p-10 overflow-auto">
        <Overview />
        <Payroll />
        <PayrollPerTeam />
        <SpendPerTeam />
        <PayrollInsights />
        <LoggedHours />
        <EachTeamEmployee />
        <TimeTracking />
        <WorkHoursBreakDown />
        <Loan />
        <LoanAmounts />
      </main>
    </DashboardLayout>
  );
};

export default PayrollAnalytics;
