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

const EditHomeAddress = ({
  onModalClose,
  employeeInfo,
}: {
  onModalClose: () => void;
  employeeInfo: dataDetails;
}) => {
  const [form, setForm] = useState({
    country: employeeInfo?.country || "",
    state: employeeInfo?.state || "",
    city: employeeInfo?.city || "",
    street_address: employeeInfo?.street_address || "",
    postal_code: employeeInfo?.postal_code || "",
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
        country: "",
        state: "",
        street_address: "",
        city: "",
        postal_code: "",
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
              Edit Home Address
            </h2>
          </div>

          <div className="p-6 flex flex-col gap-y-4">
            <div>
              <Label
                //   htmlFor="first-name"
                id="country"
                className="block mb-1"
              >
                Country
              </Label>
              <Input
                type="text"
                id="country"
                name="country"
                value={form?.country || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="email" className="block mb-1">
                State
              </Label>
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="Enter State"
                value={form?.state || ""}
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
                name="city"
                placeholder="Enter City"
                value={form?.city || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="address" className="block mb-1">
                Address
              </Label>
              <Input
                type="text"
                id="address"
                name="street_address"
                placeholder="Enter Address"
                value={form?.street_address || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label id="postal-code" className="block mb-1">
                Postal Code
              </Label>
              <Input
                type="text"
                id="postal-code"
                name="postal_code"
                placeholder="Enter Postal Code"
                value={form?.postal_code || ""}
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

export default EditHomeAddress;
