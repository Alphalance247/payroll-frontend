"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import { Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const EmployeeCompliance = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
            user={"Compliance"}
          />

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="relative w-[380px] mb-4">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              </div>

              <div className="flex flex-col gap-y-5">
                <div className="py-5 px-4 grid grid-cols-2 gap-x-4 items-center bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
                  <Image
                    src="/assets/employee-dashboard/compliance/pension.png"
                    width={226}
                    height={162}
                    alt="uphold"
                    className="w-full"
                  />

                  <div className="">
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                      PAYE (Pay-As-You-Earn) Tax Update
                    </p>
                    <div className="text-[#71717A] leading-5 text-[13px] font-Graphik mb-2">
                      <p className="mb-2">Effective: January 01, 2025</p>
                      <p>Last Updated: January 01, 2025</p>
                    </div>
                    <p className="border-[#DF900A] w-fit border text-xs font-medium px-2 py-[2px] bg-[#FEF5E7] text-[#CF6E13] rounded-2xl my-2">
                      Pension
                    </p>
                    <button className="text-[#E37915] font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>

                <div className="py-5 px-4 grid grid-cols-2 gap-x-4 items-center bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
                  <Image
                    src="/assets/employee-dashboard/compliance/Image.png"
                    width={226}
                    height={162}
                    alt="uphold"
                    className="w-full"
                  />

                  <div className="">
                    <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                      PAYE (Pay-As-You-Earn) Tax Update
                    </p>
                    <div className="text-[#71717A] leading-5 text-[13px] font-Graphik mb-2">
                      <p className="mb-2">Effective: January 01, 2025</p>
                      <p>Last Updated: January 01, 2025</p>
                    </div>
                    <p className="border-[#DF900A] w-fit border text-xs font-medium px-2 py-[2px] bg-[#FEF5E7] text-[#CF6E13] rounded-2xl my-2">
                      Pension
                    </p>
                    <button className="text-[#E37915] font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <div className="py-5 px-4 grid bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px] h-[550px] overflow-y-auto">
                <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                  PAYE (Pay-As-You-Earn) Tax Update
                </p>

                <div className="text-[#71717A] leading-5 text-[13px] font-Graphik mb-2">
                  <p className="mb-2">Effective: January 01, 2025</p>
                </div>

                <Image
                  src="/assets/employee-dashboard/compliance/2.png"
                  width={505}
                  height={253}
                  alt="uphold"
                />

                <div className="mt-2">
                  <div className="flex gap-x-4 items-center">
                    <p className="text-[#71717A] leading-5 text-[13px] font-Graphik">
                      Last Updated: January 01, 2025
                    </p>
                    <p className="border-[#DF900A] w-fit border text-xs font-medium px-2 py-[2px] bg-[#FEF5E7] text-[#CF6E13] rounded-2xl my-2">
                      Pension
                    </p>
                  </div>

                  <p className="text-base font-Graphik text-[#2F2F33] font-semibold mt-4">
                    Overview of PAYE Tax in Nigeria{" "}
                  </p>

                  <p className="text-base text-[#71717A] mt-4 mb-4">
                    PAYE (Pay-As-You-Earn) is a system of income tax withholding
                    by employers on behalf of employees. It ensures that income
                    taxes are collected at source and remitted to the
                    appropriate tax authority.
                  </p>
                  <p className="text-base text-[#71717A] mt-4 mb-4">
                    PAYE (Pay-As-You-Earn) is a system of income tax withholding
                    by employers on behalf of employees. It ensures that income
                    taxes are collected at source and remitted to the
                    appropriate tax authority.
                  </p>
                  <p className="text-base text-[#71717A] mt-4 mb-4">
                    PAYE (Pay-As-You-Earn) is a system of income tax withholding
                    by employers on behalf of employees. It ensures that income
                    taxes are collected at source and remitted to the
                    appropriate tax authority.
                  </p>
                  <p className="text-base text-[#71717A] mt-4 mb-4">
                    PAYE (Pay-As-You-Earn) is a system of income tax withholding
                    by employers on behalf of employees. It ensures that income
                    taxes are collected at source and remitted to the
                    appropriate tax authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeCompliance;
