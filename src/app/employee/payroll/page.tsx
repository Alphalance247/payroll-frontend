"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import Button from "@/app/common/Button";
import PayrollCardMain from "@/app/components/payroll/payrollCard";
import { CgSoftwareDownload } from "react-icons/cg";
import { Search } from "lucide-react";
import { useState } from "react";

const EmployeePayroll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const overviewItems = [
    {
      id: "Latest Payroll",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Latest Payroll",
      value: `June 30, 2025`,
    },
    {
      id: "Latest Net Pay",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Latest Net Pay",
      value: "₦450,000",
    },
    {
      id: "Total Tax Paid",
      icon: "/assets/employee-dashboard/payroll/Icon.svg",
      label: "Total Tax Paid",
      value: "₦75,000",
    },
  ];
  const data = [
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
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
                  <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                    {data?.map((data, i) => (
                      <tr
                        className="hover:bg-gray-50 even:bg-[#F7F7F7] dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                        key={i}
                      >
                        <td className="px-6 py-6 text-sm text-[#2F2F33]">
                          Jan 25, 2025
                        </td>
                        <td
                          className="p-6 text-sm text-[#2F2F33]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          ₦500,000
                        </td>
                        <td
                          className="p-6 text-sm text-[#2F2F33]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          ------------
                        </td>
                        <td
                          className="p-6 text-sm text-[#2F2F33]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          ₦20,000
                        </td>
                        <td
                          className="p-6 text-sm text-[#2F2F33]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          ₦430,000
                        </td>

                        <td
                          className="p-6 text-sm text-[#2F2F33]"
                          style={{ paddingLeft: "1.5rem" }}
                        >
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                          >
                            successful
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
                </table>
              </div>
            </div>
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeePayroll;
