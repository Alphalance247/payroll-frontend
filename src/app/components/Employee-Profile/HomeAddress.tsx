import React from "react";
import { useEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
interface HomeAdressProps {
  children: any;
  title: string;
}
const HomeAddress = ({ children, title }: HomeAdressProps) => {
  const { employeeData, loading, error, fetchPersonalDetails } =
    useEmployeeStore();
  console.log(employeeData?.data);
  return (
    <div className="grid gap-[10px] border-[1px] rounded-[10px] p-10 mb-20 h-fit">
      <div className="">
        <div className="flex justify-between items-center pb-6  ">
          <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik">
            {title}
          </h1>
          {children}
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorFetch
            message="Error Fetching leave request"
            onRefetch={() => fetchPersonalDetails()}
          />
        ) : (
          <>
            {!employeeData ? (
              <div>Employee Address not available</div>
            ) : (
              <div className="grid gap-y-10">
                <div className="flex ">
                  <div className="w-2/3">
                    <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                      <div className="text-[#4D4D4D] text-sm font-normal ">
                        Street Address
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employeeData?.data.street_address}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D]">
                        City
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employeeData.data.city}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-2/3">
                    <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                      <div className="text-[#4D4D4D] text-sm font-normal ">
                        State
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employeeData.data.state}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D]">
                        Country
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employeeData.data.country}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeAddress;
