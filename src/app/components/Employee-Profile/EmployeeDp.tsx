import React, { useEffect, useState } from "react";
import { TiCamera } from "react-icons/ti";
import { useEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import Label from "@/app/common/label";
interface DpProps {
  dp: string;
}
const EmployeeDp = ({ dp }: DpProps) => {
  const [preview, setPreview] = useState<string | null | undefined>(null);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({});
  const { employeeData, loading } = useEmployeeStore();

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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!employeeData ? (
            <div className="px-72">Employee profile is not available</div>
          ) : (
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
                    <img src={dp} alt="" />
                  )}
                  <form action="">
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
                    </Label>
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
