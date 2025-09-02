"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import HeadingSubHead from "@/app/common/headingSubHead";
import { FiCircle } from "react-icons/fi";
import { useState } from "react";
import { FaRegDotCircle } from "react-icons/fa";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import { LiaTimesCircle } from "react-icons/lia";
import Button from "@/app/common/Button";
import { GoPlus } from "react-icons/go";

const PayrollSettings = () => {
  const [selectedPlan, setSeledtedPLan] = useState("Monthly");
  const [deliveryMethod, setDeliveryMethod] = useState("Manual Delivery");
  const [checkedi, setCheckedi] = useState("");
  const [form, setForm] = useState({
    pay_day: "",
    send_payslip_to: "",
    leave_allowance: "",
    loan_repayment_percentage: "",
    loan_repayment_freq: "",
    payment_pipeline: "",
  });

  console.log(form);

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

  const delivery = [
    {
      payType: "Manual Delivery",

      desc: "Payslips will only be sent when the admin manually triggers it during the payroll process.",
    },
    {
      payType: "Automated Delivery",
      desc: "Payslips are automatically sent to employees as soon as the payroll reaches the Process Payment screen.",
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
                    <Label id="date" className="block mb-[6px]">
                      Date
                    </Label>
                    <Input
                      type="date"
                      id="pay_day"
                      name="pay_day"
                      value={form?.pay_day || ""}
                      onChange={(e) =>
                        setForm({ ...form, pay_day: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label id="payment_pipeline" className="block mb-[6px]">
                      Cut-off Date
                    </Label>
                    <Input
                      type="date"
                      id="payment_pipeline"
                      name="payment_pipeline"
                      value={form?.payment_pipeline || ""}
                      onChange={(e) =>
                        setForm({ ...form, payment_pipeline: e.target.value })
                      }
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
                      <option value="">Select Approver</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <div className="flex gap-x-[6px] bg-[#E7E9EA] rounded-[20px] py-1 pr-2 pl-1 w-fit mt-2">
                      <div className="h-5 w-5 rounded-full bg-[#009BC0] text-white flex items-center justify-center text-sm font-medium">
                        {"Moshood"
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <p className="text-[13px] text-[#2F2F33] font-medium">
                        {" "}
                        Olawaleadeoti@alluvium.net
                      </p>
                      <LiaTimesCircle fill="#71717A" size={18} />
                    </div>

                    <p className="text-sm font-semibold text-[#E37915] mt-6 flex items-center gap-x-1">
                      <GoPlus size={18} fill="#E37915" /> Add Another Approver
                      (4 left)
                    </p>

                    <div className="mt-8">
                      <p className="font-medium text-base text-[#2F2F33] mb-4">
                        Send approval request notifications to:
                      </p>

                      <div className="flex flex-col gap-y-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="email"
                            checked={checkedi === "email"}
                            onChange={() => setCheckedi("email")}
                            className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-[#374151]"
                          >
                            Email
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            checked={checkedi === "slack"}
                            id="Slack"
                            onChange={() => setCheckedi("slack")}
                            className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <label
                            htmlFor="Slack"
                            className="text-sm font-medium text-[#374151]"
                          >
                            Slack
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            id="Both"
                            checked={checkedi === "both"}
                            onChange={() => {
                              setCheckedi("both");
                            }}
                            className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                          <label
                            htmlFor="Both"
                            className="text-sm font-medium text-[#374151]"
                          >
                            Both
                          </label>
                        </div>
                      </div>
                    </div>
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
                  heading="Payslip Settings"
                  subhead="How would you like payslips to be delivered to employees?"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  {delivery?.map((type, i) => (
                    <div
                      className="p-4 border border-[#E3E3E5] cursor-pointer rounded-md flex gap-x-1 items-start"
                      key={i}
                      onClick={() => setDeliveryMethod(type?.payType)}
                    >
                      <div className="">
                        {deliveryMethod === type?.payType ? (
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

                <div className="mt-8">
                  <p className="font-medium text-base text-[#2F2F33] mb-4">
                    Send monthly payslip to:
                  </p>

                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        id="email"
                        name="send_payslip_to"
                        value={"email"}
                        checked={form?.send_payslip_to === "email"}
                        onChange={(e) =>
                          setForm({ ...form, send_payslip_to: e.target.value })
                        }
                        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                      />
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-[#374151]  cursor-pointer"
                      >
                        Email
                      </label>
                    </div>

                    <div className="flex items-center gap-3 ">
                      <input
                        type="radio"
                        checked={form?.send_payslip_to === "slack"}
                        name="send_payslip_to"
                        value={"slack"}
                        onChange={(e) =>
                          setForm({ ...form, send_payslip_to: e.target.value })
                        }
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor="Slack"
                        className="text-sm font-medium text-[#374151] cursor-pointer"
                      >
                        Slack
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="Both"
                        name="send_payslip_to"
                        value={"both"}
                        checked={form?.send_payslip_to === "both"}
                        onChange={(e) =>
                          setForm({ ...form, send_payslip_to: e.target.value })
                        }
                        className="h-5 w-5 rounded border-gray-300 cursor-pointer text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor="Both"
                        className="text-sm font-medium text-[#374151] cursor-pointer"
                      >
                        Both
                      </label>
                    </div>
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
                  heading="Leave Allowance"
                  subhead="This allows you to add a certain amount to employees' salary as leave allowance, which is paid when employees go on leave."
                />

                <div>
                  <Label id="leave_allowance" className="mb-[6px] block">
                    Allowance amount
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    id="leave_allowance"
                    name="leave_allowance"
                    value={form?.leave_allowance}
                    onChange={(e) =>
                      setForm({ ...form, leave_allowance: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                <Button className="w-[100px]">Update</Button>
              </div>
            </div>

            <div className="border-[#E3E3E5] border rounded-lg">
              <div className="p-6">
                <HeadingSubHeadInner
                  heading="Payroll Bonus (13th month)"
                  subhead="This allows you to add a percentage of the employees' salary as a 13th month bonus to be paid in the selected month."
                />

                <div className="grid grid-cols-2 gap-x-[10px]">
                  <div>
                    <Label className="mb-[6px] block">Percentage</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      id="amount"
                      name=""
                      value=""
                    />
                  </div>

                  <div>
                    <Label className="mb-[6px] block">Payout month</Label>

                    <select
                      name=""
                      id=""
                      className="w-full border outline-none text-[#BEBEC2] border-[#E3E3E5] p-4 text-sm rounded-lg"
                    >
                      <option value=""></option>
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
                  heading="Loan Repayment"
                  subhead="Set a percentage of the employee’s salary to be deducted as loan repayment and specify the month it should be applied."
                />

                <div className="grid grid-cols-2 gap-x-[10px]">
                  <div>
                    <Label className="mb-[6px] block">Percentage</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      id="amount"
                      name=""
                      value=""
                    />
                  </div>

                  <div>
                    <Label className="mb-[6px] block">Payout month</Label>

                    <select
                      name=""
                      id=""
                      className="w-full border outline-none text-[#BEBEC2] border-[#E3E3E5] p-4 text-sm rounded-lg"
                    >
                      <option value=""></option>
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
