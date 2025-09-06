import React, { useEffect } from "react";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface BankDetailsProps {
  title: string;
  children: any;
  // accountNo: string;
  // accountName: string;
  // bankName: string;
  // bvn: string;
}
const BankDetails = ({
  title,
  children,
}: // accountName,
// accountNo,
// bvn,
// bankName,
BankDetailsProps) => {
  const { employee, loading, fetchPersonalDetails } = useEmployeeStore();
  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);
  return (
    <div className="grid gap-[10px]  h-[436px] border-[1px] rounded-[10px] px-10">
      <div className="flex justify-between items-center  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik">
          {title}
        </h1>
        {children}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {employee ? (
            <div className="grid  pt-0 mb-36">
              <div className="flex ">
                <div className="w-2/3">
                  <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                    <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                      account name
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                      {employee.data.acct_name}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                    <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                      Bank name
                    </div>
                    <div className="font-normal text-base font-Graphik text-[#4D4D4D]">
                      {employee.data.bank_name}
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
                      {employee.data.acct_num}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                    <div className="text-sm font-normal font-Graphik text-[#4D4D4D]capitalize">
                      Bvn
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                      {employee.data.bank_code}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[#4D4D4D] font-Graphik px-6 pt-6">
              Bank details is not available
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BankDetails;
