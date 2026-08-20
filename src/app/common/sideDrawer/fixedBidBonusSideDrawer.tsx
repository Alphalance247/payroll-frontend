"use client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import LoadingState from "@/app/common/loadingState";

export interface FixedBidDrawerData {
  recordId: number;
  employeeName: string;
  employeeRole?: string;
}

interface HoursReviewRow {
  period: string;
  stage: string;
  hoursLogged: string;
}

export interface FixedBidBonusDetail {
  project: string;
  projectKey: string;
  projectType: string;
  bonusStage: string;
  paymentPercentage: string;
  paymentPeriod: string;
  approvedHours: string;
  totalLoggedHours: string;
  paymentStatus: string;
  bonusStatus: string;
  createdBy: string;
  dateCreated: string;
  hoursReview: HoursReviewRow[];
}

interface FixedBidBonusSideDrawerProps {
  data: FixedBidDrawerData;
  detail?: FixedBidBonusDetail | null;
  isLoading?: boolean;
  isError?: boolean;
  onClose: () => void;
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

const OverviewRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-start gap-2 pb-4 last:pb-0">
    <span className="w-40 flex-shrink-0 text-xs font-medium text-[#71717A] pt-0.5">
      {label}
    </span>
    <span className="text-sm font-medium text-[#2F2F33]">{children}</span>
  </div>
);

const BADGE_BASE =
  "inline-flex items-center text-xs font-medium rounded-[1rem] px-2.5 py-1";

function statusBadge(status: string) {
  const s = status?.toLowerCase();
  if (s === "paid" || s === "approved" || s === "completed")
    return `${BADGE_BASE} bg-[#E9F9EF] text-[#1FB356]`;
  if (s === "failed" || s === "rejected")
    return `${BADGE_BASE} bg-[#FDEBEB] text-[#D42626]`;
  return `${BADGE_BASE} bg-[#FFF9EC] text-[#B07A0C]`;
}

function statusLabel(status: string) {
  if (!status) return "—";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

const FixedBidBonusSideDrawer = ({
  data,
  detail,
  isLoading = false,
  isError = false,
  onClose,
  onPrev,
  onNext,
}: FixedBidBonusSideDrawerProps) => {
  const totalHours = detail?.hoursReview.reduce((_, row) => row.hoursLogged, "");

  return (
    <SideDrawer onClose={onClose}>
      <div className="relative z-50 w-[520px] h-full bg-white border-l border-[#E3E3E5] flex flex-col">
        {/* Header */}
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

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pt-8 pb-6 flex flex-col gap-8">
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-[#26547C] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-3xl font-medium">
                {getInitials(data.employeeName)}
              </span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <p className="text-base font-medium text-[#2F2F33]">
                {data.employeeName}
              </p>
              {data.employeeRole && (
                <p className="text-sm text-[#71717A]">{data.employeeRole}</p>
              )}
            </div>
          </div>

          <hr className="border-[#E3E3E5]" />

          {isLoading ? (
            <LoadingState message="Loading details..." />
          ) : isError ? (
            <p className="text-sm text-center text-[#CF6E13] py-10">
              Failed to load bonus details.
            </p>
          ) : detail ? (
            <>
              {/* Overview */}
              <section className="flex flex-col gap-4">
                <h3 className="text-base font-medium text-[#2F2F33]">
                  Overview
                </h3>
                <div className="flex flex-col gap-4">
                  <OverviewRow label="Project">{detail.project || "—"}</OverviewRow>
                  <OverviewRow label="Project Key">{detail.projectKey || "—"}</OverviewRow>
                  <OverviewRow label="Project Type">{detail.projectType || "—"}</OverviewRow>
                  <OverviewRow label="Bonus Stage">{detail.bonusStage || "—"}</OverviewRow>
                  <OverviewRow label="Payment Percentage">{detail.paymentPercentage || "—"}</OverviewRow>
                  <OverviewRow label="Payment Period">{detail.paymentPeriod || "—"}</OverviewRow>
                  <OverviewRow label="Approved Hours">{detail.approvedHours || "—"}</OverviewRow>
                  <OverviewRow label="Total Logged Hours">{detail.totalLoggedHours || "—"}</OverviewRow>
                  <OverviewRow label="Payment Status">
                    <span className={statusBadge(detail.paymentStatus)}>
                      {statusLabel(detail.paymentStatus)}
                    </span>
                  </OverviewRow>
                  <OverviewRow label="Bonus Status">
                    <span className={statusBadge(detail.bonusStatus)}>
                      {statusLabel(detail.bonusStatus)}
                    </span>
                  </OverviewRow>
                  <OverviewRow label="Created By">
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#26547C] text-white text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                        {getInitials(detail.createdBy)}
                      </span>
                      {detail.createdBy}
                    </span>
                  </OverviewRow>
                  <OverviewRow label="Date created">{detail.dateCreated || "—"}</OverviewRow>
                </div>
              </section>

              <hr className="border-[#E3E3E5]" />

              {/* Hours Review */}
              <section className="flex flex-col gap-4">
                <h3 className="text-base font-medium text-[#2F2F33]">
                  Hours Review
                </h3>
                <div className="rounded-lg border border-[#E3E3E5] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F7F7F7]">
                      <tr>
                        <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left">
                          Period
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left">
                          Stage
                        </th>
                        <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left">
                          Hours Logged
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {detail.hoursReview.map((row, i) => (
                        <tr key={i} className="border-t border-[#E3E3E5]">
                          <td className="px-4 py-3 text-[#2F2F33]">{row.period}</td>
                          <td className="px-4 py-3 text-[#2F2F33]">{row.stage}</td>
                          <td className="px-4 py-3 text-[#2F2F33]">{row.hoursLogged}</td>
                        </tr>
                      ))}
                      {detail.hoursReview.length > 0 && (
                        <tr className="border-t border-[#E3E3E5] bg-[#F7F7F7]">
                          <td className="px-4 py-3 text-xs font-semibold text-[#2F2F33]">
                            Total
                          </td>
                          <td className="px-4 py-3" />
                          <td className="px-4 py-3 text-xs font-semibold text-[#2F2F33]">
                            {totalHours}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </div>
    </SideDrawer>
  );
};

export default FixedBidBonusSideDrawer;
