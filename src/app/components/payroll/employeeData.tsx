"use client";
import { useState, useMemo } from "react";
import EmployeeSearch, {
  type SortOption,
  type FilterOption,
} from "../../components/payroll/employeeSearch";
import { PayrollData } from "../../utils/type";
import Button from "@/app/common/Button";
import axiosInstance from "@/app/utils/axios";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

interface PayrollSummaryProps {
  payroll: PayrollData;
}

const EmployeeDetailsTable: React.FC<PayrollSummaryProps> = ({ payroll }) => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("firstName");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const currencySymbol = payroll?.rates?.find((rate) => rate.code === "NGN")
    ? "₦"
    : "K";
  const [loadingState, setLoadingState] = useState(false);

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

  const handleExport = async () => {
    setLoadingState(true);
    try {
      const res = await axiosInstance.get(
        `employees/payroll/export-current-month`,
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
        link.download = `Payroll-Disbursement-Report-${new Date().toISOString().split("T")[0]}`; // Set filename
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
        <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
          <h2 className="text-base font-semibold  text-[#2F2F33]">
            Employees Details
          </h2>

          <Button className="w-[200px]" onButtonClick={handleExport}>
            {loadingState ? "Downloading..." : "Export CSV"}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[2300px] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[40px]">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[400px]">
                  Name
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
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Tax
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Deductions
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                  Team
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  Regular Hours
                </th>

                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                  Employee ID
                </th>

                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  Rent Amount
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  NHF
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  NHIS
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                  Pension
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
                    {currencySymbol} {emp?.tax?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.debt?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs border border-[#414D57] bg-[#E7E9EA] text-[#000000] font-medium`}
                    >
                      {emp.employee.team?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.total_hours?.toFixed(2) || "0.00"} hrs
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.employee?.employee_id}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.rent}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.nhf}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.nhis}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {currencySymbol} {emp?.pension?.toLocaleString()}
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
                  ₦ {payroll?.total_payout.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦ {payroll?.total_salary.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦{payroll?.total_tax?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ₦ {payroll?.total_debt?.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>
                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>

                <td className="px-6 py-4 text-base font-semibold text-[#2F2F33]">
                  ----
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
};

export default EmployeeDetailsTable;
