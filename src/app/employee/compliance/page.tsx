"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { getComplianceCardStore } from "@/stores/compliance/getComplianceCard";
import { getComplianceDetails } from "@/stores/compliance/getComplianceDetails";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useFilter } from "@/app/hooks/useFilter";

const EmployeeCompliance = () => {
  const { fetchComplianceCard, error, loading, data } =
    getComplianceCardStore();

  useEffect(() => {
    fetchComplianceCard();
  }, [fetchComplianceCard]);
  const { filteredData, setSearchQuery, searchQuery } = useFilter(data || [], [
    "title",
  ]);
  const {
    data: complianceDetails,
    error: errorDetails,
    fetchComplianceDetails,
    loading: detailsLoading,
  } = getComplianceDetails();

  useEffect(() => {
    if (data) {
      fetchComplianceDetails(data[0]?.id.toString() || "");
    }
  }, [fetchComplianceDetails, data]);

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading
            flexDirection="column"
            subHead="Keep up with company policies, standards, and regulatory updates."
            user={"Compliance"}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="relative w-[380px] mb-4">
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

              {loading ? (
                <Spinner />
              ) : error ? (
                <ErrorFetch
                  onRefetch={fetchComplianceCard}
                  message="Error Fetching compliance"
                />
              ) : (
                <>
                  {filteredData.length === 0 ? (
                    <p className="py-20 flex flex-col justify-center">
                      No compliance found
                    </p>
                  ) : (
                    <div className="flex flex-col gap-y-5">
                      {filteredData?.map((el, i) => (
                        <div
                          className="py-5 px-4 grid grid-cols-2 cursor-pointer gap-x-4 items-center bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]"
                          key={i}
                          onClick={() =>
                            fetchComplianceDetails(el?.id.toString())
                          }
                        >
                          <img
                            src={
                              el?.list_image ||
                              "/assets/employee-dashboard/compliance/pension.png"
                            }
                            width={226}
                            height={162}
                            alt="uphold"
                            className="w-full h-[162px] rounded-lg"
                          />

                          <div className="">
                            <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                              {el?.title}
                            </p>
                            <div className="text-[#71717A] leading-5 text-[13px] font-Graphik mb-2">
                              <p className="mb-2">
                                Effective: {el?.effective_date}
                              </p>
                              <p>Last Updated: {el?.updated_at}</p>
                            </div>
                            <p className="border-[#DF900A] w-fit border text-xs font-medium px-2 py-[2px] bg-[#FEF5E7] text-[#CF6E13] rounded-2xl my-2">
                              {el?.category}
                            </p>
                            <button className="text-[#E37915] font-semibold">
                              Learn More
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {data && (
              <div className="">
                <div className="py-5 px-4 grid bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px] h-[550px] overflow-y-auto">
                  {detailsLoading ? (
                    <Spinner />
                  ) : errorDetails ? (
                    <ErrorFetch
                      onRefetch={() =>
                        fetchComplianceDetails(complianceDetails?.id || "")
                      }
                      message="Error Fetching compliance"
                    />
                  ) : (
                    <>
                      <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                        {complianceDetails?.title}
                      </p>

                      <div className="text-[#71717A] leading-5 text-[13px] font-Graphik mb-2">
                        <p className="mb-2">
                          Effective Date: {complianceDetails?.effective_date}
                        </p>
                      </div>

                      <img
                        src={
                          complianceDetails?.detail_image ||
                          "/assets/employee-dashboard/compliance/2.png"
                        }
                        width={505}
                        height={253}
                        alt="uphold"
                        className="w-[full] h-[253px] rounded-lg"
                      />

                      <div className="mt-2">
                        <div className="flex gap-x-4 items-center">
                          <p className="text-[#71717A] leading-5 text-[13px] font-Graphik">
                            Last Updated: {complianceDetails?.updated_at}
                          </p>
                          <p className="border-[#DF900A] w-fit border text-xs font-medium px-2 py-[2px] bg-[#FEF5E7] text-[#CF6E13] rounded-2xl my-2">
                            {complianceDetails?.category}
                          </p>
                        </div>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: complianceDetails?.content || "",
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeCompliance;
