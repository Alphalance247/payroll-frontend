"use client";
import DashboardLayout from "../../common/DashBoardLayout";
import Heading from "../../common/heading";
import ProtectedRoute from "../../common/protectedRoute";
import AnalyticsFilters from "../../components/analytics/analyticsFilters";
import AnalyticsStatCards from "../../components/analytics/analyticsStatCards";
import PayrollTrendChart from "../../components/analytics/payrollTrendChart";
import SalaryByTeamChart from "../../components/analytics/salaryByTeamChart";
import BonusByTeamChart from "../../components/analytics/bonusByTeamChart";
import BonusBreakdownChart from "../../components/analytics/bonusBreakdownChart";
import SalaryByEmploymentTypeChart from "../../components/analytics/salaryByEmploymentTypeChart";
import LoansSummaryCard from "../../components/analytics/loansSummaryCard";
import TaxSummaryCard from "../../components/analytics/taxSummaryCard";
import TotalHoursLoggedChart from "../../components/analytics/totalHoursLoggedChart";
import EmployeesByTeamChart from "../../components/analytics/employeesByTeamChart";
import { useGeneralAnalytics } from "../../hooks/useQueries/analytics/useGeneralAnalytics";
import { usePayrollAnalyticsFilterStore } from "@/stores/analytics/payrollAnalyticsFilterStore";

const PayrollAnalytics = () => {
  const { start_date, end_date, team, employee, job_type } =
    usePayrollAnalyticsFilterStore();

  // Scaffolding only — review the shape below before we wire each chart to
  // its real section of this response and remove the debug preview.
  const { data } = useGeneralAnalytics({
    start_date,
    end_date,
    team,
    employee,
    job_type,
  });

  console.log("Payroll analytics response:", data);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-10 overflow-auto flex flex-col gap-6">
          <Heading
            user="Analytics"
            subHead="Track salary, bonuses, loans, hours logged, and team performance."
            flexDirection="column"
            withGap={false}
          />

          <AnalyticsFilters />
          <AnalyticsStatCards />
          <PayrollTrendChart />
          <SalaryByTeamChart />
          <BonusByTeamChart />

          <div className="flex flex-col lg:flex-row gap-5">
            <BonusBreakdownChart />
            <SalaryByEmploymentTypeChart />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <LoansSummaryCard />
            <TaxSummaryCard />
          </div>

          <TotalHoursLoggedChart />
          <EmployeesByTeamChart />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollAnalytics;
