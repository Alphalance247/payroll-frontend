"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import HeadingSubHead from "@/app/common/headingSubHead";
import { FiCircle } from "react-icons/fi";
import { useState } from "react";
import { FaRegDotCircle } from "react-icons/fa";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import Button from "@/app/common/Button";

const PayrollSettings = () => {
  const [selectedPlan, setSeledtedPLan] = useState("Monthly");
  const [date, setDate] = useState("");
  const data = [
    {
      payType: "Monthly",

      desc: "Pay employees, remit taxes & pay out bonuses once a month.",
    },

    {
      payType: "Bi-monthly",
      desc: "Bi-monthly payouts with taxes remitted in the second.",
    },
    {
      payType: "Custom Date",
      desc: "Pay employees, remit taxes & pay out bonuses once a month.",
    },
  ];

  const HeadingSubHeadInner = ({
    heading,
    subhead,
  }: {
    heading: string;
    subhead: string;
  }) => {
    return (
      <div className="mb-6">
        <h5 className="text-[#2F2F33] text-base font-semibold mb-2">
          {heading}
        </h5>
        <p className="text-[#71717A] text-base">{subhead}</p>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 mx-auto md:p-6 lg:p-20 overflow-y-scroll">
          <div className="mb-10">
            <HeadingSubHead heading="Payroll Settings" withSubHead={false} />
          </div>

          <div className="flex flex-col gap-y-10">
            <div className="border-[#E3E3E5] border rounded-lg">
              <div className="p-6">
                <HeadingSubHeadInner
                  heading="Payroll Frequency"
                  subhead="Set how frequently salary is paid out in your company."
                />

                <div className="grid md:grid-cols-3 gap-4">
                  {data?.map((type, i) => (
                    <div
                      className="p-4 border border-[#E3E3E5] cursor-pointer rounded-md flex gap-x-1 items-start"
                      key={i}
                      onClick={() => setSeledtedPLan(type?.payType)}
                    >
                      <div className="">
                        {selectedPlan === type?.payType ? (
                          <FaRegDotCircle
                            size={24}
                            color="#FCF2E8"
                            fill="#E37915"
                          />
                        ) : (
                          <FiCircle size={24} color="#D0D5DD" />
                        )}
                      </div>

                      <div>
                        <p className="mb-1 font-medium text-sm text-[#2F2F33]">
                          {type?.payType}
                        </p>
                        <p className="text-sm text-[#71717A]">{type?.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-y-8">
                  <div>
                    <Label id="firstname" className="block mb-[6px]">
                      Date
                    </Label>
                    <Input
                      type="date"
                      id="firstname"
                      name="fullname"
                      value={date || ""}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label id="firstname" className="block mb-[6px]">
                      Cut-off Date
                    </Label>
                    <Input
                      type="date"
                      id="firstname"
                      name="fullname"
                      value={date || ""}
                      onChange={(e) => setDate(e.target.value)}
                    />

                    <p className="text-sm text-[#8D8D95] mt-[6px]">
                      Cut-off Date is the final day for submitting timesheets,
                      expense reports, or approvals.{" "}
                    </p>
                  </div>

                  <div>
                    <Label id="firstname" className="block mb-[6px]">
                      Remind Me
                    </Label>
                    <select
                      name=""
                      id=""
                      className="w-full border text-[#BEBEC2] border-[#E3E3E5] p-3 text-sm rounded-lg"
                    >
                      <option value="">Select reminder</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                <Button className="w-[100px]">Update</Button>
              </div>
            </div>

            <div className="border-[#E3E3E5] border rounded-lg">
              <div className="p-6">
                <HeadingSubHeadInner
                  heading="Payroll Approval"
                  subhead="Payroll approvers are employees within your company that are responsible for reviewing & approving every payroll in your organisation before it is processed."
                />

                <div className="mt-8 flex flex-col gap-y-8">
                  <div>
                    <Label id="firstname" className="block mb-[6px]">
                      Payroll Admin Approvers
                    </Label>
                    <select
                      name=""
                      id=""
                      className="w-full border outline-none text-[#BEBEC2] border-[#E3E3E5] p-3 text-sm rounded-lg"
                    >
                      <option value="">Select reminder</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                <Button className="w-[100px]">Update</Button>
              </div>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollSettings;
