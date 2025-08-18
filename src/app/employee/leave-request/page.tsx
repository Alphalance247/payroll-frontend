"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import OverviewCard from "@/app/common/employee-dashboard/common/overviewCard";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";

const EmployeeLeaveRequest = () => {
  const cardData = [
    {
      label: "Approved",
      value: `15`,
    },
    {
      label: "Awaiting Approval",
      value: "2",
    },
    {
      label: "Remaining",
      value: "30",
    },
    {
      label: "National Holidays",
      value: "12",
    },
  ];

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"My Leave Request"} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 mb-8">
            {cardData.map((card, index) => (
              <OverviewCard
                image="/assets/employee-dashboard/home/people.svg"
                label={card?.label}
                value={card?.value}
                key={index}
              />
            ))}
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeLeaveRequest;
