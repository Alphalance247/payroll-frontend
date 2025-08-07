"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import DashboardLayout from "../../common/DashBoardLayout";
import ProtectedRoute from "../../common/protectedRoute";
import Image from "next/image";
import Button from "@/app/common/Button";
import Input from "@/app/common/input";
import Label from "@/app/common/label";
import { useState } from "react";

const CompanyInfo = () => {
  const [form, setForm] = useState({
    comapanyName: "",
    type: "",
    email: "",
  });
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
              <Image
                src="/assets/settings/Content.png"
                width={100}
                height={88}
                alt="company logo"
              />

              <div className="">
                <p className="text-sm text-[#4D4D4D] mb-2">
                  Your company logo will reflect on employee invites and
                  payslips.
                </p>
                <p className="text-xs font-medium text-[#4D4D4D] mb-4">
                  Jpegs and PNGs allowed. Max size: 1mb
                </p>
                <Button variant="secondary" className="w-fit">
                  Upload Logo
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="pb-6 font-medium text-base text-[#2F2F33] border-b border-[#E5E7EB]">
              Company Information
            </p>

            <form action="" className="pt-10 flex flex-col gap-y-4">
              <div>
                <Label id="firstname" className="block mb-1">
                  Company Name
                </Label>
                <Input
                  type="text"
                  id="firstname"
                  name="comapanyName"
                  value={form?.comapanyName || ""}
                  onChange={(e) =>
                    setForm({ ...form, comapanyName: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label id="firstname" className="block mb-[6px]">
                    Sector/Industry
                  </Label>
                  <select
                    name="sector"
                    id=""
                    className="w-full border text-[#BEBEC2] border-[#E3E3E5] px-3 py-[15px] text-sm rounded-lg"
                    onChange={(e) =>
                      setForm({ ...form, comapanyName: e.target.value })
                    }
                  >
                    <option value="">Select reminder</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <Label id="email" className="block mb-1">
                    Registration Number
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
              </div>

              <div>
                <Label id="firstname" className="block mb-1">
                  Address
                </Label>
                <Input
                  type="text"
                  id="firstname"
                  name="comapanyName"
                  value={form?.comapanyName || ""}
                  onChange={(e) =>
                    setForm({ ...form, comapanyName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label id="firstname" className="block mb-1">
                  Address Line 2
                </Label>
                <Input
                  type="text"
                  id="firstname"
                  name="comapanyName"
                  value={form?.comapanyName || ""}
                  onChange={(e) =>
                    setForm({ ...form, comapanyName: e.target.value })
                  }
                />
              </div>

              <div>
                <Label id="firstname" className="block mb-1">
                  Country
                </Label>
                <Input
                  type="text"
                  id="firstname"
                  name="comapanyName"
                  value={form?.comapanyName || ""}
                  onChange={(e) =>
                    setForm({ ...form, comapanyName: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label id="firstname" className="block mb-1">
                    State
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="comapanyName"
                    value={form?.comapanyName || ""}
                    onChange={(e) =>
                      setForm({ ...form, comapanyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label id="firstname" className="block mb-1">
                    City/Region
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="comapanyName"
                    value={form?.comapanyName || ""}
                    onChange={(e) =>
                      setForm({ ...form, comapanyName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label id="firstname" className="block mb-1">
                    Zip Code (optional)
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="comapanyName"
                    value={form?.comapanyName || ""}
                    onChange={(e) =>
                      setForm({ ...form, comapanyName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-x-2 mt-4">
                <Button className="w-fit" variant="secondary">
                  Cancel
                </Button>
                <Button className="w-[144px]" variant="primary">
                  Save Changes
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
