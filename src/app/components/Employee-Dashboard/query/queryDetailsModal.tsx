import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
const queryDetailsModal = ({
  onDrawerClose,
}: {
  onDrawerClose: () => void;
}) => {
  const [openQueryOverview, setOpenQueryOverview] = useState(false);
  const [openQueryDetails, setOpenQueryDetails] = useState(false);
  const [openActionRes, setOpenActionRes] = useState(false);
  interface Activities {
    name: string;
    details: string;
    datenTime: string;
  }
  const activities = [
    {
      name: "Query Received",
      details:
        "Samuel Jackson reported an unexpected deduction of ₦ 200,000 and missing bonus. (Auto-logged)",
      datenTime: "2024-07-10 10:15 AM",
    },
    {
      name: "HR Review",
      details:
        "Checked payroll records; deduction was for an unpaid leave adjustment. Bonus was processed separately.",
      datenTime: "2024-07-10 10:15 AM",
    },
    {
      name: "Finance Team Update",
      details:
        "Confirmed bonus payment scheduled for next payroll run (July 15, 2024).",
      datenTime: "2024-07-10 10:15 AM",
    },
    {
      name: "Query Received",
      details:
        "Samuel Jackson reported an unexpected deduction of ₦ 200,000 and missing bonus. (Auto-logged)",
      datenTime: "2024-07-10 10:15 AM",
    },
    {
      name: "Response Sent to Employee",
      details: "Explained deduction reason and confirmed bonus payout date.",
      datenTime: "2024-07-10 10:15 AM",
    },
    {
      name: "Query Resolved",
      details: "Employee acknowledged response, no further action needed.",
      datenTime: "30 mins",
    },
  ];
  return (
    <SideDrawer onClose={onDrawerClose}>
      <div className="border border-[#E3E3E5]  h-[1024px] absolute right-0 top-0 z-50 w-[606px] bg-[#F7F7F7] shadow-lg overflow-auto">
        <div className="pb-24">
          <div className="flex justify-between items-center px-6 py-4 border-b border-[#E3E3E5]">
            <div className="text-[#2F2F33] text-xl font-semibold font-Graphik">
              Query Details
            </div>
            <button onClick={onDrawerClose}>
              <FaTimes className="text-[#2F2F33] h-[14px] w-[14px]" />
            </button>
          </div>
          <div className="grid gap-y-3 px-6 ">
            <div className="flex items-center space-x-2 h-[72px] ">
              <button onClick={() => setOpenQueryOverview(!openQueryOverview)}>
                {" "}
                <ChevronDown className=" text-[#2F2F33] " />
              </button>

              <div className="text-[#2F2F33] text-lg capitalize font-medium font-Graphik">
                Query Overview
              </div>
            </div>
            <div className={openQueryOverview ? "hidden" : "grid gap-y-3"}>
              <div className="flex justify-between items-center h-12">
                <div className="text-sm text-[#71717A] font-medium font-Graphik">
                  {" "}
                  Query ID
                </div>
                <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                  CMP-20240201
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                  {" "}
                  Date Raised
                </div>
                <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                  15th Feb, 2025 09:20:00 PM
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                  {" "}
                  Raised by
                </div>
                <div className="flex space-x-2 items-center h-12">
                  <div className="">
                    <img
                      src="/assets/employee-dashboard/home/DP.png"
                      alt="employee-dp"
                      className="h-6 w-6 rounded-full"
                    />
                  </div>
                  <div className="text-sm font-normal font-Graphik capitalize text-[#2F2F33]">
                    Samuel Johnson
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-sm text-[#71717A] font-medium font-Graphik">
                  {" "}
                  Query Type
                </div>
                <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                  Missing Payment
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-sm text-[#71717A] font-medium font-Graphik">
                  {" "}
                  Status
                </div>
                <button className="text-sm text-[#414D57] bg-[#E7E9EA] font-Graphik border border-[#414D57] rounded-2xl font-medium py-[2px] px-2.5 capitalize">
                  Not Resolved
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 h-[72px]">
              <button onClick={() => setOpenQueryDetails(!openQueryDetails)}>
                {" "}
                <ChevronDown className=" text-[#2F2F33]" />{" "}
              </button>
              <div className="text-[#2F2F33] text-lg capitalize font-medium font-Graphik">
                Query Details
              </div>
            </div>
            <div className={openQueryDetails ? "hidden" : "grid gap-y-3"}>
              <div className="grid gap-y-2">
                <div className="text-[#71717A] text-sm font-medium font-Graphik">
                  Employee Concern
                </div>
                <div>
                  <p className="text-[#2F2F33] text-sm font-normal font-Graphik">
                    {" "}
                    I noticed that my salary for July 2024 is lower than
                    expected. My payslip shows a deduction of ₦200,000, but I
                    wasn’t informed about any deductions. Additionally, my usual
                    bonus wasn’t included. Could you please clarify the reason
                    for these deductions and whether my bonus will be paid
                    separately? I've attached my payslip for reference."
                  </p>
                </div>
              </div>
              <div className="grid gap-y-2">
                <div className="text-[#71717A] text-sm font-medium font-Graphik">
                  Attachments
                </div>
                <div className="border border-[#E3E3E5] flex items-center space-x-1 w-[321px] rounded-md h-[60px]">
                  <div className="p-2">
                    <div className="bg-[#009BC0] h-[44px] w-[44px] rounded-[8px]">
                      <div className="flex items-center justify-center ">
                        <div className="items-center ">
                          {" "}
                          <FaRegFilePdf className=" text-white  h-[44px] " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-y-1">
                    <div className="text-[#2F2F33] text-base font-medium font-Graphik">
                      July, 2024 Payslip
                    </div>
                    <div className="text-[#71717A] font-normal font-Graphik">
                      PDF
                    </div>
                  </div>
                </div>
                <div className="grid gap-y-2 ">
                  <div className="flex justify-between items-center h-12 ">
                    <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                      {" "}
                      Payroll Cycle Affected
                    </div>
                    <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                      July 2024 Payroll
                    </div>
                  </div>

                  <div className="flex justify-between items-center h-12">
                    <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                      {" "}
                      Amount in Dispute
                    </div>
                    <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                      NGN 200,000
                    </div>
                  </div>

                  <div className="flex justify-between items-center h-12">
                    <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                      Payment Method
                    </div>
                    <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                      Bank Transfer
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center  space-x-2 h-[72px]">
              <button onClick={() => setOpenActionRes(!openActionRes)}>
                {" "}
                <ChevronDown className=" text-[#2F2F33] " />
              </button>

              <div className="text-[#2F2F33] text-lg capitalize font-medium font-Graphik">
                Actions & Resolution Tracking
              </div>
            </div>
            <div className={openActionRes ? "hidden" : "grid gap-y-3"}>
              <div className=" border-l">
                <div className="text-sm text-[#71717A] font-normal font-Graphik h-5 mb-5">
                  Today
                </div>
                <ul className="grid gap-y-[27px] pl-2 list">
                  {activities.map((activity, index) => (
                    <li key={index} className="h-[61px] pl-2 ">
                      <div className="flex justify-between items-center ">
                        <div className="text-[#2F2F33] text-sm font-medium font-Graphik w-[363px] ">
                          <p className="capitalize">{activity.name}</p>
                          <span className="font-normal block">
                            {activity.details}
                          </span>
                        </div>
                        <div className="text-sm">{activity.datenTime}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-[#71717A] text-sm font-medium font-Graphik ">
                  Assigned To
                </div>
                <div className=" text-[#2F2F33] text-base font-normal font-Graphik">
                  Oluwatishe
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-[#71717A] text-sm font-medium font-Graphik ">
                  {" "}
                  Expected Resolution Date
                </div>
                <div className=" text-[#2F2F33] text-base font-normal font-Graphik">
                  Jan 16, 2025
                </div>
              </div>
              <div className="grid gap-y-2 h-[120px]">
                <div className="text-[#71717A] text-sm font-medium font-Graphik ">
                  {" "}
                  Supporting Documents
                </div>
                <div className="border border-[#E3E3E5] flex items-center space-x-1 w-[321px] rounded-md h-[60px]">
                  <div className="p-2">
                    <div className="bg-[#009BC0] h-[44px] w-[44px] rounded-[8px]">
                      <div className="flex items-center justify-center ">
                        <div className="items-center ">
                          {" "}
                          <FaRegFilePdf className=" text-white  h-[44px] " />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-y-1">
                    <div className="text-[#2F2F33] text-base font-medium font-Graphik">
                      July, 2024 Payslip
                    </div>
                    <div className="text-[#71717A] font-normal font-Graphik">
                      PDF
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center h-12">
                <div className="text-[#71717A] text-sm font-medium font-Graphik ">
                  {" "}
                  Payment Method
                </div>
                <div className=" text-[#2F2F33] text-base font-normal font-Graphik pr-16">
                  Bank Transfer
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={onDrawerClose}
                className="bg-[#F1F1F2] border border-[#E3E3E5] h-10 w-[275px] rounded-[6px] text-[#2F2F33] text-sm font-medium font-Graphik"
              >
                Cancel
              </button>
              <button className="bg-[#E37915]  h-10 w-[275px] rounded-[6px] text-sm font-medium font-Graphik text-[#F7F7F7]">
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideDrawer>
  );
};

export default queryDetailsModal;
