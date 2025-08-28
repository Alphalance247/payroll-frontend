import { BsThreeDotsVertical } from "react-icons/bs";

const LoanTable = () => {
  const data = [
    {
      label: "Loan Amount",
      value: "NGN 1000,000",
    },
    {
      label: "Repayment Due Date",
      value: "July 5, 2025",
    },
    {
      label: "Duration",
      value: "6 Months",
    },
    {
      label: "Loan Id",
      value: "LN-2025-00023",
    },
    {
      label: "Monthly Repayment",
      value: "NGN 55,000",
    },
    {
      label: "Approval Date",
      value: "May 10, 2025",
    },
  ];
  return (
    <section className="bg-white rounded-lg border  border-[#E3E3E5] mt-10">
      <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
        Loan History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] overflow-hidden shadow-sm ">
          <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
            <tr>
              <th
                className="px-6 py-3 text-left"
                style={{ paddingLeft: "1.5rem" }}
              >
                Request ID
              </th>
              <th
                className="px-6 py-3 text-left "
                style={{ paddingLeft: "1.5rem" }}
              >
                Repayment Term
              </th>
              <th
                className="px-6 py-3 text-left"
                style={{ paddingLeft: "1.5rem" }}
              >
                Amount
              </th>
              <th
                className="px-6 py-3 text-left w-[200px]"
                style={{ paddingLeft: "1.5rem" }}
              >
                Status
              </th>
              <th
                className="px-6 py-3 text-left w-[200px]"
                style={{ paddingLeft: "1.5rem" }}
              >
                Requested On
              </th>

              <th
                className="px-6 py-3 text-left "
                style={{ paddingLeft: "1.5rem" }}
              ></th>
            </tr>
          </thead>
          <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 ">
            {data?.map((data, i) => (
              <tr
                className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                key={i}
              >
                <td className="px-6 py-6 text-sm text-[#2F2F33]">
                  LR-20240401-001
                </td>
                <td
                  className="p-6 text-sm text-[#2F2F33]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Fixed Period
                </td>
                <td
                  className="p-6 text-sm text-[#2F2F33]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  ₦700,000
                </td>
                <td
                  className="p-6 text-sm text-[#2F2F33]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                  >
                    Pending
                  </span>
                </td>

                <td
                  className="p-6 text-sm text-[#2F2F33]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  January 24, 2024
                </td>

                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {" "}
                  <BsThreeDotsVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LoanTable;
