"use client";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getEmployeeListStore } from "@/stores/getEmployee";
import { useFilter } from "@/app/hooks/useFilter";
import { useEffect } from "react";

const EmployeesFullDetailsTable = ({
  searchQuery,
  selectedTeam,
  selectedEmployeeType,
}: {
  searchQuery: string;
  selectedTeam: string;
  selectedEmployeeType: string;
}) => {
  const { data } = getEmployeeListStore();

  const { filteredData, setSearchQuery, setFilter } = useFilter(
    data?.employees || [],
    ["fullname", "job_type"]
  );

  // Apply team filter using nested key:
  useEffect(() => {
    setSearchQuery(searchQuery);
    setFilter("job_type", selectedEmployeeType);
    setFilter("team.name", selectedTeam);
    setFilter("team.name", selectedTeam === "All" ? "" : selectedTeam);
    setFilter(
      "job_type",
      selectedEmployeeType === "All" ? "" : selectedEmployeeType
    );
  }, [searchQuery, selectedTeam, selectedEmployeeType]);

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Employees Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] border-b border-[#E3E3E5]">
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

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px]">
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
            {filteredData.map((emp, i) => (
              <tr key={i} className="border-b border-[#E3E3E5] last:border-b-0">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/employee-management/${emp?.id}`}
                      className="flex items-center gap-x-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                        {emp?.fullname
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <span className="text-[#2F2F33] text-sm font-medium hover:underline hover:underline-offset-1">
                        {emp?.fullname}
                      </span>
                    </Link>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.email}
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.job_type}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border border-[#414D57] bg-[#E7E9EA] text-[#000000] font-medium`}
                  >
                    {emp?.team?.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.job_role}
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {emp?.country}
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
