import React, { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import PhoneInput from "react-phone-number-input";
import styles from "../../../styles/phone.module.scss";
import "react-phone-number-input/style.css";
import Label from "@/app/common/label";

const EditPersonalDetails = ({
  onModalClose,
}: {
  onModalClose: () => void;
}) => {
  const [form, setForm] = useState({
    fullName: "Adeola Lawal",
    email: "Adeola@gmail.com",
    phoneNumber: "+23480000000",
    reason: "Tell us why you are requesting this changes",
    nationality: "Nigerian",
    dob: "21-09-1980",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", form.fullName);
    data.append("email", form.email);
    data.append("dob", form.dob);
    data.append("phoneNumber", form.phoneNumber);
    data.append("reason", form.reason);
    data.append("nationality", form.nationality);

    console.log("submit");
    onModalClose();
  };
  return (
    <ModalOverlay onClose={onModalClose} className=" ">
      <div className="w-[528px] h-[796px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative  z-50   shadow-lg mt-20  ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px]"
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Personal Details
            </h2>
          </div>
          <div className="grid gap-y-4 p-6">
            <div className="">
              <Label
                id="fullname"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Full name
              </Label>
              <br />
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="email"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Email
              </Label>
              <br />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id=""
                className=" text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Phone Number
              </Label>
              <br />
              <PhoneInput
                placeholder="(+234) 000-0000"
                international
                defaultCountry="NG"
                required
                value={form.phoneNumber || ""}
                onChange={(value) =>
                  setForm({
                    ...form,
                    phoneNumber: value || "",
                  })
                }
                className={`${styles.PhoneInput} outline-green-400 mt-2 h-10`}
                numberInputProps={{
                  className: `outline-none border-[#E0E0E0] border-[1px] text-[black] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px] h-10`,
                }}
              />

              {/* <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#BEBEC2] text[16px] font-normal pl-4 font-Graphik"
              /> */}
            </div>
            <div className="">
              <Label
                id="date of birth"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Date of Birth
              </Label>
              <br />
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="nationality"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Nationaliy
              </Label>
              <br />
              <input
                type="text"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id=" Reason For Update"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Reason For Update
              </Label>
              <br />
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
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
