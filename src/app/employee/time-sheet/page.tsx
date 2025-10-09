"use client";
import ProtectedRoute from "../../common/protectedRoute";
import Heading from "../../common/heading";
import TimeSheetTable from "@/app/components/Employee-Dashboard/time-sheet/timeSheet";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import { getEmployeeTimesheet } from "@/stores/employee-dashboard/timesheet/time-sheet";
import { useEffect } from "react";
import ErrorFetch from "@/app/common/errorFetch";
import Spinner from "@/app/common/spinner";

const EmployeeTimeTool = () => {
  const { fetchEmployeeTimesheet, data, loading, error } =
    getEmployeeTimesheet();

  useEffect(() => {
    fetchEmployeeTimesheet();
  }, [fetchEmployeeTimesheet]);

  const cardData = [
    {
      id: "1",
      heading: "Total Hours Logged",
      subhead: data?.total_hours,
    },

    {
      id: "2",
      heading: "Regular Hours",
      subhead: data?.total_regular_hours,
    },

    {
      id: "3",
      heading: "Over Time Hours",
      subhead: data?.total_overtime,
    },
    // {
    //   id: "4",
    //   heading: "Days Fully Logged",
    //   subhead: "3/5 days fully logged",
    // },
  ];

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
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
              onRefetch={() => fetchEmployeeTimesheet()}
            />
          ) : (
            <>
              <div className="mt-6 grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
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

              <TimeSheetTable />
            </>
          )}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeTimeTool;
