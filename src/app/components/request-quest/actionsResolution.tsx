import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Button from "@/app/common/Button";
const ActionResolution = () => {
  const data = [
    {
      label: "Payroll Cycle Affected",
      value: "July 2024 Payroll",
    },
    {
      label: "Amount in Dispute",
      value: "NGN 200,000",
    },
    {
      label: "Payment Method",
      value: "Bank Transfer",
    },
    {
      label: "Payment Method",
      value: "Bank Transfer",
    },
  ];

  const data1 = [
    {
      label: "Assigned To",
      value: "Oluwatishe",
    },

    {
      label: " Expected Resolution Date",
      value: "Jan 16, 2025",
    },
    {
      label: " Expected Resolution Date",
      value: "Jan 16, 2025",
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

      <div className="flex flex-col gap-y-4">
        {data?.map((detail, index) => (
          <div
            key={index}
            className="py-3 flex justify-between gap-x-6 items-center"
          >
            <div>
              <p className="text-sm font-medium text-[#2F2F33] mb-1">
                Query Received
              </p>
              <p className="text-sm font-normal text-[#71717A]">
                Samuel Jackson reported an unexpected deduction of ₦ 200,000 and
                missing bonus. (Auto-logged)
              </p>
            </div>
            <p className="text-sm text-[#71717A]">2024-07-10 10:15 AM</p>
          </div>
        ))}
      </div>

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
        <p className="text-base text-[#2F2F33]"> Bank Transfer</p>
      </div>

      <div className="flex gap-x-4 pt-4">
        <Button variant="secondary" className="w-full">
          Cancel
        </Button>
        <Button variant="primary" className="w-full">
          Mark as Resolved
        </Button>
      </div>
    </section>
  );
};

export default ActionResolution;
