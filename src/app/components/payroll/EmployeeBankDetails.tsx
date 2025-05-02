"use client";
import { useState } from "react";
import Link from "next/link";

interface Employee {
  id: number;
  name: string;
  team: string;
  salary: string;
  accountNumber: number;
  overtimeHours: number;
  bankName: string;
  currency: string;
}

const TEAM_COLORS: Record<
  string,
  { backgroundColor: string; textColor: string }
> = {
  "Design & Development": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  Advocate: { backgroundColor: "#DFF4F2", textColor: "#0C1720" },
  Cloud: { backgroundColor: "#F6D5B6", textColor: "#5F3309" },
  Legal: { backgroundColor: "#E9FAFF", textColor: "#0ECDFF" },
  Domestic: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  ITSM: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  "Product Office": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  "Artificial Intelligence": {
    backgroundColor: "#E7E9EA",
    textColor: "#0C1720",
  },
  "Quality Assurance": { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
  DEVOPS: { backgroundColor: "#E7E9EA", textColor: "#0C1720" },
};

const DUMMY_EMPLOYEES: Employee[] = Array.from({ length: 10 }).map(
  (_, idx) => ({
    id: idx + 1,
    name: "Lanre Ademoye",
    team: [
      "Design & Development",
      "Advocate",
      "Cloud",
      "Legal",
      "Domestic",
      "ITSM",
      "Product Office",
      "Artificial Intelligence",
      "Quality Assurance",
      "DEVOPS",
    ][idx],
    accountNumber: 123456789,
    overtimeHours: 100,
    salary: [
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
      "500,000",
    ][idx],
    bankName: "First Bank",
    currency: "NGN",
  })
);

export default function EmployeeBankDetails() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

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
              {DUMMY_EMPLOYEES.map((emp) => (
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
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium">
                        {emp.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#2F2F33] text-base">{emp.team}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.salary}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp.accountNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.bankName}
                  </td>

                  <td className="px-6 py-4 text-sm text-[#2F2F33]">
                    {emp?.currency}
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
          <Link href="/run-payroll/process-payment">
            <button className="px-6 py-[10px] text-sm text-white font-semibold bg-[#E37915] rounded-lg">
              Process Payroll
            </button>
          </Link>
        </div>

        {/* <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-[#2F2F33]">
            <span>Show</span>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border border-[#E3E3E5] rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-[#2F2F33]"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-[#2F2F33]">Page {page} of 2</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="text-[#2F2F33]"
              disabled={page === 2}
            >
              Next
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
