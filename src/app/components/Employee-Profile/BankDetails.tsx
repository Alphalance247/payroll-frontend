import React from "react";
interface BankDetailsProps {
  title: string;
  children: any;
  accountNo: string;
  accountName: string;
  bankName: string;
  bvn: string;
}
const BankDetails = ({
  title,
  children,
  accountName,
  accountNo,
  bvn,
  bankName,
}: BankDetailsProps) => {
  return (
    <div className="grid gap-[10px]  h-[436px] border-[1px] rounded-[10px] px-10">
      <div className="flex justify-between items-center  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik">
          {title}
        </h1>
        {children}
      </div>
      <div className="grid  pt-0 mb-36">
        <div className="flex ">
          <div className="w-2/3">
            <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
              <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                account name
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                {accountName}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-[205px] h-[60px] flex flex-col space-y-4">
              <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                Bank name
              </div>
              <div className="font-normal text-base font-Graphik text-[#4D4D4D]">
                {bankName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
              <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                Account number
              </div>
              <div className="font-normal text-base font-Graphik text-[#4D4D4D]">
                {accountNo}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-[211px] h-[60px] flex flex-col space-y-4">
              <div className="text-sm font-normal font-Graphik text-[#4D4D4D]capitalize">
                Bvn
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                {bvn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
