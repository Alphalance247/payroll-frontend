import { JSX } from "react";
import TeamManagementDetails from "@/app/components/employee-managemnt/Team-Management/teamManagementDetails";

export default async function TeamManagementDetailsPage({
  params,
}: {
  params: { "team-management-details": string };
}): Promise<JSX.Element> {
  const { "team-management-details": teamManagementDetails } = await params;

  return (
    <TeamManagementDetails teamManagementDetails={teamManagementDetails} />
  );
}
