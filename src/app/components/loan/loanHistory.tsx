import { FaChevronDown } from "react-icons/fa6";
import { getLoanDetails } from "@/stores/loan/getLoanDetails";

const LoanHistory = () => {
  const { data } = getLoanDetails();
  const loanHistoryData = data?.loan_history || [];
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

      {loanHistoryData?.length === 0 ? (
        <p className="text-lg font-medium text-[#2F2F33]  pt-10 pb-6 text-center">
          No loan history Available
        </p>
      ) : (
        <div className="flex flex-col gap-y-6 px-6 pb-6">
          {loanHistoryData?.map((loan, i) => (
            <div
              className="text-sm font-normal flex justify-between items-center"
              key={i}
            >
              <div className=" text-[#2F2F33]">
                <p className="font-medium">LR-20240401-0{loan?.id}</p>
                <p>{loan.amount}</p>
                <p>{loan.due_date}</p>
              </div>
              <p className="text-[#71717A]">
                {loan?.date_disburse ? "Paid" : "Not paid"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanHistory;
