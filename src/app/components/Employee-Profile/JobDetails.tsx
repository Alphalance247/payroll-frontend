import React, { useEffect } from "react";
import { useEmployeeStore } from "@/stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface JobDetailProps {
  title: string;
}
const JobDetails = ({ title }: JobDetailProps) => {
  const { employee, loading, fetchPersonalDetails } = useEmployeeStore();
  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);
  return (
    <div className="grid gap-[10px] border-[1px] rounded-[10px] h-[436px]  p-10">
      <div className="h-[396px] w-[615px]">
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
          ) : (
            <>
              {employee ? (
                <>
                  <div className="flex ">
                    <div className="w-2/3">
                      <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                        <div className="text-[#4D4D4D] text-sm font-normal capitalized ">
                          Hired Type
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                          {employee.data.job_type}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          job title
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                          {employee.data.job_role}
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
                          {employee.data.team.name}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          mobile number
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                          {employee.data.phone}
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
                          {employee.data.start_date}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                        <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                          contarct end date
                        </div>
                        <div className="font-medium text-base font-Graphik text-[#4D4D4D]">
                          {}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="font-Graphik text-[#4D4D4D] px-6 pt-6">
                  No job details availlable
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
