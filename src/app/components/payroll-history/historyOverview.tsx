const HistoryOverview = ({
  approvedBy,
  approvalTimestamp,
  fundStatus,
  totalHours,
  historyID,
}: {
  historyID: string;
  approvedBy: string;
  approvalTimestamp: string;
  fundStatus: string;
  totalHours: string;
}) => {
  const payrollHistoryData = [
    {
      payrollId: `PR-${historyID}`,
      totalPayroll: `₦ ${fundStatus}`,
      payhead: "Payroll ID",
      subhead: "Total Amount paid out",
      heading2: "Total Payroll",
      subhead2: "Total Amount paid out",
    },
    {
      payrollId: approvalTimestamp,
      totalPayroll: totalHours,
      payhead: "Payday",
      subhead: "The specific day payroll was processed",
      heading2: "Total Hours Worked",
      subhead2: "Total Employees hours booked",
    },
    {
      payrollId: approvedBy,
      totalPayroll: approvalTimestamp,
      payhead: "Approved By",
      subhead: "Approved by the admin",
      heading2: "Date of Approval",
      subhead2: "The date the payroll was approved",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {payrollHistoryData.map((data, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-[#F6F6F6] px-4 py-6 shadow-sm"
        >
          <div className="border-b border-[#E3E3E5] pb-6">
            <p className="text-[#71717A] text-sm font-semibold mb-6">
              {data.payhead}
            </p>
            <p className="font-semibold text-xl text-[#2F2F33] tracking-[-0.5px] mb-2">
              {data.payrollId?.toString() || "N/A"}
            </p>
            <p className="text-[#71717A] text-sm">{data.subhead}</p>
          </div>

          <div className=" pt-6">
            <p className="text-[#71717A] text-sm font-semibold mb-6">
              {data.heading2}
            </p>
            <p className="font-semibold text-xl text-[#2F2F33] tracking-[-0.5px] mb-2">
              {data.totalPayroll?.toString() || "N/A"}
            </p>
            <p className="text-[#71717A] text-sm">{data.subhead2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryOverview;
