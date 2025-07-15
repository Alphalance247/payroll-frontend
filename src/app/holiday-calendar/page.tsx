"use client";
import ProtectedRoute from "../common/protectedRoute";
import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";

export default function Home() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-10 overflow-y-scroll">
          <HeadingSubHead heading="Holiday" withSubHead={false} />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
