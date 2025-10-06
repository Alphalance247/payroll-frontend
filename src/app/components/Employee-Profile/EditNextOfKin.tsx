import Label from "@/app/common/label";
import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";
import { useEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
const EditNextOfKin = ({ onModalClose }: { onModalClose: () => void }) => {
  const { employeeData, fetchPersonalDetails } = useEmployeeStore();
  const [editNok, setEditNok, resetEditNok] = useBoolean(false);
  const [form, setForm] = useState({
    fullname: employeeData?.data.nok_name || "",
    relationship: "",
    email: "",
    city: "",
    mobile_no: employeeData?.data.nok_phone || "",
    country: "",
    // reason: "Tell us why you are requesting this changes",
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
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEditNok();
      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        {
          ...form,
        }
      );
      if (response.status === 200 || 201) {
        console.log(response.data);
      }
      onModalClose();
      resetEditNok();
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      toast.error(errorMessage);
    }
    onModalClose();
    onModalClose();
    resetEditNok();
  };
  return (
    <div>
      {" "}
      <ModalOverlay onClose={onModalClose} className="">
        <div className="w-[528px] h-[700px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50 shadow-lg mt-20   ">
          {" "}
          <form
            action="submit"
            onSubmit={handleSubmit}
            className="absolute z-50 w-[528px]"
          >
            <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
              <h2 id="" className="text-lg font-semibold mb-2 capitalize">
                Edit Next of Kin
              </h2>
            </div>
            <div className="grid gap-y-4 p-6">
              <div className="">
                <Label
                  id="fullname"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
                >
                  {" "}
                  Full Name
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
                  id="relationship"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
                >
                  {" "}
                  relationship
                </Label>
                <br />
                <input
                  type="text"
                  name="relationship"
                  value={form.relationship}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="email"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
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
                  id="mobile_no"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
                >
                  {" "}
                  Mobile Number
                </Label>
                <br />
                <input
                  type="text"
                  name="mobile_no"
                  value={form.mobile_no}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="city"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
                >
                  {" "}
                  city
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
                  id="country"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik capitalize "
                >
                  {" "}
                  country
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
              {/* <div className="">
              <Label
                id=" Upload proof "
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Reason For Update
              </Label>
              <br />
              <textarea
                name="reason"
                value={bankForm.reason}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-[132px] w-full mt-2  text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2] pt-3 resize-none"
              ></textarea>
            </div> */}
            </div>
            <div className="flex items-center justify-end gap-x-4 mt-2 px-6 border-t-[1px] h-[68px] border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
              <button
                className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
                onClick={onModalClose}
              >
                Cancel
              </button>
              <button className="bg-[#E37915] w-[156px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm capitalize">
                {editNok ? "Updated" : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </ModalOverlay>
    </div>
  );
};

export default EditNextOfKin;
