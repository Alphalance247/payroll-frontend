"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import { CgSoftwareDownload } from "react-icons/cg";

const EmployeePayslips = () => {
  const data = [
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
            <Heading user={"Payslips"} subHead="" flexDirection="column" />
          </div>

          <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
            <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
              Payroll Period: Oct 1 - Oct 31
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] overflow-hidden shadow-sm ">
                <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                  <tr>
                    <th
                      className="px-6 py-3 text-left"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Basic Salary
                    </th>
                    <th
                      className="px-6 py-3 text-left "
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Bonuses
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
                      Net Pay
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Tax paid
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Download
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
                        ₦500,000
                      </td>
                      <td
                        className="p-6 text-sm text-[#2F2F33]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        -----------
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
                        className="p-6 text-sm text-[#E37915]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        <div className="flex gap-x-2 items-center">
                          <span>
                            <CgSoftwareDownload
                              size={20}
                              color="#E37915"
                              fill="#E37915"
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

          <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
            <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
              Payroll Period: Oct 1 - Oct 31
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] overflow-hidden shadow-sm ">
                <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                  <tr>
                    <th
                      className="px-6 py-3 text-left"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Basic Salary
                    </th>
                    <th
                      className="px-6 py-3 text-left "
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Bonuses
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
                      Net Pay
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Tax paid
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Download
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
                        ₦500,000
                      </td>
                      <td
                        className="p-6 text-sm text-[#2F2F33]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        -----------
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
                        className="p-6 text-sm text-[#E37915]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        <div className="flex gap-x-2 items-center">
                          <span>
                            <CgSoftwareDownload
                              size={20}
                              color="#E37915"
                              fill="#E37915"
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

          <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
            <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
              Payroll Period: Oct 1 - Oct 31
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] overflow-hidden shadow-sm ">
                <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                  <tr>
                    <th
                      className="px-6 py-3 text-left"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Basic Salary
                    </th>
                    <th
                      className="px-6 py-3 text-left "
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Bonuses
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
                      Net Pay
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Tax paid
                    </th>
                    <th
                      className="px-6 py-3 text-left w-[200px]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      Download
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
                        ₦500,000
                      </td>
                      <td
                        className="p-6 text-sm text-[#2F2F33]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        -----------
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
                        className="p-6 text-sm text-[#E37915]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        <div className="flex gap-x-2 items-center">
                          <span>
                            <CgSoftwareDownload
                              size={20}
                              color="#E37915"
                              fill="#E37915"
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
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeePayslips;
