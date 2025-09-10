import { getEmployeeLoanList } from "@/stores/employee-dashboard/loan/loanList";
import Image from "next/image";

const LoanOverviewCard = () => {
  const { data } = getEmployeeLoanList();
  const cardData = [
    {
      label: "Loan Limit",
      value: "N " + data?.loan_limit.toLocaleString(),
      details: "Eligible Amount:",
      subdetails: "N " + data?.eligibility.toLocaleString(),
      detailsColor: "text-[#04CE00]",
    },
    {
      label: "Outstanding Balance",
      value: "N " + data?.outstanding_balance.toLocaleString(),
      details: "Repayment in progrees -2 months remaining",
      detailsColor: "text-[#71717A]",
    },
    {
      label: "Next Repayment",
      value: "N " + data?.proposed_next_repayment.toLocaleString(),
      details: " Due date",
      subdetails: data?.next_repayment_date,
      detailsColor: "text-[#C00F0C]",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-8">
      {cardData.map((card, index) => (
        <div
          className="bg-[#F7F7F7] border-[1.27px] border-[#E3E3E5] rounded-[10px] py-4 px-5"
          key={index}
        >
          <div className="flex items-start space-x-3 pb-3 border-b">
            <Image
              src={"/assets/employee-dashboard/loan/Icon.svg"}
              alt="loan"
              width={42}
              height={42}
            />
            <div>
              <p className="text-sm font-semibold text-[#71717A]">
                {card?.label}
              </p>
              <p className="font-medium mt-4 text-xl text-[#2F2F33]">
                {card?.value}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm">
              <span className={`${card?.detailsColor} font-medium`}>
                {card?.details}
              </span>{" "}
              {card?.subdetails && (
                <span className="text-sm font-semibold text-[#71717A]">
                  {card?.subdetails}
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanOverviewCard;
