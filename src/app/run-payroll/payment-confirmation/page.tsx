"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import Image from "next/image";

export default function PaymentConfirmationPage() {
  return (
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
            Salaries will be disbursed to 500 employees. You can now view
            reports or go back to manage payroll.
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
                >
                  Generate Pay slip to Slack
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
                        NGN 10,000,000
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                        Number of Employees
                      </td>
                      <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                        500
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                        Payment Method
                      </td>
                      <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                        Bank Transfer
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
                        Olivia Rhye (HR)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                        Payment Date
                      </td>
                      <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                        March 12, 2025
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                        Approved By
                      </td>
                      <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                        David Essien (Management)
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-[18px] text-sm  font-medium text-[#71717A] px-4">
                        Approval Date
                      </td>
                      <td className="py-[18px] px-4 font-medium text-base text-[#2F2F33]">
                        March 11, 2025
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-base font-medium text-left text-[#71717A] mt-4">
              Want a reminder when the next payroll is due?{" "}
            </p>
          </div>

          <div></div>
        </div>
      </main>
    </DashboardLayout>
  );
}
