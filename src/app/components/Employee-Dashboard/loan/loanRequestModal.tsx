"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useEffect, useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
// import CollapseHeading from "@/app/common/colllapseHeading";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { getLoanCategory } from "@/stores/employee-dashboard/loan/loanCategories";
import { getLoanRequestList } from "@/stores/loan/getLoanList";
import { getEmployeeLoanList } from "@/stores/employee-dashboard/loan/loanList";

const LoanRequestModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    purpose: "",
    description: "",
    amount: "",
    due_date: "",
    category: "",
  });

  const { fetchLoanCategory, data } = getLoanCategory();
  const { fetchEmployeeLoanList } = getEmployeeLoanList();

  useEffect(() => {
    fetchLoanCategory();
  }, [fetchLoanCategory]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoanRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(`/employees/loan-request`, {
        ...form,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Loan request added successfully");
        // Refresh loan details after loan request
        fetchEmployeeLoanList();
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
              Loan Request
            </h2>
          </div>

          <div className="overflow-y-auto h-[350px]">
            <div className="p-4 flex flex-col gap-y-4">
              <div>
                <Label id="date-of-birth" className="block mb-1">
                  Loan Amount
                </Label>
                <Input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  name="amount"
                  value={form?.amount || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label id="due_date" className="block mb-1">
                  Due Date
                </Label>
                <Input
                  type="date"
                  id="due_date"
                  placeholder="0.00"
                  name="due_date"
                  value={form?.due_date || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label id="purpose" className="block mb-1">
                  Category
                </Label>
                <select
                  id="category"
                  name="category"
                  required
                  value={form?.category || ""}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                >
                  <option value=""></option>
                  {data?.data?.map((el) => (
                    <option value={el?.id} key={el?.id}>
                      {el?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label id="purpose" className="block mb-1">
                  Description
                </Label>
                <textarea
                  id=""
                  className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                  placeholder="Add context if needed..."
                  value={form?.purpose || ""}
                  onChange={(e) =>
                    setForm({ ...form, purpose: e.target.value })
                  }
                  name="purpose"
                >
                  {" "}
                </textarea>
              </div>
            </div>

            {/* <CollapseHeading text="Real Time Calculation" /> */}

            {/* <div className="py-2 px-6 border-y border-[#E3E3E5]">
              {[
                { label: "Estimated Monthly Repayment:", value: "NGN 168,000" },
                { label: "Total Payable:", value: "NGN 168,000" },
              ].map((item, i) => (
                <div className="flex justify-between py-1" key={i}>
                  <p className="text-sm text-[#71717A] font-medium">
                    {item?.label}
                  </p>
                  <p className="text-[#2F2F33] text-base">{item?.value}</p>
                </div>
              ))}
            </div> */}
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

export default LoanRequestModal;
