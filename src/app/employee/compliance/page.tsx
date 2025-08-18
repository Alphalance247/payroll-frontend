"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";

const EmployeeCompliance = () => {
  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <p>Compliance Dashboard</p>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeCompliance;
