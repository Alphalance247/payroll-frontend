"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import Link from "next/link";
import ProcessPayment from "@/app/components/payroll/processPayment";
import EmployeeBankDetails from "@/app/components/payroll/EmployeeBankDetails";

export default function RunPayrollPage() {
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
        {/* <ApprovalConfirmation  /> */}

        <PayrollStepper />

        <ProcessPayment />

        <EmployeeBankDetails />
      </main>
    </DashboardLayout>
  );
}
