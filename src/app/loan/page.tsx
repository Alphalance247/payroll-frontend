"use client";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import Image from "next/image";
import { useEffect, useState } from "react";
import DropDownBtn from "../common/dropDownBtn";
import { Search } from "lucide-react";
import LoanDetailsTable from "../components/loan/loanDetailsTable";
import { FiRefreshCw } from "react-icons/fi";
import ProtectedRoute from "../common/protectedRoute";
import { getLoanRequestList } from "@/stores/loan/getLoanList";
import Spinner from "../common/spinner";
import { useFilter } from "../hooks/useFilter";

const Loan = () => {
  const { fetchLoanRequestList, data, loading } = getLoanRequestList();
  const cardData = [
    {
      icon: "/assets/loan/total.svg",
      label: "Total Loan Request",
      value: data?.loan_by_status?.total_loan || 0,
    },
    {
      icon: "/assets/loan/approved.svg",
      label: "Approved Requests",
      value: data?.loan_by_status?.approved || 0,
    },
    {
      icon: "/assets/loan/pending.svg",
      label: "Pending Requests",
      value: data?.loan_by_status?.pending || 0,
    },
    {
      icon: "/assets/loan/failed.svg",
      label: "Declined Requests",
      value: data?.loan_by_status?.["not approved"],
    },
  ];

  useEffect(() => {
    fetchLoanRequestList();
  }, [fetchLoanRequestList]);

  const [activeBtn, setActiveBtn] = useState<string>("All requests");
  const [selectedYear, setSelectedYear] = useState("");

  const { filteredData, setSearchQuery, searchQuery, setFilter } = useFilter(
    data?.data || [],
    ["employee"]
  );

  // Apply team filter using nested key:

  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All requests" },
    { id: 2, name: "Pending Requests" },
    { id: 3, name: "Approved Requests" },
    { id: 4, name: "Declined Requests" },
  ];

  useEffect(() => {
    setSearchQuery(searchQuery);
  }, [searchQuery, setSearchQuery]);

  const employeeTypeOptions = ["All", "Full Time", "Intern", "Part Time"];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading
            flexDirection="column"
            subHead="Track, review, and manage employee loan requests in one place."
            user={"Loan requests"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-[#F7F7F7] border border-[#E3E3E5] rounded-lg py-3 px-4"
              >
                <div className="flex items-start gap-x-3 space-x-3">
                  <div>
                    <Image
                      src={card.icon}
                      alt={card.label}
                      width={42}
                      height={42}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">{card.label}</p>
                    <p className="font-medium mt-1 text-[22px] text-[#2F2F33] tracking-[0.63px] leading-8">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Requests Types Tab */}
          <div className="border-b border-[#E3E3E5] mt-8 flex justify-between">
            <div className="flex gap-x-4 items-center">
              {tabs.map((el, i) => (
                <button
                  className={`${
                    activeBtn === el.name
                      ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                      : "text-[#71717A] border-transparent "
                  }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer`}
                  onClick={() => {
                    setActiveBtn(el.name);
                    if (el.name === "All requests") setFilter("status", "");
                    else if (el.name === "Approved Requests")
                      setFilter("status", "approved");
                    else if (el.name === "Pending Requests")
                      setFilter("status", "pending");
                    else if (el.name === "Declined Requests")
                      setFilter("status", "not approved");
                  }}
                  key={i}
                >
                  {el.name}
                </button>
              ))}
            </div>

            <div className="pb-2">
              <button
                className="border border-[#E3E3E5] rounded-md bg-white py-1 px-3 text-[#71717A] flex gap-x-2 items-center shadow-md"
                onClick={() => fetchLoanRequestList()}
              >
                <FiRefreshCw size={18} /> Refresh Table
              </button>
            </div>
          </div>

          <div className="flex gap-x-2 justify-between mt-5">
            <div className="relative w-[500px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>

            <DropDownBtn
              selectedValue={selectedYear}
              btnHeight="h-fit"
              subText="Year"
              onSelectOption={setSelectedYear}
              options={employeeTypeOptions}
              placeholder="2025"
            />
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className="mt-8">
              <LoanDetailsTable data={{ data: filteredData }} />
            </div>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Loan;
