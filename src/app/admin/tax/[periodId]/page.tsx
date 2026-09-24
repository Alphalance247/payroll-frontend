import TaxPeriodDetail from "./components/taxPeriodDetail";

const TaxPeriodPage = async ({
  params,
}: {
  params: Promise<{ periodId: string }>;
}) => {
  const { periodId } = await params;
  return <TaxPeriodDetail periodId={periodId} />;
};

export default TaxPeriodPage;
