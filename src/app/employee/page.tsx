"use client";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import QuickActions from "../components/Employee-Dashboard/Home/quickActions";
import OverviewCard from "../common/employee-dashboard/common/overviewCard";
import EmployeeDashboardLayout from "../common/employee-dashboard/common/employeeLayout";

const Storage = () => {
  const cardData = [
    {
      label: "Total Payroll",
      value: `NGN 10,600,000`,
    },
    {
      label: "Salary",
      value: "NGN 1,600,000",
    },
    {
      label: "Total Time Booked",
      value: "1,500",
    },
  ];
  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"Good afternoon, James"} />

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

          <QuickActions />
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
