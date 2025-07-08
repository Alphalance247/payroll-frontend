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
      img: "",
    },
  ];
  return (
    <div className="border-t border-[E3E3E5] px-6">
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
            <div>
              {detail?.img && (
                <Image
                  src="/assets/request/Avatar.svg"
                  width={24}
                  height={24}
                  alt="avatar"
                />
              )}
              <p className="text-base text-[#2F2F33]">{detail.value}</p>

              <p
                className={`inline-block px-3 py-1 rounded-full text-sm border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
              >
                Resolved
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryOverview;
