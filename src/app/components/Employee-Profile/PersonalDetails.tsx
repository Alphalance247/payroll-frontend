import React, { useState } from "react";
// import ProfileSidebar from "../Employee-Dashboard/Home/profileSidebar";
import { Pencil } from "lucide-react";
interface PersonalDetailsProp {
  title: string;
  children: any;
  fullName: string;
  employeeID: string;
  email: string;
  mobileNo: string;
  birthdate: string;
  nationality: string;
}
// const [openModal, setOpenModal] = useState(false);

const PersonalDetails = ({
  title,
  children,
  fullName,
  employeeID,
  email,
  mobileNo,
  birthdate,
  nationality,
}: PersonalDetailsProp) => {
  return (
    <div className="grid gap-[10px]   border-[1px] rounded-[10px] p-10">
      <div className="flex justify-between items-center pb-6  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
          {title}
        </h1>
        {children}
      </div>
      <div className="grid gap-y-10">
        <div className="flex ">
          <div className="w-2/3">
            <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
              <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                Full Name
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {fullName}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-[205px] h-[60px] flex flex-col space-y-4">
              <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                Employment ID
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {employeeID}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
              <div className="text-[#4D4D4D] text-sm font-normal capitalize">
                Email
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {email}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-[211px] h-[60px] flex flex-col space-y-4">
              <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                Mobile Number
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {mobileNo}
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
              <div className="text-[#4D4D4D] text-sm font-normal ">
                Birthdate
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {birthdate}{" "}
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-[210px] h-[60px] flex flex-col space-y-4">
              <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                Nationality
              </div>
              <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                {nationality}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
