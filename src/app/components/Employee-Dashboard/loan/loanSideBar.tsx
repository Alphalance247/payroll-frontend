import CollapseHeading from "@/app/common/colllapseHeading";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { LiaTimesSolid } from "react-icons/lia";

const LoanSideBar = ({
  setIsOpenSideBar,
}: {
  setIsOpenSideBar: (isOpenSideBar: boolean) => void;
}) => {
  const data = [
    {
      label: "Loan Amount",
      value: "₦3,000,000",
    },
    {
      label: "Request ID",
      value: "LR-20240401-001",
    },
    {
      label: "Repayment schedule",
      value: "Installment",
    },
    {
      label: "Tenure",
      value: "6 Months",
    },
    {
      label: "Monthly repayment",
      value: "NGN 56,000",
    },
    {
      label: "Interest Rate",
      value: "10%",
    },

    {
      label: "Repayable Amount",
      value: "NGN 3,100,000",
    },
  ];

  const statusInfo = [
    {
      label: "Request ID",
      value: "LR-20240401-001",
      type: "status",
    },
    {
      label: "Current Balance",
      value: "NGN 168,000",
      type: "text",
    },
    {
      label: "Next Repayment Date",
      value: "July 5, 2025",
      type: "text",
    },
    {
      label: "Payment Progress",
      value: "6 Months",
      type: "progress",
    },
  ];

  const approvalDetails = [
    {
      label: "Requested On ",
      value: "January 20, 2026",
    },
    {
      label: "Approved On",
      value: "January 20, 2026",
    },
    {
      label: "Approved By",
      value: "Oluwatishe Yemisi",
    },
    {
      label: "Disbursed To",
      value: "Access, 0707478832",
    },
  ];
  return (
    <SideDrawer
      onClose={() => {
        setIsOpenSideBar(false);
      }}
    >
      <div className="relative z-50  w-[600px] h-full bg-white border border-[#E3E3E5] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E3E3E5] outline-4 outline-[#E3E3E5] outline">
          <h2 className="text-xl font-semibold text-[#2F2F33]">Loan Details</h2>
          <LiaTimesSolid
            className="text-2xl cursor-pointer"
            onClick={() => {
              setIsOpenSideBar(false);
            }}
          />
        </div>

        {data?.map((item, i) => (
          <div className="flex items-center justify-between py-4 px-6" key={i}>
            <p className="text-sm font-medium text-[#71717A]">{item?.label}</p>
            <p className="text-[#2F2F33] text-base">{item?.value}</p>
          </div>
        ))}

        <div>
          <CollapseHeading text="Status Info" withOutline={true} />

          {statusInfo?.map((item, i) => (
            <div
              className="flex items-center justify-between py-4 px-6"
              key={i}
            >
              <p className="text-sm font-medium text-[#71717A]">
                {item?.label}
              </p>
              {item?.type === "text" ? (
                <p className="text-[#2F2F33] text-base">{item?.value}</p>
              ) : item?.type === "status" ? (
                <p
                  className={`text-sm font-medium  bg-[#E9F9EF] border-[#188C43] text-[#188C43] border rounded-2xl px-[10px] py-1`}
                >
                  Approved
                </p>
              ) : (
                <div className="bg-[#E0E0E0] w-[50%] rounded-2xl h-[5px]">
                  <p className="bg-[#198038] w-[20%]  h-[5px] rounded-2xl"></p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <CollapseHeading text="Repayment Schedule" withOutline={true} />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] overflow-hidden shadow-sm rounded-lg">
              <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                <tr>
                  <th
                    className="px-6 py-3 text-left"
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Due Date
                  </th>
                  <th
                    className="px-6 py-3 text-left "
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Amount
                  </th>

                  <th
                    className="px-6 py-3 text-left w-[100px]"
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 ">
                {data?.map((data, i) => (
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                    key={i}
                  >
                    <td className="px-6 py-6 text-sm text-[#2F2F33]">
                      January 20, 2026
                    </td>
                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      ₦700,000
                    </td>
                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                      >
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <CollapseHeading text="Approval Details" withOutline={true} />

          {approvalDetails?.map((item, i) => (
            <div
              className="flex items-center justify-between py-4 px-6"
              key={i}
            >
              <p className="text-sm font-medium text-[#71717A]">
                {item?.label}
              </p>
              <p className="text-[#2F2F33] text-base">{item?.value}</p>
            </div>
          ))}
        </div>
      </div>
    </SideDrawer>
  );
};

export default LoanSideBar;
