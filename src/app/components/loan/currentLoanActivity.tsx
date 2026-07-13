import { FaChevronDown } from "react-icons/fa";
import Button from "@/app/common/Button";
import { getLoanDetails } from "@/stores/loan/getLoanDetails";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDisburse } from "@/app/hooks/useQueries/loan-request/useDisburse";

const CurrentLoanActivity = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { data } = getLoanDetails();
  const [loading, setIsLoading] = useState(false);
  const [loadingReject, setIsLoadingReject] = useState(false);
  const { handleDisburse, disbursing: loadingDisburse } = useDisburse(() =>
    setIsOpen(false),
  );
  const loanHistoryData = data?.data;
  const requestDetails = [
    {
      label: "Date Disbursed",
      value: data?.data?.date_disburse || "Not disbursed",
    },
    {
      label: "Due Date",
      value: data?.data?.due_date || "N/A",
    },
    {
      label: "Repayment schedule",
      value: data?.data?.repayment_schedule,
    },
  ];

  const handleApproveRequest = async (status: "approved" | "not approved") => {
    const isApproving = status === "approved";
    try {
      if (isApproving) setIsLoading(true);
      else setIsLoadingReject(true);

      const res = await axiosInstance.patch(
        `/employees/loan-update-admin/${data?.data?.id}`,
        {
          status,
        },
      );

      if (res.status === 200) {
        toast.success(
          isApproving ? "Loan successfully approved" : "Loan Declined",
        );
        setIsOpen(false);
      }

      if (isApproving) setIsLoading(false);
      else setIsLoadingReject(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      if (isApproving) setIsLoading(false);
      else setIsLoadingReject(false);
    }
  };

  return (
    <div className="border-t border-[#E3E3E5] mt-6">
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] px-6 py-6">
        <span className="text-[#6F6F6F] cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        Current Loan Activity
      </h4>

      <div className="flex gap-x-6 px-6 pb-6">
        <p className="text-base font-semibold text-[#2F2F33] shrink-0">
          ₦{data?.data?.amount}
        </p>
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-normal text-[#262626]">
              Repayment Progress
            </p>
            <p className="text-sm font-semibold text-[#2F2F33]">
              {data?.data?.repayment_progress ?? 0}%
            </p>
          </div>
          <div className="bg-[#E0E0E0] h-[6px] w-full rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${data?.data?.repayment_progress ?? 0}%`,
                backgroundColor:
                  Number(data?.data?.repayment_progress) >= 100
                    ? "#198038"
                    : Number(data?.data?.repayment_progress) >= 50
                      ? "#E37915"
                      : "#26547C",
              }}
            />
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
      {loanHistoryData?.status === "pending" && (
        <div className="flex gap-x-4 mt-8 px-6 pb-8">
          <Button
            variant="secondary"
            className="w-full"
            onButtonClick={() => handleApproveRequest("not approved")}
          >
            {loadingReject ? "declining...." : "Reject Request"}
          </Button>
          <Button
            variant="primary"
            className="w-full"
            onButtonClick={() => handleApproveRequest("approved")}
          >
            {loading ? "processing...." : "Approve Request"}
          </Button>
        </div>
      )}

      {loanHistoryData?.status === "approved" &&
        loanHistoryData?.disburse === false && (
          <div className="flex gap-x-4 mt-8 px-6 pb-8">
            <Button
              variant="secondary"
              className="w-full"
              onButtonClick={() => handleApproveRequest("not approved")}
            >
              {loadingReject ? "Declining..." : "Reject Request"}
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onButtonClick={() => handleDisburse(data?.data?.id ?? "")}
            >
              {loadingDisburse ? "Disbursing..." : "Disburse Loan"}
            </Button>
          </div>
        )}
    </div>
  );
};

export default CurrentLoanActivity;
