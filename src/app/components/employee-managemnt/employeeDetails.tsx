"use client";
import Profile from "@/app/components/employee-managemnt/profile";
import DashboardLayout from "../../common/DashBoardLayout";
import Image from "next/image";
import { useState } from "react";
import Job from "@/app/components/employee-managemnt/job";
import Uploads from "@/app/components/employee-managemnt/Uploads";
import TimeSheet from "@/app/components/employee-managemnt/timeSheet";
import DeactivateEmployee from "@/app/components/employee-managemnt/Team-Management/deactivateEmployee";
import useBoolean from "@/app/hooks/useBoolean";
// import axiosInstance from "@/app/utils/axios";
// import { employeeDetailsData } from "@/app/utils/type";
import Spinner from "@/app/common/spinner";
import { getTimeSheetWithId } from "@/stores/time-sheet-id/getTimeSheetWithId";
import TaxInfo from "./TaxInfo";
import { useEmployeeDataDetails } from "@/app/hooks/useQueries/employee-management/useEmployeeDetails";

interface EmployeeDetailsClientProps {
  employeeId: string;
}

export default function EmployeeDetailsClient({
  employeeId,
}: EmployeeDetailsClientProps) {
  const [activeBtn, setActiveBtn] = useState<string>("Projects");
  const [
    isEmployeeDeactivivated,
    setIsEmployeeDeactivated,
    resetIsEmployeeDeactivated,
  ] = useBoolean(false);

  const { fetchTimeSheetWithId, loading: timeSheetLoading } =
    getTimeSheetWithId();
  const {
    data: employeeData,
    error,
    isLoading,
    refetch,
  } = useEmployeeDataDetails({ id: employeeId });
  console.log("employeeData", employeeData?.data);

  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Projects" },
    { id: 2, name: "Job" },
    { id: 4, name: "Timesheet" },
    { id: 5, name: "TaxInfo" },
  ];

  // const [employeeData, setEmployeeData] = useState<employeeDetailsData | null>(
  //   null,
  // );
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchEmployeeData = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `/employees/employee/${employeeId}`,
  //       );
  //       setEmployeeData(res.data);
  //     } catch (err) {
  //       console.error("Failed to fetch employee:", err);
  //       setError("Failed to load employee data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEmployeeData();
  // }, [employeeId]);

  const employeeInfo = employeeData?.data;

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex gap-x-8 items-center mb-3">
          <Image
            src="/assets/employees-management/avatar.svg"
            height={56}
            width={56}
            alt="avatar"
          />

          <div>
            <h3 className="text-xl font-semibold text-[#2F3135] tracking-[-0.5px] mb-2">
              {employeeInfo?.job_role} - {employeeInfo?.team?.name}
            </h3>
            <p className="text-base font-normal text-[#838487]">
              {employeeInfo?.fullname}
            </p>
          </div>
        </div>

        <div>
          <div className="flex gap-x-3 items-center border-b border-[#E3E3E5]">
            {tabs.map((el, i) => (
              <button
                className={`${
                  activeBtn === el.name
                    ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                    : "text-[#71717A] border-transparent "
                }   font-semibold text-base p-4 border-b-[1px] cursor-pointer`}
                onClick={() => {
                  setActiveBtn(el.name);
                  if (el.name === "Timesheet") {
                    fetchTimeSheetWithId(employeeId);
                  }
                }}
                key={i}
              >
                {el.name}
              </button>
            ))}
          </div>

          {activeBtn === "Projects" && (
            <>
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <div>Error: {error?.message}</div>
              ) : employeeInfo ? (
                <Profile
                  onDeactivatingEmployee={() => setIsEmployeeDeactivated()}
                  employeeInfo={employeeInfo}
                />
              ) : (
                <div>No employee data found</div>
              )}
            </>
          )}
          {activeBtn === "Job" && (
            <>
              {employeeInfo && (
                <Job
                  onDeactivatingEmployee={() => setIsEmployeeDeactivated()}
                  employeeInfo={employeeInfo}
                />
              )}
            </>
          )}
          {activeBtn === "Uploads" && <Uploads />}
          {activeBtn === "Timesheet" &&
            (timeSheetLoading ? <Spinner /> : <TimeSheet />)}
          {activeBtn === "TaxInfo" && employeeInfo && (
            <TaxInfo employeeInfo={employeeInfo} refetch={refetch} />
          )}
        </div>
        {isEmployeeDeactivivated && (
          <>
            {employeeInfo && (
              <DeactivateEmployee
                onCloseModal={() => resetIsEmployeeDeactivated()}
                employeeInfo={employeeInfo}
              />
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
}
