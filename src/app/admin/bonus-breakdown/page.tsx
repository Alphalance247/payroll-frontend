"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import PayrollCard from "../../common/payrollCard";
import Button from "@/app/common/Button";

interface MetricsData {
  totalHoursLogged: string;
  clientHours: string;
  nonClientHours: string;
  totalClientBonus: string;
  totalNonClientBonus: string;
  clientBonusRate: string;
  nonClientBonusRate: string;
}

interface Filters {
  year: string;
  month: string;
}

interface BonusEmployee {
  id: number;
  sn: number;
  name: string;
  clientHours: string;
  nonClientHours: string;
  clientBonus: string;
  nonClientBonus: string;
  status: "Disbursed" | "Pending" | "Processing";
  lastDisbursed: string;
}

// Mock employee data - will be replaced with API integration
const employeeData: BonusEmployee[] = [
  {
    id: 1,
    sn: 1,
    name: "John Doe",
    clientHours: "40",
    nonClientHours: "5",
    clientBonus: "$160",
    nonClientBonus: "$5",
    status: "Disbursed",
    lastDisbursed: "2024-02-01",
  },
  {
    id: 2,
    sn: 2,
    name: "Jane Smith",
    clientHours: "38",
    nonClientHours: "8",
    clientBonus: "$152",
    nonClientBonus: "$8",
    status: "Pending",
    lastDisbursed: "2024-01-01",
  },
  {
    id: 3,
    sn: 3,
    name: "Mike Johnson",
    clientHours: "42",
    nonClientHours: "2",
    clientBonus: "$168",
    nonClientBonus: "$2",
    status: "Processing",
    lastDisbursed: "2024-02-01",
  },
  {
    id: 4,
    sn: 4,
    name: "Sarah Williams",
    clientHours: "35",
    nonClientHours: "10",
    clientBonus: "$140",
    nonClientBonus: "$10",
    status: "Disbursed",
    lastDisbursed: "2024-01-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Disbursed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const teamOptions = [
  { value: "", label: "All Teams" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

// Bonus type options
const bonusTypeOptions = [
  { value: "", label: "All Types" },
  { value: "client", label: "Client" },
  { value: "non-client", label: "Non-Client" },
];

const MonthlyBonus = () => {
  const [filters, setFilters] = useState<Filters>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
  });
  const [tableFilters, setTableFilters] = useState({
    search: "",
    bonusType: "",
    team: "",
  });
  // Generate year options (current year and previous 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(tableFilters.search.toLowerCase());
    const matchesBonusType =
      tableFilters.bonusType === "" ||
      (tableFilters.bonusType === "client" && employee.clientHours !== "0") ||
      (tableFilters.bonusType === "non-client" &&
        employee.nonClientHours !== "0");
    const matchesTeam = tableFilters.team === "";

    return matchesSearch && matchesBonusType && matchesTeam;
  });

  // Month options
  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Mock data - will be replaced with API integration
  const metricsData: MetricsData = {
    totalHoursLogged: "4h",
    clientHours: "40h",
    nonClientHours: "0h",
    totalClientBonus: "$80",
    totalNonClientBonus: "$0",
    clientBonusRate: "$4/hr",
    nonClientBonusRate: "$1/hr",
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, year: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, month: e.target.value });
  };

  const getMonthLabel = (monthValue: string) => {
    const month = monthOptions.find((m) => m.value === monthValue);
    return month?.label || "";
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          {/* Header Section */}

          <div className=" flex justify-between items-center ">
            <div className="mb-8">
              <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-2">
                Monthly Bonus
              </h2>
              <p className="text-base text-[#71717A] tracking-[-0.5px]">
                Manage and track employee monthly bonus calculations
              </p>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="flex flex-col md:flex-row gap-4 md:items-end">
                {/* Year Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#2F2F33]">
                    Year
                  </label>
                  <div className="relative">
                    <select
                      value={filters.year}
                      onChange={handleYearChange}
                      className="appearance-none w-[160px] px-4 py-2 border border-[#E3E3E5] rounded-lg bg-white text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                  </div>
                </div>

                {/* Month Filter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#2F2F33]">
                    Month
                  </label>
                  <div className="relative">
                    <select
                      value={filters.month}
                      onChange={handleMonthChange}
                      className="appearance-none w-[160px] px-4 py-2 border border-[#E3E3E5] rounded-lg bg-white text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                    >
                      {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
                  </div>
                </div>
              </div>
              <Button className="bg-[#E37915] text-white px-4 py-2 rounded-lg hover:bg-[#C26810] transition-colors">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Current Month Metrics Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#2F2F33] mb-6">
              Current Month Metrics
            </h3>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Hours Logged */}
              <PayrollCard
                heading="Total Hours Logged"
                subhead={metricsData.totalHoursLogged}
              />

              {/* Client Hours */}
              <PayrollCard
                heading="Client Hours"
                subhead={metricsData.clientHours}
              />

              {/* Non-Client Hours */}
              <PayrollCard
                heading="Non-Client Hours"
                subhead={metricsData.nonClientHours}
              />

              {/* Total Client Bonus */}
              <PayrollCard
                heading="Total Client Bonus"
                subhead={metricsData.totalClientBonus}
              />

              {/* Total Non-Client Bonus */}
              <PayrollCard
                heading="Total Non-Client Bonus"
                subhead={metricsData.totalNonClientBonus}
              />

              {/* Client Bonus Rate */}
              <PayrollCard
                heading="Client Bonus Rate"
                subhead={metricsData.clientBonusRate}
              />

              {/* Non-Client Bonus Rate */}
              <PayrollCard
                heading="Non-Client Bonus Rate"
                subhead={metricsData.nonClientBonusRate}
              />
            </div>
          </div>

          {/* Employee Bonus Details Table Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#2F2F33] mb-6">
              Employee Bonus Details
            </h3>

            {/* Table Filters */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by employee name..."
                  value={tableFilters.search}
                  onChange={(e) =>
                    setTableFilters({ ...tableFilters, search: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              </div>

              {/* Bonus Type Filter */}
              <div className="relative w-full md:w-[200px]">
                <select
                  value={tableFilters.bonusType}
                  onChange={(e) =>
                    setTableFilters({
                      ...tableFilters,
                      bonusType: e.target.value,
                    })
                  }
                  className="appearance-none w-full px-4 py-2 border border-[#E3E3E5] rounded-lg bg-white text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                >
                  {bonusTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
              </div>

              {/* Team Filter */}
              <div className="relative w-full md:w-[200px]">
                <select
                  value={tableFilters.team}
                  onChange={(e) =>
                    setTableFilters({ ...tableFilters, team: e.target.value })
                  }
                  className="appearance-none w-full px-4 py-2 border border-[#E3E3E5] rounded-lg bg-white text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
                >
                  {teamOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A] pointer-events-none" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#E3E3E5] rounded-lg">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-[#F7F7F7] border-b border-[#E3E3E5]">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Client Hours
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Non-Client Hours
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Client Bonus
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Non-Client Bonus
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                      Last Disbursed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-b border-[#E3E3E5] hover:bg-[#F7F7F7] transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.sn}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33] font-medium">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.clientHours}h
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.nonClientHours}h
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.clientBonus}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.nonClientBonus}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              employee.status,
                            )}`}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {employee.lastDisbursed}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center">
                        <p className="text-[#71717A]">
                          No employees found matching your filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional content sections will be added here */}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MonthlyBonus;
