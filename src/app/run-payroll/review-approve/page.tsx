'use client'
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import EmployeeDetailsTable from "../../components/payroll/employeeData";
import ReviewAndApprove from "../../components/payroll/reviewandApprove";
import Link from "next/link";
import { useState } from "react";
import SendPayrollTo from "@/app/components/payroll/sendPayrollTo";

export default function RunPayrollPage() {
    const [isOpen, setIsOpen] =useState<boolean >(false);
    const [sendpayrollAproval, setSendpayrollAproval] =useState<boolean >(false);

    const handleOpen=()=>{
        setIsOpen(true)
      }
    
      const handleClose = () => {
        setIsOpen(false);
      };

      const handleSendPayrollAproval =()=>{
        setSendpayrollAproval(true)
      }

  return (
    <DashboardLayout>

      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">

      <SendPayrollTo isOpen={isOpen} onClose={handleClose} onSend={handleSendPayrollAproval} />    

        <PayrollStepper />
      <ReviewAndApprove
      cashRequired="NGN 1,000,000"
       numberOfEmployees={40}
      employeePayday="Fri, Jan 15, 2025"
      exchangeRate="1,500"
      paymentMethod="Bank Transfer"
      bankAccount="0012345678"
      runBy="Adetunji Olaoye"
      status="Not Approved"
       />
        <EmployeeDetailsTable />

        <div className="flex justify-between py-4 px-12">
        <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
          Add Employee
        </button>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
            Save as Draft
          </button>

          <Link href="/run-payroll">
          <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
            Back
          </button>

          </Link>

          {
            sendpayrollAproval ? 
            <Link href="/run-payroll/process-payment">
            <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
            Next
          </button>
          </Link>
       
          :
          <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg" onClick={handleOpen}>
          Next
        </button>
          }
        </div>
      </div>
      </main>
    </DashboardLayout>
  );
}
