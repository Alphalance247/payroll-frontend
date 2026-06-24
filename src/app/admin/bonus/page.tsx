"use client";
import Button from "../../common/Button";
import DashboardLayout from "../../common/DashBoardLayout";
import { useEffect, useRef, useState } from "react";
import Heading from "../../common/heading";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import NonPayslipModal from "@/app/components/Admin/Bonus/NonPayslipModal";
import PayslipModal from "@/app/components/Admin/Bonus/PayslipModal";
import DisbursementModal from "@/app/components/Admin/Bonus/diburmentModal";
import { useBonusList } from "@/app/hooks/useQueries/bonus/useBonusList";
import ErrorFetch from "@/app/common/errorFetch";
import { IoCheckmarkOutline } from "react-icons/io5";
import MultipleDisburseModal from "@/app/components/Admin/Bonus/multipleDisburseModal";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { downloadFile, generateFileName } from "@/app/utils/exportFile";
import FixedBonusModal from "@/app/components/Admin/Bonus/fixedBonusModal";
import {
  getYearsInDescendingOrder,
  getMonthsFromCurrentMonth,
  getMonthName,
} from "@/app/utils/dateOrdering";
import BonusBreakdownTab from "@/app/components/Bonus/bonus-breakdown-tab";
import QuarterlyBonus from "@/app/components/Bonus/quarterly-bonus-tab";
import { PiExport } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";

const currentYear = new Date().getFullYear().toString();
const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

