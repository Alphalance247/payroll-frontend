"use client";
import Label from "@/app/common/label";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { getLoanRequestList } from "@/stores/loan/getLoanList";
import Input from "@/app/common/input";

const QueryModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const [loading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    query_type: "",
    title: "",
    description: "",
  });

  const { fetchLoanRequestList } = getLoanRequestList();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoanRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(`/employees/queries/add-query`, {
        ...form,
      });

      if (res.status === 200 || res.status === 201 || res.status === 206) {
        toast.success(res?.data?.message || "Loan request added successfully");
        // Refresh loan details after loan request
        fetchLoanRequestList();
        onModalClose();
      }

      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files?.[0];
    if (uploadFile && uploadFile.size <= 5 * 1024 * 1024) {
      setFile(uploadFile);

      setPreview(URL.createObjectURL(uploadFile));
    } else {
      alert("File must be less than 5MB");
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg h-fit relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit" onSubmit={handleLoanRequest}>
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold">
              Raise Request
            </h2>
          </div>

          <div className="overflow-y-auto h-[450px]">
            <div className="p-4 flex flex-col gap-y-4">
              <div>
                <Label id="date-of-birth" className="block mb-1">
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder=""
                  name="title"
                  value={form?.title || ""}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label id="query_type" className="block mb-1">
                  Request Type
                </Label>
                <select
                  id="query_type"
                  name="query_type"
                  required
                  value={form?.query_type || ""}
                  onChange={handleChange}
                  className="w-full border border-[#E0E0E0] rounded-md text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                >
                  <option value=""></option>
                  <option value="Salary">Salary</option>
                  <option value="Tax">Tax</option>
                  <option value="Loan">Loan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label id="purpose" className="block mb-1">
                  Description
                </Label>
                <textarea
                  id=""
                  className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                  placeholder="Add context if needed..."
                  value={form?.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  name="description"
                >
                  {" "}
                </textarea>
              </div>

              <div className="">
                <p className="text-[#2F2F33] text-sm font-medium font-Graphik ">
                  {" "}
                  Attachment (Optional)
                </p>
                <br />
                <div className="flex justify-center items-center ">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col justify-center items-center rounded-[8px] bg-[#F7F7F7] border-[1px] border-[#E3E3E5]  w-full h-[168px] text[16px] font-medium pl-4 font-Graphik text-[#BEBEC2]  border-dashed cursor-pointer"
                  >
                    <div className=" flex flex-col items-center justify-center h-[120px]">
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
                        <svg
                          className="mb-4"
                          width="44"
                          height="42"
                          viewBox="0 0 44 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.57812 26.0972C4.57812 26.7274 4.67189 27.3579 4.89551 28.1069L4.95996 28.3198C5.90809 31.1482 8.51833 33.0482 11.4531 33.0483H38.0684L36.417 38.3579C35.9493 40.1635 34.2809 41.3891 32.4551 41.3892C32.0987 41.3889 31.7433 41.3432 31.3984 41.2524L3.04883 33.5767C0.861852 32.9667 -0.44114 30.677 0.130859 28.4692L4.57812 13.4595V26.0972ZM39.4102 0.61084C41.9365 0.610901 43.9939 2.69056 43.9941 5.24463V25.6343C43.994 28.1885 41.9365 30.268 39.4102 30.2681H11.9092C9.38325 30.268 7.32633 28.1884 7.32617 25.6343V5.24463C7.32636 2.69058 9.38327 0.610935 11.9092 0.61084H39.4102ZM11.9092 4.31787C11.4035 4.31797 10.9933 4.73305 10.9932 5.24463V22.7407L16.0527 17.6265C17.3049 16.3588 19.3457 16.3589 20.5996 17.6265L22.8184 19.8638L29.627 11.6011C30.2355 10.8634 31.1267 10.4367 32.0762 10.4312C33.0312 10.4531 33.9208 10.8426 34.5352 11.5708L40.3271 18.4038V5.24463C40.327 4.73307 39.9163 4.31793 39.4102 4.31787H11.9092ZM16.4951 6.17139C18.5174 6.17139 20.1621 7.83392 20.1621 9.87842C20.1621 11.9229 18.5174 13.5854 16.4951 13.5854C14.473 13.5853 12.8281 11.9228 12.8281 9.87842C12.8281 7.83408 14.4729 6.17151 16.4951 6.17139Z"
                            fill="#A3A3A3"
                          />
                        </svg>
                      )}
                      <div>
                        <p className="text-[18px] font-Inter text-[#525252] text-center">
                          <span className="text-[#CF6E13] pr-1 ">
                            Click to upload
                          </span>
                          or drag and drop
                        </p>
                        <p className="text-[#A3A3A3] text-[16.5px] text-center">
                          {file
                            ? `${file.name}`
                            : "JPG, JPEG, PNG less than 1MB"}
                        </p>
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
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-4 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5] mt-4">
            <Button
              variant="secondary"
              className="w-fit"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button className="w-fit">
              {loading ? "Submitting...." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default QueryModal;
