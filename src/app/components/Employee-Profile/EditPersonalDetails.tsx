import React from "react";
import ModalOverlay from "@/app/common/modal/modal";
const EditPersonalDetails = ({
  onModalClose,
}: {
  onModalClose: () => void;
}) => {
  return (
    <ModalOverlay onClose={onModalClose} className="relative  ">
      <div className="w-[528px] h-[796px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white absolute z-50 right-[615px]   shadow-lg mt-20  ">
        {" "}
        <form action="submit" className="absolute z-50 w-[528px]">
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Personal Details
            </h2>
          </div>
          <div className="grid gap-y-4 p-6">
            <div className="">
              <label
                htmlFor="fullname"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Full name
              </label>
              <br />
              <input
                type="text"
                name="fullname"
                value="Adeola Lawal"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Email
              </label>
              <br />
              <input
                type="email"
                name="fullname"
                value="Adeola@gmail.com"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="nationality"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Phone Number
              </label>
              <br />
              <input
                type="tel"
                name="fullname"
                value="(+234) 000-0000"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#BEBEC2] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="date of birth"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Date of Birth
              </label>
              <br />
              <input
                type="date"
                name="dateofbirth"
                value="21-Mar-1980"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor="nationality"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Nationaliy
              </label>
              <br />
              <input
                type="text"
                name="nationality"
                value="Nigerian"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <label
                htmlFor=" Reason For Update"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Reason For Update
              </label>
              <br />
              <textarea
                name="reason"
                value={"Tell us why you are requesting this changes"}
                // placeholder="Tell us why you are requesting this changes"
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-[132px] w-full mt-2  text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2] pt-3 resize-none"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 mt-2 px-6 border-t-[1px] h-[68px] border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
            <button
              className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
              onClick={onModalClose}
            >
              Cancel
            </button>
            <button className="bg-[#E37915] w-[156px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm">
              Submit Request{" "}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditPersonalDetails;
