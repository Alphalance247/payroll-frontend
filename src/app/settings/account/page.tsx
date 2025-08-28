"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import { useEffect, useState } from "react";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Button from "@/app/common/Button";
import styles from "../../../styles/phone.module.scss";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { environment } from "@/app/env/env.local";
import { AxiosError } from "axios";
import { getCompanyProfile } from "@/stores/settings/account/profile";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const { data: preferenceData, fetchCompanyProfle } = getCompanyProfile();
  useEffect(() => {
    fetchCompanyProfle();
  }, [fetchCompanyProfle]);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    email: "",
    role: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (preferenceData?.data) {
      setForm((prev) => ({
        ...prev,
        fullname: preferenceData?.data?.fullname || "",
        email: preferenceData?.data?.email || "",
        role: preferenceData?.data?.payroll_staff_role?.role || "",
        phone: preferenceData?.data?.employee_data?.phone || "",
      }));
    }
  }, [preferenceData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();

      // Add farm data
      formData.append("name", form?.fullname);
      formData.append("phone", form?.phone);
      formData.append("email", form?.email);

      // Add files
      if (file) {
        formData.append("prof_im", file);
      }

      const res = await axiosInstance.patch(
        environment?.baseUrl + "/account/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data?.statusmessage || "Profile update successfully");
        fetchCompanyProfle();
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

  const [preview, setPreview] = useState<string | null | undefined>(
    preferenceData?.data?.prof_im
  );
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
          <section>
            <div className="mb-10">
              <HeadingSubHead
                heading="Your Account"
                subHead="nill"
                withSubHead={false}
              />
            </div>
            <div>
              <p className="text-[#2F2F33] font-medium text-base mb-5">
                Profile Photo
              </p>
              <div className="">
                <div className="flex gap-x-4 items-center mb-12">
                  {preview ? (
                    <img
                      src={preview || ""}
                      height={84}
                      width={84}
                      alt="profileImage"
                      className="h-[84px] w-[84px] rounded-full"
                    />
                  ) : (
                    <p className="h-20 w-20 rounded-full bg-[#009BC0] text-white flex items-center justify-center text-sm font-medium">
                      {"Moshoood Azeez"
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </p>
                  )}
                  <label
                    className="py-[10px] px-3 border-[#E3E3E5] border rounded-md font-poppinsSemiBold text-sm text-[#282A03] block w-fit lg:w-fit lg:text-center cursor-pointer"
                    id="image-upload"
                  >
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePictureUpload}
                      className="hidden"
                    />
                    Upload photo
                  </label>
                </div>
              </div>

              <div className="mb-10">
                <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
                  Personal Information
                </p>

                <form action="submit" onSubmit={handleSubmit}>
                  <div className="pt-6 flex flex-col gap-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          //   htmlFor="first-name"
                          id="firstname"
                          className="block mb-1"
                        >
                          Full Name
                        </Label>
                        <Input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={form?.fullname || ""}
                          onChange={(e) =>
                            setForm({ ...form, fullname: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label id="email" className="block mb-1">
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          value={form?.email || ""}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                        />
                      </div>

                      {/* <div>
                        <Label id="lastname" className="block mb-1">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          id="lastname"
                          name="lastname"
                          placeholder="Enter Last Name"
                          value={form?.lastname || ""}
                          onChange={(e) =>
                            setForm({ ...form, lastname: e.target.value })
                          }
                        />
                      </div> */}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label id="phone-number" className="block mb-1">
                          Phone Number
                        </Label>

                        <PhoneInput
                          placeholder="8140686688"
                          international
                          defaultCountry="NG"
                          required
                          value={form?.phone || ""}
                          onChange={(value) =>
                            setForm({ ...form, phone: value || "" })
                          }
                          className={`${styles.PhoneInput} outline-green-400`}
                          numberInputProps={{
                            className: `outline-none border-[#E0E0E0] border-[1px] text-[black] rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none text-sm w-[100%] px-3 py-[14px]`,
                          }}
                        />
                      </div>

                      <div>
                        <Label id="email" className="block mb-1">
                          Role
                        </Label>
                        <Input
                          type="email"
                          id="role"
                          readonly
                          name="role"
                          placeholder="Enter Email"
                          value={form?.role}
                          className="bg-[#F1F1F2] cursor-not-allowed"
                          onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-x-2 mt-4">
                      <Button className="w-fit" variant="secondary">
                        Cancel
                      </Button>
                      <Button
                        className="w-fit"
                        variant="primary"
                        btnType="submit"
                        onButtonClick={() => handleSubmit}
                      >
                        {loading ? "Saving..." : " Save Changes"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="Password">
                <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
                  Password
                </p>

                <div className="mt-8">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* <div>
                      <Label
                        //   htmlFor="first-name"
                        id="current_password"
                        className="block mb-1"
                      >
                        Current Password
                      </Label>
                      <Input
                        type="password"
                        id="current_password"
                        name="current_password"
                        value={form?.current_password || ""}
                        onChange={(e) =>
                          setForm({ ...form, current_password: e.target.value })
                        }
                      />
                    </div> */}

                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="new_password"
                        className="block mb-1"
                      >
                        New Password
                      </Label>
                      <Input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={form?.new_password || ""}
                        onChange={(e) =>
                          setForm({ ...form, new_password: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="confirm_password"
                        className="block mb-1"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={form?.confirm_password || ""}
                        onChange={(e) =>
                          setForm({ ...form, confirm_password: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-2 mt-8">
                    <Button className="w-fit" variant="secondary">
                      Cancel
                    </Button>
                    <Button className="w-fit" variant="primary">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Account;
