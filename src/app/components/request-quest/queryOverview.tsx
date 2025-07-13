import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const QueryOverview = () => {
  const data = [
    {
      label: " Query ID",
      value: "CMP-20240201",
    },
    {
      label: "Date Raised",
      value: "15th Feb, 2025 09:20:00 PM",
    },
    {
      label: "Raised by",
      value: "Samuel Johnson",
      img: "i",
    },
    {
      label: "Query Type",
      value: "Missing Payment",
    },
    {
      label: "Status",
      value: "Missing Payment",
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
                  Resolved
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
