"use client";
import DashboardLayout from "../../common/DashBoardLayout";
import LawsAndPolicies from "../../components/compliance/lawsandpolicies";
import Heading from "../../common/heading";
import LatestUpdate from "../../components/compliance/latestUpdate";
import ProtectedRoute from "../../common/protectedRoute";
import { getComplianceCardStore } from "@/stores/compliance/getComplianceCard";
import { getComplianceCategoryStore } from "@/stores/compliance/getComplianceCategory";
import { useEffect } from "react";
import Button from "../../common/Button";
import Spinner from "../../common/spinner";
import Link from "next/link";

const Compliance = () => {
  const { fetchComplianceCard, error, loading } = getComplianceCardStore();
  const { fetchComplianceCategory } = getComplianceCategoryStore();
  useEffect(() => {
    fetchComplianceCard();
    fetchComplianceCategory();
  }, [fetchComplianceCard, fetchComplianceCategory]);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="flex justify-between items-center">
            <div>
              <Heading
                flexDirection="column"
                subHead="Review laws, policies, and updates to keep your organization compliant."
                user={"Compliance"}
              />
            </div>
            <Link
              href={"https://yen.ec2.alluvium.net/api/admin/compliance/post/"}
              target="_blank"
            >
              <Button variant="primary">Upload Document</Button>
            </Link>
          </div>

          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="flex justify-center items-center flex-col h-full mt-0">
              <p className="text-center text-gray-500 mt-4 flex content-center">
                Error fetching compliance card
              </p>

              <Button
                className="flex items-center gap-x-1 mt-4"
                onButtonClick={() => fetchComplianceCard()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <LatestUpdate />
          )}

          <LawsAndPolicies />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Compliance;
