import VerificationResultsDetail from "./components/verificationResultsDetail";

const VerificationResultsPage = async ({
  params,
}: {
  params: Promise<{ periodId: string }>;
}) => {
  const { periodId } = await params;
  return <VerificationResultsDetail periodId={periodId} />;
};

export default VerificationResultsPage;
