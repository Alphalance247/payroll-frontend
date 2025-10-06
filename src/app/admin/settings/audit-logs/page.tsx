"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import HeadingSubHead from "@/app/common/headingSubHead";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Search } from "lucide-react";
import { useEffect } from "react";
// import Button from "@/app/common/Button";
// import { VscSettings } from "react-icons/vsc";
import { getAdminAuditList } from "@/stores/settings/audit-logs/audit";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useFilter } from "@/app/hooks/useFilter";

const AuditLogs = () => {
  const { fetchAdminAuditLog, data, loading, error } = getAdminAuditList();

  const { filteredData, searchQuery, setSearchQuery } = useFilter(
    data?.data || [],
    ["action"]
  );

  useEffect(() => {
    fetchAdminAuditLog();
  }, [fetchAdminAuditLog]);
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div>
              <HeadingSubHead
                subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
                heading="Audit Log"
                withSubHead={false}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-10">
            <div className="relative w-[400px]">
              <input
                type="text"
                placeholder="Search audit log"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
            <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
              Audit Log
            </h2>
            {loading ? (
              <Spinner spinnerSmall={true} />
            ) : error ? (
              <ErrorFetch
                message="Error fetching logs"
                onRefetch={() => fetchAdminAuditLog()}
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1300px] overflow-hidden shadow-sm ">
                  <thead className="bg-[#F9FAFB]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                    <tr>
                      <th
                        className="px-6 py-3 text-left  w-[300px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Actor
                      </th>
                      <th
                        className="px-6 py-3 text-left  w-[200px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Timestamp
                      </th>
                      <th
                        className="px-6 py-3 text-left w-[300px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Remark
                      </th>
                      <th
                        className="px-6 py-3 text-left w-[300px]"
                        style={{ paddingLeft: "1.5rem" }}
                      >
                        Description/Comment
                      </th>

                      <th
                        className="px-6 py-3 text-left  w-[50px]"
                        style={{ paddingLeft: "1.5rem" }}
                      ></th>
                    </tr>
                  </thead>
                  {filteredData?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          No Audit Found
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="text-gray-600 dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                      {filteredData?.map((data, i) => (
                        <tr
                          className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                          key={i}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                {data?.username
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <p className="text-[#2F2F33] text-sm font-medium mb-1">
                                {data?.username}
                              </p>
                            </div>
                          </td>
                          <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                            {data?.created}
                          </td>
                          <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                            {data?.action}
                          </td>
                          <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                            {data?.action}
                          </td>

                          <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                            <BsThreeDotsVertical />
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
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AuditLogs;
