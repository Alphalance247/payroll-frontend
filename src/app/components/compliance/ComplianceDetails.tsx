"use client";
import { getComplianceDetails } from "@/stores/compliance/getComplianceDetails";
import { useEffect } from "react";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import Spinner from "@/app/common/spinner";
import Button from "@/app/common/Button";

const ComplianceDetails = ({
  complianceTitle,
}: {
  complianceTitle: string;
}) => {
  const { data, fetchComplianceDetails, loading } = getComplianceDetails();
  console.log(data);

  useEffect(() => {
    fetchComplianceDetails(complianceTitle);
  }, [fetchComplianceDetails, complianceTitle]);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between ">
          <Heading
            flexDirection="column"
            subHead={
              "Dedicated to testing and validating our products to ensure they are reliable, efficient, and meet customer expectations"
            }
            user={"Quality Assurance"}
            subHeadClassName="w-[70%]"
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {!data || Object.keys(data).length <= 0 ? (
              <div className="flex justify-center items-center flex-col h-full mt-0">
                <p className="text-center text-gray-500 mt-4 flex content-center">
                  No compliance details found please try refresh or contact
                  Admin
                </p>

                <Button
                  className="flex items-center gap-x-1 mt-4"
                  onButtonClick={() => fetchComplianceDetails(complianceTitle)}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <p>data</p>
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
};

export default ComplianceDetails;