const Bonus = () => {
  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBonusMenuOpen, setIsBonusMenuOpen] = useState(false);
  const bonusMenuRef = useRef<HTMLDivElement | null>(null);
  const [showPaySlipModal, setShowPayslipModal] = useState(false);
  const [showNonPaySlipModal, setShownonpayslipModal] = useState(false);
  const [showFixedBonusModal, setShowFixedBonusModal] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const actionMenuFloatingRef = useRef<HTMLDivElement | null>(null);
  const [diburseModal, setDisburseModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [includeDateRange, setIncludeDateRange] = useState(false);
  const [exportMonth, setExportMonth] = useState("");
  const [exportYear, setExportYear] = useState("");
  const [bonusType, setBonusType] = useState("");
  const [bonusTypeFilter, setBonusTypeFilter] = useState("");
  const { data, isError, error, isLoading, refetch } = useBonusList(
    filterMonth,
    filterYear,
    bonusTypeFilter,
  );
  const [btnType, setBtnType] = useState<"edit" | "add-new">("edit");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement | null>(null);
  const selectAllToolbarCheckboxRef = useRef<HTMLInputElement | null>(null);
  const rawEmployees = data?.data || [];

  const employees = rawEmployees.filter((emp) => {
    const matchesBonusType =
      !bonusTypeFilter ||
      emp?.bonus_type?.toLowerCase() === bonusTypeFilter.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      emp?.employee?.fullname
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesBonusType && matchesSearch;
  });
  const [showMultipleDisburseModal, setShowMultipleDisburseModal] =
    useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    id: "",
    name: "",
    amount: "",
  });
  const [actionMenuPosition, setActionMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [loading, setIsLoading] = useState(false);

  const yearsInDescendingOrder = getYearsInDescendingOrder();
  const monthsFromCurrent = getMonthsFromCurrentMonth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bonusMenuRef.current &&
        !bonusMenuRef.current.contains(event.target as Node)
      ) {
        setIsBonusMenuOpen(false);
      }

      const targetNode = event.target as Node;
      const clickedOutsideActionMenu =
        actionMenuRef.current &&
        !actionMenuRef.current.contains(targetNode) &&
        (!actionMenuFloatingRef.current ||
          !actionMenuFloatingRef.current.contains(targetNode));

      if (clickedOutsideActionMenu) {
        setActionMenuIndex(null);
        setActionMenuPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAllSelected =
    employees.length > 0 && selectedEmployeeIds.length === employees.length;
  const isSomeSelected =
    selectedEmployeeIds.length > 0 &&
    selectedEmployeeIds.length < employees.length;

  useEffect(() => {
    [selectAllCheckboxRef.current, selectAllToolbarCheckboxRef.current].forEach(
      (checkbox) => {
        if (checkbox) {
          checkbox.indeterminate = isSomeSelected;
        }
      },
    );
  }, [isSomeSelected]);

  const handleMultipleDisburseSuccess = () => {
    setSelectedEmployeeIds([]);
    setShowMultipleDisburseModal(false);
    refetch();
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedEmployeeIds([]);
      return;
    }
    const allIds = employees.map((emp) => emp.id).filter(Boolean);
    setSelectedEmployeeIds(allIds);
  };

  const toggleSelectEmployee = (id?: string) => {
    if (!id) return;
    setSelectedEmployeeIds((prev) =>
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id],
    );
  };

  const handleSendPayslip = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(
        `/employees/bonuses/send-bonus-payslip/${id}`,
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Payslip sent successfully");
      }
      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportBonuses = async () => {
    try {
      setIsLoading(true);
      // const idsParam = selectedEmployeeIds.join(",");
      let url = `/employees/bonuses/export-bonuses`;

      // Add export date range if selected
      if (exportMonth && exportYear) {
        url += `?month=${exportMonth}&year=${exportYear}`;
      }

      const res = await axiosInstance.get(url, {
        responseType: "blob",
      });
      if (res.status === 200 || res.status === 201) {
        const fileName = generateFileName("bonuses-export");
        downloadFile(res.data as Blob, fileName);
        toast.success("Bonuses exported successfully");
        setShowExportModal(false);
        setIncludeDateRange(false);
        setExportMonth("");
        setExportYear("");
      }
      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const [activeTab, setActiveTab] = useState("Bonus");
  const tabs = [
    { name: "Bonus" },
    { name: "Bonus breakdown" },
    { name: "Quarterly Bonus" },
  ];

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex gap-x-5 items-center border-b border-[#E4E7EC] mb-6">
          {tabs.map((el, i) => (
            <button
              className={`${
                activeTab === el.name
                  ? "text-[#E37915] border-b-[1.5px] border-[#E37915] bg-white text-sm"
                  : "text-[#71717A] border-transparent"
              }   font-semibold text-sm px-2 py-4`}
              onClick={() => setActiveTab(el.name)}
              key={i}
            >
              {el.name}
            </button>
          ))}
        </div>

        {activeTab === "Bonus" && (
          <>
            <div className="flex items-center justify-between z-0">
              <Heading
                user="Bonus"
                subHead="Review and manage employee bonuses; filter by year and month."
                flexDirection="column"
              />

              {showNonPaySlipModal && (
                <NonPayslipModal
                  onModalClose={() => setShownonpayslipModal(false)}
                  id={employeeDetails?.id}
                  btnType={btnType}
                />
              )}

              {showFixedBonusModal && (
                <FixedBonusModal
                  refetch={refetch}
                  onModalClose={() => {
                    setShowFixedBonusModal(false);
                    refetch();
                  }}
                  id={employeeDetails?.id}
                  btnType={btnType}
                />
              )}

              {diburseModal && (
                <DisbursementModal
                  employeeName={employeeDetails?.name}
                  amount={employeeDetails?.amount}
                  id={employeeDetails?.id}
                  onModalClose={() => setDisburseModal(false)}
                />
              )}

              {showPaySlipModal && (
                <PayslipModal onModalClose={() => setShowPayslipModal(false)} />
              )}

              {showMultipleDisburseModal && (
                <MultipleDisburseModal
                  onModalClose={() => setShowMultipleDisburseModal(false)}
                  onSuccess={handleMultipleDisburseSuccess}
                  bonusIds={selectedEmployeeIds}
                />
              )}

              {showExportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1300]">
                  <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
                    <h2 className="text-lg font-semibold text-[#2F2F33] mb-2">
                      Export Bonus Data
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-[#2F2F33] mb-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 cursor-pointer mr-2"
                            checked={includeDateRange}
                            onChange={(e) => {
                              setIncludeDateRange(e.target.checked);
                              if (!e.target.checked) {
                                setExportMonth("");
                                setExportYear("");
                              }
                            }}
                          />
                          Include date range (optional)
                        </label>
                      </div>

                      {includeDateRange && (
                        <div className="bg-[#F7F7F7] p-4 rounded-lg space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[#71717A] mb-1">
                              Month
                            </label>
                            <select
                              value={exportMonth}
                              onChange={(e) => setExportMonth(e.target.value)}
                              className="w-full border border-[#E3E3E5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E37915]"
                            >
                              <option value="">All months</option>
                              {monthsFromCurrent.map((month) => (
                                <option key={month.value} value={month.value}>
                                  {month.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-[#71717A] mb-1">
                              Year
                            </label>
                            <select
                              value={exportYear}
                              onChange={(e) => setExportYear(e.target.value)}
                              className="w-full border border-[#E3E3E5] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E37915]"
                            >
                              <option value="">All years</option>
                              {yearsInDescendingOrder.map((year) => (
                                <option key={year} value={String(year)}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                      <p className="text-xs text-blue-700 font-medium">
                        📋 Preview: record will be exported
                        {exportMonth && exportYear
                          ? ` for ${getMonthName(exportMonth)} ${exportYear}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowExportModal(false);
                          setIncludeDateRange(false);
                          setExportMonth("");
                          setExportYear("");
                        }}
                        className="flex-1 px-4 py-2 border border-[#E3E3E5] rounded-lg text-[#2F2F33] font-medium hover:bg-[#F7F7F7] transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleExportBonuses}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-[#E37915] text-white rounded-lg font-medium hover:bg-[#D16B0D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Exporting..." : "Export"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-x-4">
                <Button
                  variant="primaryWhite"
                  className={`flex items-center text-[#2F2F33] gap-x-2 ${employees.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onButtonClick={() => setShowExportModal(true)}
                  disabled={employees.length === 0}
                >
                  <PiExport color="#2F2F33" className="text-lg" />
                  Export bonus
                </Button>

                <div className="relative flex gap-x-2 z-30" ref={bonusMenuRef}>
                  <Button
                    className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
                    variant="primary"
                    onButtonClick={() => setIsBonusMenuOpen((prev) => !prev)}
                  >
                    <FiPlus color="#FFFFFF" className="text-lg" />
                    Add Bonus
                  </Button>

                  {isBonusMenuOpen && (
                    <div className="absolute right-0 top-12 w-72 bg-white border border-[#E3E3E5]  shadow-2xl rounded-xl overflow-hidden animate-fadeIn">
                      <div className="bg-gradient-to-r from-[#FCF2E8] via-white to-white px-4 py-3 border-b border-[#F1F1F2]">
                        <p className="text-xs uppercase tracking-wide text-[#A1A1A6] font-semibold">
                          Bonus Type
                        </p>
                        <p className="text-sm text-[#2F2F33] font-semibold">
                          Choose how to add a bonus
                        </p>
                      </div>
                      <div className="p-3 flex flex-col gap-2">
                        <button
                          className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-transparent hover:border-[#E37915] hover:bg-[#FCF2E8] transition-colors text-left"
                          onClick={() => {
                            setShownonpayslipModal(true);
                            setBtnType("add-new");
                          }}
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#2F2F33]">
                              Non payslip bonus
                            </p>
                            <p className="text-xs text-[#71717A]">
                              For discretionary bonuses outside payroll
                            </p>
                          </div>
                          <span className="text-[#E37915] font-semibold">
                            →
                          </span>
                        </button>
                        <button
                          className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-transparent hover:border-[#E37915] hover:bg-[#FCF2E8] transition-colors text-left"
                          onClick={() => setShowPayslipModal(true)}
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#2F2F33]">
                              Payslip bonus
                            </p>
                            <p className="text-xs text-[#71717A]">
                              Create a one-off bonus without payslip impact
                            </p>
                          </div>
                          <span className="text-[#E37915] font-semibold">
                            →
                          </span>
                        </button>

                        <button
                          className="flex items-center justify-between w-full px-3 py-3 rounded-lg border border-transparent hover:border-[#E37915] hover:bg-[#FCF2E8] transition-colors text-left"
                          onClick={() => {
                            setBtnType("add-new");
                            setShowFixedBonusModal(true);
                          }}
                        >
                          <div>
                            <p className="text-sm font-semibold text-[#2F2F33]">
                              Fixed bonus
                            </p>
                            <p className="text-xs text-[#71717A]">
                              For recurring bonuses that should reflect on
                              payslip
                            </p>
                          </div>
                          <span className="text-[#E37915] font-semibold">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by employee name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedEmployeeIds([]);
                  }}
                  className="pl-9 pr-4 py-[10px] border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] w-[260px]"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-x-5">
                <div className="flex items-center gap-2">
                  <div>
                    <select
                      className="border rounded-md px-4 py-[10px] focus:outline-none"
                      value={bonusTypeFilter}
                      onChange={(e) => {
                        setBonusTypeFilter(e.target.value);
                        setSelectedEmployeeIds([]);
                      }}
                    >
                      <option value="">All Bonus Types</option>
                      <option value="fixed">Fixed Bonus</option>
                      <option value="client">Non Payslip Bonus</option>
                      <option value="payslip">Payslip Bonus</option>
                    </select>
                  </div>
                  {bonusTypeFilter && (
                    <button
                      onClick={() => {
                        setBonusTypeFilter("");
                        setSelectedEmployeeIds([]);
                      }}
                      className="text-sm text-[#E37915] hover:underline font-medium"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
              </div>

              <select
                className="border rounded-md px-4 py-[10px] text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                value={filterYear}
                onChange={(e) => {
                  setFilterYear(e.target.value);
                  setSelectedEmployeeIds([]);
                }}
              >
                <option value="">Select year</option>
                {yearsInDescendingOrder.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-md px-4 py-[10px] text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                value={filterMonth}
                onChange={(e) => {
                  setFilterMonth(e.target.value);
                  setSelectedEmployeeIds([]);
                }}
              >
                <option value="">Select month</option>
                {monthsFromCurrent.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              {(filterYear !== currentYear ||
                filterMonth !== currentMonth ||
                searchQuery) && (
                <button
                  onClick={() => {
                    setFilterYear(currentYear);
                    setFilterMonth(currentMonth);
                    setSearchQuery("");
                    setSelectedEmployeeIds([]);
                  }}
                  className="text-sm text-[#E37915] hover:underline font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E37915]"></div>
                  <p className="mt-4 text-[#71717A]">Loading bonus data...</p>
                </div>
              </div>
            ) : isError ? (
              <ErrorFetch
                message={
                  error?.message || "error fetching form please try again"
                }
                onRefetch={() => refetch()}
              />
            ) : (
              <div
                className="bg-white rounded-lg border border-[#E3E3E5] mt-6 z-0 relative"
                ref={actionMenuRef}
              >
                <div>
                  <div className="flex justify-between items-center py-5 px-6 z-0 relative">
                    <h2 className="text-base font-semibold  text-[#2F2F33]">
                      Bonus
                    </h2>
                  </div>

                  <div className="py-4 px-4 flex justify-between items-center gap-x-8 border-t border-[#E3E3E5]">
                    <div className="flex items-center gap-x-4">
                      <div className="flex items-center bg-[#F7F7F7] w-fit gap-x-2 rounded-sm px-2 py-1">
                        <input
                          type="checkbox"
                          ref={selectAllToolbarCheckboxRef}
                          className="rounded w-[14px] h-[14px] border-gray-300 cursor-pointer"
                          checked={isAllSelected}
                          onChange={toggleSelectAll}
                          disabled={employees.length === 0}
                          aria-label="Select all employees"
                        />
                        <p className="text-[#2F2F33] text-sm font-medium">
                          {selectedEmployeeIds.length > 0
                            ? `${selectedEmployeeIds.length} selected`
                            : "Select employees"}
                        </p>
                      </div>

                      {selectedEmployeeIds.length > 0 && (
                        <div className="flex items-center gap-x-2">
                          <Button
                            variant="primary"
                            className="flex items-center gap-x-2"
                            onButtonClick={() =>
                              setShowMultipleDisburseModal(true)
                            }
                          >
                            <IoCheckmarkOutline
                              size={18}
                              color="#ffffff"
                              fill="#ffffff"
                            />
                            Disburse selected ({selectedEmployeeIds.length})
                          </Button>

                          <Button
                            variant="primaryWhite"
                            className="flex items-center gap-x-2"
                            onButtonClick={() => setSelectedEmployeeIds([])}
                          >
                            Clear selection
                          </Button>
                        </div>
                      )}

                      {employees.length > 0 && (
                        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-md px-3 py-2 gap-x-2">
                          <span className="text-xs font-medium text-[#2F2F33]">
                            Total Bonus:
                          </span>
                          <span className="text-sm font-semibold text-[#26547C]">
                            {data?.total_amount || "0.00"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="overflow-x-auto relative z-0"
                  style={{ overflowY: "visible" }}
                >
                  <table className="w-full min-w-[1600px] border-b border-[#E3E3E5]">
                    <thead className="bg-[#F7F7F7]">
                      <tr>
                        <th className="px-6 py-[14px] w-[40px]">
                          <input
                            type="checkbox"
                            ref={selectAllCheckboxRef}
                            className="rounded border-gray-300 cursor-pointer"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                            disabled={employees.length === 0}
                            aria-label="Select all employees"
                          />
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px] ">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Name{" "}
                            <span>
                              <RiExpandUpDownFill fill="#2F2F33" size={12} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Bonus Amount
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>

                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Bonus (Naira)
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>

                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Disburse Status
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>

                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Bonus Type
                          </p>
                        </th>

                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Approval Status
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Date Added
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Reason
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Date Paid
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                      </tr>
                    </thead>
                    {employees?.length === 0 ? (
                      <tbody>
                        <tr>
                          <td colSpan={6} className="text-center py-8">
                            No Details found for the selected month
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {employees?.map((emp, i) => {
                          const isSelected = selectedEmployeeIds.includes(
                            emp?.id,
                          );
                          return (
                            <tr
                              key={i}
                              className={`border-b border-[#E3E3E5] last:border-b-0 ${
                                isSelected ? "bg-[#FFF9F2]" : ""
                              }`}
                            >
                              <td className="px-6 py-[14px] w-[40px]">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 cursor-pointer"
                                  checked={isSelected}
                                  onChange={() => toggleSelectEmployee(emp?.id)}
                                  aria-label={`Select ${
                                    emp?.employee?.fullname || "employee"
                                  }`}
                                  disabled={emp?.paid}
                                />
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full uppercase bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                                    {emp?.employee?.fullname
                                      .split(" ")
                                      .slice(0, 2)
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <span className="text-[#2F2F33] capitalize text-sm font-medium">
                                    {emp?.employee?.fullname
                                      ?.split(" ")
                                      .slice(0, 2)
                                      .join(" ")}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-block px-3 py-1 text-xs text-[#000000] font-medium`}
                                >
                                  {emp?.pay_deno === "Dollars"
                                    ? `$ ${emp?.amount}`
                                    : `₦ ${emp?.amount}`}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-block px-3 py-1 text-xs text-[#000000] font-medium`}
                                >
                                  ₦ {emp?.naira_amount}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {emp?.paid ? (
                                  <span className="text-xs bg-[#E9F9EF] border border-[#188C43] text-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                                    disbursed
                                  </span>
                                ) : (
                                  <span className="text-xs bg-[#FFF5E5] border border-[#F6A723] text-[#B76A00] rounded-2xl capitalize w-fit px-2 py-1">
                                    not disbursed
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {emp?.bonus_type || "—"}
                              </td>

                              <td className="px-6 py-4 text-sm">
                                {emp?.approved ? (
                                  <span className="text-xs bg-[#E9F9EF] border border-[#188C43] text-[#188C43] rounded-2xl capitalize w-fit px-2 py-1">
                                    approved
                                  </span>
                                ) : (
                                  <span className="text-xs bg-[#FFF5E5] border border-[#F6A723] text-[#B76A00] rounded-2xl capitalize w-fit px-2 py-1">
                                    pending
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {emp?.created || "—"}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {emp?.reason}
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {emp?.date_paid || "—"}
                              </td>

                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                <div className="relative inline-block">
                                  <button
                                    onClick={(e) => {
                                      const isOpen = actionMenuIndex === i;
                                      setActionMenuIndex(isOpen ? null : i);
                                      setBonusType(emp?.bonus_type);

                                      if (isOpen) {
                                        setActionMenuPosition(null);
                                        return;
                                      }

                                      const rect = (
                                        e.currentTarget as HTMLElement
                                      ).getBoundingClientRect();
                                      const menuWidth = 160; // matches w-40
                                      setActionMenuPosition({
                                        top: rect.bottom + window.scrollY + 8,
                                        left:
                                          rect.right +
                                          window.scrollX -
                                          menuWidth,
                                      });
                                    }}
                                    className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
                                    aria-label="Row actions"
                                  >
                                    <BsThreeDotsVertical />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>

                {actionMenuIndex !== null && actionMenuPosition && (
                  <div
                    ref={actionMenuFloatingRef}
                    className="fixed z-[1200] w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden"
                    style={{
                      top: actionMenuPosition.top,
                      left: actionMenuPosition.left,
                    }}
                  >
                    <button
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33]  ${
                        employees[actionMenuIndex]?.paid
                          ? " cursor-not-allowed opacity-25"
                          : ""
                      } `}
                      onClick={() => {
                        const emp = employees[actionMenuIndex];
                        if (!emp) return;
                        setDisburseModal(true);
                        setEmployeeDetails((prev) => ({
                          ...prev,
                          id: emp?.id,
                          name: emp?.employee?.fullname,
                          amount: emp?.amount,
                        }));
                      }}
                      disabled={employees[actionMenuIndex]?.paid}
                    >
                      {employees[actionMenuIndex]?.paid
                        ? " ✅ dibursed"
                        : "Disburse"}
                    </button>

                    <button
                      className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] border-t border-[#E3E3E5]"
                      onClick={() => {
                        const emp = employees[actionMenuIndex];
                        if (!emp) return;

                        if (bonusType === "fixed") {
                          setShowFixedBonusModal(true);
                        } else if (bonusType === "client") {
                          setShownonpayslipModal(true);
                        } else {
                          setShowPayslipModal(true);
                        }

                        setEmployeeDetails((prev) => ({
                          ...prev,
                          id: emp?.id,
                        }));
                        setBtnType("edit");
                      }}
                    >
                      Edit{" "}
                    </button>

                    <button
                      className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33] border-t border-[#E3E3E5]"
                      onClick={() => {
                        const emp = employees[actionMenuIndex];
                        if (!emp?.id) return;
                        handleSendPayslip(emp.id);
                      }}
                    >
                      {loading ? "Sending..." : "Send payslip"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "Bonus breakdown" && <BonusBreakdownTab />}
        {activeTab === "Quarterly Bonus" && <QuarterlyBonus />}
      </main>
    </DashboardLayout>
  );
};

export default Bonus;
