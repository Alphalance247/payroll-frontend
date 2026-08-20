"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import TableActionMenu from "@/app/common/tableActionMenu";
import TablePagination from "@/app/common/tablePagination";
import AddFixedBonusModal from "@/app/components/bonuses/addFixedBonusModal";
import type { FixedBonusFormData } from "@/app/components/bonuses/addFixedBonusModal";
import FixedBidBonusSideDrawer from "@/app/common/sideDrawer/fixedBidBonusSideDrawer";
import type { FixedBidDrawerData, FixedBidBonusDetail } from "@/app/common/sideDrawer/fixedBidBonusSideDrawer";

interface FixedBidRecord {
  id: number;
  employee_name: string;
  project: string;
  project_key: string;
  project_type: string;
  bonus_stage: string;
  payment_percentage: string;
  payment_period: string;
  approved_hours: string;
  hours_breakdown: string;
  payment_status: string;
  bonus_status: string;
}

const DUMMY_DATA: FixedBidRecord[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  employee_name: "Larra Adenmos",
  project: "CHRONOS",
  project_key: "CHS",
  project_type: "Fixed Client",
  bonus_stage: "Start",
  payment_percentage: "20%",
  payment_period: "Jan 2026",
  approved_hours: "20 hrs",
  hours_breakdown: "90 hrs",
  payment_status: "pending",
  bonus_status: "pending",
}));

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function paymentStatusStyle(status: string) {
  const s = status?.toLowerCase();
  if (s === "paid" || s === "completed")
    return "bg-[#E9F9EF] text-[#1FB356]";
  if (s === "failed" || s === "rejected")
    return "bg-[#FDEBEB] text-[#D42626]";
  return "bg-[#FFF9EC] text-[#B07A0C]";
}

function paymentStatusLabel(status: string) {
  const s = status?.toLowerCase();
  if (s === "paid") return "Paid";
  if (s === "completed") return "Completed";
  if (s === "failed") return "Failed";
  if (s === "rejected") return "Rejected";
  return "Pending";
}

function bonusStatusStyle(status: string) {
  const s = status?.toLowerCase();
  if (s === "approved") return "bg-[#E9F9EF] text-[#1FB356]";
  if (s === "rejected") return "bg-[#FDEBEB] text-[#D42626]";
  return "bg-[#FFF9EC] text-[#B07A0C]";
}

function bonusStatusLabel(status: string) {
  const s = status?.toLowerCase();
  if (s === "approved") return "Approved";
  if (s === "rejected") return "Rejected";
  return "Pending";
}

const BADGE_BASE =
  "inline-flex items-center text-xs font-medium rounded-[1rem] px-2.5 py-1";

