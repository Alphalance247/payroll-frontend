import React, { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import PhoneInput from "react-phone-number-input";
import styles from "../../../styles/phone.module.scss";
import "react-phone-number-input/style.css";
import Label from "@/app/common/label";
import useBoolean from "@/app/hooks/useBoolean";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Button from "@/app/common/Button";
const EditPersonalDetails = ({
  onModalClose,
}: {
  onModalClose: () => void;
}) => {
  const { employeeData, fetchPersonalDetails } = UseEmployeeStore();
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    fullname: employeeData?.data.fullname || "",
    email: employeeData?.data.email || "",
    phoneNumber: employeeData?.data.phone || "",
    nationality: employeeData?.data.country || "",
    dob: employeeData?.data.dob || "",
  });
  const [
    editemployeeDetails,
    setEditEmployeeDetails,
    resetEditEmployeeDetails,
  ] = useBoolean(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEditEmployeeDetails();
      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        {
          fullname: form.fullname,
        }
      );
      if (response.status === 200 || 201) {
        toast.success("Employee Details updated successfully!");
      }
      setForm({
        fullname: "",
        email: "",
        dob: "",
        phoneNumber: "",
        nationality: "",
      });
      onModalClose();
      resetEditEmployeeDetails();
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      resetEditEmployeeDetails();
    }
  };
  return (
    <ModalOverlay onClose={onModalClose} className=" ">
      <div className="w-[528px] h-[540px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative  z-50   shadow-lg mt-20  ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px] "
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Personal Details
            </h2>
          </div>
          <div className="h-[400px] overflow-auto">
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
                  name="fullname"
                  value={form.fullname}
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
                  readOnly
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
                  readOnly
                  value={form.phoneNumber || ""}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      phoneNumber: value || "",
                    })
                  }
                  className={`${styles.PhoneInput} outline-none rounded-md border-none mt-2 h-10`}
                  numberInputProps={{
                    className: `outline-none border-[#E0E0E0] border-[1px] text-[black] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px] h-10  font-normal font-Graphik`,
                  }}
                />
              </div>
              <div className="">
                <Label
                  id="dob"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Date of Birth
                </Label>
                <br />
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  readOnly
                  value={form.dob}
                  onChange={handleChange}
                  onMouseOver={() => setShowPopup(true)}
                  onMouseLeave={() => setShowPopup(false)}
                  className="relative rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="nationality"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Nationality
                </Label>
                <br />
                <input
                  type="text"
                  name="nationality"
                  value={form.nationality}
                  readOnly
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 mt-2 px-6 border-t-[1px] h-[68px] border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
            <Button
              variant="secondary"
              className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className=" w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm"
            >
              {editemployeeDetails ? "Updating.." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditPersonalDetails;
