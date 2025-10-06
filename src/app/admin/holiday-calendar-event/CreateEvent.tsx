import Button from "@/app/common/Button";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Label from "@/app/common/label";
import ModalOverlay from "@/app/common/modal/modal";
import Input from "@/app/common/input";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { getHolidayStore } from "@/stores/home/getHoliday";

const CreateEvent = ({ onModalClose }: { onModalClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    startTime: "",
    endTime: "",
    location: "",
  });
  const { fetchPayrollHoliday } = getHolidayStore();

  const formOptions = [{ name: "lagos" }, { name: "osun" }, { name: "kwara" }];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(`/leaves/events`, { ...form });

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.statusmessage || "Event created successfully");
        onModalClose();
        fetchPayrollHoliday();
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
      <div className="w-[558px] h-fit border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative  z-50 shadow-lg">
        <div className="grid gap-y-4 ">
          <div className="flex justify-between items-center px-4 pt-6">
            <div className="text-large text-[#2F2F33] font-semibold font-Graphik">
              Create Event
            </div>
            <FaTimes
              className="text-base text-[#71717A] cursor-pointer"
              onClick={() => onModalClose()}
            />
          </div>
          <form
            className="grid gap-y-4"
            onSubmit={handleSubmit}
            action={"submit"}
          >
            <div className="px-4 pb-6">
              <div>
                <Label
                  id="title"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  Title
                </Label>
                <br />
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={form?.title || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label
                  id="description"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  Description
                </Label>
                <textarea
                  name="description"
                  required
                  value={form?.description || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  id="description"
                  className="resize-none outline-[#51F4A6] h-[90px] rounded-[8px] border-[1px] border-[#D3D3D6]  w-full mt-2 text-[#2F2F33] text[16px] font-normal p-3 font-Graphik"
                ></textarea>
              </div>
              <div>
                <Label
                  id="date"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  Date
                </Label>
                <br />
                <div className="flex  items-center space-x-6">
                  <Input
                    type="date"
                    name="start"
                    value={form?.start || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        start: e.target.value,
                      })
                    }
                    placeholder="Start Date"
                  />
                  <Input
                    type="date"
                    name="end"
                    value={form?.end || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        end: e.target.value,
                      })
                    }
                    id="end"
                    placeholder="End Date"
                  />{" "}
                </div>
              </div>
              {/* <div>
              <Label
                id="time"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                Time
              </Label>
              <br />
              <div className="flex  items-center space-x-6">
                <input
                  type="text"
                  name="time"
                  id=""
                  placeholder="Start Time"
                  className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
                <input
                  type="text"
                  name="time"
                  id=""
                  placeholder="End Time"
                  className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />{" "}
              </div>
            </div> */}
              <div>
                <Label id="location">Location</Label>
                <br />
                <select
                  name="location"
                  required
                  id="location"
                  value={form?.location || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                >
                  <option value=""></option>
                  {formOptions.map((option, index) => (
                    <option
                      value={option?.name}
                      key={index}
                      className="capitalize"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end items-center  bg-[#F7F7F7] h-[68px] border-t border-[#D3D3D6] mt-4 px-4 rounded-b-[8px]">
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  className="w-[96px] text-[#2F2F33] text-sm font-semibold font-Graphik"
                  onButtonClick={() => onModalClose()}
                  btnType="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="w-[133px] text-[#F7F7F7] text-sm font-semibold font-Graphik"
                  btnType="submit"
                >
                  {loading ? "creating...." : "Create Event"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CreateEvent;
