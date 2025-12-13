"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { usePayslip } from "@/app/hooks/useQueries/bonus/usePayslip";
import { useEmployeeListData } from "@/app/hooks/useQueries/useEmployeeData";

const PayslipModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [form, setForm] = useState({
    employee: "",
    payslip: "",
    amount: "",
  });
  const { data: employeePayslip } = usePayslip({ id: employeeId });
  const { data } = useEmployeeListData();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "employee") {
      setEmployeeId(value);
    }
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
    const payslipId = form?.payslip;
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axiosInstance.patch(
        `/employees/bonuses/add-bonus-to-payslip/${payslipId}`,
        { amount: form?.amount }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Bonus  added successfully");
      }

      setForm((prev) => ({
        ...prev,
        employee: "",
        payslip: "",
        amount: "",
      }));

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
              Payslip Bonus
            </h2>
          </div>

          <div className="overflow-y-auto h-[300px]">
            <div className="p-4 flex flex-col gap-y-4">
              <div>
                <Label id="employee" className="block mb-1">
                  Employee Name
                </Label>
                <select
                  name="employee"
                  required
                  id="employee"
                  value={form?.employee}
                  onChange={handleChange}
                  className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                >
                  <option value="">Employees</option>
                  {data?.employees?.map((el) => (
                    <option value={el?.id} key={el?.id}>
                      {el?.fullname}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label id="due_date" className="block mb-1">
                  Payslip
                </Label>
                <select
                  name="payslip"
                  id="payslip"
                  required
                  value={form?.payslip}
                  onChange={handleChange}
                  className={`w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg ${
                    employeeId ? "" : "cursor-not-allowed opacity-40"
                  }`}
                  disabled={!employeeId}
                >
                  <option value="">select payslip</option>
                  {employeePayslip?.data?.map((el) => (
                    <option value={el?.id} key={el?.id}>
                      {el?.id}
                    </option>
                  ))}
                </select>
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

export default PayslipModal;
