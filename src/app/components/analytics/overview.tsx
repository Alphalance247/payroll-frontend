const Overview = () => {
  const data = [
    {
      heading: "Total Payroll",
      subHead: "NGN 10,600,000",
      feature: "Total of 20 active teams",
    },
    {
      heading: "Active Employees",
      subHead: "1,600",
      feature: "Total of 20 active teams",
    },
    {
      heading: "Total Hours Logged",
      subHead: "NGN 10,600,000",
      feature: "Last updated: 16 hours ago",
    },
  ];
  return (
    <section className="mb-10">
      <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-4">
        Updates
      </p>

      <div className="grid grid-cols-3 gap-x-4">
        {data.map((el, i) => (
          <div className="px-4 py-6 border border-[#E3E3E5] rounded-xl" key={i}>
            <p className="text-[#71717A] font-Graphik font-semibold mb-4">
              {el?.heading}
            </p>
            <h5 className="text-[#2F2F33] text-xl font-Graphik border-b border-[#E3E3E5] pb-3">
              {el?.subHead}
            </h5>
            <p className="mt-4 text-[#71717A] font-semibold text-sm">
              {el?.feature}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;
