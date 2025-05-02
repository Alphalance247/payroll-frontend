"use client";
import DashboardLayout from "../common/DashBoardLayout";
import LawsAndPolicies from "../components/compliance/lawsandpolicies";
import Heading from "../common/heading";
import LatestUpdate from "../components/compliance/latestUpdate";
import EmployeeDetailsTable from "../components/payroll/employeeData";

const Compliance = () => {
  // const tabs = ["Regulatory Polices", "Documents", "Audit logs"];
  // const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  return (
    <DashboardLayout>
      {/* <TopBar>
        <div className="pt-6 pl-10">
          <h2 className="text-xl font-Graphik font-semibold text-[#2F2F33] mb-4">
            Compliance
          </h2>
          <div className="flex gap-x-4 items-center">
            {tabs.map((el, i) => (
              <button
                className={`text-base ${
                  activeTab === el
                    ? "text-[#E37915] border-[#E37915]"
                    : "text-[#71717A] border-transparent"
                }  font-Graphik font-semibold px-2 pt-1 pb-4 border-b  `}
                onClick={() => setActiveTab(el)}
                key={i}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </TopBar> */}
      <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
        <Heading
          heading="Compliance"
          flexDirection="column"
          subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
        />

        <LatestUpdate />

        {/* <div className="grid grid-cols-2 gap-6 mb-6 mt-10">
          <div className="border border-[#E3E3E5] rounded-xl">
            <UpdateHeading />
           

            <div className="py-[17px] px-6 flex gap-x-4 border-b border-[#E3E3E5]">
              <Image
                src="/assets/compliance/3.png"
                width={175}
                height={102}
                alt="uphold"
              />

              <div>
                <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                  Pension Act
                </p>
                <p className="text-[#71717A] text-[15px] font-Graphik">
                  Employers must remit 10% of employee salary into RSA
                  accounts..
                </p>
                <button className="py-[6px] text-[#E37915] font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="py-[17px] px-6 flex gap-x-4 border-b border-[#E3E3E5]">
              <Image
                src="/assets/compliance/1.png"
                width={175}
                height={102}
                alt="uphold"
              />

              <div>
                <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                  Exchange Rate Advisory
                </p>
                <p className="text-[#71717A] text-[15px] font-Graphik">
                  Forex fluctuations may impact expat salary calculations.
                </p>
                <button className="py-[6px] text-[#E37915] font-semibold">
                  Learn More
                </button>
              </div>
            </div>
            <div className="py-[17px] px-6 flex gap-x-4 ">
              <Image
                src="/assets/compliance/2.png"
                width={175}
                height={102}
                alt="uphold"
              />

              <div>
                <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                  FIRS Update
                </p>
                <p className="text-[#71717A] text-[15px] font-Graphik">
                  PAYE tax must be remitted by the 10th of every month. Late
                  payments attract..
                </p>
                <button className="py-[6px] text-[#E37915] font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="border border-[#E3E3E5] rounded-xl ">
              <UpdateHeading text="Things to do" />

              <div className="py-[17px] px-6 flex gap-x-4 items-start justify-between border-b border-[#E3E3E5]">
                <div className="flex items-start gap-x-4">
                  <Image
                    src="/assets/compliance/1.svg"
                    width={32}
                    height={32}
                    alt="update"
                  />
                  <div>
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-[6px]">
                      You have one contract not signed yet
                    </p>
                    <p className="mb-4 text-base text-[#71717A] font-Graphik">
                      Ayomide still has an unsigned contract
                    </p>
                    <div className="flex gap-x-3">
                      <Button>Decline</Button>
                      <Button>Review </Button>
                    </div>
                  </div>
                </div>

                <p className="bg-[#FEF5E7] w-fit h-fit px-[10px] py-[2px] text-sm font-Graphik text-[#AA3030] rounded-2xl">
                  3 days left
                </p>
              </div>

              <div className="py-[17px] px-6 flex gap-x-4 items-start border-b border-[#E3E3E5] justify-between ">
                <div className="flex items-start gap-x-4 ">
                  <Image
                    src="/assets/compliance/1.svg"
                    width={32}
                    height={32}
                    alt="update"
                  />
                  <div>
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-[6px]">
                      You have one contract not signed yet
                    </p>
                    <p className="mb-4 text-base text-[#71717A] font-Graphik">
                      Ayomide still has an unsigned contract
                    </p>
                    <div className="flex gap-x-3">
                      <Button>Decline</Button>
                      <Button>Review </Button>
                    </div>
                  </div>
                </div>

                <p className="bg-[#FEF5E7] w-fit h-fit px-[10px] py-[2px] text-sm font-Graphik text-[#AA3030] rounded-2xl">
                  3 days left
                </p>
              </div>
              <div className="py-[17px] px-6 flex gap-x-4 items-start border-b border-[#E3E3E5] justify-between ">
                <div className="flex items-start gap-x-4 ">
                  <Image
                    src="/assets/compliance/1.svg"
                    width={32}
                    height={32}
                    alt="update"
                  />
                  <div>
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-[6px]">
                      You have one contract not signed yet
                    </p>
                    <p className="mb-4 text-base text-[#71717A] font-Graphik">
                      Ayomide still has an unsigned contract
                    </p>
                    <div className="flex gap-x-3">
                      <Button>Decline</Button>
                      <Button>Review </Button>
                    </div>
                  </div>
                </div>

                <p className="bg-[#FEF5E7] w-fit h-fit px-[10px] py-[2px] text-sm font-Graphik text-[#AA3030] rounded-2xl">
                  3 days left
                </p>
              </div>
              <div className="py-[17px] px-6 flex gap-x-4 items-start justify-between ">
                <div className="flex items-start gap-x-4 ">
                  <Image
                    src="/assets/compliance/1.svg"
                    width={32}
                    height={32}
                    alt="update"
                  />
                  <div>
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-[6px]">
                      You have one contract not signed yet
                    </p>
                    <p className="mb-4 text-base text-[#71717A] font-Graphik">
                      Ayomide still has an unsigned contract
                    </p>
                    <div className="flex gap-x-3">
                      <Button>Decline</Button>
                      <Button>Review </Button>
                    </div>
                  </div>
                </div>

                <p className="bg-[#FEF5E7] w-fit h-fit px-[10px] py-[2px] text-sm font-Graphik text-[#AA3030] rounded-2xl">
                  3 days left
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <LawsAndPolicies />
      </main>
    </DashboardLayout>
  );
};

export default Compliance;
