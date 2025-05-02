"use client";
import { useState, useMemo } from "react";
import EmployeeSearch, {
  type SortOption,
  type FilterOption,
} from "../../components/payroll/employeeSearch";

interface Employee {
  id: number;
  name: string;
  team: string;
  regularHours: number;
  overtimeHours: number;
  salary: number;
  tax: number;
  deductions: number;
  miscAmount: number;
}

const TEAM_COLORS: Record<
  string,
  { backgroundColor: string; textColor: string }
> = {
  "Design & Development": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  Advocate: { backgroundColor: "#DFF4F2", textColor: "#0C1720" },
  Cloud: { backgroundColor: "#F6D5B6", textColor: "#5F3309" },
  Legal: { backgroundColor: "#E9FAFF", textColor: "#0ECDFF" },
  Domestic: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  ITSM: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  "Product Office": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  "Artificial Intelligence": {
    backgroundColor: "#E7E9EA",
    textColor: "#0C1720",
  },
  "Quality Assurance": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  DEVOPS: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
};

const DUMMY_EMPLOYEES: Employee[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: idx + 1,
    name: "Lanre Ademoye",
    team: [
      "Design & Development",
      "Advocate",
      "Cloud",
      "Legal",
      "Domestic",
      "ITSM",
      "Product Office",
      "Artificial Intelligence",
      "Quality Assurance",
      "DEVOPS",
    ][idx],
    regularHours: 100,
    overtimeHours: 100,
    salary: 500_000,
    tax: 500_000,
    deductions: 100,
    miscAmount: 100,
  })
);

export default function EmployeeDetailsTable() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("firstName");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    return DUMMY_EMPLOYEES.filter((emp) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        emp.name.toLowerCase().includes(searchLower) ||
        emp.team.toLowerCase().includes(searchLower);

      if (filterBy === "all") return matchesSearch;
      // Add more filter conditions as needed

      return matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "firstName":
          return a.name.split(" ")[0].localeCompare(b.name.split(" ")[0]);
        case "lastName":
          return a.name
            .split(" ")
            .slice(-1)[0]
            .localeCompare(b.name.split(" ").slice(-1)[0]);
        case "team":
          return a.team.localeCompare(b.team);
        default:
          return 0;
      }
    });
  }, [DUMMY_EMPLOYEES, searchQuery, sortBy, filterBy]);

  // Calculate totals
  const totals = DUMMY_EMPLOYEES.reduce(
    (acc, e) => {
      acc.regularHours += e.regularHours;
      acc.overtimeHours += e.overtimeHours;
      acc.salary += e.salary;
      acc.tax += e.tax;
      acc.deductions += e.deductions;
      acc.miscAmount += e.miscAmount;
      return acc;
    },
    {
      regularHours: 0,
      overtimeHours: 0,
      salary: 0,
      tax: 0,
      deductions: 0,
      miscAmount: 0,
    }
  );

  return (
    <section className="px-12">
      <EmployeeSearch
        searchQuery={searchQuery}
        sortBy={sortBy}
        filterBy={filterBy}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        onFilterChange={setFilterBy}
      />

      <div className="bg-white rounded-lg border border-[#E3E3E5]">
        <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
          Employees Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
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
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Deductions
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Misc. Amount
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
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium">
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor:
                          TEAM_COLORS[emp.team]?.backgroundColor || "#F9FAFB",
                        color: TEAM_COLORS[emp.team]?.textColor || "#000000",
                      }}
                    >
                      {emp.team}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp.regularHours.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp.overtimeHours.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    ₦{emp.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    ₦{emp.tax.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    ₦{emp.deductions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    ₦{emp.miscAmount.toLocaleString()}
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
                  {totals.regularHours.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  {totals.overtimeHours.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{totals.salary.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{totals.tax.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{totals.deductions.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{totals.miscAmount.toLocaleString()}
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
}
