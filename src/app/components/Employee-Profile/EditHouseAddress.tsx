import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";
import useBoolean from "@/app/hooks/useBoolean";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Label from "@/app/common/label";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "@/app/common/Button";

const EditHouseAddress = ({ onModalClose }: { onModalClose: () => void }) => {
  const { employeeData, fetchPersonalDetails } = UseEmployeeStore();
  const [form, setForm] = useState({
    country: employeeData?.data.country || "",
    state: employeeData?.data.state || "",
    city: employeeData?.data.city || "",
    street_address: employeeData?.data.street_address || "",
    postal_code: employeeData?.data.postal_code || "",
  });
  const [editHouseDetails, setEditHouseDetails, resetEditHouseDetails] =
    useBoolean(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEditHouseDetails();
      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        {
          country: form.country,
          state: form.state,
          city: form.city,
          street_address: form.street_address,
          postal_code: form.postal_code,
        }
      );
      if (response.status === 200 || 201) {
        toast.success("House Address updated successfully!");
      }
      setForm({
        country: "",
        state: "",
        city: "",
        street_address: "",
        postal_code: "",
      });
      onModalClose();
      resetEditHouseDetails();
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      onModalClose();
      resetEditHouseDetails();
    }
  };
  return (
    <ModalOverlay onClose={onModalClose} className="">
      <div className="w-[528px] h-[540px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50  shadow-lg mt-20   ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px]"
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Housing Address
            </h2>
          </div>
          <div className="h-[400px] overflow-auto">
            <div className="grid gap-y-4 p-6">
              <div className="">
                <Label
                  id="country"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Country
                </Label>
                <br />
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="state"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  State
                </Label>
                <br />
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="city"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  City
                </Label>
                <br />
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="street_address"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Street Address
                </Label>
                <br />
                <input
                  type="text"
                  name="street_address"
                  value={form.street_address}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="postal_code"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Postal Code
                </Label>
                <br />
                <input
                  type="text"
                  name="postal_code"
                  value={form.postal_code}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 px-6 border-t-[1px] h-[68px]  border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
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
              {editHouseDetails ? "Updating..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditHouseAddress;
