"use client";
import Button from "../../common/Button";
import DashboardLayout from "../../common/DashBoardLayout";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import ModalOverlay from "../../common/modal/modal";
import Image from "next/image";
import useBoolean from "../../hooks/useBoolean";
import { getPayrollTax } from "@/stores/Tax/getPayrollTax";
import { useStore } from "zustand";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Heading from "../../common/heading";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Tax = () => {
  const {
    data: payrollTax,
    loading: payrollTaxLoading,
    error: payrollTaxError,
    updateLoading,
    fetchPayrollTax,
    updateRemittanceStatus,
  } = useStore(getPayrollTax);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState<boolean | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const employees = payrollTax?.data ?? [];
  const isAllSelected =
    employees.length > 0 && selectedIds.size === employees.length;
  const isPartiallySelected = selectedIds.size > 0 && !isAllSelected;

  const [showTaxClaculation, setShowTaxCalculation, resetTaxCalculation] =
    useBoolean(false);

  useEffect(() => {
    fetchPayrollTax();
  }, [fetchPayrollTax]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isPartiallySelected;
    }
  }, [isPartiallySelected]);

  const toggleEmployee = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(employees.map((e) => e.payslip.employee.id)));
    }
  };

  const handleUpdateStatus = async () => {
    if (newStatus === null) return;
    const success = await updateRemittanceStatus(
      Array.from(selectedIds),
      newStatus,
    );
    if (success) {
      setUpdateSuccess(true);
      setSelectedIds(new Set());
      setTimeout(() => {
        setShowUpdateModal(false);
        setUpdateSuccess(false);
        setNewStatus(null);
      }, 1800);
    }
  };

  const closeUpdateModal = () => {
    if (updateLoading) return;
    setShowUpdateModal(false);
    setNewStatus(null);
    setUpdateSuccess(false);
  };

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between">
          <Heading
            user="Tax"
            subHead="Review and export monthly payroll taxes by employee; filter by year and month."
            flexDirection="column"
          />

          <div className="flex gap-x-2">
            <Button
              className="flex items-center gap-x-1"
              variant="secondary"
              onButtonClick={setShowTaxCalculation}
            >
              Export CSV File
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
          <div className="flex justify-between items-center py-5 px-6">
            <h2 className="text-base font-semibold text-[#2F2F33]">
              Tax Breakdown
            </h2>

            <div className="flex items-center gap-2">
              <select
                className="border rounded-md px-4 py-[10px] focus:outline-none"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select year</option>
                {[2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <select
                className="border rounded-md px-4 py-[10px] focus:outline-none"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>

              <Button
                variant="primary"
                disabled={!selectedYear || !selectedMonth}
                className={`w-[100px] h-[40px] ${
                  !selectedYear || !selectedMonth
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onButtonClick={() =>
                  fetchPayrollTax(selectedMonth, selectedYear)
                }
              >
                Apply
              </Button>
            </div>
          </div>

          <div>
            {payrollTaxLoading ? (
              <div className="flex justify-center items-center h-full mt-10 pb-10">
                <Loader2 className="animate-spin" />
              </div>
            ) : payrollTaxError ? (
              <div className="flex justify-center items-center h-full mt-10 pb-10">
                <p className="text-sm text-[#2F2F33] flex items-center gap-x-2">
                  Error fetching tax data
                  <Button
                    className="flex items-center gap-x-1 text-sm"
                    variant="secondary"
                    onButtonClick={() => fetchPayrollTax()}
                  >
                    Retry
                  </Button>
                </p>
              </div>
            ) : (
              <>
                {employees.length > 0 && (
                  <div className="px-6 py-4 bg-blue-50 border-b border-[#E3E3E5]">
                    <div className="flex items-center gap-x-4">
                      <span className="text-sm font-medium text-[#2F2F33]">
                        Total Monthly Tax:
                      </span>
                      <span className="text-xl font-bold text-[#E37915]">
                        ₦ {payrollTax!.total_monthly_tax.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
                    <thead className="bg-[#F7F7F7]">
                      <tr>
                        <th className="px-6 py-[14px] w-[40px]">
                          <input
                            ref={selectAllRef}
                            type="checkbox"
                            className="rounded border-gray-300 cursor-pointer"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                            aria-label="Select all employees"
                          />
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium w-[40px] text-[#71717A]">
                          S/N
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Name{" "}
                            <span>
                              <RiExpandUpDownFill fill="#2F2F33" size={12} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Monthly Tax
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Annual Tax
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            Remitted
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                        <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                          <p className="flex gap-x-1 cursor-pointer items-center">
                            NHIS
                            <span>
                              <IoMdInformationCircle fill="#71717A" size={16} />
                            </span>
                          </p>
                        </th>
                      </tr>
                    </thead>

                    {employees.length === 0 ? (
                      <tbody>
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center py-8 text-sm text-[#71717A]"
                          >
                            No details found for the selected month
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        {employees.map((emp, i) => {
                          const empId = emp.payslip.employee.id;
                          const isSelected = selectedIds.has(empId);
                          return (
                            <tr
                              key={empId}
                              className={`border-b border-[#E3E3E5] last:border-b-0 cursor-pointer transition-colors ${
                                isSelected ? "bg-orange-50" : "hover:bg-gray-50"
                              }`}
                              onClick={() => toggleEmployee(empId)}
                            >
                              <td
                                className="px-6 py-[14px] w-[40px]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 cursor-pointer"
                                  checked={isSelected}
                                  onChange={() => toggleEmployee(empId)}
                                  aria-label={`Select ${emp.payslip.employee.fullname}`}
                                />
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                {i + 1}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium shrink-0">
                                    {emp.payslip.employee.fullname
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <span className="text-[#2F2F33] text-sm font-medium">
                                    {emp.payslip.employee.fullname}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs text-[#2F2F33] font-medium">
                                  ₦ {emp.tax_amount_monthly}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                ₦ {emp.tax_amount_yearly}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                    emp.remmited
                                      ? "bg-green-50 text-green-700"
                                      : "bg-gray-100 text-gray-500"
                                  }`}
                                >
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      emp.remmited
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}
                                  />
                                  {emp.remmited ? "Remitted" : "Pending"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-[#2F2F33]">
                                ₦ 0
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Floating bulk-action bar */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-in-out ${
            selectedIds.size > 0
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-20 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-2xl border border-[#E3E3E5] px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-[#E37915] text-white text-xs flex items-center justify-center font-bold">
                {selectedIds.size}
              </span>
              <span className="text-sm text-[#2F2F33] font-medium">
                {selectedIds.size === 1 ? "employee" : "employees"} selected
              </span>
            </div>
            <div className="w-px h-5 bg-[#E3E3E5]" />
            <button
              className="text-sm text-[#71717A] hover:text-[#2F2F33] transition-colors"
              onClick={() => setSelectedIds(new Set())}
            >
              Clear
            </button>
            <Button
              variant="primary"
              className="flex items-center gap-x-2 whitespace-nowrap"
              onButtonClick={() => setShowUpdateModal(true)}
            >
              Update Status
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-white/25 text-white text-xs font-bold">
                {selectedIds.size}
              </span>
            </Button>
          </div>
        </div>

        {/* Update Status Modal */}
        {showUpdateModal && (
          <ModalOverlay onClose={closeUpdateModal}>
            <div className="relative z-50 bg-white rounded-xl shadow-lg px-6 py-6 max-w-[440px] w-full mx-4 flex flex-col gap-5">
              {updateSuccess ? (
                <div className="flex flex-col items-center gap-3 py-6">
                  <CheckCircle2 className="text-green-500" size={52} />
                  <h3 className="text-base font-semibold text-[#2F2F33]">
                    Status Updated!
                  </h3>
                  <p className="text-sm text-[#71717A] text-center">
                    Tax remittance status has been successfully updated.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-base font-semibold text-[#2F2F33]">
                      Update Tax Payment Status
                    </h3>
                    <p className="text-sm text-[#71717A] mt-1">
                      Applying to{" "}
                      <span className="font-semibold text-[#E37915]">
                        {selectedIds.size}{" "}
                        {selectedIds.size === 1 ? "employee" : "employees"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        newStatus === true
                          ? "border-green-500 bg-green-50"
                          : "border-[#E3E3E5] hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tax-status"
                        className="mt-0.5 accent-green-500"
                        checked={newStatus === true}
                        onChange={() => setNewStatus(true)}
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2F2F33]">
                          Mark as Remitted
                        </p>
                        <p className="text-xs text-[#71717A] mt-0.5">
                          Tax has been remitted to the relevant authority
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        newStatus === false
                          ? "border-[#E37915] bg-orange-50"
                          : "border-[#E3E3E5] hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tax-status"
                        className="mt-0.5 accent-[#E37915]"
                        checked={newStatus === false}
                        onChange={() => setNewStatus(false)}
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#2F2F33]">
                          Mark as Pending
                        </p>
                        <p className="text-xs text-[#71717A] mt-0.5">
                          Tax payment is still pending remittance
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-1">
                    <Button
                      variant="secondary"
                      onButtonClick={closeUpdateModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      disabled={newStatus === null || updateLoading}
                      className={`flex items-center gap-x-2 min-w-[140px] justify-center ${
                        newStatus === null
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onButtonClick={handleUpdateStatus}
                    >
                      {updateLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        `Update ${selectedIds.size} ${
                          selectedIds.size === 1 ? "Employee" : "Employees"
                        }`
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </ModalOverlay>
        )}

        {showTaxClaculation && (
          <ModalOverlay onClose={resetTaxCalculation}>
            <div className="relative z-50 bg-white rounded-lg shadow-lg px-6 py-4 max-w-[250px] max-h-[120px] w-full flex flex-col gap-4">
              <div>
                <Image
                  src="/assets/tax.svg"
                  width={48}
                  height={48}
                  alt="tax-icon"
                  className="mx-auto"
                />
                <h6 className="text-base font-medium text-[#2F2F33] mt-4">
                  Calculating employees tax
                </h6>
              </div>
            </div>
          </ModalOverlay>
        )}
      </main>
    </DashboardLayout>
  );
};

export default Tax;
