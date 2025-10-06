"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import Heading from "../../common/heading";
import EmpoyeeTimeSheet from "../../components/time-sheet/employeeTimeSheet";
import { useEffect } from "react";
import { getAdminTimesheet } from "@/stores/admin-dashboard/timesheet/time-sheet";
import ErrorFetch from "@/app/common/errorFetch";
import Spinner from "@/app/common/spinner";

const TimeTool = () => {
  const { fetchAdminTimesheet, data, loading, error } = getAdminTimesheet();

  useEffect(() => {
    fetchAdminTimesheet();
  }, [fetchAdminTimesheet]);

  const cardData = [
    {
      id: "1",
      heading: "Total Hours Logged",
      subhead: data?.total_hours.toFixed(),
    },

    {
      id: "2",
      heading: "Hours Missing",
      subhead: data?.missing.toFixed(),
    },

    {
      id: "3",
      heading: "Total Approved",
      subhead: data?.total_hours.toFixed(),
    },
    {
      id: "4",
      heading: "Avg Hours/Employee",
      subhead: data?.avg_hours?.toFixed(),
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

          {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              message="Error fetching Time Sheet"
              onRefetch={() => fetchAdminTimesheet()}
            />
          ) : (
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
          )}
          <EmpoyeeTimeSheet />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TimeTool;
