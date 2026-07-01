"use client";
import { useState } from "react";
import HeadingSubHead from "@/app/common/headingSubHead";
import { LoanAmountsCharts } from "../charts/loanAmountChart";
import { getLoanCategory } from "@/stores/analytics/getLoanCategory";
import { type LoanCategoryData } from "@/stores/analytics/getLoanCategory";
import { getYearsInDescendingOrder } from "@/app/utils/dateOrdering";

const LoanAmounts = ({ data }: { data?: LoanCategoryData }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const { fetchLoanCategory } = getLoanCategory();

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (year) fetchLoanCategory(year);
  };

  return (
    <div className="border border-[#d9d9d9] rounded-lg mt-6">
      <div className="py-[14px] px-6 border-b border-[#d9d9d9] flex items-center justify-between">
        <div>
          <HeadingSubHead
            withSubHead={true}
            headingClassName="text-base"
            heading="Monthly loan disbursed"
            subHead="Track which type of loan is most popular."
          />
        </div>

        <select
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
          className="border border-[#E3E3E5] rounded-lg px-3 py-2 text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] bg-white"
        >
          <option value="" disabled>
            Select year
          </option>
          {getYearsInDescendingOrder().map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center mb-8">
        <LoanAmountsCharts data={data} />
      </div>
    </div>
  );
};

export default LoanAmounts;
