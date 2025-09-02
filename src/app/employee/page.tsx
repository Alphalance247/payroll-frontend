"use client";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import QuickActions from "../components/Employee-Dashboard/Home/quickActions";
import OverviewCard from "../common/employee-dashboard/common/overviewCard";
import EmployeeDashboardLayout from "../common/employee-dashboard/common/employeeLayout";
import { getEmployeePayrollSummary } from "@/stores/employee-dashboard/employee/payrollSummary";
import { useEffect } from "react";
import ErrorFetch from "../common/errorFetch";
import Spinner from "../common/spinner";

const Storage = () => {
  const { fetchEmployeePayrollSummary, error, loading, data } =
    getEmployeePayrollSummary();

  useEffect(() => {
    fetchEmployeePayrollSummary();
  }, [fetchEmployeePayrollSummary]);

  const cardData = [
    {
      label: "Total Payroll",
      value: "NGN " + data?.total_base_salary.toString() || "0",
    },
    {
      label: "Salary",
      value: "NGN " + data?.total_net_pay || "0",
    },
    {
      label: "Total Time Booked",
      value: data?.total_net_pay || "0",
    },
  ];
  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"Good afternoon, James"} />

          {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              onRefetch={fetchEmployeePayrollSummary}
              message="Error Fetching compliance"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8">
              {cardData.map((card, index) => (
                <OverviewCard
                  key={index}
                  image={"/assets/employee-dashboard/home/people.svg"}
                  label={card?.label}
                  value={card?.value}
                />
              ))}
            </div>
          )}

          <QuickActions />
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
