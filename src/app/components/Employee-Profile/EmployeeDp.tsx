import React, { useEffect } from "react";
import { TiCamera } from "react-icons/ti";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface DpProps {
  dp: string;
}
const EmployeeDp = ({ dp }: DpProps) => {
  const { employeeData, loading, fetchPersonalDetails } = useEmployeeStore();
  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!employeeData ? (
            <div className="px-72">Employee profile is not available</div>
          ) : (
            <div className="flex justify-between items-center shrink-0  px-[72px] h-[180px] my-[10px]   ">
              <div className="flex space-x-10 items-center ">
                <div className="relative">
                  <img
                    src={dp}
                    alt="DP"
                    className="h-[180px] w-[180px] rounded-full object-cover"
                  />
                  <div className="absolute top-[140px] left-[127px] bg-[#E37915]  h-10 w-10 rounded-full"></div>
                  <div className=" absolute top-[148px] left-[135px] ">
                    <TiCamera className=" h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="grid gap-2 w-[181px]">
                  <h1
                    className="font-Graphik font-bold text-lg text-[#4D4D4D] capitalize
   "
                  >
                    {employeeData.data.fullname}
                  </h1>
                  <p className="font-Graphik font-medium text-base capitalize text-[#4D4D4D]">
                    {employeeData.data.job_role}
                  </p>
                </div>
              </div>
              <div className="w-[61.8px]">
                <button
                  className={
                    employeeData.data.status == "active"
                      ? " font-Graphik font-medium text[14.11px] leading[21.17px]  text-[#188C43] bg-[#E9F9EF] px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] capitalize"
                      : "font-Graphik font-medium text[14.11px] leading[21.17px]  text-red-500 bg-red-100 px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] capitalize"
                  }
                >
                  {employeeData?.data.status}
                </button>{" "}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EmployeeDp;
