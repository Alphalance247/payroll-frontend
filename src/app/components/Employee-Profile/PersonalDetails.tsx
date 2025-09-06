import React, { useEffect } from "react";
import { useEmployeeStore } from "../../../stores/employeeDetails/PersonalDetail";
import Spinner from "@/app/common/spinner";
interface PersonalDetailsProp {
  title: string;
  children: any;
}
const PersonalDetails = ({ title, children }: PersonalDetailsProp) => {
  const { employee, loading, fetchPersonalDetails } = useEmployeeStore();
  // console.log(employee?.data);
  useEffect(() => {
    fetchPersonalDetails();
  }, [fetchPersonalDetails]);
  return (
    <div className="grid gap-[10px] border-[1px] rounded-[10px] p-10 ">
      <div className="flex justify-between items-center pb-6  ">
        <h1 className="text-xl text-[#4D4D4D] font-semibold font-Graphik capitalize">
          {title}
        </h1>
        {children}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {!employee ? (
            <div className="font-Graphik text-[#4D4D4D] px-6 pt-6">
              No details found
            </div>
          ) : (
            <div className="grid gap-y-10">
              <>
                <div className="flex ">
                  <div className="w-2/3">
                    <div className="w-[266.33px] h-[60px] flex flex-col space-y-4">
                      <div className="text-[#4D4D4D] text-sm font-normal capitalize ">
                        Full Name
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employee.data.fullname}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[205px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                        Employment ID
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employee.data.employee_id}
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
                        {employee.data.email}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[211px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                        Mobile Number
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employee.data.phone}
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
                        {employee.data.dob}{" "}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="w-[210px] h-[60px] flex flex-col space-y-4">
                      <div className="text-sm font-normal font-Graphik text-[#4D4D4D] capitalize">
                        Nationality
                      </div>
                      <div className="font-medium text-base font-Graphik text-[#4D4D4D] capitalize">
                        {employee.data.country}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalDetails;
