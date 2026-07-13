import { FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import { getLoanDetails } from "@/stores/loan/getLoanDetails";

const RequestDetails = () => {
  const { data } = getLoanDetails();
  const requestData = data?.data;
  const requestDetails = [
    {
      label: "Request ID",
      value: "LR-20240401-0" + requestData?.id,
    },
    {
      label: "Name",
      value: requestData?.employee,
    },
    {
      label: "Team",
      value: requestData?.team,
    },
    {
      label: "Date Requested",
      value: requestData?.due_date,
    },
    {
      label: "Loan Amount",
      value: "₦" + requestData?.amount,
    },
    {
      label: "Repayment schedule",
      value: requestData?.repayment_schedule,
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
                {requestData?.loan_to_salary_ratio !== undefined
                  ? `${Math.round(requestData.loan_to_salary_ratio * 100)}%`
                  : "--"}
                <span className="text-[#6F6F6F] text-[10px] tracking-[0.31px] ml-2">
                  {requestData?.loan_to_salary_ratio !== undefined &&
                    (requestData?.loan_to_salary_ratio < 0.5
                      ? "Low risk"
                      : "High risk")}
                </span>
              </p>
              <p
                className={`${
                  requestData?.loan_to_salary_ratio !== undefined &&
                  requestData?.loan_to_salary_ratio < 0.5
                    ? "bg-[#198038]"
                    : "bg-[#c52626]"
                } w-[81px] h-[5px] rounded-sm`}
              ></p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3  flex justify-between items-center">
          <p className="text-sm font-medium text-[#71717A]">Status</p>
          <span
            className={`text-sm font-medium border rounded-lg px-[10px] py-1 ${
              requestData?.disburse
                ? "bg-[#EBF5FF] border-[#1A73E8] text-[#1A73E8]"
                : requestData?.status === "approved"
                ? "bg-[#E9F9EF] border-[#188C43] text-[#188C43]"
                : requestData?.status === "pending"
                ? "bg-[#FFF4E5] border-[#FFA500] text-[#FFA500]"
                : "bg-[#FDEBEB] border-[#D42626] text-[#D42626]"
            }`}
          >
            {requestData?.disburse
              ? "Disbursed"
              : requestData?.status === "approved"
              ? "Approved"
              : requestData?.status === "pending"
              ? "Pending"
              : "Declined"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
