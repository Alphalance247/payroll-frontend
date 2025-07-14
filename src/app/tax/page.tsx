"use client";
import Button from "../common/Button";
import DashboardLayout from "../common/DashBoardLayout";
import HeadingSubHead from "../common/headingSubHead";
import { RiExpandUpDownFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import ModalOverlay from "../common/modal/modal";
import Image from "next/image";
import useBoolean from "../hooks/useBoolean";
import { getPayrollTax } from "@/stores/Tax/getPayrollTax";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Tax = () => {
  const {
    data: payrollTax,
    loading: payrollTaxLoading,
    fetchPayrollTax,
    error: payrollTaxError,
  } = useStore(getPayrollTax);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    fetchPayrollTax();
  }, [fetchPayrollTax]);

  console.log(payrollTax?.data);

  const [showTaxClaculation, setShowTaxCalculation, resetTaxCalculation] =
    useBoolean(false);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between">
          <HeadingSubHead heading="Tax" subHead="nill" withSubHead={false} />

          <div className="flex gap-x-2">
            <Button
              className="flex items-center gap-x-1"
              variant="secondary"
              onButtonClick={() => {
                setShowTaxCalculation();
              }}
            >
              Export CSV File
            </Button>
            <Button className="flex items-center gap-x-1">Make Payment</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
          <div className="flex justify-between items-center py-5 px-6">
            <h2 className="text-base font-semibold  text-[#2F2F33]">
              Tax Breakdown
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
                onButtonClick={() => {
                  fetchPayrollTax(selectedMonth, selectedYear);
                }}
              >
                Apply
              </Button>
            </div>
          </div>

          <div>
            {payrollTaxLoading ? (
              <div className="flex justify-center items-center h-full mt-10">
                <Loader2 className="animate-spin" />
              </div>
            ) : payrollTaxError ? (
              <div className="flex justify-center items-center h-full mt-10">
                <p className="text-sm text-[#2F2F33] flex items-center gap-x-2">
                  Error fetching tax data
                  <Button
                    className="flex items-center gap-x-1 text-sm"
                    variant="secondary"
                    onButtonClick={() => {
                      fetchPayrollTax();
                    }}
                  >
                    Retry
                  </Button>
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
                  <thead className="bg-[#F7F7F7]">
                    <tr>
                      <th className="px-6 py-[14px] text-sm font-medium w-[40px] text-[#71717A]">
                        S/N
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
                          Monthly Tax
                          <span>
                            <IoMdInformationCircle fill="#71717A" size={16} />
                          </span>
                        </p>
                      </th>
                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        <p className="flex gap-x-1 cursor-pointer items-center">
                          Annual Salary
                          <span>
                            <IoMdInformationCircle fill="#71717A" size={16} />
                          </span>
                        </p>
                      </th>

                      <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                        <p className="flex gap-x-1 cursor-pointer items-center">
                          Remmited
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
                  <tbody>
                    {payrollTax?.data?.map((emp, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#E3E3E5] last:border-b-0"
                      >
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                              {emp?.payslip?.employee?.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-[#2F2F33] text-sm font-medium">
                              {emp?.payslip?.employee?.fullname}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs text-[#000000] font-medium`}
                          >
                            ₦ {emp.tax_amount_monthly.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          ₦ {emp.tax_amount_yearly.toLocaleString()}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {" "}
                          {emp.remmited ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {" "}
                          ₦ 0
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {showTaxClaculation && (
          <ModalOverlay
            onClose={() => {
              resetTaxCalculation();
            }}
          >
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
