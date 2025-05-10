import Image from "next/image";

interface PayrollReviewProps {
  cashRequired: string;
  numberOfEmployees: number;
  employeePayday: string;
  exchangeRate: string;
  paymentMethod: string;
  bankAccount: string;
  runBy: string;
  status: string;
}

const ReviewAndApprove: React.FC<PayrollReviewProps> = ({
  cashRequired,
  numberOfEmployees,
  employeePayday,
  exchangeRate,
  paymentMethod,
  bankAccount,
  runBy,
  status,
}) => {
  const cardData = [
    {
      icon: "/assets/payroll/1.svg",
      label: "Cash Required",
      value: `₦ ${cashRequired}`,
    },
    {
      icon: "/assets/payroll/2.svg",
      label: "Number of Employee",
      value: numberOfEmployees,
    },
    {
      icon: "/assets/payroll/3.svg",
      label: "Employee Payday",
      value: employeePayday,
    },
    {
      icon: "/assets/payroll/2.svg",
      label: "Exchange Rate",
      value: `₦ ${exchangeRate}`,
    },
  ];

  return (
    <div className="w-full mb-10 px-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#2F2F33]">
          Review & Approve
        </h2>
        <p className="text-base text-[#71717A]">
          Double-check payroll data and send to management for approval.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-[#F7F7F7] border border-[#E3E3E5] rounded-lg py-3 px-4"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8">
                <Image
                  src={card.icon}
                  alt={card.label}
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <p className="text-sm text-[#71717A]">{card.label}</p>
                <p className="font-semibold mt-1 text-lg text-[#2F2F33]">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-lg border-[#E3E3E5] border p-4">
        <div>
          <p className="text-sm text-[#71717A] font-medium">Payment Method</p>
          <p className="font-medium mt-1 text-base text-[#2F2F33]">
            {paymentMethod}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#71717A] font-medium">Bank Account</p>
          <p className="font-medium mt-1 text-base text-[#2F2F33]">
            {bankAccount}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#71717A] font-medium">Run by</p>
          <p className="font-medium mt-1 text-base text-[#2F2F33]">{runBy}</p>
        </div>
        <div>
          <p className="text-sm text-[#71717A] font-medium mb-1">Status</p>
          <p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm ${
                status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-[#E7E9EA] text-[#0C1720]"
              }`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndApprove;
