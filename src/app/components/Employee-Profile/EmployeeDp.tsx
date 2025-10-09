import React, { useState } from "react";
import { TiCamera } from "react-icons/ti";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import Label from "@/app/common/label";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import ErrorFetch from "@/app/common/errorFetch";
import { FaUser } from "react-icons/fa";
import Button from "@/app/common/Button";

const EmployeeDp = () => {
  const { employeeData, loading, fetchPersonalDetails, error } =
    UseEmployeeStore();
  const [savePicture, setSavePicture] = useState(false);
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDone, setIsDone] = useState(false);
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
    setSavePicture(true);
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
      setSavePicture(false);
      setIsDone(true);
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
      ) : error ? (
        <ErrorFetch
          message="Error Fetching leave request"
          onRefetch={() => fetchPersonalDetails()}
        />
      ) : (
        <>
          {employeeData && (
            <div className="flex justify-between items-center shrink-0  px-[72px] h-[180px] my-[40px]   ">
              <div className="flex space-x-10 items-center ">
                <div className="relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="DP"
                      className="h-[180px] w-[180px] rounded-full object-cover"
                    />
                  ) : (
                    <>
                      {employeeData.data.prof_img ? (
                        <img
                          src={employeeData.data.prof_img}
                          alt="DP"
                          className="h-[180px] w-[180px] rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-[180px] w-[180px] rounded-full object-cover bg-slate-500 flex items-center">
                          <div>
                            <FaUser className="h-[140px] w-[180px] flex justify-center items-center" />
                          </div>
                        </div>
                      )}
                    </>
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
                      />{" "}
                      <TiCamera className=" h-6 w-6 absolute text-white top-2 left-2" />
                    </Label>{" "}
                    <>
                      {!isDone && (
                        <Button
                          variant="primary"
                          disabled={savePicture}
                          className={`
                      ${
                        savePicture
                          ? "bg-[#E37915] opacity-60 text-white mt-3 ml-10 capitalize"
                          : "text-white  rounded-sm font-Graphik font-medium mt-3 ml-10 capitalize"
                      }`}
                        >
                          {savePicture ? "Saving..." : "Save Image"}
                        </Button>
                      )}
                    </>
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
