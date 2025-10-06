import React from "react";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "@/app/common/Button";
interface BankDetailsProps {
  title: string;
  // children: any;
}
const BankDetails = ({ title }: BankDetailsProps) => {
  const { employeeData, loading } = UseEmployeeStore();
  return (
    <>
      <div className="grid gap-[10px]  h-fit border-[1px] rounded-[10px] p-10">
        <div className="flex justify-between items-center  pb-6">
          <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik">
            {title}
          </h1>
          {/* {children} */}
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {employeeData ? (
              <div className="grid gap-y-10 ">
                <div className="flex ">
                  <div className="w-2/3">
                    <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                      <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                        account name
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                        {employeeData.data.acct_name}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                        Bank name
                      </div>
                      <div className="font-normal text-base font-Graphik text-[#4D4D4D]">
                        {employeeData.data.bank_name}
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
                        {employeeData.data.acct_num}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D]capitalize">
                        Bank code
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                        {employeeData.data.bank_code}
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
      <div className="">
        <h1 className="text-[#2F2F33] text-[32px] font-semibold font-Graphik p-10">
          Run Payroll
        </h1>
        <div className="h-fit w-full border border-[#D3D3D6] rounded-[8px] ">
          <div className="flex items-center justify-between p-4">
            <div className="text-xl text-[#2F2F33] font-semibold font-Graphik capitalize">
              May 2025
            </div>
            <div>
              <BsThreeDotsVertical className="text-[#71717A]" />
            </div>
          </div>
          <div className="grid gap-y-2 items-center p-4">
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  Current Payroll:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  {" "}
                  Status:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  {" "}
                  Created By:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  {" "}
                  Employees:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  Total Amount:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
            <div className="flex space-x-10 items-center">
              <div className="flex space-x-2 items-center">
                <div></div>
                <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                  Payday:
                </div>
              </div>
              <div className="text-[#2F2F33] text-base font-medium font-Graphik"></div>
            </div>
          </div>
          <div className="bg-[#D3D3D6] h-[68px] border-t border-[#D3D3D6] flex justify-end items-center">
            <Button className=" w-[156px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm bg-white" />
            <Button
              className=" w-[156px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm"
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
