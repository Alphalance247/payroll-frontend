import Label from "@/app/common/label";
import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import toast from "react-hot-toast";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";
const EditBankDetails = ({ onModalClose }: { onModalClose: () => void }) => {
  const { employeeData, fetchPersonalDetails } = useEmployeeStore();
  const [form, setForm] = useState({
    bank_name: employeeData?.data.bank_name || "",
    acct_num: employeeData?.data.acct_num || "",
    acct_name: employeeData?.data.acct_num || "",
    bvn: employeeData?.data.bank_code || "",
    // reason: "Tell us why you are requesting this changes",
  });
  const [editForm, setEditForm, resetForm] = useBoolean();
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
      setEditForm();
      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        {
          ...form,
        }
      );
      onModalClose();
      resetForm();
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      toast.error(errorMessage);
    }

    onModalClose();
  };
  return (
    <ModalOverlay onClose={onModalClose} className="">
      <div className="w-[528px] h-[524px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50 shadow-lg mt-20   ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px]"
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Bank Address
            </h2>
          </div>
          <div className="grid gap-y-4 p-6">
            <div className="">
              <Label
                id="bank_name"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Bank Name
              </Label>
              <br />
              <input
                type="text"
                name="bank_name"
                readOnly
                value={form.bank_name}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="acct_num"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Account Number
              </Label>
              <br />
              <input
                type="text"
                name="acct_num"
                readOnly
                value={form.acct_num}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="acct_name"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Account Name
              </Label>
              <br />

              <input
                type="text"
                name="acct_name"
                readOnly
                value={form.acct_name}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="bvn"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                BVN
              </Label>
              <br />
              <input
                type="text"
                name="bvn"
                value={form.bvn}
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
              {editForm ? "updated" : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditBankDetails;
