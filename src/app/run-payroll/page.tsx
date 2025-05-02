'use client'
import DashboardLayout from "../common/DashBoardLayout";
import EmployeeDetailsTable from "../components/payroll/employeeData";
import PayrollStepper from "../components/payroll/payrollStepper";
import RunPayrollHeading from "../components/payroll/runPayrollHeading";
import Link from 'next/link'

export default function RunPayrollPage() {
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
        <PayrollStepper />
        <RunPayrollHeading />
        <EmployeeDetailsTable />

        <div className="flex justify-between py-4 px-12">
        <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
          Add Employee
        </button>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
            Save as Draft
          </button>
        
          <Link href="/run-payroll/review-approve">
          <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
            Next
          </button>
          </Link>
        </div>
      </div>
      </main>
    </DashboardLayout>
  );
}
