import HeadingSubHead from "@/app/common/headingSubHead";
import { LoanAmountsCharts } from "../charts/loanAmountChart";

const LoanAmounts = () => {
  return (
    <div className="border border-[#d9d9d9] rounded-lg mt-6">
      <div className="py-[14px] px-6  border-b border-[#d9d9d9] ">
        <HeadingSubHead
          withSubHead={true}
          headingClassName="text-base"
          heading="Monthly loan disbursed"
          subHead="Track which type of loan is most popular."
        />
      </div>

      <div className="text-center mb-8">
        <LoanAmountsCharts />
      </div>
    </div>
  );
};

export default LoanAmounts;
