"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import Image from "next/image";
import ProtectedRoute from "@/app/common/protectedRoute";
import { usePayrollContext } from "@/app/context/payrollContext";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function PaymentConfirmationPage() {
  const { payroll } = usePayrollContext();
  const [
    isSendPayslipToSlack,
    setIsSendPayslipToSlack,
    resetIsSendPayslipToSlack,
  ] = useBoolean(false);

  const handleSendPayslipToSlack = async () => {
    setIsSendPayslipToSlack();
    try {
      const res = await axiosInstance.get(`/employees/payslip/${payroll?.id}`);
      if (res.status === 200) {
        toast.success(`${res?.data?.message}`);
      } else {
        toast.error(
          res?.data?.message ||
            "Error sending payslip to slack please refresh or contact Admin"
        );
      }
      resetIsSendPayslipToSlack();
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      resetIsSendPayslipToSlack();
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
          {/* <ApprovalConfirmation  /> */}
          <PayrollStepper />

          <div className="mt-14 flex flex-col items-center text-center">
            <Image
              src="/assets/payroll/success.svg"
              alt="success payments"
              width={64}
              height={64}
            />
            <h2 className="text-2xl tracking-[-0.5px] font-semibold mt-6 mb-3 text-[#2F2F33]">
              Payroll Processed Successfully
            </h2>
            <p className="text-base font-medium text-[#71717A] w-[60%] mb-10">
              Salaries will be disbursed to {payroll?.payslips?.length}{" "}
              employees. You can now view reports or go back to manage payroll.
            </p>

            {/* Payroll Summary Card */}
            <div className="w-full max-w-[806px]">
              <div className=" bg-[#F7F7F7] rounded-lg border p-6">
                <div className="flex justify-between items-center mb-7">
                  <h3 className="text-lg font-semibold text-[#2F2F33] tracking-[-0.5px]">
                    Payroll Summary
                  </h3>
                  <button
                    className="px-4 py-[10px] border text-[#2F2F33] border-[#2F2F33] bg-white rounded-md hover:bg-gray-100 text-sm font-semibold"
                    type="button"
                    disabled={isSendPayslipToSlack}
                    onClick={handleSendPayslipToSlack}
                  >
                    {isSendPayslipToSlack
                      ? "Sending..."
                      : "Send Payslip to Slack"}
                  </button>
                </div>

                <div className="rounded-lg overflow-hidden border border-[#E3E3E5] bg-white">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#F7F7F7]">
                        <th className="py-[18px] px-4 font-medium text-gray-500">
                          Title
                        </th>
                        <th className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Total Paid
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          NGN {payroll?.total_payout}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Number of Employees
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.payslips?.length}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Payment Method
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.payment_method}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Bank Debited
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          0012345678 (GTBank)
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Processed By
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.run_by?.fullname}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Payment Date
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.payday}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Approved By
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.approved_by?.fullname}
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                          Approval Date
                        </td>
                        <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                          {payroll?.payday}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-base font-medium text-left text-[#71717A] mt-4">
                Want a reminder when the next payroll is due?{" "}
              </p>
              <div className="flex justify-between mt-8 pt-4 border-t border-[#E3E3E5]">
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-semibold text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                    Download Summary
                  </button>
                  <button className="px-4 py-2 text-sm text-[#2F2F33] font-semibold border border-[#E3E3E5] rounded-lg">
                    View Payroll Report
                  </button>
                </div>
                <button className="px-4 py-2 text-sm bg-[#E37915] font-semibold text-[white] border border-[#E3E3E5] rounded-lg">
                  Done
                </button>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
