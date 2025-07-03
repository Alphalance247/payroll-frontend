import EmployeeDetailsClient from "@/app/components/employee-managemnt/employeeDetails";
import { JSX } from "react";

export default async function EmployeeDetailsPage({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}): Promise<JSX.Element> {
  const { employeeId } = await params;

  return <EmployeeDetailsClient employeeId={employeeId} />;
}
