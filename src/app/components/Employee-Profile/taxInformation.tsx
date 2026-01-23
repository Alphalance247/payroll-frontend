import React from "react";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";

interface NOKProps {
  // children: any;
  title: string;
  children?: React.ReactNode;
}

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

const getStatusBadge = (
  status: string | undefined,
  hasDocument: boolean,
): { label: string; bgColor: string; textColor: string } => {
  // If no document uploaded yet
  if (!hasDocument) {
    return {
      label: "Pending",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
    };
  }

  // If document uploaded but not approved
  if (status === "in review") {
    return {
      label: "In Review",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    };
  }

  // If approved
  if (status === "approve" || status === "approved") {
    return {
      label: "Approved",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    };
  }

  // Default fallback
  return {
    label: status || "N/A",
    bgColor: "bg-gray-100",
    textColor: "text-gray-700",
  };
};

const TaxInformation = ({ title, children }: NOKProps) => {
  const { employeeData, loading, error, fetchPersonalDetails } =
    UseEmployeeStore();

  return (
    <div className="grid gap-[10px]  border-[1px] rounded-[10px] p-10 h-fit">
      <div className="flex justify-between items-center pb-6  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
          {title}
        </h1>
        {children}
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorFetch
          message="Error Fetching leave request"
          onRefetch={() => fetchPersonalDetails()}
        />
      ) : (
        <div className="grid gap-y-10">
          <div className="flex ">
            <div className="w-2/3">
              <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                <div className="text-[#4D4D4D] text-sm font-normal ">
                  Tax Identification Number
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                  {employeeData?.data.tax_id || "N/A"}
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                  Rent Amount
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                  {employeeData?.data.rent_amount
                    ? `# ${employeeData.data.rent_amount}`
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col space-y-4 w-2/3">
              <div className="text-[#4D4D4D] text-sm font-normal ">
                Rent Document
              </div>
              {employeeData?.data.rent_doc ? (
                <div className="flex items-center gap-3 p-4 border-[1px] border-[#E3E3E5] rounded-[8px] bg-[#F7F7F7] max-w-xs">
                  <div className="bg-blue-100 px-3 py-1 rounded-md text-xs font-semibold text-blue-700 whitespace-nowrap">
                    {getFileTypeLabel(employeeData.data.rent_doc)}
                  </div>
                  <a
                    href={employeeData.data.rent_doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm truncate font-medium"
                  >
                    {employeeData.data.rent_doc.split("/").pop() ||
                      "View Document"}
                  </a>
                </div>
              ) : (
                <div className="font-medium text-base font-Graphik text-[#999999]">
                  No document uploaded
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-4 w-1/3">
              <div className="text-[#4D4D4D] text-sm font-normal ">Status</div>

              {(() => {
                const statusInfo = getStatusBadge(
                  employeeData?.data.tax_status,
                  !!employeeData?.data.rent_doc,
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
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxInformation;
