import React, { useEffect } from "react";
import { TiCamera } from "react-icons/ti";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface DpProps {
  dp: string;
}
const EmployeeDp = ({ dp }: DpProps) => {
  const { employee, loading, fetchPersonalDetails } = useEmployeeStore();
  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);
  return (
    <div className="flex justify-between items-center shrink-0  px-[72px] h-[180px] my-[10px]   ">
      {loading ? (
        <Spinner />
      ) : (
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
          {!employee ? (
            <div>Employee profile is not available</div>
          ) : (
            <div className="grid gap-2 w-[181px]">
              <h1
                className="font-Graphik font-bold text-lg text-[#4D4D4D] capitalize
    "
              >
                {employee.data.fullname}
              </h1>
              <p className="font-Graphik font-medium text-base capitalize text-[#4D4D4D]">
                {employee.data.job_type}
              </p>
            </div>
          )}
        </div>
      )}
      {employee?.data.status === "active" ? (
        <div className="w-[61.8px]">
          <button className=" font-Graphik font-medium text[14.11px] leading[21.17px]  text-[#188C43] bg-[#E9F9EF] px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] ">
            {employee?.data.status}
          </button>{" "}
        </div>
      ) : (
        <button className=" font-Graphik font-medium text[14.11px] leading[21.17px]  text-[#188C43] bg-[#E9F9EF] px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] ">
          {"inactive"}
        </button>
      )}
    </div>
  );
};

export default EmployeeDp;
