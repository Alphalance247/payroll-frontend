import React from "react";
import HeadingSubHead from "@/app/common/headingSubHead";
import { InsightChart } from "../charts/insightChart";
import Button from "@/app/common/Button";
import { getPayrollBreakdown } from "@/stores/analytics/getPayrollBreakdown";

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
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
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
                  <option value="2032">2032</option>
                  <option value="2033">2033</option>
                  <option value="2034">2034</option>
                  <option value="2035">2035</option>
                  <option value="2036">2036</option>
                  <option value="2037">2037</option>
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
