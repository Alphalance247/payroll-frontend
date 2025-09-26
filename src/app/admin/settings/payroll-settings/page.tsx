"use client";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import HeadingSubHead from "@/app/common/headingSubHead";
import { FiCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { FaRegDotCircle } from "react-icons/fa";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import { LiaTimesCircle } from "react-icons/lia";
import Button from "@/app/common/Button";
import { GoPlus } from "react-icons/go";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { getPayrollSettingsProfile } from "@/stores/settings/payroll-settings/payroll-settings-profile";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { getPayrollApprovalAdmin } from "@/stores/home/payrollAproval";

const PayrollSettings = () => {
  const {
    data: profileData,
    loading,
    error,
    fetchPayrollSettingsProfile,
  } = getPayrollSettingsProfile();
  const { fetchPayrollAprrovalAdmin, data: approveList } =
    getPayrollApprovalAdmin();
  const [selectedPlan, setSeledtedPLan] = useState(
    profileData?.settings?.payment_mode || "monthly"
  );
  const settingData = profileData?.settings;
  const [deliveryMethod, setDeliveryMethod] = useState(
    profileData?.settings?.payslip_send_mode || "manual"
  );
  const [checkedi, setCheckedi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    pay_day: "",
    send_payslip_to: "",
    leave_allowance: "",
    loan_repayment_percentage: "",
    loan_repayment_freq: "",
    payment_pipeline: "",
    payroll_extra_month_percentage: "",
    payroll_extra_month_payout_month: "",
  });

  // Add below: const [form, setForm] = useState({ ... })
  const [selectedApprovers, setSelectedApprovers] = useState<
    { id: string; email: string }[]
  >([]);

  const [approverSelectValue, setApproverSelectValue] = useState("");
  const MAX_APPROVERS = 5;

  const handleAddApprover = (id: string) => {
    if (!id) return;
    setSelectedApprovers((prev) => {
      if (prev.length >= MAX_APPROVERS || prev.some((a) => a.id === id))
        return prev;
      const emp = approveList?.employees?.find(
        (e) => String(e?.id) === String(id)
      );
      if (!emp) return prev;
      return [...prev, { id: String(emp.id), email: emp.employee_email }];
    });
  };

  const handleRemoveApprover = (id: string) => {
    setSelectedApprovers((prev) => prev.filter((a) => a.id !== id));
  };

  const initialsFromEmail = (email: string) => {
    const name = email?.split("@")?.[0] || "";
    const parts = name.split(/[.\-_]/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return (name[0] || "U").toUpperCase();
  };

  useEffect(() => {
    fetchPayrollSettingsProfile();
    fetchPayrollAprrovalAdmin();
  }, [fetchPayrollSettingsProfile, fetchPayrollAprrovalAdmin]);

  useEffect(() => {
    if (settingData) {
      setForm((prev) => ({
        ...prev,
        pay_day: settingData?.pay_day,
        send_payslip_to: settingData?.send_payslip_to,
        payment_pipeline: settingData?.cutt_off_day,
        payslip_send_mode: settingData?.payslip_send_mode,
        leave_allowance: settingData?.leave_allowance,
        loan_repayment_percentage: settingData?.loan_repayment_percentage,
        loan_repayment_freq: settingData?.loan_repayment_freq,
        payroll_extra_month_payout_month:
          settingData?.payroll_extra_month_payout_month,
        payroll_extra_month_percentage:
          settingData?.payroll_extra_month_percentage,
      }));
    }
  }, [settingData]);

  useEffect(() => {
    const dbApprovals = settingData?.payroll_approvals || [];
    const normalized =
      dbApprovals
        ?.filter((a) => a?.id && a?.employee__account__email)
        ?.map((a) => ({
          id: String(a?.id),
          email: a.employee__account__email,
        })) || [];
    setSelectedApprovers(normalized);
  }, [settingData]);

  useEffect(() => {
    const ch = settingData?.approval_req_channel;
    if (Array.isArray(ch)) {
      const ids = ch.map((c) => (typeof c === "string" ? c : String(c?.id)));
      if (ids.includes("1") && ids.includes("2")) setCheckedi("1,2");
      else if (ids.includes("1")) setCheckedi("1");
      else if (ids.includes("2")) setCheckedi("2");
    }
  }, [settingData]);

  const handleSettingsUpdate = async () => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.patch(`/company/payroll/settings/`, {
        pay_day: form?.pay_day,
        payment_mode: selectedPlan,
        cutt_off_day: form?.payment_pipeline,
        payslip_send_mode: deliveryMethod,
        send_payslip_to: form?.send_payslip_to,
        leave_allowance: form?.leave_allowance,
        payroll_extra_month_percentage: form?.payroll_extra_month_percentage,
        payroll_extra_month_payout_month:
          form?.payroll_extra_month_payout_month,
        loan_repayment_freq: form?.loan_repayment_freq,
        loan_repayment_percentage: form?.loan_repayment_percentage,
        payroll_approvals: selectedApprovers.map((a) => a.id),
        approval_req_channel: checkedi
          ? checkedi.includes(",")
            ? checkedi.split(",")
            : [checkedi]
          : [],
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(
          res?.data?.message || "Payroll settings updated successfully"
        );
      }

      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const data = [
    {
      payType: "Monthly",
      desc: "Pay employees, remit taxes & pay out bonuses once a month.",
      value: "monthly",
    },

    {
      payType: "Bi-monthly",
      desc: "Bi-monthly payouts with taxes remitted in the second.",
      value: "bi-monthly",
    },
    {
      payType: "Custom Date",
      desc: "Pay employees, remit taxes & pay out bonuses once a month.",
      value: "custom",
    },
  ];

  const delivery = [
    {
      payType: "Manual Delivery",
      value: "manual",
      desc: "Payslips will only be sent when the admin manually triggers it during the payroll process.",
    },
    {
      payType: "Automated Delivery",
      value: "auto",
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
        <main className="p-4 md:p-6 lg:p-20 overflow-y-scroll">
          <div className="mb-10">
            <HeadingSubHead heading="Payroll Settings" withSubHead={false} />
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorFetch
              onRefetch={fetchPayrollSettingsProfile}
              message="Error fetching payroll settings"
            />
          ) : (
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
                        onClick={() => setSeledtedPLan(type?.value)}
                      >
                        <div className="">
                          {selectedPlan === type?.value ? (
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
                        Pay Day
                      </Label>
                      <Input
                        type="number"
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
                        type="number"
                        id="payment_pipeline"
                        name="payment_pipeline"
                        value={form?.payment_pipeline || ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            payment_pipeline: e.target.value,
                          })
                        }
                      />

                      <p className="text-sm text-[#8D8D95] mt-[6px]">
                        Cut-off Date is the final day for submitting timesheets,
                        expense reports, or approvals.{" "}
                      </p>
                    </div>

                    {/* <div>
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
                </div> */}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
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
                      <Label id="approver" className="block mb-[6px]">
                        Payroll Admin Approvers
                      </Label>
                      <select
                        name="approver"
                        id="approver"
                        value={approverSelectValue}
                        onChange={(e) => {
                          const value = e.target.value;
                          setApproverSelectValue(value);
                          handleAddApprover(value);
                          setApproverSelectValue("");
                        }}
                        disabled={selectedApprovers.length >= MAX_APPROVERS}
                        className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-3 text-sm rounded-lg"
                      >
                        <option value="">Select Approver</option>
                        {approveList?.employees?.map((el) => (
                          <option value={el?.id} key={el?.id}>
                            {el?.employee_email}
                          </option>
                        ))}
                      </select>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedApprovers.map((a) => (
                          <div
                            key={a.id}
                            className="flex gap-x-[6px] bg-[#E7E9EA] rounded-[20px] py-1 pr-2 pl-1 w-fit items-center"
                          >
                            <div className="h-5 w-5 rounded-full bg-[#009BC0] text-white flex items-center justify-center text-[11px] font-medium">
                              {initialsFromEmail(a.email)}
                            </div>
                            <p className="text-[13px] text-[#2F2F33] font-medium">
                              {a.email}
                            </p>
                            <LiaTimesCircle
                              fill="#71717A"
                              size={18}
                              onClick={() => handleRemoveApprover(a.id)}
                              className="cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>

                      <p className="text-sm font-semibold text-[#E37915] mt-6 flex items-center gap-x-1">
                        <GoPlus size={18} fill="#E37915" /> Add Another Approver
                        ({Math.max(0, MAX_APPROVERS - selectedApprovers.length)}{" "}
                        left)
                      </p>

                      <div className="mt-8">
                        <p className="font-medium text-base text-[#2F2F33] mb-4">
                          Send approval request notifications to:
                        </p>

                        <div className="flex flex-col gap-y-4">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              id="email-check"
                              checked={checkedi === "1"}
                              onChange={() => setCheckedi("1")}
                              className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label
                              htmlFor="email-check"
                              className="text-sm font-medium text-[#374151]"
                            >
                              Email
                            </label>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={checkedi === "2"}
                              id="Slack-check"
                              onChange={() => setCheckedi("2")}
                              className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label
                              htmlFor="Slack-check"
                              className="text-sm font-medium text-[#374151]"
                            >
                              Slack
                            </label>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              id="both-check"
                              checked={checkedi === "1,2"}
                              onChange={() => {
                                setCheckedi("1,2");
                              }}
                              className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label
                              htmlFor="both-check"
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
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
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
                        onClick={() => setDeliveryMethod(type?.value)}
                      >
                        <div className="">
                          {deliveryMethod === type?.value ? (
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
                          id="email-send"
                          name="send_payslip_to"
                          value={"email"}
                          checked={form?.send_payslip_to === "email"}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              send_payslip_to: e.target.value,
                            })
                          }
                          className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                        />
                        <label
                          htmlFor="email-send"
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
                          id="slack-send"
                          value={"slack"}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              send_payslip_to: e.target.value,
                            })
                          }
                          className="h-5 w-5 cursor-pointer rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <label
                          htmlFor="slack-send"
                          className="text-sm font-medium text-[#374151] cursor-pointer"
                        >
                          Slack
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          id="both-send"
                          name="send_payslip_to"
                          value={"both"}
                          checked={form?.send_payslip_to === "both"}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              send_payslip_to: e.target.value,
                            })
                          }
                          className="h-5 w-5 rounded border-gray-300 cursor-pointer text-orange-600 focus:ring-orange-500"
                        />
                        <label
                          htmlFor="both-send"
                          className="text-sm font-medium text-[#374151] cursor-pointer"
                        >
                          Both
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
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
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
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
                        name="payroll_extra_month_percentage"
                        value={form?.payroll_extra_month_percentage}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            payroll_extra_month_percentage: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label className="mb-[6px] block">
                        Payout month (1 - 12)
                      </Label>

                      <Input
                        type="number"
                        placeholder="0"
                        id="amount"
                        name="payroll_extra_month_payout_month"
                        value={form?.payroll_extra_month_payout_month}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            payroll_extra_month_payout_month: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
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
                        name="loan_repayment_percentage"
                        value={form?.loan_repayment_percentage}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            loan_repayment_percentage: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label className="mb-[6px] block" id="repayemnt">
                        Loan Repayment Frequency
                      </Label>

                      <select
                        name="loan_repayment_freq"
                        id="repayemnt"
                        value={form?.loan_repayment_freq}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            loan_repayment_freq: e.target.value,
                          })
                        }
                        className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="monthly">Monthly</option>
                        <option value="bi-monthly">Bi-Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F7F7] p-4 flex justify-end border-t border-[#E3E3E5] rounded-bl-lg rounded-br-lg">
                  <Button
                    className="w-[100px]"
                    btnType="button"
                    onButtonClick={() => handleSettingsUpdate()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default PayrollSettings;
