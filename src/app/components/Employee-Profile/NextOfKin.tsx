import React, { useEffect } from "react";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface NOKProps {
  children: any;
  title: string;
}
const NextOfKin = ({ children, title }: NOKProps) => {
  const { employeeData, loading } = useEmployeeStore();

  return (
    <div className="grid gap-[10px]  border-[1px] rounded-[10px] p-10 h-fit">
      <div className="flex justify-between items-center pb-6  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
          {title}
        </h1>
        {children}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {employeeData ? (
            <div className="grid gap-y-10">
              <div className="flex ">
                <div className="w-2/3">
                  <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                    <div className="text-[#4D4D4D] text-sm font-normal ">
                      Full Name
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                      {employeeData.data.nok_name}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                    <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                      relationship
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                      {}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-2/3">
                  <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                    <div className="text-[#4D4D4D] text-sm font-normal ">
                      Email
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                      {}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                    <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                      Mobile Number
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                      {employeeData.data.nok_phone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-2/3">
                  <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                    <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                      city
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                      {}{" "}
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="w-[210px] h-[60px] flex flex-col space-y-4">
                    <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                      country
                    </div>
                    <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                      {}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[#4D4D4D] font-Graphik px-6 pt-6">
              No Next of kin details available
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NextOfKin;
