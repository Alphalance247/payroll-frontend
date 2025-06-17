import EditBtn from "@/app/common/employee-management/editBtn";
import useBoolean from "@/app/hooks/useBoolean";
import { dataDetails } from "@/app/utils/type";
import EditPersonalDetails from "./editPersonalDetails";
import EditHomeAddress from "./editHomeAddress";

const Profile = ({
  onDeactivatingEmployee,
  employeeInfo,
}: {
  onDeactivatingEmployee: () => void;
  employeeInfo: dataDetails;
}) => {
  console.log(employeeInfo);
  const [isEdit, setEdit, resetEdit] = useBoolean(false);
  const [isEditHomeAddress, setIsEditHomeAddress, resetIsEditHomeAddress] =
    useBoolean(false);
  const [isEditNextOfKin, setIsNextOfKin, resetIsNextOfKin] = useBoolean(false);
  const personalDetails = [
    {
      heading: "Full Name",
      subhead: employeeInfo?.fullname || "Ajibola  Joyner Judas",
    },
    {
      heading: "Employment ID",
      subhead: employeeInfo?.employee_id || "0123456789",
    },
    {
      heading: "Birthdate",
      subhead: employeeInfo?.dob || "29th September",
    },
    {
      heading: "Email",
      subhead: employeeInfo?.email || "Adetomiwa@Alluvium.net",
    },
    {
      heading: "Mobile Number",
      subhead: employeeInfo?.phone || "08134490207",
    },
    {
      heading: "Nationality",
      subhead: employeeInfo?.country || "Nigerian",
    },
  ];

  const homeAddress = [
    {
      heading: "Street Address",
      subhead: employeeInfo?.street_address || "2, Abraham Adesanya",
    },
    {
      heading: "City",
      subhead: employeeInfo?.city || "Lagos",
    },
    {
      heading: "State",
      subhead: employeeInfo?.city || "Lagos",
    },
    {
      heading: "Postal Code",
      subhead: employeeInfo?.postal_code || "000000000000",
    },
    {
      heading: "Country",
      subhead: employeeInfo?.country || "Nigeria",
    },
  ];

  const NextOfKin = [
    {
      heading: "Full Name",
      subhead: employeeInfo?.nok_name || "2Ajibola  Joyner Judas",
    },
    {
      heading: "Relationship",
      subhead: "Sibling",
    },
    {
      heading: "Mobile Number",
      subhead: employeeInfo?.nok_phone || "08134490207",
    },
    {
      heading: "Email",
      subhead: "nil@Alluvium.net",
    },
    {
      heading: "City",
      subhead: "nil",
    },
    {
      heading: "Country",
      subhead: "nil",
    },
  ];

  return (
    <section className="mt-8 flex flex-col gap-y-8">
      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <div className="flex justify-between items-center">
          <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
            Personal details
          </h4>
          <EditBtn onEditButtutton={() => setEdit()} />
        </div>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {personalDetails.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isEdit && (
        <EditPersonalDetails
          employeeInfo={employeeInfo}
          onModalClose={() => resetEdit()}
        />
      )}

      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <div className="flex justify-between items-center">
          <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
            Home Address
          </h4>
          <EditBtn onEditButtutton={() => setIsEditHomeAddress()} />
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

      {isEditHomeAddress && (
        <EditHomeAddress
          employeeInfo={employeeInfo}
          onModalClose={() => resetIsEditHomeAddress()}
        />
      )}

      <div className="p-10 rounded-lg border-[#A8A2A233] border">
        <div className="flex justify-between items-center">
          <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
            Next Of Kin
          </h4>
          <EditBtn onEditButtutton={() => setIsNextOfKin()} />
        </div>

        <div className="grid grid-cols-3 gap-10 items-center justify-center">
          {NextOfKin.map((el, i) => (
            <div className="" key={i}>
              <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
              <p className="text-[#4D4D4D] text-base font-medium">
                {el?.subhead}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isEditNextOfKin && (
        <EditHomeAddress
          employeeInfo={employeeInfo}
          onModalClose={() => resetIsNextOfKin()}
        />
      )}

      <button
        className="mt-9 font-medium text-[#EF4444] border rounded-md w-fit border-[#E3E3E5] p-3 text-left underline underline-offset-2 decoration-[#EF4444]"
        onClick={onDeactivatingEmployee}
      >
        Deactivate Employee
      </button>
    </section>
  );
};

export default Profile;
