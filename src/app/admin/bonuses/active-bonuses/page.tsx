"use client";
import DashboardLayout from "@/app/common/DashBoardLayout";
import AwaitingApproval from "@/app/components/bonuses/awaitingApproval";
import DisburseModal from "@/app/components/bonuses/disbureModal";
import { useState } from "react";

const ReviewQueuePage = () => {
  const [activeTab, setActiveTab] = useState("Awaiting Approval");
  const tabs = [
    { name: "Awaiting Approval" },
    { name: "Ready for Disbursement" },
  ];

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex gap-x-5 items-center border-b border-[#E4E7EC] mb-6">
          {tabs.map((el, i) => (
            <button
              className={`${
                activeTab === el.name
                  ? "text-[#E37915] border-b-[1.5px] border-[#E37915] bg-white text-sm"
                  : "text-[#71717A] border-transparent"
              }   font-semibold text-sm px-2 py-4`}
              onClick={() => setActiveTab(el.name)}
              key={i}
            >
              {el.name}
            </button>
          ))}
        </div>

        {activeTab === "Awaiting Approval" && <AwaitingApproval />}
        {activeTab === "Ready for Disbursement" && <DisburseModal />}
      </main>
    </DashboardLayout>
  );
};

export default ReviewQueuePage;
