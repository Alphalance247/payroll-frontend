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
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { IoCheckmarkOutline } from "react-icons/io5";
import MultipleDisburseModal from "@/app/components/Admin/Bonus/multipleDisburseModal";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const Bonus = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isBonusMenuOpen, setIsBonusMenuOpen] = useState(false);
  const bonusMenuRef = useRef<HTMLDivElement | null>(null);
  const [showPaySlipModal, setShowPayslipModal] = useState(false);
  const [showNonPaySlipModal, setShownonpayslipModal] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const actionMenuFloatingRef = useRef<HTMLDivElement | null>(null);
  const [diburseModal, setDisburseModal] = useState(false);
  const { data, isError, error, isLoading, refetch } = useBonusList();
  const [btnType, setBtnType] = useState<"edit" | "add-new">("edit");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const selectAllCheckboxRef = useRef<HTMLInputElement | null>(null);
  const selectAllToolbarCheckboxRef = useRef<HTMLInputElement | null>(null);
  const employees = data?.data || [];
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
      }
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
      prev.includes(id) ? prev.filter((empId) => empId !== id) : [...prev, id]
    );
  };

  const handleSendPayslip = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post(
        `/employees/bonuses/send-bonus-payslip/${id}`
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

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
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

          <div className="relative flex gap-x-2 z-30" ref={bonusMenuRef}>
            <Button
              className="flex items-center gap-x-2 shadow-sm hover:shadow-md transition-shadow"
              variant="primary"
              onButtonClick={() => setIsBonusMenuOpen((prev) => !prev)}
            >
              Add Bonus
              <span
                className={`transition-transform text-xs ${
                  isBonusMenuOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
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
                    <span className="text-[#E37915] font-semibold">→</span>
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
                    <span className="text-[#E37915] font-semibold">→</span>
                  </button>
                </div>
              </div>
            )}
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
          <div
            className="bg-white rounded-lg border border-[#E3E3E5] mt-10 z-0 relative"
            ref={actionMenuRef}
          >
            <div>
              <div className="flex justify-between items-center py-5 px-6 z-0 relative">
                <h2 className="text-base font-semibold  text-[#2F2F33]">
                  Bonus
                </h2>

                <div className="flex items-center gap-2">
                  <div>
                    <select
                      name=""
                      id=""
                      className="border rounded-md px-4 py-[10px] focus:outline-none"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="">Select year</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name=""
                      id=""
                      className="border rounded-md px-4 py-[10px] focus:outline-none"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Select Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    disabled={
                      !selectedYear ||
                      selectedYear === "" ||
                      !selectedMonth ||
                      selectedMonth === ""
                    }
                    className={`w-[100px] h-[40px] ${
                      !selectedYear ||
                      selectedYear === "" ||
                      !selectedMonth ||
                      selectedMonth === ""
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onButtonClick={() => {}}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <div className="py-4 pl-4 flex items-center gap-x-8 border-t border-[#E3E3E5]">
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
                      onButtonClick={() => setShowMultipleDisburseModal(true)}
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
              </div>
            </div>

            <div
              className="overflow-x-auto relative z-0"
              style={{ overflowY: "visible" }}
            >
              <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
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
                        Reason
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
                        Date Paid
                        <span>
                          <IoMdInformationCircle fill="#71717A" size={16} />
                        </span>
                      </p>
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]"></th>
                  </tr>
                </thead>
                {data?.data?.length === 0 ? (
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
                      const isSelected = selectedEmployeeIds.includes(emp?.id);
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
                              ₦ {emp?.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[#2F2F33]">
                            {emp?.reason}
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
                            {emp?.date_paid || "—"}
                          </td>
                          <td className="px-6 py-4 text-sm text-[#2F2F33]">
                            <div className="relative inline-block">
                              <button
                                onClick={(e) => {
                                  const isOpen = actionMenuIndex === i;
                                  setActionMenuIndex(isOpen ? null : i);

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
                                      rect.right + window.scrollX - menuWidth,
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
                    setShownonpayslipModal(true);
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
      </main>
    </DashboardLayout>
  );
};

export default Bonus;
