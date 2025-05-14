"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import ProcessPayment from "@/app/components/payroll/processPayment";
import EmployeeBankDetails from "@/app/components/payroll/EmployeeBankDetails";
import { usePayrollContext } from "@/app/context/payrollContext";
import ProtectedRoute from "@/app/common/protectedRoute";

export default function RunPayrollPage() {
  const { payroll } = usePayrollContext();
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
          {/* <ApprovalConfirmation  /> */}

          <PayrollStepper />

          {payroll && (
            <>
              <ProcessPayment
                cashRequired={payroll?.total_payout}
                dollarsAccountBalance={"30000"}
                nairaAccountBalance={"1000000"}
                approvedBy={payroll?.approved_by?.fullname}
                approvalTimestamp={payroll?.payday}
              />
              <EmployeeBankDetails payroll={payroll} />
            </>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
