import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";
import TopBar from "../common/topBar";
import Overview from "../components/analytics/overview";
import Payroll from "../components/analytics/payroll";
import PayrollPerTeam from "../components/analytics/payrollPerTeam";

const PayrollAnalytics = () => {
  return (
    <DashboardLayout>
      <TopBar>
        <div className="pl-10 py-6">
          <HeadingSubHead
            withSubHead={true}
            heading="Analytics"
            subHead="Review and manage employee complaints efficiently"
          />
        </div>
      </TopBar>
      <main className="p-10 overflow-auto">
        <Overview />
        <Payroll />
        <PayrollPerTeam />
      </main>
    </DashboardLayout>
  );
};

export default PayrollAnalytics;
