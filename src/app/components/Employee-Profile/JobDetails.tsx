import React from "react";
interface JobDetailProps {
  title: string;
  hiredType: string;
  jobTitle: string;
  team: string;
  mobileNo: string;
  contractStartDate: string;
  contractEndDate: string;
}
const JobDetails = ({
  title,
  hiredType,
  jobTitle,
  team,
  mobileNo,
  contractStartDate,
  contractEndDate,
}: JobDetailProps) => {
  return (
    <div className="grid gap-[10px] border-[1px] rounded-[10px] h-[436px]  p-10">
      <div className="h-[396px] w-[615px]">
        <div className="flex justify-between items-center pb-6  ">
          <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
            {title}
          </h1>
        </div>
        <div className="grid gap-y-10">
          <div className="flex ">
            <div className="w-2/3">
              <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                <div className="text-[#4D4D4D] text-sm font-normal capitalized ">
                  Hired Type
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                  {hiredType}{" "}
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                  job title
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                  {jobTitle}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-2/3">
              <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize  ">
                  Team
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                  {team}
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                  mobile number
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                  {mobileNo}
                </div>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-2/3">
              <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize ">
                  contract start date
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                  {contractStartDate}{" "}
                </div>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                  contarct end date
                </div>
                <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                  {contractEndDate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
