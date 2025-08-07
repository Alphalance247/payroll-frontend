"use client";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Button from "@/app/common/Button";
import { getQueryDetails } from "@/stores/request/getRequestDetails";
import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const ActionResolution = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { data: detailsData } = getQueryDetails();
  const [isLoading, setIsLoading] = useState(false);

  const handleApproveRequest = async () => {
    try {
      setIsLoading(true);
      // else setIsLoadingReject(true);

      const res = await axiosInstance.patch(
        `/employees/queries/${detailsData?.query?.id}/status`,
        { status: "Resolved" }
      );

      if (res.status === 200) {
        toast.success("Query successfully resolved");
        setIsOpen(false);
      }

      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const data1 = [
    {
      label: "Assigned To",
      value: detailsData?.query?.assigned_to,
    },

    {
      label: " Expected Resolution Date",
      value: detailsData?.query?.expected_resolution_date,
    },
  ];

  return (
    <section className="border-y border-[E3E3E5] px-6 outline-4 outline-[#E3E3E5] outline pb-6">
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] py-6">
        <span className="cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        Request Details
      </h4>

      {detailsData?.audit_logs?.length === 0 ? (
        <p className="text-center py-8">No Audit Logs found</p>
      ) : (
        <div className="flex flex-col gap-y-4">
          {detailsData?.audit_logs?.map((detail, index) => (
            <div
              key={index}
              className="py-3 flex justify-between gap-x-6 items-center"
            >
              <div>
                <p className="text-sm font-medium text-[#2F2F33] mb-1">
                  {detail?.subject}
                </p>
                <p className="text-sm font-normal text-[#71717A]">
                  {detail?.action}
                </p>
              </div>
              <p className="text-sm text-[#71717A] w-[40%]">
                {detail?.created}
              </p>
            </div>
          ))}
        </div>
      )}

      <div>
        {data1?.slice(0, 2).map((detail, index) => (
          <div key={index} className="py-3 flex justify-between items-center">
            <p className="text-sm font-medium text-[#71717A]">
              {detail?.label}
            </p>
            <p className="text-base text-[#2F2F33]"> {detail?.value}</p>
          </div>
        ))}
      </div>

      <div className="py-3">
        <h5 className="mb-4 text-sm font-medium text-[#71717A]">
          Supporting Documents
        </h5>
        <Image
          src="/assets/request/pdf.svg"
          width={321}
          height={60}
          alt="pdf"
        />
      </div>
      <div className="py-3 flex justify-between items-center">
        <p className="text-sm font-medium text-[#71717A]">Payment Method</p>
        <p className="text-base text-[#2F2F33]">
          {detailsData?.query?.payment_method}
        </p>
      </div>

      <div className="flex gap-x-4 pt-4">
        <Button variant="secondary" className="w-full">
          Cancel
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onButtonClick={() => {
            handleApproveRequest();
          }}
        >
          {isLoading ? "Resolving..." : "Mark as Resolved"}
        </Button>
      </div>
    </section>
  );
};

export default ActionResolution;
