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
import PhoneInput from "react-phone-number-input";
import styles from "../../styles/phone.module.scss";
import "react-phone-number-input/style.css";

const EditNextOfKin = ({
  onModalClose,
  employeeInfo,
}: {
  onModalClose: () => void;
  employeeInfo: dataDetails;
}) => {
  const [form, setForm] = useState({
    nok_name: employeeInfo?.nok_name || "",
    nok_phone: employeeInfo?.nok_phone || "",
    nok_address: employeeInfo?.nok_address || "",
    nok_country: employeeInfo?.country || "",
    nok_city: employeeInfo?.city || "",
    nok_relationship: "nill",
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
              Edit Next Of Kin details
            </h2>
          </div>

          <div className="p-6 flex flex-col gap-y-4">
            <div>
              <Label id="name" className="block mb-1">
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="nok_name"
                placeholder="Enter Name"
                value={form?.nok_name || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="relationship" className="block mb-1">
                Relationship
              </Label>
              <Input
                type="text"
                id="relationship"
                name="nok_relationship"
                placeholder="Enter Relationship"
                value={form?.nok_relationship || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="phone-number" className="block mb-1">
                Phone No.
              </Label>
              <PhoneInput
                placeholder="8140686688"
                international
                defaultCountry="NG"
                required
                value={form?.nok_phone || ""}
                onChange={(value) =>
                  setForm({ ...form, nok_phone: value || "" })
                }
                className={`${styles.PhoneInput} outline-green-400`}
                numberInputProps={{
                  className: `outline-none border-[#E0E0E0] border-[1px] text-[#98A1B0] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px]`,
                }}
              />
            </div>

            <div>
              <Label id="street-address" className="block mb-1">
                Street Address
              </Label>
              <Input
                type="text"
                id="street-address"
                name="nok_address"
                placeholder="Enter Street Address"
                value={form?.nok_address || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="city" className="block mb-1">
                City
              </Label>
              <Input
                type="text"
                id="city"
                placeholder="Enter City"
                name="nok_city"
                value={form?.nok_city || ""}
                onChange={handleChange}
              />
            </div>

            {/* Country Dropdown */}
            <div>
              <Label id="country" className="block mb-1">
                Country
              </Label>
              <Input
                type="text"
                id="country"
                name="nok_country"
                placeholder="Enter Country"
                value={form?.nok_country || ""}
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

export default EditNextOfKin;
