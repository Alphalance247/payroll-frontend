const Job = () => {
  const homeAddress = [
    {
      heading: "Hire Type",
      subhead: "Employee",
    },
    {
      heading: "Job Title",
      subhead: "Graphic Designer",
    },
    {
      heading: "Team",
      subhead: "Design  & Dev",
    },
    {
      heading: "Contract Start Date",
      subhead: "21st February, 2025",
    },
    {
      heading: "Status",
      subhead: "Active",
    },
    {
      heading: "Coontract End Day",
      subhead: "21st February, 2025",
    },
  ];

  return (
    <div className="p-10 rounded-lg border-[#A8A2A233] border mt-10">
      <h4 className="text-xl text-[#4D4D4D] font-semibold mb-10">
        Employment Details
      </h4>

      <div className="grid grid-cols-3 gap-10 items-center justify-center">
        {homeAddress.map((el, i) => (
          <div className="" key={i}>
            <p className="text-[#4D4D4D] text-sm mb-4">{el?.heading}</p>
            <p className="text-[#4D4D4D] text-base font-medium">
              {el?.subhead}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;
