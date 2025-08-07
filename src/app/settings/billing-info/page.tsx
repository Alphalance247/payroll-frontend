"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import DashboardLayout from "../../common/DashBoardLayout";
import ProtectedRoute from "../../common/protectedRoute";
import { useState } from "react";
import Overview from "@/app/components/settings/billingInfo/overview";
import PaymentMethod from "@/app/components/settings/billingInfo/paymentMethod";
import BillingHistory from "@/app/components/settings/billingInfo/billingHistory";

const BillingInfo = () => {
  const [activeBtn, setActiveBtn] = useState<string>("Overview");
  const tabs: { id: number; name: string }[] = [
    { id: 1, name: "Overview" },
    { id: 1, name: "Payment Methods" },
    { id: 2, name: "Billing History" },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <HeadingSubHead
            heading="Billing Info"
            withSubHead={false}
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
          />

          {/* Requests Types Tab */}
          <div className="border-b border-[#E3E3E5] mt-10">
            <div className="flex gap-x-4 items-center">
              {tabs.map((el, i) => (
                <button
                  className={`${
                    activeBtn === el.name
                      ? "text-[#E37915] border-b-[2px] border-[#E37915]"
                      : "text-[#71717A] border-transparent "
                  }   font-semibold text-base px-2 py-3 border-b-[1px] cursor-pointer`}
                  onClick={() => setActiveBtn(el.name)}
                  key={i}
                >
                  {el.name}
                </button>
              ))}
            </div>
          </div>

          {activeBtn === "Overview" && <Overview />}
          {activeBtn === "Payment Methods" && <PaymentMethod />}
          {activeBtn === "Billing History" && <BillingHistory />}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default BillingInfo;
