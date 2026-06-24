"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { RiExpandUpDownFill } from "react-icons/ri";
import { Search } from "lucide-react";
import { usePayrollHistoryList } from "@/app/hooks/useQueries/payroll-history/usePayrollHistoryList";
import { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getYearsInDescendingOrder } from "@/app/utils/dateOrdering";

const PayrollHistory = () => {
  const { isError, error, refetch, isLoading, data } = usePayrollHistoryList();
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [loadingState, setLoadingState] = useState(false);

  const years = getYearsInDescendingOrder();

  const handleDownloadReport = async (selectedYear: string) => {
    setLoadingState(true);
    try {
      const res = await axiosInstance.get(
        `employees/reports/payment-disbursement?year=${selectedYear}`,
        {
          responseType: "blob", // Important: Tell axios to handle response as blob
        },
      );

      if (res.status === 200 || res.status === 201) {
        // Create a blob from the response
        const blob = new Blob([res.data], {
          type: res.headers["content-type"] || "application/octet-stream",
        });

        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `Payroll-Disbursement-Report-${selectedYear}.pdf`; // Set filename
        document.body.appendChild(link);
        link.click();

        // Clean up: remove the temporary link and revoke the URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("Report downloaded successfully!");
      }

      setLoadingState(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Handle blob response - convert it back to text
        if (err.response?.data instanceof Blob) {
          try {
            const text = await err.response.data.text();
            const errorData = JSON.parse(text);
            errorMessage = errorData?.message || errorMessage;
          } catch {
            errorMessage = "Failed to download report";
          }
        } else {
          errorMessage = err.response?.data?.message || errorMessage;
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-6">
            <div className="flex flex-col">
              <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-10 mt-4">
                Payroll History
              </h2>

              <div className="relative w-[280px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-[#71717A] mb-2">
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] bg-white text-[#2F2F33] cursor-pointer"
                >
                  <option value="">Choose a year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <button
                disabled={!selectedYear}
                onClick={
                  // TODO: API call to download yearly disbursement report
                  () => handleDownloadReport(selectedYear)
                }
                className="px-6 py-2 bg-[#E37915] text-white rounded-lg text-sm font-medium hover:bg-[#d46f0f] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed transition-colors duration-200 sm:mt-6"
              >
                {loadingState ? "downloading..." : " Download Report"}
              </button>
            </div>
          </div>

          {isLoading ? (
            <Spinner spinnerSmall={true} />
          ) : isError ? (
            <ErrorFetch
              message={error?.message || "error fetching form please try again"}
              onRefetch={() => refetch()}
            />
          ) : (
            <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10 z-0 relative">
              <div className="flex justify-between items-center py-5 px-6 z-0 relative">
                <h2 className="text-base font-semibold  text-[#2F2F33]">
                  Payroll Summaries
                </h2>
              </div>

              <div className="overflow-x-auto relative z-0">
                <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
                  <thead className="bg-[#F7F7F7]">
                    <tr>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px] ">
                        <p className="flex gap-x-1 cursor-pointer items-center">
                          Payroll ID
                        </p>
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        <p className="flex gap-x-1 cursor-pointer items-center">
                          Payroll Period
                          <span>
                            <RiExpandUpDownFill fill="#2F2F33" size={12} />
                          </span>
                        </p>
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Total Payroll
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Approved By
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Date of Approval
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  {data?.data?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          No Details found for the selected month
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {data?.data?.map((emp, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#E3E3E5] last:border-b-0"
                        >
                          <td className="px-6 py-4 text-[#E37915] underline-offset-2 underline font-medium cursor-pointer">
                            <Link href={`/admin/payroll-history/${emp?.id}`}>
                              PR-{emp?.id}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            {emp?.created}
                            {/* Jan 1–Jan 31, 2025 */}
                          </td>
                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            NGN {emp?.total_salary}
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            {emp?.approved_by?.fullname}
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            {emp?.approved_on}
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            <span className="text-xs bg-[#E9F9EF] border border-[#188C43] text-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                              {emp?.approved_state}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollHistory;
