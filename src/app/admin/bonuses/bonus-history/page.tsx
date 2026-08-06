"use client";
import DashboardLayout from "@/app/common/DashBoardLayout";
import AllBonusTab from "@/app/components/bonuses/allBonus";
import ClientBonusTab from "@/app/components/bonuses/clientFacingTab";
import FixedBonusTab from "@/app/components/bonuses/fixedBonusTab";
import QuarterlyBonusTab from "@/app/components/bonuses/quarterlyBonusTab";
import DiscretionaryBonusTab from "@/app/components/bonuses/discretionaryBonusTab";
import { useState } from "react";

const BonusHistory = () => {
  const [activeTab, setActiveTab] = useState("All bonus");
  const tabs = [
    { name: "All bonus" },
    { name: "Fixed bonus" },
    { name: "Client-facing bonus" },
    { name: "Quarterly bonus" },
    { name: "Discretionary bonus" },
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

        {activeTab === "All bonus" && <AllBonusTab />}
        {activeTab === "Fixed bonus" && <FixedBonusTab />}
        {activeTab === "Client-facing bonus" && <ClientBonusTab />}
        {activeTab === "Quarterly bonus" && <QuarterlyBonusTab />}
        {activeTab === "Discretionary bonus" && <DiscretionaryBonusTab />}
      </main>
    </DashboardLayout>
  );
};

export default BonusHistory;
