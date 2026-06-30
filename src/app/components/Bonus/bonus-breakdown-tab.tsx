"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import PayrollCard from "../../common/payrollCard";
import Button from "@/app/common/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { useBonusBreakdown } from "../../hooks/useQueries/bonus/useBonusBreakdown";
import axiosInstance from "@/app/utils/axios";
import {
  getYearsInDescendingOrder,
  getMonthsFromCurrentMonth,
} from "@/app/utils/dateOrdering";

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
const formatHours = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-50 border border-green-200 text-green-700";
    case "Pending":
      return "bg-blue-50 border border-blue-200 text-blue-700";
    case "Rejected":
      return "bg-red-50 border border-red-200 text-red-700";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// const teamOptions = [
//   { value: "", label: "All Teams" },
//   { value: "engineering", label: "Engineering" },
//   { value: "design", label: "Design" },
//   { value: "marketing", label: "Marketing" },
//   { value: "sales", label: "Sales" },
// ];

// // Bonus type options
// const bonusTypeOptions = [
//   { value: "", label: "All Types" },
//   { value: "client", label: "Client" },
//   { value: "non-client", label: "Non-Client" },
// ];

const BonusBreakdownTab = () => {
  const [filters, setFilters] = useState<Filters>({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
  });
  const [tableFilters, setTableFilters] = useState({
    search: "",
    bonusType: "",
    team: "",
  });
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [statusUpdateIndex, setStatusUpdateIndex] = useState<number | null>(
    null,
  );
  const [statusDropdownPosition, setStatusDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [bulkStatusDropdown, setBulkStatusDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement)
          ?.closest("button")
          ?.classList.contains("action-button")
      ) {
        setStatusUpdateIndex(null);
        setStatusDropdownPosition(null);
      }
    };

    if (statusUpdateIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [statusUpdateIndex]);

  // Fetch bonus breakdown data
  const {
    data: bonusData,
    isLoading,
    error,
    refetch,
  } = useBonusBreakdown(filters.month, filters.year);

  // Transform API data to employee table format
  const employeeData = useMemo(() => {
    if (!bonusData?.data) return [];

    return bonusData.data.map((bonus, index) => ({
      id: bonus.id,
      sn: index + 1,
      name: bonus.employee.fullname || "Unknown Employee",
      clientHours: bonus.client_hours.toString(),
      nonClientHours: bonus.non_client_hours.toString(),
      total_hours: bonus.total_hours.toString(),
      clientBonus: bonus.client_bonus_str,
      nonClientBonus: bonus.non_client_bonus_str,
      status: (bonus.approved_state.charAt(0).toUpperCase() +
        bonus.approved_state.slice(1)) as "Pending" | "Approved" | "Rejected",
      lastDisbursed: bonus.paid ? bonus.date_paid : bonus.date_approved,
      hours_by_project: bonus.hours_by_project ?? [],
    }));
  }, [bonusData?.data]);

  const yearOptions = getYearsInDescendingOrder();
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

  const isAllSelected =
    filteredEmployees.length > 0 &&
    selectedEmployeeIds.length === filteredEmployees.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEmployeeIds([]);
      return;
    }
    const allIds = filteredEmployees.map((emp) => emp.id);
    setSelectedEmployeeIds(allIds);
  };

  const toggleSelectEmployee = (id: number) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id],
    );
  };

  const handleStatusUpdate = async (
    newStatus: "Pending" | "Approved" | "Rejected",
    employeeIds?: number[],
  ) => {
    try {
      setLoading(true);
      const ids =
        employeeIds ||
        (statusUpdateIndex !== null && employeeData[statusUpdateIndex]
          ? [employeeData[statusUpdateIndex].id]
          : []);

      if (ids.length === 0) {
        toast.error("No employee selected");
        setLoading(false);
        return;
      }

      // Map display status to API approval state
      const approvalStateMap: { [key: string]: string } = {
        Pending: "pending",
        Approved: "approved",
        Rejected: "rejected",
      };

      const approvedState = approvalStateMap[newStatus];

      // Make PATCH requests for each bonus
      const updatePromises = ids.map((bonusId) =>
        axiosInstance.patch(`/employees/bonuses/bonus/${bonusId}`, {
          approved_state: approvedState,
        }),
      );

      await Promise.all(updatePromises);

      toast.success(
        `Status updated to "${newStatus}" for ${ids.length} bonus(es)`,
      );

      // Refetch the data to get updated statuses
      await refetch();

      setStatusUpdateIndex(null);
      setStatusDropdownPosition(null);
      setBulkStatusDropdown(false);
      setSelectedEmployeeIds([]);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to update status");
      setLoading(false);
      console.log(err);
    }
  };

  const monthOptions = getMonthsFromCurrentMonth();

  // Get metrics from API data
  const metricsData: MetricsData = useMemo(() => {
    if (!bonusData?.metrics) {
      return {
        totalHoursLogged: "0h",
        clientHours: "0h",
        nonClientHours: "0h",
        totalClientBonus: "$0",
        totalNonClientBonus: "$0",
        clientBonusRate: "$0/hr",
        nonClientBonusRate: "$0/hr",
      };
    }

    const metrics = bonusData.metrics;
    return {
      totalHoursLogged: `${(metrics?.total_hours_logged).toFixed(2)}h`,
      clientHours: `${metrics.client_hours}h`,
      nonClientHours: `${metrics.non_client_hours}h`,
      totalClientBonus: `# ${metrics.total_client_bonus}`,
      totalNonClientBonus: `# ${metrics.total_non_client_bonus}`,
      clientBonusRate: `$${metrics.client_bonus_rate}/hr`,
      nonClientBonusRate: `$${metrics.non_client_bonus_rate}/hr`,
    };
  }, [bonusData?.metrics]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, year: e.target.value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, month: e.target.value });
  };

  // const getMonthLabel = (monthValue: string) => {
  //   const month = monthOptions.find((m) => m.value === monthValue);
  //   return month?.label || "";
  // };

  return (
    <main className="pb-4 md:pb-6 lg:pb-10">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E37915]"></div>
            <p className="mt-4 text-[#71717A]">Loading bonus data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium">
            Error loading bonus data. Please try again.
          </p>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !error && (
        <>
          <div className=" flex justify-between items-center ">
            <div className="mb-8">
              <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-2">
                Monthly Bonus
              </h2>
              <p className="text-base text-[#71717A] tracking-[-0.5px]">
                Manage and track employee monthly bonus calculations
              </p>
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
            <div className="">
              {/* Search Input */}

              <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by employee name..."
                    value={tableFilters.search}
                    onChange={(e) =>
                      setTableFilters({
                        ...tableFilters,
                        search: e.target.value,
                      })
                    }
                    className="w-[500px] pl-10 pr-4 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
                </div>

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

                {/* Bulk Action Toolbar */}
                {selectedEmployeeIds.length > 0 && (
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-blue-700">
                      {selectedEmployeeIds.length} selected
                    </span>
                    <div className="relative">
                      <Button
                        variant="primaryWhite"
                        className="text-xs py-1 px-2"
                        onButtonClick={() =>
                          setBulkStatusDropdown(!bulkStatusDropdown)
                        }
                      >
                        Update Status
                      </Button>
                      {bulkStatusDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden z-50">
                          <button
                            onClick={() =>
                              handleStatusUpdate("Pending", selectedEmployeeIds)
                            }
                            disabled={loading}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F7F7F7] text-[#2F2F33] disabled:opacity-50"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                "Approved",
                                selectedEmployeeIds,
                              )
                            }
                            disabled={loading}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F7F7F7] text-[#2F2F33] border-t border-[#E3E3E5] disabled:opacity-50"
                          >
                            Approved
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                "Rejected",
                                selectedEmployeeIds,
                              )
                            }
                            disabled={loading}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#F7F7F7] text-red-600 border-t border-[#E3E3E5] disabled:opacity-50"
                          >
                            Rejected
                          </button>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="primaryWhite"
                      className="text-xs py-1 px-2"
                      onButtonClick={() => setSelectedEmployeeIds([])}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-[#E3E3E5] rounded-lg">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-[#F7F7F7] border-b border-[#E3E3E5]">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33] w-[40px]">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 cursor-pointer"
                          checked={isAllSelected}
                          onChange={toggleSelectAll}
                          aria-label="Select all employees"
                        />
                      </th>
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
                        Total Hours
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                        Bonus
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                        Date Approved
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee, index) => {
                        const isSelected = selectedEmployeeIds.includes(
                          employee.id,
                        );
                        const isExpanded = expandedRowId === employee.id;
                        const hasProjects =
                          employee.hours_by_project.length > 0;
                        return (
                          <React.Fragment key={employee.id}>
                            <tr
                              className={`border-b border-[#E3E3E5] hover:bg-[#F7F7F7] transition-colors ${
                                isSelected ? "bg-[#FFF9F2]" : ""
                              } ${isExpanded ? "border-b-0" : ""}`}
                            >
                              <td className="px-6 py-4 text-sm w-[40px]">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 cursor-pointer"
                                  checked={isSelected}
                                  onChange={() =>
                                    toggleSelectEmployee(employee.id)
                                  }
                                  aria-label={`Select ${employee.name}`}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {employee.sn}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33] font-medium">
                                <button
                                  onClick={() =>
                                    hasProjects &&
                                    setExpandedRowId(
                                      isExpanded ? null : employee.id,
                                    )
                                  }
                                  className={`flex items-center gap-2 text-left ${hasProjects ? "cursor-pointer hover:text-[#E37915]" : "cursor-default"} transition-colors`}
                                >
                                  <ChevronDown
                                    size={16}
                                    className={`shrink-0 text-[#71717A] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""} ${!hasProjects ? "opacity-0" : ""}`}
                                  />
                                  {employee.name}
                                </button>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {employee.clientHours} h
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {employee.nonClientHours} h
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {employee.total_hours} h
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                ₦ {employee.clientBonus}
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
                              <td className="px-6 py-4 text-sm text-[#2F2F33] relative">
                                <button
                                  onClick={(e) => {
                                    const isOpen = statusUpdateIndex === index;
                                    setStatusUpdateIndex(isOpen ? null : index);
                                    if (isOpen) {
                                      setStatusDropdownPosition(null);
                                      return;
                                    }
                                    const rect = (
                                      e.currentTarget as HTMLElement
                                    ).getBoundingClientRect();

                                    // Calculate dropdown position with viewport awareness
                                    const dropdownWidth = 160;
                                    const dropdownHeight = 150; // approximate height
                                    let top = rect.bottom + window.scrollY + 8;
                                    let left =
                                      rect.right +
                                      window.scrollX -
                                      dropdownWidth;

                                    // Adjust if dropdown goes beyond right edge
                                    if (
                                      rect.right + dropdownWidth >
                                      window.innerWidth
                                    ) {
                                      left =
                                        rect.left +
                                        window.scrollX -
                                        dropdownWidth +
                                        16;
                                    }

                                    // Adjust if dropdown goes beyond bottom edge
                                    if (
                                      rect.bottom + dropdownHeight >
                                      window.innerHeight
                                    ) {
                                      top =
                                        rect.top +
                                        window.scrollY -
                                        dropdownHeight -
                                        8;
                                    }

                                    setStatusDropdownPosition({
                                      top,
                                      left,
                                    });
                                  }}
                                  className="p-2 rounded-full hover:bg-[#E3E3E5] transition-colors action-button"
                                  aria-label="Row actions"
                                >
                                  <BsThreeDotsVertical />
                                </button>

                                {statusUpdateIndex === index &&
                                  statusDropdownPosition && (
                                    <div
                                      ref={dropdownRef}
                                      className="fixed z-[1200] w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg"
                                      style={{
                                        top: statusDropdownPosition.top,
                                        left: statusDropdownPosition.left,
                                      }}
                                    >
                                      <button
                                        onClick={() =>
                                          handleStatusUpdate("Pending")
                                        }
                                        disabled={loading}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] disabled:opacity-50"
                                      >
                                        Pending
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleStatusUpdate("Approved")
                                        }
                                        disabled={loading}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] border-t border-[#E3E3E5] disabled:opacity-50"
                                      >
                                        Approved
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleStatusUpdate("Rejected")
                                        }
                                        disabled={loading}
                                        className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-red-600 border-t border-[#E3E3E5] disabled:opacity-50"
                                      >
                                        Rejected
                                      </button>
                                    </div>
                                  )}
                              </td>
                            </tr>
                            {isExpanded && hasProjects && (
                              <tr className="bg-[#F7F7F7] border-b border-[#E3E3E5]">
                                <td colSpan={10} className="px-6 py-0">
                                  <div className="pl-8 pr-4 py-3">
                                    <table className="w-full">
                                      <thead>
                                        <tr className="border-b border-[#E3E3E5]">
                                          <th className="py-2 text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide w-[120px]">
                                            Project Key
                                          </th>
                                          <th className="py-2 text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide">
                                            Project Name
                                          </th>
                                          <th className="py-2 text-right text-xs font-semibold text-[#71717A] uppercase tracking-wide w-[120px]">
                                            Hours Logged
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {employee.hours_by_project.map(
                                          (proj) => (
                                            <tr
                                              key={proj.project_id}
                                              className="border-b border-[#E3E3E5] last:border-0"
                                            >
                                              <td className="py-2.5 text-sm font-medium text-[#E37915]">
                                                {proj.project_key}
                                              </td>
                                              <td className="py-2.5 text-sm text-[#2F2F33]">
                                                {proj.project_name}
                                              </td>
                                              <td className="py-2.5 text-sm font-semibold text-[#2F2F33] text-right">
                                                {formatHours(proj.hours)}
                                              </td>
                                            </tr>
                                          ),
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-8 text-center">
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
          </div>
        </>
      )}
    </main>
  );
};

export default BonusBreakdownTab;
