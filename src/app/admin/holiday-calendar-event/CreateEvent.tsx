import Button from "@/app/common/Button";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Label from "@/app/common/label";

const CreateEvent = () =>
  // { onModalClose }: { onModalClose: () => void }

  {
    const [form, setForm] = useState({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
    });
    const formOptions = [
      { name: "lagos" },
      { name: "osun" },
      { name: "kwara" },
    ];
    const handleSubmit = () => {
      console.log("submit");
    };
    return (
      // <ModalOverlay onClose={onModalClose}>
      <div className="w-[558px] h-[671px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative  z-50   shadow-lg mt-20 mb-20 ">
        <div className="grid gap-y-4 px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-large text-[#2F2F33] font-semibold font-Graphik">
              Create Event
            </div>
            <FaTimes className="text-base text-[#71717A]" />
          </div>
          <form className="grid gap-y-4">
            <div>
              <Label
                id="title"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                Title
              </Label>
              <br />
              <input
                type="text"
                name="title"
                id=""
                className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
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
                id=""
                className="resize-none h-[90px] rounded-[8px] border-[1px] border-[#D3D3D6]  w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
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
                <input
                  type="text"
                  name="date"
                  id=""
                  placeholder="Start Date"
                  className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
                <input
                  type="text"
                  name="date"
                  id=""
                  placeholder="End Date"
                  className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />{" "}
              </div>
            </div>
            <div>
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
            </div>
            <div>
              <Label id="location">Location</Label>
              <br />
              <select
                name="location"
                id=""
                className="rounded-[8px] border-[1px] border-[#D3D3D6] h-9 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              >
                {formOptions.map((option, index) => (
                  <option value="" key={index} className="capitalize">
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        <div className="flex justify-end items-center  bg-[#F7F7F7] h-[68px] border-t border-[#D3D3D6] mt-12 px-4 rounded-b-[8px]">
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="w-[96px] text-[#2F2F33] text-sm font-semibold font-Graphik"
              onButtonClick={() => handleSubmit()}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="w-[133px] text-[#F7F7F7] text-sm font-semibold font-Graphik"
              onButtonClick={() => handleSubmit()}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      // </ModalOverlay>;
    );
  };

export default CreateEvent;