const FixedBidBonusPage = () => {
  const [page, setPage] = useState<number | undefined>(undefined);
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [drawerData, setDrawerData] = useState<FixedBidDrawerData | null>(null);

  const DUMMY_DETAIL: FixedBidBonusDetail = {
    project: "CHRONOS",
    projectKey: "CHS",
    projectType: "Fixed Client",
    bonusStage: "Start",
    paymentPercentage: "20%",
    paymentPeriod: "April",
    approvedHours: "20h",
    totalLoggedHours: "50h",
    paymentStatus: "pending",
    bonusStatus: "pending",
    createdBy: "Lanre Ademoye",
    dateCreated: "Aug 15, 2026, 12:39 PM",
    hoursReview: [
      { period: "April", stage: "Start", hoursLogged: "7h 30m" },
      { period: "May", stage: "Mid", hoursLogged: "9h 30m" },
      { period: "June", stage: "End", hoursLogged: "9h 30m" },
    ],
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return DUMMY_DATA;
    const q = searchQuery.toLowerCase();
    return DUMMY_DATA.filter(
      (r) =>
        r.employee_name.toLowerCase().includes(q) ||
        r.project.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const isAllSelected =
    filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id));

  const toggleSelectAll = () =>
    setSelectedIds(isAllSelected ? [] : filtered.map((r) => r.id));

  const toggleSelect = (id: number) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10 relative">
        <div className="flex items-center justify-between mb-8">
          <Heading
            user="Fixed Bid Bonus"
            subHead="Manage fixed bid bonus records across projects and payment stages."
            flexDirection="column"
          />
          <Button
            variant="primary"
            onButtonClick={() => setAddModalOpen(true)}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            Create Fixed Bonus
          </Button>
        </div>

        <div className="bg-white rounded-md border border-[#E3E3E5]">
          {/* Toolbar */}
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
              No records found.
            </div>
          ) : (
            <div
              className="overflow-x-auto rounded-lg relative"
              style={{ overflowY: "visible" }}
            >
              <table className="w-full min-w-[1400px] border-b border-[#E3E3E5]">
                <thead className="bg-[#F7F7F7]">
                  <tr>
                    <th className="px-4 py-[14px] w-[40px]">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 cursor-pointer"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[180px]">
                      Name
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[120px]">
                      Project
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[110px]">
                      Project Key
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[120px]">
                      Project Type
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[110px]">
                      Bonus Stage
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[140px]">
                      Payment Percentage
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[130px]">
                      Payment Period
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[130px]">
                      Approved Hours
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[130px]">
                      Hours Breakdown
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[130px]">
                      Payment Status
                    </th>
                    <th className="px-4 py-[14px] text-sm font-medium text-[#71717A] text-left min-w-[120px]">
                      Bonus Status
                    </th>
                    <th className="px-4 py-[14px] w-[60px]" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record) => {
                    const isSelected = selectedIds.includes(record.id);
                    return (
                      <tr
                        key={record.id}
                        className={`border-b border-[#E3E3E5] last:border-b-0 text-[#2F2F33] ${
                          isSelected ? "bg-[#FFF9F2]" : ""
                        }`}
                      >
                        <td className="px-4 py-[14px] w-[40px]">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelect(record.id)}
                            className="rounded border-gray-300 cursor-pointer"
                            aria-label={`Select ${record.employee_name}`}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                              {getInitials(record.employee_name)}
                            </div>
                            <span className="text-sm font-medium">
                              {record.employee_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{record.project}</td>
                        <td className="px-4 py-4 text-sm">{record.project_key}</td>
                        <td className="px-4 py-4 text-sm">{record.project_type}</td>
                        <td className="px-4 py-4 text-sm">{record.bonus_stage}</td>
                        <td className="px-4 py-4 text-sm">{record.payment_percentage}</td>
                        <td className="px-4 py-4 text-sm">{record.payment_period}</td>
                        <td className="px-4 py-4 text-sm">{record.approved_hours}</td>
                        <td className="px-4 py-4 text-sm">{record.hours_breakdown}</td>
                        <td className="px-4 py-4">
                          <span className={`${BADGE_BASE} ${paymentStatusStyle(record.payment_status)}`}>
                            {paymentStatusLabel(record.payment_status)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`${BADGE_BASE} ${bonusStatusStyle(record.bonus_status)}`}>
                            {bonusStatusLabel(record.bonus_status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <TableActionMenu
                            items={[
                              {
                                label: "View Details",
                                onClick: () =>
                                  setDrawerData({
                                    recordId: record.id,
                                    employeeName: record.employee_name,
                                  }),
                              },
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
                totalPages={2}
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

      {drawerData && (
        <FixedBidBonusSideDrawer
          data={drawerData}
          detail={DUMMY_DETAIL}
          onClose={() => setDrawerData(null)}
        />
      )}

      <AddFixedBonusModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={(data: FixedBonusFormData, createAnother: boolean) => {
          console.log("Fixed bonus:", data, "createAnother:", createAnother);
          if (!createAnother) setAddModalOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default FixedBidBonusPage;
