"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
// import CollapseHeading from "@/app/common/colllapseHeading";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";

const NonPayslipModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    employee_name: "",
    purpose: "",
    description: "",
    status: "",
    amount: "",
    due_date: "",
    category: "",
    repay_per_month_percentage: "10",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatNaira = (value: string) => {
    if (!value) return "";
    const numeric = Number(value.replace(/[^0-9]/g, ""));
    if (Number.isNaN(numeric)) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numeric);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setForm((prev) => ({ ...prev, amount: numericValue }));
  };

  const handleLoanRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const payload = { ...form };
      const res = await axiosInstance.post(`/employees/loan-request`, {
        ...payload,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Loan request added successfully");
        // Refresh loan details after loan request
        onModalClose();
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

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit" onSubmit={handleLoanRequest}>
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold">
              Non Payslip Bonus
            </h2>
          </div>

          <div className="overflow-y-auto h-[350px]">
            <div className="p-4 flex flex-col gap-y-4">
              <div>
                <Label id="date-of-birth" className="block mb-1">
                  Employee Name
                </Label>
                <Input
                  type="text"
                  id="employee_name"
                  placeholder="Enter employee name"
                  name="employee_name"
                  value={form?.employee_name || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label id="due_date" className="block mb-1">
                  Payslip
                </Label>
                <Input
                  type="text"
                  id="due_date"
                  placeholder="0.00"
                  name="due_date"
                  value={form?.due_date || ""}
                  readonly
                  onChange={handleChange}
                  className=" cursor-not-allowed opacity-90"
                />
              </div>

              <div>
                <Label id="due_date" className="block mb-1">
                  Amount
                </Label>
                <div>
                  <Input
                    type="text"
                    id="amount"
                    placeholder="₦0"
                    name="amount"
                    value={formatNaira(form?.amount || "")}
                    onChange={handleAmountChange}
                    className="pl-2"
                  />
                  <p className="text-xs text-[#E37915] mt-1">
                    Amounts are captured strictly in Nigerian Naira (₦).
                  </p>
                </div>
              </div>

              <div className="">
                <Label id="location"> Status</Label>
                <br />
                <select
                  name="status"
                  required
                  id="location"
                  value={form?.status}
                  onChange={handleChange}
                  className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                >
                  <option value="">Status</option>
                  <option value="in review">In review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <Label id="purpose" className="block mb-1">
                  Reason
                </Label>
                <textarea
                  id=""
                  className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                  placeholder="Add context if needed..."
                  value={form?.purpose || ""}
                  required
                  onChange={(e) =>
                    setForm({ ...form, purpose: e.target.value })
                  }
                  name="purpose"
                >
                  {" "}
                </textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5] mt-4">
            <Button
              variant="secondary"
              className="w-fit"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button className="w-fit">
              {loading ? "requesting...." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default NonPayslipModal;
