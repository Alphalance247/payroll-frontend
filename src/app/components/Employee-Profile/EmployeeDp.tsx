import React from "react";
import { TiCamera } from "react-icons/ti";
interface DpProps {
  dp: string;
  name: string;
  role: string;
  children: any;
}
const EmployeeDp = ({ dp, name, role, children }: DpProps) => {
  return (
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
            {name}
          </h1>
          <p className="font-Graphik font-medium text-base capitalize text-[#4D4D4D]">
            {role}
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

export default EmployeeDp;
