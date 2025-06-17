"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import PhoneInput from "react-phone-number-input";
import styles from "../../../styles/phone.module.scss";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import "react-phone-number-input/style.css";
import { dataDetails } from "@/app/utils/type";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import useBoolean from "@/app/hooks/useBoolean";

const EditPersonalDetails = ({
  onModalClose,
  employeeInfo,
}: {
  onModalClose: () => void;
  employeeInfo: dataDetails;
}) => {
  const [form, setForm] = useState({
    fullname: employeeInfo?.fullname || "",
    email: employeeInfo?.email || "",
    phone: employeeInfo?.phone || "",
    dob: employeeInfo?.dob || "",
    country: employeeInfo?.country || "",
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
      setForm({
        fullname: "",
        email: "",
        phone: "",
        dob: "",
        country: "",
      });
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
              Edit Personal Details
            </h2>
          </div>

          <div className="p-6 flex flex-col gap-y-4">
            <div>
              <Label
                //   htmlFor="first-name"
                id="firstname"
                className="block mb-1"
              >
                Full Name
              </Label>
              <Input
                type="text"
                id="firstname"
                name="fullname"
                value={form?.fullname || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="email" className="block mb-1">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={form?.email || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="phone-number" className="block mb-1">
                Phone Number
              </Label>

              <PhoneInput
                placeholder="8140686688"
                international
                defaultCountry="NG"
                required
                value={form?.phone || ""}
                onChange={(value) =>
                  setForm({
                    ...form,
                    phone: value || "",
                  })
                }
                className={`${styles.PhoneInput} outline-green-400`}
                numberInputProps={{
                  className: `outline-none border-[#E0E0E0] border-[1px] text-[black] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px]`,
                }}
              />
            </div>

            <div>
              <Label id="date-of-birth" className="block mb-1">
                Date of Birth
              </Label>
              <Input
                type="date"
                id="date-of-birth"
                placeholder="21-Mar-1980"
                name="dob"
                value={form?.dob || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="country" className="block mb-1">
                Country
              </Label>
              <Input
                type="text"
                id="country"
                name="country"
                placeholder="Enter Country"
                value={form?.country || ""}
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

export default EditPersonalDetails;
