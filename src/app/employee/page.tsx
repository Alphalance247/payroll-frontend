"use client";
import Image from "next/image";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import QuickActions from "../components/Employee-Dashboard/Home/quickActions";

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
      <DashboardLayout isAdmin={false}>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading
            flexDirection=""
            user={"Good afternoon, James"}
            // subHead={dateTime}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-[white] border border-[#E3E3E5] rounded-lg py-3 px-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8">
                    <Image
                      src="/assets/employee-dashboard/home/people.svg"
                      alt={card.label}
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">{card.label}</p>
                    <p className="font-semibold mt-1 text-lg text-[#2F2F33]">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <QuickActions />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
