import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { employeeDetailsData } from "@/app/utils/type";
import { useSearch } from "@/app/hooks/useSearch";

const TeamsDetailsTable = ({
  detailsData,
  searchQuery,
}: {
  detailsData: employeeDetailsData;
  searchQuery: string;
}) => {
  const details = detailsData?.data;

  const filteredEmployees = useSearch({
    data: details?.members ?? [],
    searchQuery,
    searchFields: ["name"],
  });

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Team Members
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                Name
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                Email
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Department
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                Status
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Role
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp, i) => (
              <tr key={i} className="border-b border-[#E3E3E5] last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/employee-management/${emp?.id}`}
                      className="flex items-center gap-x-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {emp?.name
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium hover:underline hover:underline-offset-1">
                        {emp?.name}
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.email}
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.role}
                </td>
                <td className="px-6 py-4 text-sm text-[#188C43]">
                  <p className="bg-[#E9F9EF] border-[#188C43] border px-2 py-[2px] w-fit rounded-2xl">
                    {emp?.status}
                  </p>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.role}
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
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

export default TeamsDetailsTable;
