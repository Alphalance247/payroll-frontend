"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useEffect, useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { getLeaveType } from "@/stores/employee-dashboard/leave/leaveType";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getEmployeeLeaveList } from "@/stores/employee-dashboard/leave/getEmployeeLeaveRequest";

const LeaveRequestModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const { data: leaveType, fetchLeaveType } = getLeaveType();
  const { fetchEmployeeLeaveList } = getEmployeeLeaveList();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployeeLeaveList();
    fetchLeaveType();
  }, [fetchLeaveType, fetchEmployeeLeaveList]);

  const [form, setForm] = useState({
    leave_type: "",
    end_date: "",
    start_date: "",
    reason: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaveRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axiosInstance.post(`/leaves/leave-requests`, {
        ...form,
      });

      if (res.status === 200 || res?.status === 201) {
        toast.success(res?.data?.message || "Leave request added successfully");
        onModalClose();
      }

      setLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.statusmessage || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit" onSubmit={handleLeaveRequest}>
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold">
              New Leave Request
            </h2>
          </div>

          <div className="p-4 flex flex-col gap-y-4">
            <div>
              <Label
                //   htmlFor="first-name"
                id="leave_type"
                className="block mb-1"
              >
                Leave Type
              </Label>
              <select
                id="leave_type"
                name="leave_type"
                value={form?.leave_type || ""}
                onChange={handleChange}
                className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              >
                <option value=""></option>
                {leaveType?.results?.map((el) => (
                  <option value={el?.id} key={el?.id}>
                    {el?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label id="start_date" className="block mb-1">
                Start Date
              </Label>
              <Input
                type="date"
                id="start_date"
                placeholder="21-Mar-1980"
                name="start_date"
                value={form?.start_date || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="end_date" className="block mb-1">
                End Date
              </Label>
              <Input
                type="date"
                id="end_date"
                placeholder="21-Mar-1980"
                name="end_date"
                value={form?.end_date || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="country" className="block mb-1">
                Description
              </Label>
              <textarea
                id=""
                className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                placeholder=""
                value={form?.reason || ""}
                required
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                name="teamdescription"
              >
                {" "}
              </textarea>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5]">
            <Button
              variant="secondary"
              className="w-fit"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button className="w-fit" btnType="submit">
              {loading ? "Saving...." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default LeaveRequestModal;
