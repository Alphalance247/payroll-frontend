"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import { useState } from "react";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Button from "@/app/common/Button";
import styles from "../../../styles/phone.module.scss";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";

const Account = () => {
  const [form, setForm] = useState({
    firstname: "",
    phone: "",
  });
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
              <div className="flex gap-x-4 items-center mb-12">
                <p className="h-20 w-20 rounded-full bg-[#009BC0] text-white flex items-center justify-center text-sm font-medium">
                  {"Moshoood Azeez"
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </p>

                <p className="py-[10px] px-3 border-[#E3E3E5] border rounded-md">
                  Upload photo
                </p>
              </div>

              <div className="mb-10">
                <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
                  Personal Information
                </p>

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
                        name="fullname"
                        value={form?.firstname || ""}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label id="email" className="block mb-1">
                        Last Name
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form?.firstname || ""}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </div>
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
                      value={form?.firstname || ""}
                      onChange={(e) =>
                        setForm({ ...form, firstname: e.target.value })
                      }
                    />
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
                        id="email"
                        readonly
                        name="email"
                        placeholder="Enter Email"
                        value={"Admin"}
                        className="bg-[#F1F1F2] cursor-not-allowed"
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-2 mt-4">
                    <Button className="w-fit" variant="secondary">
                      Cancel
                    </Button>
                    <Button className="w-fit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              <div className="Password">
                <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
                  Personal Information
                </p>

                <div className="mt-8">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="firstname"
                        className="block mb-1"
                      >
                        Current Password
                      </Label>
                      <Input
                        type="password"
                        id="firstname"
                        name="fullname"
                        value={form?.firstname || ""}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="firstname"
                        className="block mb-1"
                      >
                        New Password
                      </Label>
                      <Input
                        type="password"
                        id="firstname"
                        name="fullname"
                        value={form?.firstname || ""}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label
                        //   htmlFor="first-name"
                        id="firstname"
                        className="block mb-1"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        id="firstname"
                        name="fullname"
                        value={form?.firstname || ""}
                        onChange={(e) =>
                          setForm({ ...form, firstname: e.target.value })
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
