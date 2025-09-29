"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import Button from "@/app/common/Button";
import PayrollCardMain from "@/app/components/payroll/payrollCard";
import { CgSoftwareDownload } from "react-icons/cg";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getEmployeePayrollSummary } from "@/stores/employee-dashboard/employee/payrollSummary";
import ErrorFetch from "@/app/common/errorFetch";
import Spinner from "@/app/common/spinner";

const EmployeePayroll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    fetchEmployeePayrollSummary,
    error,
    loading,
    data: summaryData,
  } = getEmployeePayrollSummary();

  useEffect(() => {
    fetchEmployeePayrollSummary();
  }, [fetchEmployeePayrollSummary]);

  const overviewItems = [
    {
      id: "Latest Payroll",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Latest Payroll",
      value: summaryData?.latest_payroll_date || "",
    },
    {
      id: "Latest Net Pay",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Latest Net Pay",
      value: "N " + summaryData?.latest_net_pay.toLocaleString() || "0",
    },
    {
      id: "Total Tax Paid",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Total Tax Paid",
      value: "N " + summaryData?.total_taxes || "0",
    },
  ];

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <div className="flex justify-between items-center">
            <Heading
              user={"Payroll"}
              subHead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, "
              flexDirection="column"
            />

            <Button variant="primary">Export CSV</Button>
          </div>

          {loading ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              onRefetch={fetchEmployeePayrollSummary}
              message="Error fetching payroll history overview"
            />
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[80%]">
              {overviewItems?.map((items) => {
                return (
                  <PayrollCardMain
                    unit=""
                    key={items?.id}
                    icon={items?.icon}
                    id={items?.id}
                    label={items?.label}
                    value={items?.value}
                  />
                );
              })}
            </div>
          )}

          <div className="mt-16">
            <div className="relative w-[380px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>
          </div>

          <div className="mt-10">
            <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
              <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
                Payroll History
              </h3>
              <div className="overflow-x-auto">
                {loading ? (
                  <Spinner spinnerSmall={true} />
                ) : error ? (
                  <ErrorFetch
                    onRefetch={fetchEmployeePayrollSummary}
                    message="Error fetching payroll history"
                  />
                ) : (
                  <table className="w-full min-w-[1400px] overflow-hidden shadow-sm ">
                    <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                      <tr>
                        <th
                          className="px-6 py-3 text-left"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          payment Date
                        </th>
                        <th
                          className="px-6 py-3 text-left "
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          Gross Pay
                        </th>
                        <th
                          className="px-6 py-3 text-left"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          Deductions
                        </th>
                        <th
                          className="px-6 py-3 text-left w-[200px]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          Tax deducted
                        </th>
                        <th
                          className="px-6 py-3 text-left w-[200px]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          Net Pay
                        </th>
                        <th
                          className="px-6 py-3 text-left w-[200px]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          status
                        </th>
                        <th
                          className="px-6 py-3 text-left w-[200px]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          Payslips
                        </th>
                      </tr>
                    </thead>
                    {summaryData?.payslips.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6} className="text-center py-8">
                            No Loan payroll history found yet
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                        {summaryData?.payslips?.map((data, i) => (
                          <tr
                            className="hover:bg-gray-50 even:bg-[#F7F7F7] dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                            key={i}
                          >
                            <td className="px-6 py-6 text-sm text-[#2F2F33]">
                              {data?.pay_date || "Not specified"}
                            </td>
                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              ₦ {data?.gross_pay.toLocaleString() || 0}
                            </td>
                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              ₦ {data?.debt.toLocaleString() || 0}
                            </td>
                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              ₦ {data?.tax || 0}
                            </td>
                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              ₦ {data?.net_pay.toLocaleString()}
                            </td>

                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs border bg-[#E9F9EF] ${
                                  data?.paid
                                    ? "text-[#5c2dca] border-[#188C43]"
                                    : "text-[#5c2dca] border-[#5c2dca]"
                                } font-medium`}
                              >
                                {data?.paid ? "successful" : "not paid"}
                              </span>
                            </td>

                            <td
                              className="p-6 text-sm text-[#2F2F33]"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <div className="flex gap-x-2 items-center">
                                <span>
                                  <CgSoftwareDownload
                                    size={20}
                                    color="#000000"
                                    fill="#000000"
                                  />{" "}
                                </span>
                                Download
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                )}
              </div>
            </div>
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeePayroll;
