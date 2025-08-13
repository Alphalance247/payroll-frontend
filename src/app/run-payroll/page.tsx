"use client";
import DashboardLayout from "../common/DashBoardLayout";
import EmployeeDetailsTable from "../components/payroll/employeeData";
import PayrollStepper from "../components/payroll/payrollStepper";
import RunPayrollHeading from "../components/payroll/runPayrollHeading";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePayrollContext } from "../context/payrollContext";
import ProtectedRoute from "../common/protectedRoute";
import Button from "../common/Button";

export default function RunPayrollPage() {
  const { payrollD, loading, fetchPayroll } = usePayrollContext();
  const payroll = payrollD?.data;

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
          <PayrollStepper />
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {!payroll ? (
                <>
                  {payrollD?.task_id ? (
                    <div className="flex flex-col justify-center items-center h-full ">
                      <p className="text-center text-2xl font-semibold mb-2">
                        Payslips are being generated in the background.
                        <br />
                        <span className="text-gray-500 text-base">
                          Please wait a moment and click refresh below.
                        </span>
                      </p>
                      <Button
                        className="flex items-center gap-x-1 mt-4"
                        onButtonClick={() => fetchPayroll()}
                      >
                        Refresh
                      </Button>
                    </div>
                  ) : (
                    <p className="text-center text-2xl font-semibold  flex justify-center items-center py-10 text-[black]">
                      {payrollD?.message}
                    </p>
                  )}
                </>
              ) : (
                <>
                  {payroll ? (
                    <>
                      <RunPayrollHeading payroll={payroll} />
                      <EmployeeDetailsTable payroll={payroll} />
                      <div className="flex justify-between py-4 px-12">
                        <Link href="/employee-onboarding">
                          <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                            Add Employee
                          </button>
                        </Link>
                        <div className="flex items-center gap-2">
                          <button
                            className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg"
                            onClick={() => {
                              console.log("Save as Draft");
                              toast.success("Save as Draft");
                            }}
                          >
                            Save as Draft
                          </button>

                          <Link href="/run-payroll/review-approve">
                            <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
                              Next
                            </button>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full ">
                      <p className="text-center text-2xl font-semibold mb-2">
                        Payslips are being generated in the background.
                        <br />
                        <span className="text-gray-500 text-base">
                          Please wait a moment and click refresh below.
                        </span>
                      </p>
                      <Button
                        className="flex items-center gap-x-1 mt-4"
                        onButtonClick={() => fetchPayroll()}
                      >
                        Refresh
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
