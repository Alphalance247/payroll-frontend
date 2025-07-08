import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import RequestDetails from "./requestDetails";
import LoanHistory from "./loanHistory";
import CurrentLoanActivity from "./currentLoanActivity";

const LoanDetailsTable = () => {
  const filteredEmployees = [
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
    {
      id: "",
      fullname: "Moshood Azeez",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Pending Loan Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-[14px] text-start text-sm font-medium w-[200px] text-[#71717A]">
                Request ID
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[230px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Name{" "}
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Repayment Term
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Amount
                </p>
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Date Disbursed
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, i) => (
              <tr key={i} className="border-b border-[#E3E3E5] last:border-b-0">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td
                  className="px-6 py-4 text-[#2F2F33] text-base cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  LR-20240401-001
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2F2F33] text-base">
                      Adetomiwa Suulola
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#2F2F33] text-base">
                  Fixed Period
                </td>
                <td className="px-6 py-4 text-base text-[#2F2F33]">
                  ₦ 500,000
                </td>

                <td className="px-6 py-4 text-base text-[#2F2F33]">
                  {" "}
                  January 24, 2024
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                  <BsThreeDotsVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <SideDrawer
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="relative z-50  w-[620px] h-full bg-white border border-[#E3E3E5] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#E3E3E5]">
              <h2 className="text-xl font-semibold text-[#2F2F33]">
                Loan Details
              </h2>
              <LiaTimesSolid
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>

            <RequestDetails />
            <LoanHistory />
            <CurrentLoanActivity />
          </div>
        </SideDrawer>
      )}
    </div>
  );
};

export default LoanDetailsTable;
