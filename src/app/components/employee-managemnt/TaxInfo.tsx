import { dataDetails } from "@/app/utils/type";
import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import useStatusApproval from "@/stores/employee-dashboard/settings/employeeDetails/useStatusApproval";

const TaxInfo = ({
  employeeInfo,
  refetch,
}: {
  employeeInfo: dataDetails;
  refetch: () => void;
}) => {
  const [taxStatus, setTaxStatus] = useState(
    employeeInfo?.rent_approve_status || "in review",
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { getStatusBadge } = useStatusApproval();

  const getFileTypeLabel = (fileName: string): string => {
    if (!fileName) return "";
    const ext = fileName.split(".").pop()?.toLowerCase();
    const typeMap: { [key: string]: string } = {
      pdf: "PDF",
      doc: "DOC",
      docx: "DOC",
      txt: "TXT",
      png: "IMAGE",
      jpg: "IMAGE",
      jpeg: "IMAGE",
      gif: "IMAGE",
      xlsx: "EXCEL",
      xls: "EXCEL",
    };
    return typeMap[ext || ""] || "FILE";
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value;
    setTaxStatus(newStatus);

    try {
      setIsUpdating(true);
      const response = await axiosInstance.post(
        `/employees/approve-decline-rent/${employeeInfo?.id}`,
        { status: newStatus },
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Tax information status updated successfully!");
      }
      refetch();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      setTaxStatus(employeeInfo?.rent_approve_status || "in review");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div className="p-10 rounded-lg border-[#A8A2A233] border mt-10">
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-xl text-[#4D4D4D] font-semibold">
            Tax Information
          </h4>

          {(() => {
            const statusInfo = getStatusBadge(
              employeeInfo?.rent_approve_status,
              !!employeeInfo?.rent_doc,
            );
            return (
              <div
                className={`${statusInfo.bgColor} ${statusInfo.textColor} px-4 py-2 rounded-full inline-flex items-center justify-center font-semibold text-sm w-fit`}
              >
                {statusInfo.label}
              </div>
            );
          })()}
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div>
            <p className="text-[#4D4D4D] text-sm mb-4">
              Tax Identification Number
            </p>
            <p className="text-[#4D4D4D] text-base font-medium">
              {employeeInfo?.tax_id || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[#4D4D4D] text-sm mb-4">Rent Amount</p>
            <p className="text-[#4D4D4D] text-base font-medium">
              {employeeInfo?.rent_amount
                ? `${employeeInfo?.pay_deno === "Dollars" ? "₦ " : "₦ "}${employeeInfo.rent_amount}`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-[#4D4D4D] text-sm mb-4">Rent Document</p>
            {employeeInfo?.rent_doc ? (
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 px-2 py-1 rounded text-xs font-semibold text-blue-700">
                  {getFileTypeLabel(employeeInfo.rent_doc)}
                </span>
                <a
                  href={employeeInfo.rent_doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm font-medium truncate"
                >
                  View
                </a>
              </div>
            ) : (
              <p className="text-[#999999] text-base font-medium">
                No document uploaded
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 pt-10 border-t border-[#A8A2A233]">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[#4D4D4D] text-sm mb-4">
                Update tax document status
              </p>

              {
                /* Dropdown to change tax status */
                !employeeInfo?.rent_doc ? (
                  <p>No document uploaded</p>
                ) : (
                  <select
                    value={taxStatus}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="px-4 py-2 border border-[#E3E3E5] rounded-[8px] text-[#2F2F33] font-medium bg-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>
                      Update status
                    </option>
                    <option value="declined">Reject</option>
                    <option value="approved">Approve</option>
                  </select>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInfo;
