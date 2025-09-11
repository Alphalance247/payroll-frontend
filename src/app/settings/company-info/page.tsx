"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import DashboardLayout from "../../common/DashBoardLayout";
import ProtectedRoute from "../../common/protectedRoute";
import Image from "next/image";
import Button from "@/app/common/Button";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { environment } from "@/app/env/env.local";
import { AxiosError } from "axios";
import { getCompanyInformation } from "@/stores/settings/company-info/companyInfo";

const CompanyInfo = () => {
  const [loading, setLoading] = useState(false);
  const { data: companyInfoData, fetCompanyInformation } =
    getCompanyInformation();
  useEffect(() => {
    fetCompanyInformation();
  }, [fetCompanyInformation]);

  const data = companyInfoData?.companies[0];

  const [form, setForm] = useState({
    name: "",
    type: "",
    sector: "",
    reg_no: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
    file: null,
  });

  useEffect(() => {
    if (data) {
      setForm((prev) => ({
        ...prev,
        name: data?.name,
        sector: data?.sector,
        city: data?.city,
        state: data?.state,
        zip_code: data?.zip_code,
        reg_no: data?.reg_no,
        address: data?.address,
        country: data?.country,
      }));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();

      // Add farm data
      formData.append("name", form?.name);
      formData.append("street", form?.address);
      formData.append("type", form?.type);
      formData.append("state", form?.state);
      formData.append("city", form?.city);
      formData.append("zip_code", form?.zip_code);
      formData.append("country", form?.country);
      formData.append("reg_no", form?.reg_no);
      formData.append("reg_no", form?.sector);

      // Add files
      if (file) {
        formData.append("logo", file);
      }

      const res = await axiosInstance.patch(
        environment?.baseUrl + "/company/company-data/1/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success(
          res.data?.statusmessage || "company profile successfull updated"
        );
        fetCompanyInformation();
      }

      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage =
        "Please make sure all fields are filled correctly. and try again.";

      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);

      setLoading(false);
    }
  };

  const [preview, setPreview] = useState<string | null | undefined>(data?.logo);
  const [file, setFile] = useState<File | null>(null);

  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("File must be less than 5MB");
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <HeadingSubHead
            heading="Company Information"
            withSubHead={false}
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
          />

          <div className="mt-10">
            <p className="text-base font-medium text-[#2F2F33] mb-5">
              Company Logo
            </p>

            <div className="flex gap-x-4">
              <div className="flex gap-x-4 items-center mb-12">
                {preview ? (
                  <Image
                    src={preview || ""}
                    height={84}
                    width={84}
                    alt="profileImage"
                    className="h-[84px] w-[84px] rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/settings/Content.png"
                    width={100}
                    height={88}
                    alt="company logo"
                  />
                )}
                <label
                  className="rounded-md font-poppinsSemiBold text-sm text-[#282A03] block w-fit lg:w-fit lg:text-left cursor-pointer"
                  id="image-upload"
                >
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-[#4D4D4D] mb-2">
                    Your company logo will reflect on employee invites and
                    payslips.
                  </p>
                  <p className="text-xs font-medium text-[#4D4D4D] mb-4">
                    Jpegs and PNGs allowed. Max size: 1mb
                  </p>
                  <p className="text-sm px-3 py-2 font-Graphik font-semibold rounded-md bg-[#F1F1F2] text-[#2F2F33] border border-[#E3E3E5] w-fit">
                    {" "}
                    Upload Logo
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
              Company Information
            </p>

            <form
              action="submit"
              className="pt-10 flex flex-col gap-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <Label id="companyname" className="block mb-1">
                  Company Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={form?.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label id="sector" className="block mb-[6px]">
                    Sector/Industry
                  </Label>

                  <Input
                    type="text"
                    id="sector"
                    name="sector"
                    value={form?.sector || ""}
                    onChange={(e) =>
                      setForm({ ...form, sector: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label id="reg_no" className="block mb-1">
                    Registration Number
                  </Label>
                  <Input
                    type="text"
                    id="reg_no"
                    name="reg_no"
                    placeholder="Enter Reg No"
                    value={form?.reg_no || ""}
                    onChange={(e) =>
                      setForm({ ...form, reg_no: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label id="address" className="block mb-1">
                  Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  value={form?.address || ""}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>

              {/* <div>
                <Label id="address_2" className="block mb-1">
                  Address Line 2
                </Label>
                <Input
                  type="text"
                  id="address_2"
                  name="address_2"
                  value={form?.address_2 || ""}
                  onChange={(e) =>
                    setForm({ ...form, address_2: e.target.value })
                  }
                />
              </div> */}

              <div>
                <Label id="country" className="block mb-1">
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={form?.country || ""}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label id="state" className="block mb-1">
                    State
                  </Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={form?.state || ""}
                    onChange={(e) =>
                      setForm({ ...form, state: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label id="city" className="block mb-1">
                    City/Region
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={form?.city || ""}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label id="zip_code" className="block mb-1">
                    Zip Code (optional)
                  </Label>
                  <Input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={form?.zip_code || ""}
                    onChange={(e) =>
                      setForm({ ...form, zip_code: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-x-2 mt-4">
                <Button className="w-fit" variant="secondary">
                  Cancel
                </Button>
                <Button
                  className="w-[144px]"
                  variant="primary"
                  btnType="submit"
                >
                  {loading ? "saving...." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default CompanyInfo;
