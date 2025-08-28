"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
// import ProfileSidebar from "@/app/components/Employee-Dashboard/Home/profileSidebar";
import { BsCameraFill } from "react-icons/bs";
import { Pen } from "lucide-react";
import { PenIcon } from "lucide-react";
import { Pencil } from "lucide-react";
import EmployeeDp from "@/app/components/Employee-Profile/EmployeeDp";
import EmployeeSidebar from "@/app/components/Employee-Profile/EmployeeSidebar";
import PersonalDetails from "@/app/components/Employee-Profile/PersonalDetails";
import HomeAddress from "@/app/components/Employee-Profile/HomeAddress";
import JobDetails from "@/app/components/Employee-Profile/JobDetails";
import BankDetails from "@/app/components/Employee-Profile/BankDetails";
import NextOfKin from "@/app/components/Employee-Profile/NextOfKin";
import { useState } from "react";
import Uploads from "@/app/components/Employee-Profile/Uploads";
import PaySlips from "@/app/components/Employee-Profile/PaySlips";
import EditPersonalDetails from "@/app/components/Employee-Profile/EditPersonalDetails";
import EditHouseAddress from "@/app/components/Employee-Profile/EditHouseAddress";
import EditBankDetails from "@/app/components/Employee-Profile/EditBankDetails";
import EditNextOfKin from "@/app/components/Employee-Profile/EditNextOfKin";
const pages = () => {
  const [activeTab, setactiveTab] = useState("personal details");
  const [openPDModal, setOpenPDModal] = useState(false);
  const [openBDModal, setOpenBDModal] = useState(false);
  const [openNOKModal, setOpenPNOKDModal] = useState(false);
  const [openHousingModal, setOpenHousingModal] = useState(false);
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal details":
        return (
          <div className="grid gap-y-6">
            <PersonalDetails
              title="Personal details"
              fullName="Ajibola Joyner Judas"
              employeeID="0123456789"
              email="Adetomiwa@Alluvium.net"
              mobileNo="08134490207"
              birthdate="29th September"
              nationality="Nigerian"
            >
              <button
                className="capitalize text-[#E37915] underline outline-none flex items-center space-x-1 "
                onClick={() => setOpenPDModal(true)}
              >
                <div> edit</div>
                <Pencil className="text-[#E37915] w-[13.5px] h-[13.5px]" />
              </button>
            </PersonalDetails>
            {openPDModal && (
              <EditPersonalDetails onModalClose={() => setOpenPDModal(false)} />
            )}
            <HomeAddress
              address="2, Abraham Adesanya"
              city=" Lagos"
              title="House Address"
            >
              <button
                className="capitalize text-[#E37915] underline outline-none flex items-center space-x-1 "
                onClick={() => setOpenHousingModal(true)}
              >
                <div> edit</div>
                <Pencil className="text-[#E37915] w-[13.5px] h-[13.5px]" />
              </button>
            </HomeAddress>
            {openHousingModal && (
              <EditHouseAddress
                onModalClose={() => setOpenHousingModal(false)}
              />
            )}
          </div>
        );

      case "job details":
        return (
          <JobDetails
            title="job Details"
            hiredType="employee"
            jobTitle="graphics designer"
            team="Design team"
            mobileNo="08134490207"
            contractStartDate="29th September"
            contractEndDate="29th September"
          ></JobDetails>
        );

      case "bank details":
        return (
          <div>
            <BankDetails
              title="Bank Details"
              bankName="access"
              accountName="Ajibola  Joyner Judas"
              accountNo="8134490207"
              bvn="8134490207"
            >
              {" "}
              <button
                className="capitalize text-[#E37915] underline outline-none flex items-center space-x-1 "
                onClick={() => setOpenBDModal(true)}
              >
                <div> edit</div>
                <Pencil className="text-[#E37915] w-[13.5px] h-[13.5px]" />
              </button>
            </BankDetails>
            {openBDModal && (
              <EditBankDetails onModalClose={() => setOpenBDModal(false)} />
            )}
          </div>
        );
      case "next of kin":
        return (
          <div>
            <NextOfKin
              title="next of kin"
              fullName="Ajibola  Joyner Judas"
              relationship="0123456789"
              email="08134490207"
              mobileNo="08134490207"
              city="lagos"
              country="Nigerian"
            >
              {" "}
              <button className="capitalize text-[#E37915] underline outline-none flex items-center space-x-1 ">
                <div> edit</div>
                <Pencil className="text-[#E37915] w-[13.5px] h-[13.5px]" />
              </button>
            </NextOfKin>
            {openNOKModal && <EditNextOfKin />}
          </div>
        );
      case "uploads":
        return <Uploads name={""} document={""} fileSize={""}></Uploads>;
      case "payslips":
        return <PaySlips></PaySlips>;

      default:
        return null;
    }
  };
  return (
    <div>
      <EmployeeDashboardLayout>
        {/* the employee DP */}
        <div className="grid  ">
          <EmployeeDp
            name={"Ajibola Joyner Judas"}
            role={"Graphic Designer"}
            dp={"/assets/employee-dashboard/home/DP.png"}
          >
            {" "}
            <div className="w-[61.8px]">
              <button className=" font-Graphik font-medium text[14.11px] leading[21.17px]  text-[#188C43] bg-[#E9F9EF] px-[9.41px] p-y[2.35px] border-[1.18px] rounded-[18.82px] ">
                Active
              </button>{" "}
            </div>
          </EmployeeDp>
          {/* sidebar tabs */}
          <div className="flex  px-[72px] space-x-10">
            <div className="w-1/4">
              <div className="pt-[37px] h-[461px] w-[217px] ">
                <div className="grid gap-y-[10px]  border-r-[2px] border-[#E8EAEE66] ">
                  <EmployeeSidebar
                    onClick={() => setactiveTab("personal details")}
                    activeTab="personal details"
                    tabName="Personal Details"
                    className={
                      activeTab === "personal details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[146px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("job details")}
                    activeTab="job details"
                    tabName="job Details"
                    className={
                      activeTab === "job details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[107px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("bank details")}
                    activeTab="bank details"
                    tabName="bank Details"
                    className={
                      activeTab === "bank details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[118px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("next of kin")}
                    activeTab="next of kin"
                    tabName="next of kin details"
                    className={
                      activeTab === "next of kin"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[164px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("uploads")}
                    activeTab="uploads"
                    tabName="uploads"
                    className={
                      activeTab === "uploads"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[87px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("payslips")}
                    activeTab="payslips"
                    tabName="payslips"
                    className={
                      activeTab === "payslips"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-[146px] h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Nunito"
                        : "grid gap-2.5 py-[8px] px-3 text-start  w-[185px] h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize font-Nunito"
                    }
                  />
                </div>
              </div>
            </div>
            {/* personal details */}
            <div className="w-3/4 ">
              <div className="grid gap-y-8">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </EmployeeDashboardLayout>
    </div>
  );
};

export default pages;
