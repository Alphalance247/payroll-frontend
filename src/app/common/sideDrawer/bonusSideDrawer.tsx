"use client";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/app/common/Button";

export interface BonusProjectRow {
  projectKey: string;
  projectName: string;
  hoursLogged: string;
}

export interface BonusTimelineEvent {
  title: string;
  description: string;
  timestamp: string;
}

export interface BonusDrawerData {
  employeeName: string;
  employeeRole: string;
  bonusType: string;
  totalHours: string;
  amount: string;
  projects: BonusProjectRow[];
  timeline: BonusTimelineEvent[];
}

interface BonusSideDrawerProps {
  data: BonusDrawerData;
  onClose: () => void;
  onCancel?: () => void;
  onSubmit?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const NavIconBtn = ({
  onClick,
  children,
  label,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center rounded-[6px] border border-[#E3E3E5] text-[#71717A] hover:bg-[#F7F7F7] transition-colors"
  >
    {children}
  </button>
);

const OverviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-2 border-b border-[#F0F0F3] pb-4 last:border-b-0 last:pb-0">
    <span className="w-32 flex-shrink-0 text-xs font-medium text-[#71717A]">{label}</span>
    <span className="text-sm font-medium text-[#2F2F33]">{value}</span>
  </div>
);

const BonusSideDrawer = ({
  data,
  onClose,
  onCancel,
  onSubmit,
  onPrev,
  onNext,
}: BonusSideDrawerProps) => {
  return (
    <SideDrawer onClose={onClose}>
      <div className="relative z-50 w-[520px] h-full bg-white border-l border-[#E3E3E5] flex flex-col">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3E5] flex-shrink-0">
          <div className="flex items-center gap-3">
            <NavIconBtn onClick={onClose} label="Close">
              <X size={15} strokeWidth={2} />
            </NavIconBtn>
            <span className="text-base font-medium text-[#2F2F33]">
              Employee details
            </span>
          </div>
          <div className="flex items-center gap-2">
            <NavIconBtn onClick={onPrev} label="Previous">
              <ChevronLeft size={15} strokeWidth={2} />
            </NavIconBtn>
            <NavIconBtn onClick={onNext} label="Next">
              <ChevronRight size={15} strokeWidth={2} />
            </NavIconBtn>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-6 flex flex-col gap-8">
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-[#26547C] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-3xl font-medium">
                {getInitials(data.employeeName)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-base font-medium text-[#2F2F33]">
                {data.employeeName}
              </p>
              <p className="text-sm text-[#71717A]">{data.employeeRole}</p>
            </div>
          </div>

          <hr className="border-[#E3E3E5]" />

          {/* Overview */}
          <section className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#2F2F33]">Overview</h3>
            <div className="flex flex-col gap-4">
              <OverviewRow label="Bonus Type" value={data.bonusType} />
              <OverviewRow label="Total hours" value={data.totalHours} />
              <OverviewRow label="Amount" value={data.amount} />
            </div>
          </section>

          <hr className="border-[#E3E3E5]" />

          {/* Project details */}
          <section className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#2F2F33]">
              Project details
            </h3>
            <div className="rounded-lg border border-[#E3E3E5] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F7F7F7] border-b border-[#E3E3E5]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#71717A] w-28">
                      Project Key
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#71717A]">
                      Project Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[#71717A] w-32">
                      Hours Logged
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#E3E3E5] last:border-b-0"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-[#2F2F33]">
                        {row.projectKey}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#2F2F33]">
                        {row.projectName}
                      </td>
                      <td className="px-4 py-4 text-sm text-[#2F2F33]">
                        {row.hoursLogged}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-[#E3E3E5]" />

          {/* Timeline */}
          <section className="flex flex-col gap-4">
            <h3 className="text-base font-medium text-[#2F2F33]">Timeline</h3>
            <div className="relative flex flex-col gap-6 pl-7 border-l-2 border-[#E3E3E5]">
              {data.timeline.map((event, i) => (
                <div key={i} className="relative flex flex-col gap-1">
                  {/* dot */}
                  <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-[#2F2F33] ring-4 ring-white border-2 border-[#E3E3E5]" />
                  <p className="text-sm font-medium text-[#2F2F33]">
                    {event.title}
                  </p>
                  <p className="text-sm text-[#2F2F33]">{event.description}</p>
                  <p className="text-sm text-[#71717A]">{event.timestamp}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Sticky footer ── */}
        <div className="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E3E3E5] bg-white">
          <Button
            variant="secondary"
            onClick={onCancel ?? onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Submit for Approval
          </Button>
        </div>
      </div>
    </SideDrawer>
  );
};

export default BonusSideDrawer;
