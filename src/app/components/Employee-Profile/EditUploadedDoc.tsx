import React, { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Label from "@/app/common/label";

const EditUploadedDoc = ({ onModalClose }: { onModalClose: () => void }) => {
  const [form, setForm] = useState({
    doc_name: "",
    doc_type: "",
    file_size: "",
    reason: "",
    image: "",
  });
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const handlePictureUpload = () => {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setPreview("");
  };
  return (
    <ModalOverlay onClose={onModalClose} className="">
      <div className="w-[528px] h-[686px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50  shadow-lg mt-20   ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px]"
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Document
            </h2>
          </div>
          <div className="grid gap-y-4 p-6">
            <div className="">
              <Label
                id="doc_type"
                className="text-[#2F2F33] text-sm font-medium font-Graphik "
              >
                {" "}
                Document type
              </Label>
              <br />
              <input
                type="text"
                name="doc_type"
                value={form.doc_type}
                onChange={handleChange}
                className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
              />
            </div>
            <div className="grid gap-y-3">
              <div>
                <Label
                  id="doc_name"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Document name
                </Label>
                <br />
                <input
                  type="text"
                  name="doc_name"
                  value={form.doc_name}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="flex justify-center items-center ">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col justify-center items-center rounded-[8px]  bg-[#FFFFFF] border-[1px] border-[#E3E3E5]  w-full mt-2 h-[168px] text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2]   cursor-pointer"
                >
                  <div className=" flex flex-col items-center justify-center h-[120px]  ">
                    {" "}
                    {preview ? (
                      <img
                        src={preview || ""}
                        height={84}
                        width={84}
                        alt="profileImage"
                        className="h-[84px] w-[84px] rounded-full"
                      />
                    ) : (
                      <div className="my-4 bg-[#F5F5F5] h-[44px] w-[44px] flex justify-center items-center rounded-full">
                        <div className="items-center">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.50141 17.75C9.09141 17.75 8.75141 17.41 8.75141 17V12.81L8.03141 13.53C7.74141 13.82 7.26141 13.82 6.97141 13.53C6.68141 13.24 6.68141 12.76 6.97141 12.47L8.97141 10.47C9.18141 10.26 9.51141 10.19 9.79141 10.31C10.0714 10.42 10.2514 10.7 10.2514 11V17C10.2514 17.41 9.91141 17.75 9.50141 17.75Z"
                              fill="#E37915"
                            />
                            <path
                              d="M11.5014 13.7499C11.3114 13.7499 11.1214 13.6799 10.9714 13.5299L8.97141 11.5299C8.68141 11.2399 8.68141 10.7599 8.97141 10.4699C9.26141 10.1799 9.74141 10.1799 10.0314 10.4699L12.0314 12.4699C12.3214 12.7599 12.3214 13.2399 12.0314 13.5299C11.8814 13.6799 11.6914 13.7499 11.5014 13.7499Z"
                              fill="#E37915"
                            />
                            <path
                              d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H14.5C14.91 1.25 15.25 1.59 15.25 2C15.25 2.41 14.91 2.75 14.5 2.75H9.5C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V10C21.75 9.59 22.09 9.25 22.5 9.25C22.91 9.25 23.25 9.59 23.25 10V15C23.25 20.43 20.93 22.75 15.5 22.75Z"
                              fill="#E37915"
                            />
                            <path
                              d="M22.5 10.75H18.5C15.08 10.75 13.75 9.41999 13.75 5.99999V1.99999C13.75 1.69999 13.93 1.41999 14.21 1.30999C14.49 1.18999 14.81 1.25999 15.03 1.46999L23.03 9.46999C23.24 9.67999 23.31 10.01 23.19 10.29C23.07 10.57 22.8 10.75 22.5 10.75ZM15.25 3.80999V5.99999C15.25 8.57999 15.92 9.24999 18.5 9.24999H20.69L15.25 3.80999Z"
                              fill="#E37915"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-Inter text-[#CF6E13] text-center font-medium font-Graphik">
                        Click to replace document
                      </p>
                      <p className="text-[12px] font-normal text-center text-[#353535] font-Graphik">
                        {" "}
                        (Max. File size: 25 MB)
                      </p>
                      {/* <p className="text-[#A3A3A3] text-[16.5px] text-center">
                        {file ? `${file.name}` : "JPG, JPEG, PNG less than 1MB"}
                      </p> */}
                    </div>
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePictureUpload}
                  />
                </label>
              </div>
              <div className="">
                <Label
                  id=" reason "
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Reason For Update
                </Label>
                <br />
                <textarea
                  name="reason"
                  placeholder="Tell us why you are requesting this changes"
                  //   value={bankForm.reason}
                  //   onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-[132px] w-full mt-2  text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2] pt-3 resize-none placeholder:text-[#BEBEC2] placeholder:font-Graphik placeholder:text-base placeholder:font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 px-6 border-t-[1px] h-[68px]  border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
            <button
              className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
              onClick={onModalClose}
            >
              Cancel
            </button>
            <button className="bg-[#E37915] w-[81px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm">
              {/* {editHouseDetails ? "Updated" : "Submit Request"} */}save
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default EditUploadedDoc;
