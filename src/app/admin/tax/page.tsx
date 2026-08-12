"use client";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import TaxTable from "@/app/components/tax/taxTable";

const Tax = () => {
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="mb-8">
          <Heading
            user="Tax"
            subHead="Review, verify, and maintain payroll tax records for each payroll period."
            flexDirection="column"
            withGap={false}
          />
        </div>

        <TaxTable />
      </main>
    </DashboardLayout>
  );
};

export default Tax;
