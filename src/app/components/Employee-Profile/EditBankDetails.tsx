import Label from "@/app/common/label";
import ModalOverlay from "@/app/common/modal/modal";
import { useState } from "react";
const EditBankDetails = ({ onModalClose }: { onModalClose: () => void }) => {
  const [bankForm, setBankForm] = useState({
    bankName: "Access bank",
    accountNo: "08134490207",
    accountName: "Adeola Lawal",
    bvn: "8134490207",
    reason: "Tell us why you are requesting this changes",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBankForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit edit");
    onModalClose();
  };
  return (
    <ModalOverlay onClose={onModalClose} className="">
      <div className="w-[528px] h-[708px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50 shadow-lg mt-20   ">
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
                id="Bankname"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Bank Name
              </Label>
              <br />
              <input
                type="text"
                name="bankname"
                value={bankForm.bankName}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="accountnumber"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Account Number
              </Label>
              <br />
              <input
                type="text"
                name="accountnumber"
                value={bankForm.accountNo}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
              <Label
                id="accountname"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Account Name
              </Label>
              <br />
              <input
                type="text"
                name="accountname"
                value={bankForm.accountName}
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
                value={bankForm.bvn}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="">
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

export default EditBankDetails;
