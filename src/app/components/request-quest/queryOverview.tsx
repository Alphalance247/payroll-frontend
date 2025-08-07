import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { getQueryDetails } from "@/stores/request/getRequestDetails";

const QueryOverview = () => {
  const { data: detailsData } = getQueryDetails();
  const details = detailsData?.query;
  const data = [
    {
      label: " Query ID",
      value: `CMP-2024020${details?.id}`,
    },
    {
      label: "Date Raised",
      value: details?.created_at,
    },
    {
      label: "Raised by",
      value: details?.created_by,
      img: "i",
    },
    {
      label: "Query Type",
      value: details?.query_type,
    },
    {
      label: "Status",
      value: details?.status,
      status: "Not Resolved",
    },
  ];
  return (
    <div className="border-y border-[E3E3E5] px-6 outline-4 outline-[#E3E3E5] outline pb-6">
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] py-6">
        <span className="cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        Request Details
      </h4>

      <div>
        {data.map((detail, index) => (
          <div key={index} className="py-3 flex justify-between items-center">
            <p className="text-sm text-[#71717A]">{detail.label}</p>
            <div className="flex items-center gap-x-3">
              {detail?.img && (
                <Image
                  src="/assets/request/Avatar.svg"
                  width={24}
                  height={24}
                  alt="avatar"
                />
              )}
              {!detail?.status && (
                <p className="text-base text-[#2F2F33]">{detail.value}</p>
              )}

              {detail?.status && (
                <p
                  className={`inline-block px-3 py-1 rounded-full text-sm border border-[#414D57] bg-[#E7E9EA] text-[#0C1720] font-medium`}
                >
                  {details?.status}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryOverview;
