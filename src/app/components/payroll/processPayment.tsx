import Image from "next/image";
const ProcessPayment: React.FC = ({}) => {
  const cardData = [
    {
      label: "Cash Required",
      value: "₦ 1,000,000",
    },
    {
      label: "Dollars Account Balance",
      value: "$ 500,000",
    },
    {
      label: "Naira Account Balance",
      value: "₦ 10,000,000",
      status: "insufficient funds",
    },
  ];

  const paymentGateway = [
    {
      label: "Naira Payment Gateway",
      icon: "/assets/payroll/paystack.svg",
      iconWidth: 129,
      iconHeight: 23,
    },
    {
      label: "Dollars Payment Gateway",
      icon: "/assets/payroll/stripe.svg",
      iconWidth: 54,
      iconHeight: 24,
    },
  ];

  const approval = [
    {
      label: "Approved By",
      approveBy: "David Essien",
      icon: "/assets/payroll/note.svg",
    },
    {
      label: "Approval Timestamp",
      approveBy: "Jan 12, 2025, 4:52 PM",
      icon: "/assets/payroll/note.svg",
    },
  ];

  return (
    <div className="w-full mb-10 px-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#2F2F33]">
          Process Payment
        </h2>
        <p className="text-base text-[#71717A]">
          Transfer employee salaries securely and accurately.
        </p>
      </div>

      <div className="flex gap-8 mb-8">
        {cardData.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-[#71717A] font-medium mb-2">
              {item?.label}
            </p>
            <p className="text-xl font-semibold text-[#2F2F33]">
              {item?.value}
            </p>

            {item?.status && (
              <p className="text-sm text-[#AA3030] font-medium bg-[#FDECEC] rounded-full px-2 py-1 mt-2 w-fit border border-[#AA3030]">
                {item?.status}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {paymentGateway.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-2 bg-[#F7F7F7] rounded-lg py-3 px-4"
          >
            <p className="text-sm text-[#71717A] font-medium">{item?.label}</p>
            <Image
              src={item?.icon}
              width={item?.iconWidth}
              height={item?.iconHeight}
              alt="payment gateway"
            />
          </div>
        ))}

        {approval.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-x-2 bg-[#F7F7F7] rounded-lg py-3 px-4"
          >
            <Image
              src={item?.icon}
              width={40}
              height={40}
              alt="payment gateway"
            />
            <div>
              <p className="text-sm text-[#71717A] font-medium mb-2">
                {item?.label}
              </p>
              <p className="text-base text-[#2F2F33] font-medium">
                {item?.approveBy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessPayment;
