"use client";
import { useState, useMemo } from "react";
import EmployeeSearch, {
  type SortOption,
  type FilterOption,
  type SortByTeam,
} from "../../components/payroll/employeeSearch";
import { usePayrollHistoryDetails } from "@/app/hooks/useQueries/payroll-history/usePayrollHistoryDetails";

const PayrollHistoryTable = ({ id }: { id: string }) => {
  const { data } = usePayrollHistoryDetails({ id: id });

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("firstName");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [sortByTeam, setSortByTeam] = useState<SortByTeam>("All Teams");
  const currencySymbol = data?.data?.data?.rates?.find(
    (rate) => rate.code === "NGN",
  )
    ? "₦"
    : "$";

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    return data?.data?.data?.payslips
      .filter((emp) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          emp?.employee?.fullname.toLowerCase().includes(searchLower) ||
          emp?.employee?.team?.name.toLowerCase().includes(searchLower);

        // Always apply search filter
        if (!matchesSearch) return false;

        // If sortByTeam is "All Teams", show all employees
        if (sortByTeam === "All Teams") return true;

        // Otherwise, filter by the selected team
        return emp?.employee?.team?.name === sortByTeam;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "firstName":
            return a?.employee?.fullname
              ?.split(" ")[0]
              .localeCompare(b?.employee?.fullname?.split(" ")[0]);
          case "lastName":
            return a?.employee?.fullname
              ?.split(" ")
              .slice(-1)[0]
              .localeCompare(b?.employee?.fullname?.split(" ").slice(-1)[0]);
          case "team":
            return a?.employee?.team?.name.localeCompare(
              b?.employee?.team?.name,
            );
          default:
            return 0;
        }
      });
  }, [searchQuery, sortBy, filterBy, sortByTeam]);

  return (
    <section className="mt-20">
      {data?.data?.teams && (
        <EmployeeSearch
          searchQuery={searchQuery}
          sortBy={sortBy}
          filterBy={filterBy}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          sortByTeam={sortByTeam}
          onSortChangeTeam={setSortByTeam}
          showSortByTeam={true}
          showsortFilter={false}
          teams={data?.data?.teams}
        />
      )}

      <div className="bg-white rounded-lg border border-[#E3E3E5]">
        <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
          Employees
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[350px]">
                  Name
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[170px]">
                  Base Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[170px]">
                  Converted Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[170px]">
                  Net Pay
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Deductions
                </th>

                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Regular Hours
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Overtime
                </th>

                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees?.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-[#E3E3E5] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {emp?.employee?.fullname
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium">
                        {emp?.employee?.fullname}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.employee?.pay_deno === "Dollars" ? "$" : "₦"}{" "}
                    {emp?.employee?.base_pay}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.gross_pay}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.net_pay}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.tax}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.debt}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.main_hours || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.average_hours || "0"}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#188C43] ">
                    <span className="text-xs bg-[#E9F9EF] border border-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                      {emp?.paid ? "paid" : "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F7F7F7]">
              <tr>
                <td
                  colSpan={1}
                  className="px-6 py-4 text-base font-semibold text-[#2F2F33]"
                >
                  Total
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{data?.data?.data?.total_payout}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{data?.data?.data?.total_payout}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{data?.data?.data?.total_tax}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{data?.data?.data?.total_debt}
                </td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  {}
                </td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]"></td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-[#2F2F33]">
            <span>Show</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border border-[#E3E3E5] rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-[#2F2F33]"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-[#2F2F33]">Page {page} of 2</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="text-[#2F2F33]"
              disabled={page === 2}
            >
              Next
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PayrollHistoryTable;
