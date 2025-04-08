import React from "react";
import HeadingSubHead from "@/app/common/headingSubHead";
import { InsightChart } from "../charts/insightChart";

const PayrollInsights: React.FC = () => {
  return (
    <section className="mt-10">
      <div className="border border-[#d9d9d9]  rounded-lg">
        <div className="py-[14px] px-6  border-b border-[#d9d9d9]">
          <HeadingSubHead
            withSubHead={false}
            headingClassName="text-base"
            heading="Payroll spend breakdown"
          />
        </div>

        <div className="text-center mb-8">
          <InsightChart />
        </div>
      </div>
    </section>
  );
};

export default PayrollInsights;
