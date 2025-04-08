import HeadingSubHead from "@/app/common/headingSubHead";
import { FaCaretDown } from "react-icons/fa";
import { SpendingChart } from "../charts/spendingChart";

const SpendPerTeam = () => {
  return (
    <section className="mt-8">
      <div className="border border-[#d9d9d9] rounded-lg">
        <div className="flex justify-between items-center mb-6 border-b border-[#d9d9d9] py-[14px] px-6">
          <div>
            <HeadingSubHead
              withSubHead={true}
              headingClassName="text-base"
              subHeadClassName="text-sm"
              heading="Payroll"
              subHead="0% of your NGN payroll this year was allocated to paying out salaries"
            />
          </div>

          <div className="relative">
            <div
              className="flex items-center gap-x-4 px-4 py-3 bg-white border border-[#d9d9d9]  rounded-lg cursor-pointer w-fit"
              // onClick={handleOpen}
            >
              <p className="">
                <span className="text-base font-Graphik text-[#2F2F33] tracking-[-0.3px]">
                  Design & Development
                </span>{" "}
                <span className="font-medium text-[15px] leading-5 text-[#262626] ">
                  {""}
                </span>
              </p>
              <FaCaretDown size={20} color="black" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <SpendingChart />
        </div>
      </div>
    </section>
  );
};

export default SpendPerTeam;
