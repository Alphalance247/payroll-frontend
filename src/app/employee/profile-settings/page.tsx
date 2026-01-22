"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import { nunito } from "@/app/common/font";
import { Pencil } from "lucide-react";
import EmployeeDp from "@/app/components/Employee-Profile/EmployeeDp";
import EmployeeSidebar from "@/app/components/Employee-Profile/EmployeeSidebar";
import PersonalDetails from "@/app/components/Employee-Profile/PersonalDetails";
import HomeAddress from "@/app/components/Employee-Profile/HomeAddress";
import JobDetails from "@/app/components/Employee-Profile/JobDetails";
import BankDetails from "@/app/components/Employee-Profile/BankDetails";
import NextOfKin from "@/app/components/Employee-Profile/NextOfKin";
import { useEffect, useState } from "react";
import EditPersonalDetails from "@/app/components/Employee-Profile/EditPersonalDetails";
import EditHouseAddress from "@/app/components/Employee-Profile/EditHouseAddress";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import { UseDocumentsUploaded } from "@/stores/employee-dashboard/settings/employeeDetails/UploadDocument";
import ProtectedRoute from "@/app/common/protectedRoute";
import TaxInformation from "@/app/components/Employee-Profile/taxInformation";
import TaxModal from "@/app/components/Employee-Profile/taxModal";

const EmployeeProfileSettings = () => {
  const [activeTab, setactiveTab] = useState("personal details");
  const [openPDModal, setOpenPDModal] = useState(false);
  const [openHousingModal, setOpenHousingModal] = useState(false);
  const [taxInfoModal, setTaxInfoModal] = useState(false);

  const RenderTabContent = () => {
    const { fetchPersonalDetails } = UseEmployeeStore();
    useEffect(() => {
      fetchPersonalDetails();
    }, [fetchPersonalDetails]);

    const { fetchDocument } = UseDocumentsUploaded();
    useEffect(() => {
      fetchDocument();
    }, [fetchDocument]);

    switch (activeTab) {
      case "personal details":
        return (
          <div className="grid gap-y-6">
            <PersonalDetails title="Personal details">
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
            <HomeAddress title="House Address">
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
        return <JobDetails title="job Details"></JobDetails>;
      case "bank details":
        return (
          <div>
            <BankDetails title="Bank Details" />{" "}
          </div>
        );
      case "next of kin":
        return (
          <div>
            <NextOfKin title="next of kin" />{" "}
          </div>
        );
      case "tax-information":
        return (
          <div>
            <TaxInformation title="tax information">
              <button
                className="capitalize text-[#E37915] underline outline-none flex items-center space-x-1 "
                onClick={() => setTaxInfoModal(true)}
              >
                <div> edit</div>
                <Pencil className="text-[#E37915] w-[13.5px] h-[13.5px]" />
              </button>
            </TaxInformation>
            {taxInfoModal && (
              <TaxModal onModalClose={() => setTaxInfoModal(false)} />
            )}
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <ProtectedRoute allowedUserTypes={["employee", "admin"]}>
      <EmployeeDashboardLayout>
        {/* the employee DP */}
        <div className="grid overflow-auto ">
          <EmployeeDp /> {/* sidebar tabs */}
          <div className="flex  px-[72px] space-x-10  ">
            <div className="w-1/4">
              <div className="pt-[37px] h-[461px] w-[217px] border-r-[2px] border-[#E8EAEE66]">
                <div className="grid gap-y-[10px]   ">
                  <EmployeeSidebar
                    onClick={() => setactiveTab("personal details")}
                    activeTab="personal details"
                    tabName="Personal Details"
                    className={
                      activeTab === "personal details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-fit h-10 font-medium text-[#2F2F33] text-base rounded-[8px] capitalize font-Graphik "
                        : `grid gap-2.5 py-[8px] px-3 text-start  w-fit h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize ${nunito.className}`
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("job details")}
                    activeTab="job details"
                    tabName="job Details"
                    className={
                      activeTab === "job details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-fit h-10 font-medium text-[#2F2F33] text-base rounded-[8px] capitalize font-Graphik "
                        : `grid gap-2.5 py-[8px] px-3 text-start  w-fit h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize ${nunito.className} `
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("bank details")}
                    activeTab="bank details"
                    tabName="bank Details"
                    className={
                      activeTab === "bank details"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-fit h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Graphik "
                        : `grid gap-2.5 py-[8px] px-3 text-start  w-fit h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize ${nunito.className} `
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("next of kin")}
                    activeTab="next of kin"
                    tabName="next of kin details"
                    className={
                      activeTab === "next of kin"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-fit h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Graphik "
                        : `grid gap-2.5 py-[8px] px-3 text-start  w-fit h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize ${nunito.className} `
                    }
                  />
                  <EmployeeSidebar
                    onClick={() => setactiveTab("tax-information")}
                    activeTab="tax-information"
                    tabName="tax information"
                    className={
                      activeTab === "tax-information"
                        ? "grid gap-2.5 py-[8px] px-3 text-start  bg-[#E379153B] w-fit h-10 font-medium  text-[#2F2F33] text-base rounded-[8px] capitalize font-Graphik "
                        : `grid gap-2.5 py-[8px] px-3 text-start  w-fit h-[44px]   bg-none text-[#71717A] font-bold text-base rounded-[8px] capitalize ${nunito.className} `
                    }
                  />
                </div>
              </div>
            </div>
            {/* personal details */}
            <div className="w-3/4  h-[700px] ">
              <div className="grid gap-y-8">{RenderTabContent()}</div>
            </div>
          </div>
        </div>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeProfileSettings;
