"use client";
import DashboardLayout from "../common/DashBoardLayout";
import EmployeeDetailsTable from "../components/payroll/employeeData";
import PayrollStepper from "../components/payroll/payrollStepper";
import RunPayrollHeading from "../components/payroll/runPayrollHeading";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePayrollContext } from "../context/payrollContext";

export default function RunPayrollPage() {
  const { payroll, loading } = usePayrollContext();

  // useEffect(() => {
  //   async function fetchEmployees() {
  //     try {
  //       const res = await getRequest<payslipData[]>(
  //         "/api/employees/generate-payroll"
  //       );
  //       console.log("Employee API data:", res.message, res);
  //       if (!res) {
  //         toast.error("No data found");
  //       }

  //       if (res.data) {
  //         setPayslipData(res.data);
  //         toast.success("Payroll data loaded");
  //         setIsLoading(false);
  //       } else if (res.taskId) {
  //         toast.success("Payroll is being prepared...");
  //         pollTaskStatus(res.taskId);
  //       } else {
  //         toast.error(res.message || "Unexpected response");
  //       }
  //     } catch (err: any) {
  //       const message =
  //         err?.response?.data?.message || "Error fetching payslip data";
  //       toast.error(message);
  //     }
  //   }
  //   fetchEmployees();
  // }, []);

  // async function pollTaskStatus(taskId: string, retries = 20, delay = 3000) {
  //   for (let i = 0; i < retries; i++) {
  //     try {
  //       const statusRes = await getRequest<payslipData[]>(
  //         `/api/employees/task-status/${taskId}`
  //       );

  //       if (statusRes.data) {
  //         setPayslipData(statusRes.data);
  //         toast.success("Payroll data is ready");
  //         setIsLoading(false);
  //         return;
  //       }

  //       await new Promise((res) => setTimeout(res, delay));
  //     } catch (error) {
  //       toast.error("Error checking task status");
  //       console.error(error);
  //       setIsLoading(false);
  //       return;
  //     }
  //   }

  //   toast.error("Payroll generation timed out");
  //   setIsLoading(false);
  // }

  console.log(payroll);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
        <PayrollStepper />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {payroll ? (
              <>
                <RunPayrollHeading payroll={payroll} />
                <EmployeeDetailsTable payroll={payroll} />
                <div className="flex justify-between py-4 px-12">
                  <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                    Add Employee
                  </button>
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
              <p className="text-center text-2xl font-semibold flex-col flex justify-center">
                No data found please refresh the page or contact support
              </p>
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
}
