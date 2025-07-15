"use client";
import { getComplianceDetails } from "@/stores/compliance/getComplianceDetails";
import { useEffect } from "react";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import Spinner from "@/app/common/spinner";
import Button from "@/app/common/Button";
import Link from "next/link";

const ComplianceDetails = ({
  complianceTitle,
}: {
  complianceTitle: string;
}) => {
  const { data, fetchComplianceDetails, loading } = getComplianceDetails();

  useEffect(() => {
    fetchComplianceDetails(complianceTitle);
  }, [fetchComplianceDetails, complianceTitle]);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex justify-between items-center mb-12">
          <div className="text-base font-medium flex gap-x-2">
            <Link href={"/compliance"}>
              <li className="text-[#E37915] list-none">Compliance</li>
            </Link>{" "}
            <span className="text-[#A0A0A6]">
              / {data?.title || "PAYE Tax Guide"}
            </span>
          </div>

          <div>
            <Button variant="primary" className="px-8">
              Edit
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <Heading
            flexDirection="column"
            subHead={"'"}
            user={data?.title || "PAYE Tax Guide"}
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
              <div>
                <div className="">
                  <img
                    src={data?.detail_image}
                    alt="imageContent"
                    width={500}
                    height={200}
                    className="rounded-md mx-auto mb-8"
                  />
                </div>
                <div className="w-[80%]">
                  <p dangerouslySetInnerHTML={{ __html: data?.content }} />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
};

export default ComplianceDetails;
