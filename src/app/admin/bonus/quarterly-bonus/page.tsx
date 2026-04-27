"use client";
import ProtectedRoute from "../../../common/protectedRoute";
import DashboardLayout from "../../../common/DashBoardLayout";
import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import Button from "@/app/common/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import OverviewCard from "@/app/common/employee-dashboard/common/overviewCard";
import { useQuarterlyBonus } from "@/app/hooks/useQueries/bonus/useQuarterlyBonus";

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

const teamOptions = [
  { value: "", label: "All Teams" },
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

const MonthlyBonus = () => {
  const [tableFilters, setTableFilters] = useState({
    search: "",
    bonusType: "",
    team: "",
  });
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);
  const [actionIndex, setActionIndex] = useState<number | null>(null);
  const [actionDropdownPosition, setActionDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [bulkActionDropdown, setBulkActionDropdown] = useState(false);
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
        setActionIndex(null);
        setActionDropdownPosition(null);
      }
    };

    if (actionIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [actionIndex]);

  const { data: bonusData, isLoading, error, refetch } = useQuarterlyBonus();

  // Transform API data to employee table format
  const employeeData = useMemo(() => {
    if (!bonusData?.data) return [];

    return bonusData.data.map((bonus, index) => ({
      id: bonus.id,
      sn: index + 1,
      name: bonus.employee.fullname || "Unknown Employee",
      amount: bonus.amount,
      status: (bonus.approved_state.charAt(0).toUpperCase() +
        bonus.approved_state.slice(1)) as "Pending" | "Approved" | "Rejected",
      period: bonus.period,
      lastDisbursed: bonus.paid,
    }));
  }, [bonusData?.data]);

  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(tableFilters.search.toLowerCase());

    return matchesSearch;
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
        (actionIndex !== null && employeeData[actionIndex]
          ? [employeeData[actionIndex].id]
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
        axiosInstance.patch(`/employees/quarterly-bonus-split/${bonusId}`, {
          approved_state: approvedState,
        }),
      );

      await Promise.all(updatePromises);

      toast.success(
        `Status updated to "${newStatus}" for ${ids.length} bonus(es)`,
      );

      // Refetch the data to get updated statuses
      await refetch();

      setActionIndex(null);
      setActionDropdownPosition(null);
      setBulkActionDropdown(false);
      setSelectedEmployeeIds([]);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to update status");
      setLoading(false);
      console.log(err);
    }
  };

  const handleDisbursement = async (employeeIds?: number[]) => {
    try {
      setLoading(true);
      const ids =
        employeeIds ||
        (actionIndex !== null && employeeData[actionIndex]
          ? [employeeData[actionIndex].id]
          : []);

      if (ids.length === 0) {
        toast.error("No employee selected");
        setLoading(false);
        return;
      }

      // Validate all selected bonuses are approved
      const selectedBonuses = employeeData.filter((emp) =>
        ids.includes(emp.id),
      );

      const allApproved = selectedBonuses.every(
        (bonus) => bonus.status === "Approved",
      );

      if (!allApproved) {
        toast.error("Only approved bonuses can be disbursed");
        setLoading(false);
        return;
      }

      // Make PATCH requests for each bonus to mark as paid
      const disbursePromises = ids.map((bonusId) =>
        axiosInstance.post(
          `/employees/bonuses/disburse-quarterly-bonus/${bonusId}`,
          {
            paid: true,
          },
        ),
      );

      await Promise.all(disbursePromises);

      toast.success(`Disbursement processed for ${ids.length} bonus(es)`);

      // Refetch the data to get updated disbursement status
      await refetch();

      setActionIndex(null);
      setActionDropdownPosition(null);
      setBulkActionDropdown(false);
      setSelectedEmployeeIds([]);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to process disbursement");
      setLoading(false);
      console.log(err);
    }
  };

  // Check if any selected employees are approved
  const anyApprovedSelected = selectedEmployeeIds.some((id) => {
    const employee = employeeData.find((emp) => emp.id === id);
    return employee?.status === "Approved";
  });

  const cardData = [
    {
      label: "Total Amount",
      value: bonusData?.total_amount.toLocaleString() || "0",
      icon: "/assets/payroll/1.svg",
    },
    {
      label: "Total Employees",
      value: bonusData?.data.length.toString() || "0",
      icon: "/assets/payroll/2.svg",
    },
    {
      label: "Quarter",
      value: "0",
      icon: "/assets/payroll/3.svg",
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
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
                <div className="mb-0">
                  <h2 className="text-[28px] text-[#2F2F33] font-semibold tracking-[-0.5px] mb-2">
                    Quarterly Bonus
                  </h2>
                  <p className="text-base text-[#71717A] tracking-[-0.5px]">
                    Review and manage quarterly bonuses for employees. Approve,
                    reject, or disburse bonuses based on performance and
                    eligibility.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-8">
                {cardData.map((card, index) => (
                  <OverviewCard
                    key={index}
                    image={card?.icon}
                    label={card?.label}
                    value={card?.value}
                  />
                ))}
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
                    <div className="relative flex-1">
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
                        className="w-full pl-10 pr-4 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
                    </div>

                    <div className="relative w-full md:w-[200px]">
                      <select
                        value={tableFilters.team}
                        onChange={(e) =>
                          setTableFilters({
                            ...tableFilters,
                            team: e.target.value,
                          })
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

                    {/* Bulk Action Toolbar */}
                    {selectedEmployeeIds.length > 0 && (
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex-wrap">
                        <span className="text-xs font-medium text-blue-700">
                          {selectedEmployeeIds.length} selected
                        </span>
                        <div className="relative">
                          <Button
                            variant="primaryWhite"
                            className="text-xs py-1 px-2"
                            onButtonClick={() =>
                              setBulkActionDropdown(!bulkActionDropdown)
                            }
                          >
                            Update Status
                          </Button>
                          {bulkActionDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden z-50">
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    "Pending",
                                    selectedEmployeeIds,
                                  )
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
                          onButtonClick={() =>
                            handleDisbursement(selectedEmployeeIds)
                          }
                          disabled={loading || !anyApprovedSelected}
                          // title={
                          //   anyApprovedSelected
                          //     ? "Disburse approved bonuses"
                          //     : "Select approved bonuses to disburse"
                          // }
                        >
                          Disburse
                        </Button>
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
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                            Paid
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                            Quarter
                          </th>

                          <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                            Approval Status
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-[#2F2F33]">
                            Last Disbursed
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
                            return (
                              <tr
                                key={employee.id}
                                className={`border-b border-[#E3E3E5] hover:bg-[#F7F7F7] transition-colors ${
                                  isSelected ? "bg-[#FFF9F2]" : ""
                                }`}
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
                                  {employee.name}
                                </td>

                                <td className="px-6 py-4 text-sm text-[#2F2F33] font-medium">
                                  {employee?.amount
                                    ? `₦ ${employee?.amount.toLocaleString()}`
                                    : "N/A"}
                                </td>

                                <td className="px-6 py-4 text-sm">
                                  {employee?.lastDisbursed ? (
                                    <span className="text-xs bg-[#E9F9EF] border border-[#188C43] text-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                                      disbursed
                                    </span>
                                  ) : (
                                    <span className="text-xs bg-[#FFF5E5] border border-[#F6A723] text-[#B76A00] rounded-2xl capitalize w-fit px-2 py-1">
                                      not disbursed
                                    </span>
                                  )}
                                </td>

                                <td className="px-6 py-4 text-sm text-[#2F2F33] font-medium">
                                  {employee?.period || "N/A"}
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

                                <td className="px-6 py-4 text-sm text-[#2F2F33] relative">
                                  <button
                                    onClick={(e) => {
                                      const isOpen = actionIndex === index;
                                      setActionIndex(isOpen ? null : index);
                                      if (isOpen) {
                                        setActionDropdownPosition(null);
                                        return;
                                      }
                                      const rect = (
                                        e.currentTarget as HTMLElement
                                      ).getBoundingClientRect();

                                      // Calculate dropdown position with viewport awareness
                                      const dropdownWidth = 160;
                                      const dropdownHeight = 180; // approximate height
                                      let top =
                                        rect.bottom + window.scrollY + 8;
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

                                      setActionDropdownPosition({
                                        top,
                                        left,
                                      });
                                    }}
                                    className="p-2 rounded-full hover:bg-[#E3E3E5] transition-colors action-button"
                                    aria-label="Row actions"
                                  >
                                    <BsThreeDotsVertical />
                                  </button>

                                  {actionIndex === index &&
                                    actionDropdownPosition && (
                                      <div
                                        ref={dropdownRef}
                                        className="fixed z-[1200] w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden"
                                        style={{
                                          top: actionDropdownPosition.top,
                                          left: actionDropdownPosition.left,
                                        }}
                                      >
                                        {/* Status Update Section */}
                                        <div className="border-b border-[#E3E3E5]">
                                          <p className="px-4 py-2 text-xs font-semibold text-[#71717A] bg-[#F7F7F7]">
                                            Change Status
                                          </p>
                                          <button
                                            onClick={() => {
                                              handleStatusUpdate("Pending");
                                            }}
                                            disabled={loading}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] disabled:opacity-50"
                                          >
                                            Pending
                                          </button>
                                          <button
                                            onClick={() => {
                                              handleStatusUpdate("Approved");
                                            }}
                                            disabled={loading}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#FCF2E8] text-green-600 border-t border-[#E3E3E5] disabled:opacity-50 font-medium"
                                          >
                                            Approved
                                          </button>
                                          <button
                                            onClick={() => {
                                              handleStatusUpdate("Rejected");
                                            }}
                                            disabled={loading}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-[#FCF2E8] text-red-600 border-t border-[#E3E3E5] disabled:opacity-50"
                                          >
                                            Rejected
                                          </button>
                                        </div>

                                        {/* Disbursement Section */}
                                        <button
                                          onClick={() => {
                                            handleDisbursement();
                                          }}
                                          disabled={
                                            loading ||
                                            employee.status !== "Approved"
                                          }
                                          title={
                                            employee.status !== "Approved"
                                              ? "Only approved bonuses can be disbursed"
                                              : "Process disbursement"
                                          }
                                          className={`w-full text-left px-4 py-3 text-sm font-medium border-t border-[#E3E3E5] ${
                                            employee.status === "Approved"
                                              ? "hover:bg-[#FCF2E8] text-[#E37915] disabled:opacity-50"
                                              : "text-[#71717A] bg-[#F7F7F7] cursor-not-allowed opacity-50"
                                          }`}
                                        >
                                          💰 Disburse Bonus
                                        </button>
                                      </div>
                                    )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={10} className="px-6 py-8 text-center">
                              <p className="text-[#71717A]">
                                No employees added to the bonus list yet
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
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default MonthlyBonus;
