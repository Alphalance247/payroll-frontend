"use client";
import DashboardLayout from "../common/DashBoardLayout";
import LawsAndPolicies from "../components/compliance/lawsandpolicies";
import Heading from "../common/heading";
import LatestUpdate from "../components/compliance/latestUpdate";
import { useAuth } from "../context/authContext";
import ProtectedRoute from "../common/protectedRoute";

const Compliance = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* <TopBar>
        <div className="pt-6 pl-10">
          <h2 className="text-xl font-Graphik font-semibold text-[#2F2F33] mb-4">
            Compliance
          </h2>
          <div className="flex gap-x-4 items-center">
            {tabs.map((el, i) => (
              <button
                className={`text-base ${
                  activeTab === el
                    ? "text-[#E37915] border-[#E37915]"
                    : "text-[#71717A] border-transparent"
                }  font-Graphik font-semibold px-2 pt-1 pb-4 border-b  `}
                onClick={() => setActiveTab(el)}
                key={i}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </TopBar> */}
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <Heading
            flexDirection="column"
            subHead="Lorem ipsum dolor sit amet consectetur. Vel ut eros leo enim ultrices"
            user={user?.fullname || "Good afternoon, James"}
          />

          <LatestUpdate />

          <LawsAndPolicies />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Compliance;
