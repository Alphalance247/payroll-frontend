import React from "react";
import HeadingSubHead from "@/app/common/headingSubHead";
import { InsightChart } from "../charts/insightChart";
import Button from "@/app/common/Button";
import { getPayrollBreakdown } from "@/stores/analytics/getPayrollBreakdown";
import { getYearsInDescendingOrder } from "@/app/utils/dateOrdering";

const PayrollInsights: React.FC<{
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}> = ({ selectedYear, setSelectedYear }) => {
  const { fetchPayrollBreakdown } = getPayrollBreakdown();
  return (
    <section className="mt-10">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9]">
          <div className="flex justify-between items-center relative">
            <HeadingSubHead
              withSubHead={false}
              headingClassName="text-base"
              heading="Payroll spend breakdown"
            />

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
                  {getYearsInDescendingOrder().map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                variant="primary"
                className={`w-[100px] h-[40px] ${
                  !selectedYear || selectedYear === ""
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!selectedYear || selectedYear === ""}
                onButtonClick={() => {
                  fetchPayrollBreakdown(selectedYear);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <InsightChart />
        </div>
      </div>
    </section>
  );
};

export default PayrollInsights;
