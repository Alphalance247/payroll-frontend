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

const Tax = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isBonusMenuOpen, setIsBonusMenuOpen] = useState(false);
  const bonusMenuRef = useRef<HTMLDivElement | null>(null);
  const [showPaySlipModal, setShowPayslipModal] = useState(false);
  const [showNonPaySlipModal, setShownonpayslipModal] = useState(false);
  const [actionMenuIndex, setActionMenuIndex] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);
  const [diburseModal, setDisburseModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bonusMenuRef.current &&
        !bonusMenuRef.current.contains(event.target as Node)
      ) {
        setIsBonusMenuOpen(false);
      }

      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setActionMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const data = [
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
    {
      id: "",
    },
  ];

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex items-center justify-between z-0">
          <Heading
            user="Bonus"
            subHead="Review and export monthly payroll taxes by employee; filter by year and month."
            flexDirection="column"
          />

          {showNonPaySlipModal && (
            <NonPayslipModal
              onModalClose={() => setShownonpayslipModal(false)}
            />
          )}

          {diburseModal && (
            <DisbursementModal onModalClose={() => setDisburseModal(false)} />
          )}

          {showPaySlipModal && (
            <PayslipModal onModalClose={() => setShowPayslipModal(false)} />
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
                    onClick={() => setShownonpayslipModal(true)}
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

        <div
          className="bg-white rounded-lg border border-[#E3E3E5] mt-10 z-0 relative"
          ref={actionMenuRef}
        >
          <div className="flex justify-between items-center py-5 px-6 z-0 relative">
            <h2 className="text-base font-semibold  text-[#2F2F33]">Bonus</h2>

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

          <div className="overflow-x-auto relative z-0">
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
                      Bonus
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
                      Status
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
              {data?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      No Details found for the selected month
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data?.map((emp, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#E3E3E5] last:border-b-0"
                    >
                      <td className="px-6 py-4">{i + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                            {"Moshood Azeez"
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-[#2F2F33] text-sm font-medium">
                            Moshood Azeez
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs text-[#000000] font-medium`}
                        >
                          ₦ 600,000
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        Testing for payments nothing
                      </td>

                      <td className="px-6 py-4 text-sm text-[#2F2F33]">paid</td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {" "}
                        20-12-2025
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {" "}
                        20-65-2025
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setActionMenuIndex(
                                actionMenuIndex === i ? null : i
                              )
                            }
                            className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
                            aria-label="Row actions"
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {actionMenuIndex === i && (
                            <div className="absolute z-40 right-0 mt-2 w-40 bg-white border border-[#E3E3E5] shadow-lg rounded-lg overflow-hidden">
                              <button
                                className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33]"
                                onClick={() => setDisburseModal(true)}
                              >
                                Disburse
                              </button>

                              <button
                                className="w-full text-left px-4 py-3 text-sm hover:bg-[#FCF2E8] text-[#2F2F33]"
                                onClick={() => setDisburseModal(true)}
                              >
                                Edit{" "}
                              </button>
                              <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#FFF1F1] text-[#D14343] border-t border-[#E3E3E5]">
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Tax;
