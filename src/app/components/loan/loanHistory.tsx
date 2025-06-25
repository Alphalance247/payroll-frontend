import { FaChevronDown } from "react-icons/fa6";

const LoanHistory = () => {
  const LoanHistory = [
    {
      id: 1,
      loanId: "LR-20240401-001",
      amount: "N700,000",
      date: "2024-07-10",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      loanId: "LR-20240401-001",
      amount: "N700,000",
      date: "2024-07-10",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      loanId: "LR-20240401-001",
      amount: "N700,000",
      date: "2024-07-10",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      loanId: "LR-20240401-001",
      amount: "N700,000",
      date: "2024-07-10",
      paymentStatus: "Paid",
    },
  ];
  return (
    <div className="border-t border-[#E3E3E5] mt-6">
      <div className="p-6">
        <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33]">
          <span className="cursor-pointer">
            <FaChevronDown size={20} />
          </span>{" "}
          Loan History
        </h4>
      </div>

      <p className="text-sm font-medium text-[#2F2F33] px-6 py-3">
        Past Loan Activities
      </p>

      <div className="flex flex-col gap-y-6 px-6 pb-6">
        {LoanHistory.map((loan, i) => (
          <div
            className="text-sm font-normal flex justify-between items-center"
            key={i}
          >
            <div className=" text-[#2F2F33]">
              <p className="font-medium">{loan.loanId}</p>
              <p>{loan.amount}</p>
              <p>{loan.date}</p>
            </div>
            <p className="text-[#71717A]">{loan.paymentStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanHistory;
