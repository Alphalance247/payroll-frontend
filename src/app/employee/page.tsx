"use client";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import QuickActions from "../components/Employee-Dashboard/Home/quickActions";
import OverviewCard from "../common/employee-dashboard/common/overviewCard";
import EmployeeDashboardLayout from "../common/employee-dashboard/common/employeeLayout";
import { getEmployeePayrollSummary } from "@/stores/employee-dashboard/employee/payrollSummary";
import { useEffect } from "react";
import ErrorFetch from "../common/errorFetch";
import Spinner from "../common/spinner";
import EmployeeBarChart from "../components/charts/employeeBarChart";
import { IoMdArrowDropdown } from "react-icons/io";

const Storage = () => {
  const { fetchEmployeePayrollSummary, error, loading, data } =
    getEmployeePayrollSummary();

  useEffect(() => {
    fetchEmployeePayrollSummary();
  }, [fetchEmployeePayrollSummary]);

  const cardData = [
    {
      label: "Total Payroll",
      value: "NGN " + data?.total_base_salary.toString() || "0",
    },
    {
      label: "Salary",
      value: "NGN " + data?.total_net_pay || "0",
    },
    {
      label: "Total Time Booked",
      value: data?.total_net_pay || "0",
    },
  ];
  return (
    <ProtectedRoute allowedUserTypes={["admin", "employee"]}>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading flexDirection="" user={"Good afternoon, James"} />

          {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              onRefetch={fetchEmployeePayrollSummary}
              message="Error Fetching compliance"
            />
          ) : (
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
          )}

          <QuickActions />
          <div className="h-[882px] border border-[#E3E3E5] rounded-[8px]  mt-8  ">
            <div className="h-[76px] border-b border-[#E3E3E5] px-6 flex justify-between items-center ">
              <div className=" items-center ">
                <div className="text-base text-[#2F2F33] font-medium font-Graphik">
                  Payroll Insights
                </div>
              </div>
              <button className="h-[44px] w-[177px] border border-[#E3E3E5] rounded-[8px] flex justify-between items-center px-[17.5px] font-Graphik">
                <p className="text-[#2F2F33] text-base">Last 12 months</p>
                <IoMdArrowDropdown />
              </button>
            </div>
            {/* <div className="my-8 flex space-x-5 items-center px-20">
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-4 rounded-sm bg-[#009BC0]"></div>
                <div className="text-sm text-[#2F2F33] font-Graphik font-medium">
                  Base salary
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-4 rounded-sm bg-[#E37915]"></div>
                <div className="text-sm text-[#2F2F33] font-Graphik font-medium">
                  Bonus
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-4 rounded-sm bg-[#11202D]"></div>
                <div className="text-sm text-[#2F2F33] font-Graphik font-medium">
                  Deduction
                </div>
              </div>
            </div> */}
            <EmployeeBarChart />
          </div>
          {/* <EmployeeBarChart chartData={} /> */}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
