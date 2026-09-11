import { dataDetails } from "@/app/utils/type";
import EditBtn from "@/app/common/employee-management/editBtn";
import useBoolean from "@/app/hooks/useBoolean";
import EditJobDetails from "./editJobDetails";

const Job = ({
  onDeactivatingEmployee,
  employeeInfo,
}: {
  onDeactivatingEmployee: () => void;
  employeeInfo: dataDetails;
}) => {
  const [editJobDetails, setJobDetails, resetJobDetails] = useBoolean(false);
  const homeAddress = [
    {
      heading: "Hire Type",
      subhead: employeeInfo?.job_type || "Employee",
    },
    {
      heading: "Job Title",
      subhead: employeeInfo?.job_role || "Graphic Designer",
    },
    {
      heading: "Team",
      subhead: employeeInfo?.team?.name || "Design  & Dev",
    },
    {
      heading: "Contract Start Date",
      subhead: employeeInfo?.start_date || "21st February, 2025",
    },
    {
      heading: "Status",
      subhead: employeeInfo?.status,
    },
    {
      heading: "Coontract End Day",
      subhead: "21st February, 2025",
    },

    {
      heading: "Salary",
      subhead: ` ${employeeInfo?.pay_deno === "Dollars" ? "$ " : "₦ "} ${
        employeeInfo?.base_pay
      }`,
    },
    {
      heading: "Client Bonus Rate",
      subhead: `$ ${employeeInfo?.client_bonus_rate}/hr`,
    },
  ];

  return (
    <div>
      <div className="p-10 rounded-lg border-[#A8A2A233] border mt-10">
        <div className="flex justify-between items-center">
          <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
            Employment Details
          </h4>
          <EditBtn onEditButtutton={() => setJobDetails()} />
        </div>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {homeAddress.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>

      {editJobDetails && (
        <EditJobDetails
          employeeInfo={employeeInfo}
          onModalClose={() => resetJobDetails()}
        />
      )}
      <button
        className="mt-9 font-medium border p-3 rounded-md w-fit border-[#E3E3E5] text-[#EF4444] text-left underline underline-offset-2 decoration-[#EF4444]"
        onClick={onDeactivatingEmployee}
      >
        Deactivate Employee
      </button>
    </div>
  );
};

export default Job;
