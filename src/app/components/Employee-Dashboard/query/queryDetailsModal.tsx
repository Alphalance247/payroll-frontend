import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { useQueryStore } from "@/stores/employee-dashboard/settings/Query/QueryDetail";
import Spinner from "@/app/common/spinner";
const QueryDetailsModal = ({
  onDrawerClose,
}: {
  onDrawerClose: () => void;
}) => {
  const [openQueryOverview, setOpenQueryOverview] = useState(false);
  const [openQueryDetails, setOpenQueryDetails] = useState(false);
  const { data, loading } = useQueryStore();

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
          {loading ? (
            <Spinner />
          ) : (
            <>
              {!data ? (
                <div>No Query Found</div>
              ) : (
                <div className="grid gap-y-3 px-6 ">
                  <div className="flex items-center space-x-2 h-[72px] ">
                    <button
                      onClick={() => setOpenQueryOverview(!openQueryOverview)}
                    >
                      {" "}
                      {!openQueryOverview ? (
                        <ChevronDown className=" text-[#2F2F33] " />
                      ) : (
                        <ChevronUp className=" text-[#2F2F33] " />
                      )}
                    </button>

                    <div className="text-[#2F2F33] text-lg capitalize font-medium font-Graphik">
                      Query Overview
                    </div>
                  </div>
                  <div
                    className={openQueryOverview ? "hidden" : "grid gap-y-3"}
                  >
                    <div className="flex justify-between items-center h-12">
                      <div className="text-sm text-[#71717A] font-medium font-Graphik">
                        {" "}
                        Query ID
                      </div>
                      <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                        {"CMP-2024020" + data.query.id}
                      </div>
                    </div>
                    <div className="flex justify-between items-center h-12">
                      <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                        {" "}
                        Date Raised
                      </div>
                      <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                        {data.query.created_at}
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
                        <div className="text-sm font-normal font-Graphik capitalize text-[#2F2F33] ">
                          {data.query.created_by}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center h-12">
                      <div className="text-sm text-[#71717A] font-medium font-Graphik">
                        {" "}
                        Query Type
                      </div>
                      <div className="text-sm font-normal font-Graphik text-[#2F2F33]">
                        {data.query.query_type}
                      </div>
                    </div>
                    <div className="flex justify-between items-center h-12">
                      <div className="text-sm text-[#71717A] font-medium font-Graphik">
                        {" "}
                        Status
                      </div>
                      <button className="text-sm text-[#414D57] bg-[#E7E9EA] font-Graphik border border-[#414D57] rounded-2xl font-medium py-[2px] px-2.5 capitalize">
                        {data.query.status}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 h-[72px]">
                    <button
                      onClick={() => setOpenQueryDetails(!openQueryDetails)}
                    >
                      {" "}
                      {!openQueryDetails ? (
                        <ChevronDown className=" text-[#2F2F33]" />
                      ) : (
                        <ChevronUp className=" text-[#2F2F33] " />
                      )}
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
                          {data.query.description}
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
                            {data.query.payroll_lifecycle_affected}
                          </div>
                        </div>

                        <div className="flex justify-between items-center h-12">
                          <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                            {" "}
                            Amount in Dispute
                          </div>
                          <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                            {data.query.amount_in_dispute}
                          </div>
                        </div>

                        {/* <div className="flex justify-between items-center h-12">
                          <div className="text-sm text-[#71717A] font-medium font-Graphik capitalize">
                            Payment Method
                          </div>
                          <div className="text-[#2F2F33] text-base font-normal font-Graphik">
                            Bank Transfer
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex items-center  space-x-2 h-[72px]">
                    <button onClick={() => setOpenActionRes(!openActionRes)}>
                      {" "}
                      {!openActionRes ? (
                        <ChevronDown className=" text-[#2F2F33] " />
                      ) : (
                        <ChevronUp className=" text-[#2F2F33] " />
                      )}
                    </button>

                    <div className="text-[#2F2F33] text-lg capitalize font-medium font-Graphik">
                      Actions & Resolution Tracking
                    </div>
                  </div> */}
                  {/* <div className={openActionRes ? "hidden" : "grid gap-y-3"}>
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
                              <div className="text-sm">
                                {activity.datenTime}
                              </div>
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
                  </div> */}
                  {/* <div className="flex justify-between items-center">
                    <button
                      onClick={onDrawerClose}
                      className="bg-[#F1F1F2] border border-[#E3E3E5] h-10 w-[275px] rounded-[6px] text-[#2F2F33] text-sm font-medium font-Graphik"
                    >
                      Cancel
                    </button>
                    <button className="bg-[#E37915]  h-10 w-[275px] rounded-[6px] text-sm font-medium font-Graphik text-[#F7F7F7]">
                      Mark as Resolved
                    </button>
                  </div> */}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SideDrawer>
  );
};

export default QueryDetailsModal;
