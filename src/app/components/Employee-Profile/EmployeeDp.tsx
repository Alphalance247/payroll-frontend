import React, { useEffect, useRef, useState } from "react";
import { TiCamera } from "react-icons/ti";
import { useEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import Label from "@/app/common/label";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
interface DpProps {
  dp: string;
}
const EmployeeDp = ({ dp }: DpProps) => {
  const { employeeData, loading, fetchPersonalDetails } = useEmployeeStore();
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    prof_img: file || "",
  });
  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("File must be less than 5MB");
    }
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        { prof_img: file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || 201) {
        toast.success("Employee Details updated successfully!");
        console.log(form.prof_img);
      }
      setForm({ prof_img: "" });
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!employeeData ? (
            <div className="px-72 py-20">Employee profile is not available</div>
          ) : (
            <div className="flex justify-between items-center shrink-0  px-[72px] h-[180px] my-[40px]   ">
              <div className="flex space-x-10 items-center ">
                <div className="relative">
                  {preview && (
                    <img
                      src={preview}
                      alt="DP"
                      className="h-[180px] w-[180px] rounded-full object-cover"
                    />
                  )}
                  {!preview && employeeData.data.prof_img && (
                    <img
                      src={employeeData.data.prof_img}
                      alt="DP"
                      className="h-[180px] w-[180px] rounded-full object-cover"
                    />
                  )}
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <Label
                      id="uploadDP"
                      className="absolute top-[140px] left-[127px] bg-[#E37915]  h-10 w-10 rounded-full cursor-pointer"
                    >
                      <input
                        type="file"
                        name="uploadDP"
                        id=""
                        accept="image/*"
                        onChange={handlePictureUpload}
                        className=" hidden cursor-pointer "
                      />
                      <TiCamera className=" h-6 w-6 absolute text-white top-2 left-2" />
                    </Label>{" "}
                    {file && (
                      <button className="bg-[#E37915] text-white w-24 h-6 rounded-sm font-Graphik font-medium mt-3">
                        Upload
                      </button>
                    )}
                  </form>
                </div>
                <div className="grid gap-2 ">
                  <h1
                    className="font-Graphik font-bold text-lg text-[#4D4D4D] capitalize
   "
                  >
                    {employeeData.data.fullname}
                  </h1>
                  <p className="font-Graphik font-medium text-base capitalize text-[#4D4D4D]">
                    {employeeData.data.job_role}
                  </p>
                </div>
              </div>
              <div className="w-[61.8px]">
                <button
                  className={
                    employeeData.data.status == "active"
                      ? " font-Graphik font-medium text[14.11px] leading[21.17px]  text-[#188C43] bg-[#E9F9EF] px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] capitalize"
                      : "font-Graphik font-medium text[14.11px] leading[21.17px]  text-red-500 bg-red-100 px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] capitalize"
                  }
                >
                  {employeeData?.data.status}
                </button>{" "}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EmployeeDp;
