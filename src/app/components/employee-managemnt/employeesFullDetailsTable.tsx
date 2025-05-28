import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";

const EmployeesFullDetailsTable = () => {
  const filterTable = [
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
  ];
  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Employees Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1450px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                Name
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                Email
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                Hire Type
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Team
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Role
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Country
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filterTable.map((emp, i) => (
              <tr key={i} className="border-b border-[#E3E3E5] last:border-b-0">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={"/employee-management/1"}
                      className="flex items-center gap-x-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {"azeez moshood"
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium hover:underline hover:underline-offset-1">
                        Azeez Moshoood
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  OlawwaleOlanrewaju@Alluvium.com
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">Employee</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border border-[#414D57] bg-[#E7E9EA] text-[#000000] font-medium`}
                  >
                    Quality Assurance
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  Frontend Developer
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  South Africa
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
    </div>
  );
};

export default EmployeesFullDetailsTable;
