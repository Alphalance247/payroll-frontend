import { FaChevronDown } from "react-icons/fa";
import Button from "@/app/common/Button";

const CurrentLoanActivity = () => {
  const requestDetails = [
    {
      label: "Date Disbursed",
      value: "15th Feb, 2025 ",
    },
    {
      label: "Due Date",
      value: "15th Oct, 2025",
    },
    {
      label: "Repayment schedule",
      value: "Installment",
    },
  ];
  return (
    <div className="border-t border-[#E3E3E5] mt-6">
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] px-6 py-6">
        <span className="text-[#6F6F6F] cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        Current Loan Activity
      </h4>

      <div className="flex gap-x-6 px-6 pb-6">
        <p className="text-base font-semibold text-[#2F2F33]">₦3,000,000</p>
        <div className="w-full">
          <p className="text-sm font-normal text-[#262626] mb-1">70% Paid </p>
          <div className="bg-[#E0E0E0] h-[5px] w-full">
            <div className="bg-[#198038] w-[70%] h-[5px] rounded-sm"></div>
          </div>
        </div>
      </div>

      <div>
        {requestDetails.map((detail, index) => (
          <div
            key={index}
            className="px-6 py-3 flex justify-between items-center"
          >
            <p className="text-sm font-medium text-[#71717A]">{detail.label}</p>
            <p className="text-base font-normal text-[#2F2F33]">
              {detail.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-x-4 mt-8 px-6 pb-8">
        <Button variant="secondary" className="w-full">
          Cancel
        </Button>
        <Button variant="primary" className="w-full">
          Approve Request
        </Button>
      </div>
    </div>
  );
};

export default CurrentLoanActivity;
