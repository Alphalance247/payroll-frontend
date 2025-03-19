import Image from "next/image";
import DashboardLayout from "./common/DashBoardLayout";
import TopBar from "./common/topBar";
import { FaPlus } from "react-icons/fa6";
import LightingIcon from "@/assets/icons/LightingIcon";
import ArrowHead from "@/assets/icons/ArrowHead";
import CardWallet from "@/assets/icons/CardWallet";
import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";

export default function Home() {
  return (
    <DashboardLayout>
      <TopBar>
        <div className="flex items-center justify-between px-4 py-5">
          <div>
            <h2 className="text-xl font-Graphik font-semibold text-[#2F2F33] mb-2">
              Good afternoon, James
            </h2>
            <p className="text-base font-Graphik text-[#71717A] tracking-[-0.5px]">
              Wednesday, 20 February, 2024
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex gap-x-2 px-3 py-2 items-center">
              <Image
                src="/assets/Home/notification.svg"
                width={18}
                height={18}
                alt="notification"
              />
              <button className="relative inline-flex items-center text-sm font-medium text-[#2F2F33] font-Graphik">
                Notifications
              </button>
            </div>

            <button className="bg-[#E37915] text-base font-semibold text-white px-3 py-2 rounded-md flex items-center gap-x-2 font-Graphik hover:bg-blue-600">
              <span>
                <FaPlus size={10.5} color="white" />
              </span>{" "}
              Add Employee
            </button>
          </div>
        </div>
      </TopBar>

      <div className="p-10 min-h-screen">
        <div className="grid grid-cols-5 gap-6">
          {/* Left Section */}
          <div className="col-span-3 space-y-6">
            {/* Upcoming Payroll */}
            <div className="border border-[#E3E3E5] w-full rounded-xl">
              <div className="flex items-center gap-2 py-4 px-6 w-full border-b border-[#E3E3E5]">
                <div className="border border-[#E3E3E5] rounded p-[7px] bg-[#F7F7F7]">
                  <LightingIcon />
                </div>
                <h4 className="text-[16px] leading-6 text-[#2F2F33] font-semibold">
                  Upcoming Payroll
                </h4>
              </div>
              <div className="p-6">
                <div className="flex gap-[7px] items-center">
                  <h3 className="font-semibold text-[20px] leading-6 ">
                    Monthly
                  </h3>
                  <p className="bg-[#E7E9EA] rounded-2xl px-2 py-[2px] text-[#0C1720] font-medium text-xs">
                    Due in 1 week
                  </p>
                </div>
                <div className="mt-6 flex gap-2">
                  <div className="font-medium px-4 py-2 border border-[#E3E3E5] space-y-2 rounded-md">
                    <p className="text-sm text-[#71717A]">Pay period</p>
                    <p className="text-base text-[#2F2F33]">June 1 - June 30</p>
                  </div>
                  <div className="font-medium px-4 py-2 border border-[#E3E3E5] space-y-2 rounded-md">
                    <p className="text-sm text-[#71717A]">
                      Scheduled Payout Date
                    </p>
                    <p className="text-base text-[#2F2F33]">June 26, 2025</p>
                  </div>
                  <div className="font-medium px-4 py-2 border border-[#E3E3E5] space-y-2 rounded-md">
                    <p className="text-sm text-[#71717A]">
                      Total Payroll Amount
                    </p>
                    <p className="text-base text-[#2F2F33]">NGN 10,000,000</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 bg-[#F7F7F7] px-6 py-[9.5px] text-base text- font-semibold border-t border-[#E3E3E5]">
                <button className="bg-[#F1F1F2] border border-[#E3E3E5] py-[10px] rounded-md w-full">
                  Calculate Paychecks
                </button>
                <button className="bg-[#F1F1F2] border border-[#E3E3E5] py-[10px] rounded-md w-full">
                  Off-Cycle Payroll
                </button>
                <button className="bg-[#E37915] text-white py-[10px] rounded-md w-full">
                  Run Payroll
                </button>
              </div>
            </div>

            {/* Things to do */}
            <div className="rounded-2xl border border-[#E3E3E5]">
              <div className="flex justify-between items-center py-4 px-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="border border-[#E3E3E5] rounded p-[7px] bg-[#F7F7F7]">
                    <LightingIcon />
                  </div>
                  <h2 className="text-base font-semibold text-[#2F2F33]">
                    Things to do
                  </h2>
                </div>
                <a
                  href="#"
                  className="text-[#009BC0] text-[15px] leading-5 flex gap-1 items-center"
                >
                  View All
                  <ArrowHead />
                </a>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Process Monthly Payroll",
                    subtitle:
                      "Review and finalize salary calculations for this month's payroll.",
                    due: "Wed, 10 Feb",
                    status: "3 days left",
                    color: "#AA3030",
                    bgColor: "#FDECEC",
                  },
                  {
                    title: "Approve Loan Requests",
                    subtitle:
                      "Three pending employee loan requests need review.",
                    due: "Wed, 10 Feb",
                    status: "2 hours left",
                    color: "#AA3030",
                    bgColor: "#FDECEC",
                  },
                  {
                    title: "Update Exchange Rate",
                    subtitle:
                      "Ensure the exchange rate is accurate before processing payments.",
                    due: "Wed, 10 Feb",
                    status: "6 days left",
                    color: "#0C1720",
                    bgColor: "#E7E9EA",
                  },
                  {
                    title: "Verify Tax Deductions",
                    subtitle:
                      "Confirm tax rates and deductions for all employees before processing.",
                    due: "Wed, 10 Feb",
                    status: "Overdue",
                    color: "#AA3030",
                    bgColor: "#FDECEC",
                  },
                ].map((task, index) => (
                  <div
                    key={index}
                    className="p-6 border-b last:border-none rounded-lg flex justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-[10px] rounded-lg bg-[#FCF2E8] border-[1.2px] border-[#E37915]">
                        <CardWallet />
                      </div>
                      <div>
                        <p className="font-semibold text-base text-[#2F2F33]">
                          {task.title}
                        </p>
                        <p className="text-base font-normal text-[#2F2F33] py-1">
                          {task.subtitle}
                        </p>
                        <div className="flex items-center gap-[6px]">
                          <p className="text-base text-[#71717A] font-normal">
                            Due date: <span>{task.due}</span>
                          </p>
                          <span
                            style={{
                              color: task.color,
                              backgroundColor: task.bgColor,
                            }}
                            className={` rounded-2xl text-sm font-medium py-[2px] px-[10px]`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ThreeDotsIcon />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 space-y-6">
            {/* Last Payroll */}
            <div className="border border-[#E3E3E5] rounded-xl">
              <div className="py-4 px-6 flex items-center gap-2 border-b border-[#E3E3E5]">
                <div className="border border-[#E3E3E5] rounded p-[7px] bg-[#F7F7F7]">
                  <LightingIcon />
                </div>
                <h2 className="text-base text-[#2F2F33] font-semibold">
                  Last Payroll
                </h2>
              </div>
              {/* <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700 p-6">
                <div>
                  <div className="font-medium text-gray-500">Pay period</div>
                  <div className="font-semibold">June 1 - June 30, 2025</div>
                </div>

                <div>
                  <div className="font-medium text-gray-500">
                    Payment Method
                  </div>
                  <div className="font-semibold">Bank Transfer</div>
                </div>

                <div className="col-span-2 border-t pt-2"></div>

                <div>
                  <div className="font-medium text-gray-500">Payout Date</div>
                  <div className="font-semibold">June 26, 2025</div>
                </div>

                <div>
                  <div className="font-medium text-gray-500">
                    Total Payroll Amount
                  </div>
                  <div className="font-semibold">NGN 10,000,000</div>
                </div>
                <div className="col-span-2 border-t pt-2"></div>
                <div>
                  <div className="font-medium text-gray-500">Submitted</div>
                  <div className="font-semibold">By Oluwadamilare</div>
                </div>
              </div> */}

              <div className="px-6 py-3 text-sm text-gray-700">
                <div className="flex justify-between py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Pay period</span>
                    <span className="font-semibold">
                      June 1 - June 30, 2025
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Payment Method</span>
                    <span className="font-semibold">Bank Transfer</span>
                  </div>
                </div>

                <div className="flex justify-between border-t py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Payout Date</span>
                    <span className="font-semibold">June 26, 2025</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Total Payroll Amount</span>
                    <span className="font-semibold">NGN 10,000,000</span>
                  </div>
                </div>

                <div className="flex justify-between border-t py-3">
                  <div className="flex flex-col">
                    <span className="text-gray-500">Submitted</span>
                    <span className="font-semibold">By Oluwadamilare</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500">Total Payroll Amount</span>
                    <span className="font-semibold">NGN 10,000,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-[#E3E3E5]">
              <div className="flex items-center gap-2 py-4 px-4 border-b border-[#E3E3E5]">
                <div className="border border-[#E3E3E5] rounded p-[7px] bg-[#F7F7F7]">
                  <LightingIcon />
                </div>
                <h2 className="text-lg font-semibold">Quick Actions</h2>
              </div>
              <div className="space-y-4 p-6">
                {[
                  {
                    title: "Generate Pay slips",
                    subtitle: "Generate employees monthly payslips",
                  },
                  {
                    title: "Run Payroll",
                    subtitle: "Generate employees monthly payslips",
                  },
                  {
                    title: "Edit Exchange Rate",
                    subtitle: "Generate employees monthly payslips",
                  },
                  {
                    title: "Manage Employees",
                    subtitle: "Generate employees monthly payslips",
                  },
                  {
                    title: "Resolve Queries",
                    subtitle: "Generate employees monthly payslips",
                  },
                ].map((action, index) => (
                  <div
                    key={index}
                    className="w-full bg-[#F7F7F7] p-6 rounded-lg border border-[#E3E3E5] flex items-center gap-4"
                  >
                    <div className="bg-white border border-[#E3E3E5] p-2 rounded">
                      <CardWallet color="#009BC0" />
                    </div>
                    <div>
                      <p className="font-medium text-base text-[#009BC0]">
                        {action.title}
                      </p>
                      <p className="font-normal text-sm text-[#71717A]">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
