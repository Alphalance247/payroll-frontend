"use client";
import Link from "next/link";
import { PayrollData } from "@/app/utils/type";

export default function EmployeeBankDetails({
  payroll,
}: {
  payroll: PayrollData;
}) {
  return (
    <section className="px-12">
      <div className="bg-white rounded-lg border border-[#E3E3E5]">
        <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
          Employees Details
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[full] border-b border-[#E3E3E5]">
            <thead className="bg-[#F7F7F7]">
              <tr>
                <th className="px-6 py-[14px] w-[10px] text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                  Name
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                  Team
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[40px]">
                  Salary
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[90px]">
                  Account Number
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[90px]">
                  Bank Name
                </th>
                <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[60px]">
                  Currency
                </th>
              </tr>
            </thead>
            <tbody>
              {payroll?.payslips.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-[#E3E3E5] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {emp?.employee?.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium">
                        {emp?.employee?.fullname}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#2F2F33] text-base">
                      {emp?.employee?.team}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    ₦ {emp?.net_pay}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp.employee?.acct_num || "3120158741"}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.employee?.bank_name || "First Bank"}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.employee?.currency || "NGN"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center py-4 px-6 gap-x-2">
          <Link href="/run-payroll/review-approve">
            <button className="px-6 py-[10px] text-sm text-[#2F2F33] font-semibold bg-[#F1F1F2] border border-[#E3E3E5] rounded-lg">
              Previous
            </button>
          </Link>
          <Link href="/run-payroll/payment-confirmation">
            <button className="px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg">
              Process Payroll
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
