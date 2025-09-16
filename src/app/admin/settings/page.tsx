"use client";
import DashboardLayout from "../../common/DashBoardLayout";
import ProtectedRoute from "../../common/protectedRoute";
import Overview from "../../components/settings/overview/overview";

const Settings = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <Overview />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Settings;
