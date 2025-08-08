"use client";
import DashboardLayout from "../common/DashBoardLayout";
import ProtectedRoute from "../common/protectedRoute";

const Storage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout isAdmin={false}>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <p>EMployee Dashboard</p>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
