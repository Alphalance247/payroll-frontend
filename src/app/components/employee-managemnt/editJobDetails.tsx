"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import "react-phone-number-input/style.css";
import { dataDetails } from "@/app/utils/type";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import useBoolean from "@/app/hooks/useBoolean";

const EditJobDetails = ({
  onModalClose,
  employeeInfo,
}: {
  onModalClose: () => void;
  employeeInfo: dataDetails;
}) => {
  const [form, setForm] = useState({
    job_type: employeeInfo?.job_type || "",
    job_role: employeeInfo?.job_role || "",
    start_date: employeeInfo?.start_date || "",
    status: "",
  });
  const [editEmployee, setEditEmployee, resetEditEmployee] = useBoolean(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEditEmployee();
      const res = await axiosInstance.patch(
        `/employees/employee/${employeeInfo?.id}`,
        {
          ...form,
        }
      );

      if (res.status === 200) {
        toast.success("Employee updated successfully");
      }

      onModalClose();

      resetEditEmployee();
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      resetEditEmployee();
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit" onSubmit={handleSubmit}>
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              Edit Job Details
            </h2>
          </div>

          <div className="p-6 flex flex-col gap-y-4">
            <div>
              <Label id="job-title" className="block mb-1">
                Type
              </Label>
              <select
                id="job-title"
                name="job_type"
                value={form?.job_type || ""}
                onChange={handleChange}
                className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              >
                <option value="">Select Job Title</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>

            {/* the team name would be taken back here */}

            <div>
              <Label id="role" className="block mb-1">
                Role
              </Label>

              <Input
                type="text"
                id="role"
                placeholder="Enter Role"
                name="job_role"
                value={form?.job_role || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="status" className="block mb-1">
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={form?.status || ""}
                onChange={handleChange}
                className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              >
                <option value="">Select status</option>
                <option value="active">active</option>
                <option value="former">former</option>
                <option value="suspended">suspended</option>
              </select>
            </div>

            <div>
              <Label id="contract-start-date" className="block mb-1">
                Contract Start Date
              </Label>

              <Input
                type="date"
                id="contract-start-date"
                placeholder="21-Mar-2025"
                name="start_date"
                value={form?.start_date || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 p-4 mt-6 bg-[#F7F7F7] border-t border-[#E3E3E5]">
            <Button
              variant="secondary"
              className="w-fit"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button className="w-fit">
              {editEmployee ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditJobDetails;
