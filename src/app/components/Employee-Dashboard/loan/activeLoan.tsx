import Button from "@/app/common/Button";

const ActiveLoan = ({
  setIsOpenSideBar,
}: {
  setIsOpenSideBar: (isOpenSideBar: boolean) => void;
}) => {
  const data = [
    {
      label: "Loan Amount",
      value: "NGN 1000,000",
    },
    {
      label: "Repayment Due Date",
      value: "July 5, 2025",
    },
    {
      label: "Duration",
      value: "6 Months",
    },
    {
      label: "Loan Id",
      value: "LN-2025-00023",
    },
    {
      label: "Monthly Repayment",
      value: "NGN 55,000",
    },
    {
      label: "Approval Date",
      value: "May 10, 2025",
    },
  ];
  return (
    <section className="mt-6 px-6 py-4 border border-[#E3E3E5] rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-[#2F2F33] text-base font-medium tracking-[-0.3%]">
          Active Loan
        </p>

        <Button variant="primary" onButtonClick={() => setIsOpenSideBar(true)}>
          View Details
        </Button>
      </div>

      <div className="max-w-[80%] mt-8">
        <div className="">
          <div className="flex justify-between items-center">
            <p className="text-sm text-[#1D2026] tracking-[0.1%]">
              Repayment Progress
            </p>

            <p className="text-base text-[#23BD33] font-semibold">
              {" "}
              15% Completed
            </p>
          </div>
          <div className="w-full bg-[#E9EAF0] h-3 mt-2 rounded-2xl">
            <p className="w-[70%] bg-[#23BD33] h-3 rounded-2xl"></p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 justify-between py-2 gap-6 mt-8">
          {data.map((item, i) => (
            <div className="text-[#4D4D4D]" key={i}>
              <p className=" text-sm mb-4">{item?.label}</p>
              <p className="text-base font-medium">{item?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveLoan;
