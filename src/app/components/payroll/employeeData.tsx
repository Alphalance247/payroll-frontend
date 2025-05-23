"use client";
import { useState, useMemo } from "react";
import EmployeeSearch, {
  type SortOption,
  type FilterOption,
} from "../../components/payroll/employeeSearch";
import { PayrollData } from "../../utils/type";

interface PayrollSummaryProps {
  payroll: PayrollData;
}

const EmployeeDetailsTable: React.FC<PayrollSummaryProps> = ({ payroll }) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("firstName");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const currencySymbol = payroll?.rates?.find((rate) => rate.code === "NGN")
    ? "₦"
    : "K";

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    return payroll?.payslips
      .filter((emp) => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          emp.employee.fullname.toLowerCase().includes(searchLower) ||
          emp.employee.team.name.toLowerCase().includes(searchLower);

        if (filterBy === "all") return matchesSearch;
        // Add more filter conditions as needed

        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "firstName":
            return a.employee.fullname
              .split(" ")[0]
              .localeCompare(b.employee.fullname.split(" ")[0]);
          case "lastName":
            return a.employee.fullname
              .split(" ")
              .slice(-1)[0]
              .localeCompare(b.employee.fullname.split(" ").slice(-1)[0]);
          case "team":
            return a.employee.team.name.localeCompare(b.employee.team.name);
          default:
            return 0;
        }
      });
  }, [payroll?.payslips, searchQuery, sortBy, filterBy]);

  return (
    <section className="px-12">
      <EmployeeSearch
        searchQuery={searchQuery}
        sortBy={sortBy}
        filterBy={filterBy}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
        showSortByTeam={false}
        onSortChangeTeam={() => {}}
      />

      <div className="bg-white rounded-lg border border-[#E3E3E5]">
        <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
          Employees Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1700px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[400px]">
                  Name
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                  Team
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Regular Hours
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Overtime Hours
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Net Pay
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Salary (NGN/USD)
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Bonus
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Deductions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-[#E3E3E5] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {emp.employee.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium">
                        {emp.employee.fullname}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs border border-[#414D57] bg-[#E7E9EA] text-[#000000] font-medium`}
                    >
                      {emp.employee.team?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {/* {emp.regularHours.toFixed(2)} */} 6
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {/* {emp.overtimeHours.toFixed(2)} */} 7
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.net_pay?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.official_base_pay?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.employee?.pay_deno === "Dollars" ? "$ " : "₦ "}
                    {emp?.employee?.base_pay?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.bonus?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.tax?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.debt?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F7F7F7]">
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-base font-semibold text-[#2F2F33]"
                >
                  Total
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  {payroll?.total_hours}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  {payroll?.total_bonus}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦ {payroll?.total_payout.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦ {payroll?.total_salary.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  {payroll?.total_bonus}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{payroll?.total_tax?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦ {payroll?.total_debt?.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4">
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
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetailsTable;
