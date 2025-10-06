import React, { useEffect } from "react";
import { useEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
interface JobDetailProps {
  title: string;
}
const JobDetails = ({ title }: JobDetailProps) => {
  const { employeeData, loading, error, fetchPersonalDetails } =
    useEmployeeStore();

  return (
    <div className="grid gap-[10px] border-[1px] rounded-[10px] h-fit  p-10">
      <div className=" w-[615px]">
        <div className="flex justify-between items-center pb-6  ">
          <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
            {title}
          </h1>
        </div>
        <div className="grid gap-y-10">
          {loading ? (
            <div>
              <Spinner />
            </div>
          ) : error ? (
            <ErrorFetch
              message="Error Fetching leave request"
              onRefetch={() => fetchPersonalDetails()}
            />
          ) : (
            <>
              {!employeeData ? (
                <div>Employee job Details not found</div>
              ) : (
                <>
                  <div className="flex ">
                    <div className="w-2/3">
                      <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                        <div className="text-[#4D4D4D] text-sm font-normal capitalized ">
                          Hired Type
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                          {employeeData.data.job_type}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          job title
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                          {employeeData.data.job_role}
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
                          {employeeData.data.team.name}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          mobile number
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                          {employeeData.data.phone}
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
                          {employeeData.data.start_date}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          contract end date
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                          {}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
