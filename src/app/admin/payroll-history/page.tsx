"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useBonusList } from "@/app/hooks/useQueries/bonus/useBonusList";
import { RiExpandUpDownFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Search } from "lucide-react";

const PayrollHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const data = [
    {
      id: "",
    },
  ];
  const { isError, error, refetch } = useBonusList();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // if (
      //   bonusMenuRef.current &&
      //   !bonusMenuRef.current.contains(event.target as Node)
      // ) {
      //   setIsBonusMenuOpen(false);
      // }

      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActionMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
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
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px] ">
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
                        Processed By
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        Status
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                    </tr>
                  </thead>
                  {data?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={6} className="text-center py-8">
                          No Details found for the selected month
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {data?.map((emp, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#E3E3E5] last:border-b-0"
                        >
                          <td className="px-6 py-4 text-[#E37915] underline-offset-2 underline font-medium">
                            PR-2025-01-15
                          </td>
                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            Jan 1–Jan 31, 2025
                          </td>
                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            NGN 10,000,000
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            Olayiwola Adeyemi
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            <span className="text-xs bg-[#E9F9EF] border border-[#188C43] text-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                              approved
                            </span>
                          </td>

                          <td className="px-6 py-4 text-base text-[#2F2F33]">
                            <div className="relative inline-block">
                              <button
                                onClick={() =>
                                  setActionMenuIndex(
                                    actionMenuIndex === i ? null : i
                                  )
                                }
                                className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
                                aria-label="Row actions"
                              >
                                <BsThreeDotsVertical />
                              </button>

                              {actionMenuIndex === i && (
                                <div className="absolute z-40 right-0 mt-2 w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden">
                                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33]">
                                    Disburse
                                  </button>

                                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] border-t border-[#E3E3E5]">
                                    Edit{" "}
                                  </button>
                                </div>
                              )}
                            </div>
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
