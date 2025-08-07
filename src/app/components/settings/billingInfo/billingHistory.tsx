import { BsThreeDotsVertical } from "react-icons/bs";

const BillingHistory = () => {
  const data = [
    {
      id: "1",
    },
  ];
  return (
    <section className="border-[#E3E3E5] border rounded-lg mt-10">
      <h5 className="text-base font-medium tracking-[-0.3px] text-[#2F2F33] py-5 px-6">
        Invoice within the past 12 months
      </h5>
      <table className="w-full  overflow-hidden shadow-sm ">
        <thead className="bg-[#F9FAFB]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
          <tr>
            <th
              className="px-6 py-3 text-left"
              style={{ paddingLeft: "1.5rem" }}
            >
              Invoice
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            >
              Status
            </th>
            <th
              className="px-6 py-3 text-left"
              style={{ paddingLeft: "1.5rem" }}
            >
              Amount
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            >
              Date
            </th>

            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            ></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
          {data?.map((data, i) => (
            <tr
              className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
              key={i}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                    {"Lanre Ademoye"
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[#2F2F33] text-sm font-medium mb-1">
                      Lanre Ademoye
                    </p>
                    <p className="text-[#71717A] text-sm font-normal">
                      Olawaleadeoti@alluvium.net
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                Superadmin
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                #400,000,000
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                Yesterday at 11:42 AM
              </td>

              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                <BsThreeDotsVertical />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default BillingHistory;
