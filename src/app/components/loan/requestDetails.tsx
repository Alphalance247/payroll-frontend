import { FaChevronDown } from "react-icons/fa6";
import Image from "next/image";

const RequestDetails = () => {
  const requestDetails = [
    {
      label: "Request ID",
      value: "LR-20240401-001",
    },
    {
      label: "Name",
      value: "Adeola Lawal",
    },
    {
      label: "Team",
      value: "Quality Assurance",
    },
    {
      label: "Date Requested",
      value: "15th Feb, 2025 ",
    },
    {
      label: "Loan Amount",
      value: "N 3,000,000",
    },
    {
      label: "Repayment schedule",
      value: "Installment",
    },
  ];
  return (
    <div>
      <div className="p-6">
        <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33]">
          <span className="cursor-pointer">
            <FaChevronDown size={20} />
          </span>{" "}
          Request Details
        </h4>
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

        <div className="px-6 py-3  flex justify-between items-center">
          <p className="text-sm font-medium text-[#71717A]">
            Loan to Salary Ratio
          </p>
          <div className="flex items-center gap-x-2">
            <Image
              src="/assets/loan/percentage.svg"
              width={24}
              height={24}
              alt="percentage"
            />
            <div>
              <p className="text-base font-normal text-[#262626]">
                {`< 50%`}{" "}
                <span className="text-[#6F6F6F] text-[10px] tracking-[0.31px]">
                  Low risk
                </span>
              </p>
              <p className="bg-[#198038] w-[81px] h-[5px] rounded-sm"></p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3  flex justify-between items-center">
          <p className="text-sm font-medium text-[#71717A]">Status</p>
          <p className="text-sm font-medium text-[#2F2F33] bg-[#E7E9EA] border border-[#414D57] rounded-lg px-[10px] py-1">
            <span className="text-[#0C1720]">Approved</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
