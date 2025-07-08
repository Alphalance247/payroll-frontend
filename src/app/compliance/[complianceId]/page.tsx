import { JSX } from "react";
import ComplianceDetails from "@/app/components/compliance/ComplianceDetails";

export default async function ComplianceDetailsPage({
  params,
}: {
  params: Promise<{ complianceId: string }>;
}): Promise<JSX.Element> {
  const { complianceId } = await params;

  return <ComplianceDetails complianceTitle={complianceId} />;
}
