"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { RiExpandUpDownFill } from "react-icons/ri";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import TableActionMenu from "@/app/common/tableActionMenu";
import TablePagination from "@/app/common/tablePagination";

interface Project {
  id: number;
  project_name: string;
  project_key: string;
  tempo_account: string;
  account_id: string;
  status: string;
}

const DUMMY_PROJECTS: Project[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  project_name: "CHRONOS",
  project_key: "CHS",
  tempo_account: "USAV-USAV",
  account_id: "123456789",
  status: "under review",
}));

function statusBadge(status: string) {
  const s = status?.toLowerCase();
  if (s === "approved") return "bg-[#E9F9EF] text-[#1FB356]";
  if (s === "rejected") return "bg-[#FDEBEB] text-[#D42626]";
  return "bg-[#E6F4FF] text-[#2B7FD4]";
}

function statusLabel(status: string) {
  const s = status?.toLowerCase();
  if (s === "approved") return "Approved";
  if (s === "rejected") return "Rejected";
  return "Under review";
}

const FixedBidBonus = () => {
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = searchQuery
    ? DUMMY_PROJECTS.filter((p) =>
        p.project_name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : DUMMY_PROJECTS;

  const isAllSelected =
    filtered.length > 0 && filtered.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filtered.map((p) => p.id));

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex items-center justify-between mb-8">
          <Heading
            user="Projects"
            subHead="Track bonus progress from review through approval and final disbursement."
            flexDirection="column"
          />
          <Button
            variant="primary"
            onButtonClick={() => {}}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            Add Project Account
          </Button>
        </div>

        <div className="bg-white rounded-md border border-[#E3E3E5]">
          <div className="flex items-center justify-between py-5 px-6 border-b border-[#E3E3E5]">
            <div className="relative w-[273px]">
              <input
                type="text"
                placeholder="Search project"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-[8px] border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>

            <button
              type="button"
              className="flex items-center gap-x-2 px-4 py-2 rounded-lg border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
            >
              <SlidersHorizontal size={14} strokeWidth={2} />
              Filter
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-[#71717A]">
              No projects found.
            </div>
          ) : (
            <div
              className="overflow-x-auto rounded-lg relative"
              style={{ overflowY: "visible" }}
            >
              <table className="w-full min-w-[900px] border-b border-[#E3E3E5]">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="px-6 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Project
                        <RiExpandUpDownFill fill="#2F2F33" size={12} />
                      </p>
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[180px]">
                      Project Key
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                      Tempo Account
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                      <p className="flex gap-x-1 cursor-pointer items-center">
                        Account ID
                        <RiExpandUpDownFill fill="#2F2F33" size={12} />
                      </p>
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[180px]">
                      Status
                    </th>
                    <th className="px-6 py-[14px] w-[60px]" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((project) => {
                    const isSelected = selectedIds.includes(project.id);
                    return (
                      <tr
                        key={project.id}
                        className={`border-b border-[#E3E3E5] last:border-b-0 text-[#2F2F33] ${
                          isSelected ? "bg-[#FFF9F2]" : ""
                        }`}
                      >
                        <td className="px-6 py-[14px] w-[40px]">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(project.id)}
                            className="rounded border-gray-300 cursor-pointer"
                            aria-label={`Select ${project.project_name}`}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold">
                          {project.project_name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {project.project_key}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {project.tempo_account}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {project.account_id}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center text-xs font-medium rounded-[1rem] px-2.5 py-1 ${statusBadge(project.status)}`}
                          >
                            {statusLabel(project.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <TableActionMenu
                            items={[
                              { label: "View Details", onClick: () => {} },
                              { label: "Edit", onClick: () => {} },
                              { label: "Delete", onClick: () => {} },
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <TablePagination
                currentPage={page ?? 1}
                totalPages={1}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default FixedBidBonus;
