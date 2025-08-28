"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import CollapseHeading from "@/app/common/colllapseHeading";

const LoanRequestModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    description: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit">
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold">
              Loan Request
            </h2>
          </div>

          <div className="overflow-y-auto h-[500px]">
            <div className="p-4 flex flex-col gap-y-4">
              <div>
                <Label id="date-of-birth" className="block mb-1">
                  Loan Amount
                </Label>
                <Input
                  type="number"
                  id="date-of-birth"
                  placeholder="0.00"
                  name="dob"
                  value={form?.dob || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label id="firstname" className="block mb-1">
                  Repayment Duration
                </Label>
                <select
                  id="job-title"
                  name="job_type"
                  value={form?.country || ""}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                >
                  <option value=""></option>
                  <option value="1 Month">1 Month</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              <div>
                <Label id="firstname" className="block mb-1">
                  Loan purpose
                </Label>
                <select
                  id="job-title"
                  name="job_type"
                  value={form?.country || ""}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                >
                  <option value=""></option>
                  <option value="Emergency">Emergency</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>

              <div>
                <Label id="country" className="block mb-1">
                  Description
                </Label>
                <textarea
                  id=""
                  className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                  placeholder="Add context if needed..."
                  value={form?.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  name="description"
                >
                  {" "}
                </textarea>
              </div>
            </div>

            <CollapseHeading text="Real Time Calculation" />

            <div className="py-2 px-6 border-y border-[#E3E3E5]">
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
            <Button className="w-fit">{"Save Changes"}</Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default LoanRequestModal;
