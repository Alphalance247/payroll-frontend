"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import HeadingSubHead from "@/app/common/headingSubHead";
import { CgSoftwareDownload } from "react-icons/cg";
import { GoChevronRight } from "react-icons/go";
import Link from "next/link";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import { getEmployeeTransactionHistory } from "@/stores/employee-dashboard/analytics/transactionHistory";
import { useEffect } from "react";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";

const TransactionHistory = () => {
  const { data, fetchEmployeeTransactionHistory, loading, error } =
    getEmployeeTransactionHistory();

  useEffect(() => {
    fetchEmployeeTransactionHistory();
  }, [fetchEmployeeTransactionHistory]);

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="flex items-center gap-x-2 mb-6">
            <Link href={"/employee/analytics"}>
              <p className="text-[#E37915] text-sm font-medium">Earnings</p>
            </Link>
            <span className="text-[#71717A] text-sm font-medium">
              <GoChevronRight size={20} />
            </span>
            <p className="text-[#71717A] text-sm font-medium">
              Transaction History
            </p>
          </div>
          <div>
            <HeadingSubHead
              subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
              heading="Transaction History"
              withSubHead={false}
            />
          </div>

          <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
            <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
              All Transactions
            </h3>
            {loading ? (
              <Spinner spinnerSmall={true} />
            ) : error ? (
              <ErrorFetch
                onRefetch={fetchEmployeeTransactionHistory}
                message="Error fetching Transaction history"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px] overflow-hidden shadow-sm ">
                  <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                    <tr>
                      <th
                        className="px-6 py-3 text-left"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Date & Time
                      </th>
                      <th
                        className="px-6 py-3 text-left "
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Type
                      </th>
                      <th
                        className="px-6 py-3 text-left"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Amount
                      </th>
                      <th
                        className="px-6 py-3 text-left w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Transaction ID
                      </th>
                      <th
                        className="px-6 py-3 text-left w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Status
                      </th>

                      <th
                        className="px-6 py-3 text-left "
                        style={{ paddingLeft: "1.5rem" }}
                      ></th>
                    </tr>
                  </thead>

                  {data?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          No transaction history found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                      {data?.map((data, i) => (
                        <tr
                          className="hover:bg-gray-50 even:bg-[#F7F7F7] dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                          key={i}
                        >
                          <td className="px-6 py-6 text-sm text-[#2F2F33]">
                            {data?.created}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.tran_type}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            ₦ {data?.amount}
                          </td>
                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            {data?.transaction_id}
                          </td>

                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs border  ${
                                data?.status === "pending"
                                  ? "text-[#44188c] border-[#44188c]"
                                  : "text-[#188C43] border-[#188C43]"
                              }  bg-[#E9F9EF]  font-medium`}
                            >
                              {data?.status === "pending"
                                ? "Not Processed"
                                : "Successful"}
                            </span>
                          </td>

                          <td
                            className="p-6 text-sm text-[#2F2F33]"
                            style={{ paddingLeft: "1.5rem" }}
                          >
                            <a
                              href={data?.related_file}
                              target="_blank"
                              rel="noopener noreferrer"
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
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            )}
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default TransactionHistory;
