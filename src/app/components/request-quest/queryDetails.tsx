import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

const QueryDetails = () => {
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
  ];
  return (
    <section className="border-y border-[E3E3E5] px-6 outline-4 outline-[#E3E3E5] outline pb-6">
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33] py-6">
        <span className="cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        Request Details
      </h4>

      <div className="py-3">
        <h5 className="mb-2 text-sm font-medium text-[#71717A]">
          Employee Concern
        </h5>

        <p className="text-sm text-[#2F2F33]">
          I noticed that my salary for July 2024 is lower than expected. My
          payslip shows a deduction of ₦200,000, but I wasn’t informed about any
          deductions. Additionally, my usual bonus wasn’t included. Could you
          please clarify the reason for these deductions and whether my bonus
          will be paid separately? I`ve attached my payslip for reference.
        </p>
      </div>

      <div className="py-3">
        <h5 className="mb-4 text-sm font-medium text-[#71717A]">Attachments</h5>
        <Image
          src="/assets/request/pdf.svg"
          width={321}
          height={60}
          alt="pdf"
        />
      </div>

      <div>
        {data?.map((detail, index) => (
          <div key={index} className="py-3 flex justify-between items-center">
            <p className="text-sm font-medium text-[#71717A]">{detail.label}</p>
            <p className="text-base text-[#2F2F33]">{detail.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QueryDetails;
