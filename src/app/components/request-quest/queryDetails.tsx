import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { getQueryDetails } from "@/stores/request/getRequestDetails";

const QueryDetails = () => {
  const { data: detailsData } = getQueryDetails();
  const details = detailsData?.query;
  console.log(details?.assigned_to);
  const data = [
    {
      label: "Payroll Cycle Affected",
      value: details?.payroll_lifecycle_affected,
    },
    {
      label: "Amount in Dispute",
      value: "NGN " + details?.amount_in_dispute || 0,
    },
    {
      label: "Payment Method",
      value: details?.payment_method,
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
          {details?.title}
        </h5>

        <p className="text-sm text-[#2F2F33]">{details?.description}</p>
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
