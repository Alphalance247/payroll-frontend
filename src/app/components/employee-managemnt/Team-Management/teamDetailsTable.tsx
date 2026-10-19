"use client";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { employeeDetailsData } from "@/app/utils/type";
import { useSearch } from "@/app/hooks/useSearch";
import { useState } from "react";
import EditEmployeeMember from "./editEmployeeMember";

const TeamsDetailsTable = ({
  detailsData,
  searchQuery,
}: {
  detailsData: employeeDetailsData;
  searchQuery: string;
}) => {
  const details = detailsData?.data;
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [editEmployee, setEditEmployee] = useState<{
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    team_id: string;
  } | null>(null);

  const filteredEmployees = useSearch({
    data: details?.members ?? [],
    searchQuery,
    searchFields: ["name"],
  });

  return (
    <>
      {/* Transparent backdrop to close the dropdown on outside click */}
      {openDropdownId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenDropdownId(null)}
        />
      )}

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
              {filteredEmployees.map((emp, i) => {
                const openUpward = i >= filteredEmployees.length - 2;
                return (
                  <tr
                    key={i}
                    className="border-b border-[#E3E3E5] last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/employee-management/${emp?.id}`}
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
                      {detailsData?.data?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className={`border px-2 py-[2px] w-fit rounded-2xl text-sm ${
                          emp?.status === "active"
                            ? "bg-[#E9F9EF] border-[#188C43] text-[#188C43]"
                            : emp?.status === "former"
                              ? "bg-[#F3F4F6] border-[#6B7280] text-[#6B7280]"
                              : emp?.status === "suspended"
                                ? "bg-[#FEF2F2] border-[#DC2626] text-[#DC2626]"
                                : "bg-[#E9F9EF] border-[#188C43] text-[#188C43]"
                        }`}
                      >
                        {emp?.status}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {emp?.role}
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative flex justify-center">
                        <button
                          className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdownId(
                              openDropdownId === emp.id ? null : emp.id,
                            );
                          }}
                          aria-label={`Actions for ${emp.name}`}
                        >
                          <BsThreeDotsVertical className="text-[#71717A]" />
                        </button>

                        {openDropdownId === emp.id && (
                          <div
                            className={`absolute right-0 w-36 bg-white rounded-lg border border-[#E3E3E5] shadow-lg z-20 py-1 ${
                              openUpward ? "bottom-full mb-1" : "top-full mt-1"
                            }`}
                          >
                            <button
                              className="w-full text-left px-4 py-2.5 text-sm text-[#2F2F33] hover:bg-gray-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditEmployee({
                                  id: emp.id,
                                  name: emp.name,
                                  email: emp.email,
                                  status: emp.status,
                                  role: emp.role,
                                  team_id: details?.id ?? "",
                                });
                                setOpenDropdownId(null);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editEmployee && (
        <EditEmployeeMember
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
        />
      )}
    </>
  );
};

export default TeamsDetailsTable;
