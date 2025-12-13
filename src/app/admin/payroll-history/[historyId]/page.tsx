import PayrollHistoryDetailsPage from "@/app/components/payroll-history/payrollHistoryDetails";
import { JSX } from "react";

export default async function PayrollHistoryDetails({
  params,
}: {
  params: Promise<{ historyId: string }>;
}): Promise<JSX.Element> {
  const { historyId } = await params;

  return <PayrollHistoryDetailsPage historyID={historyId} />;
}
