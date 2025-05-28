"use client";
import Profile from "@/app/components/employee-managemnt/profile";
import DashboardLayout from "../../common/DashBoardLayout";
import Image from "next/image";
import { useState } from "react";
import Job from "@/app/components/employee-managemnt/job";
import Uploads from "@/app/components/employee-managemnt/Uploads";

const EmployeeManagement = () => {
  const [activeBtn, setActiveBtn] = useState<string>("Projects");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Projects" },
    { id: 2, name: "Job" },
    { id: 3, name: "Uploads" },
    { id: 4, name: "Timesheet" },
    { id: 5, name: "Payslip" },
  ];
  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex gap-x-8 items-center mb-3">
          <Image
            src="/assets/employees-management/avatar.svg"
            height={56}
            width={56}
            alt="avatar"
          />

          <div>
            <h3 className="text-xl font-semibold text-[#2F3135] tracking-[-0.5px] mb-2">
              {" "}
              Afolabi Joyner Jude
            </h3>
            <p className="text-base font-normal text-[#838487]">
              UI/UX Designer - Design and Dev
            </p>
          </div>
        </div>

        <div>
          <div className="flex gap-x-3 items-center border-b border-[#E3E3E5]">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                    : "text-[#71717A] border-transparent "
                }   font-semibold text-base p-4 border-b-[1px] cursor-pointer`}
                onClick={() => setActiveBtn(el.name)}
                key={i}
              >
                {el.name}
              </button>
            ))}
          </div>

          {activeBtn === "Projects" && <Profile />}
          {activeBtn === "Job" && <Job />}
          {activeBtn === "Uploads" && <Uploads />}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default EmployeeManagement;
