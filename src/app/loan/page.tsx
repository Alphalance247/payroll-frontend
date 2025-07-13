"use client";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import Image from "next/image";
import { useState } from "react";
import DropDownBtn from "../common/dropDownBtn";
import { Search } from "lucide-react";
import LoanDetailsTable from "../components/loan/loanDetailsTable";
import { FiRefreshCw } from "react-icons/fi";
import ProtectedRoute from "../common/protectedRoute";

const Loan = () => {
  const cardData = [
    {
      icon: "/assets/loan/total.svg",
      label: "Total Loan Request",
      value: `10`,
    },
    {
      icon: "/assets/loan/approved.svg",
      label: "Approved Requests",
      value: "8",
    },
    {
      icon: "/assets/loan/pending.svg",
      label: "Pending Requests",
      value: "12",
    },
    {
      icon: "/assets/loan/failed.svg",
      label: "Failed Requests",
      value: `5`,
    },
  ];

  const [activeBtn, setActiveBtn] = useState<string>("All requests");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "All requests" },
    { id: 2, name: "Pending Requests" },
    { id: 3, name: "Approved Requests" },
    { id: 4, name: "Declined Requests" },
  ];

  const employeeTypeOptions = ["All", "Full Time", "Intern", "Part Time"];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
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
                  onClick={() => setActiveBtn(el.name)}
                  key={i}
                >
                  {el.name}
                </button>
              ))}
            </div>

            <div className="pb-2">
              <button className="border border-[#E3E3E5] rounded-md bg-white py-1 px-3 text-[#71717A] flex gap-x-2 items-center shadow-md">
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
                //   onSearchChange(e.target.value)
                onChange={() => {}}
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

          <div className="mt-8">
            <LoanDetailsTable />
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Loan;
