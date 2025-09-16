"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import Heading from "../../common/heading";
import EmpoyeeTimeSheet from "../../components/time-sheet/employeeTimeSheet";

const TimeTool = () => {
  const cardData = [
    {
      id: "1",
      heading: "Total Hours Logged",
      subhead: "1,600",
    },

    {
      id: "2",
      heading: "Hours Missing",
      subhead: "80",
    },

    {
      id: "3",
      heading: "Total Approved",
      subhead: "1,520",
    },
    {
      id: "4",
      heading: "Avg Hours/Employee",
      subhead: "40",
    },
  ];
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
            user={"Timesheet"}
          />

          <div className="mt-6 grid  md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((card) => (
              <div
                className="py-6 px-4 border border-[#E3E3E5] rounded-md"
                key={card?.id}
              >
                <p className="text-[#71717A] font-semibold text-sm mb-4">
                  {card?.heading}
                </p>
                <h4 className="font-medium text-xl text-[#2F2F33]">
                  {card?.subhead}
                </h4>
              </div>
            ))}
          </div>

          <EmpoyeeTimeSheet />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TimeTool;
