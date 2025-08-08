"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";

const EmployeeCompliance = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout isAdmin={false}>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <p>Compliance Dashboard</p>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeCompliance;
