"use client";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/app/common/Button";
import LoadingState from "@/app/common/loadingState";
import { useGetBonusDetails } from "@/app/hooks/useQueries/bonuses/useGetBonusDetails";

export interface BonusDrawerData {
  bonusId: number;
  employeeName: string;
  employeeRole?: string;
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
  <div className="flex items-start gap-2  pb-4 last:border-b-0 last:pb-0">
    <span className="w-36 flex-shrink-0 text-xs font-medium text-[#71717A] pt-0.5">
      {label}
    </span>
    <span className="text-sm font-medium text-[#2F2F33]">{value || "—"}</span>
  </div>
);

const formatDate = (dateString: string) => {
  if (!dateString) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

const BonusSideDrawer = ({
  data,
  onClose,
  onCancel,
  onSubmit,
  onPrev,
  onNext,
}: BonusSideDrawerProps) => {
  const {
    data: bonusDetail,
    isLoading,
    isError,
  } = useGetBonusDetails(data.bonusId);

  const detail = bonusDetail?.data;
  const timeline = bonusDetail?.timeline ?? [];
  const changeRequests = bonusDetail?.change_requests ?? [];
  const notYetSubmitted = detail?.approved_state?.toLowerCase() === "draft";

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
              {data.employeeRole && (
                <p className="text-sm text-[#71717A]">{data.employeeRole}</p>
              )}
            </div>
          </div>

          <hr className="border-[#E3E3E5]" />

          {isLoading ? (
            <LoadingState message="Loading bonus details..." />
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
                  <OverviewRow label="Bonus Type" value={detail.bonus_type} />
                  <OverviewRow
                    label="Amount"
                    value={`${detail?.pay_deno === "naira" ? "₦" : "$"} ${detail.amount}`}
                  />
                  <OverviewRow label="Status" value={detail.approved_state} />
                  <OverviewRow
                    label="Processing"
                    value={detail.processing_status}
                  />
                  <OverviewRow
                    label="Client hours"
                    value={detail.client_hours}
                  />
                  <OverviewRow
                    label="Non client hours"
                    value={detail.non_client_hours}
                  />
                  <OverviewRow label="Total hours" value={detail.total_hours} />
                  <OverviewRow
                    label="Date Paid"
                    value={formatDate(detail.date_paid)}
                  />
                  {detail.review_comment ? (
                    <OverviewRow
                      label="Review Comment"
                      value={detail.review_comment}
                    />
                  ) : null}
                </div>
              </section>

              {/* Project Details */}
              {detail.hours_by_project !== undefined && (
                <>
                  <hr className="border-[#E3E3E5]" />
                  <section className="flex flex-col gap-4">
                    <h3 className="text-base font-medium text-[#2F2F33]">
                      Project details
                    </h3>
                    {detail.hours_by_project.length === 0 ? (
                      <p className="text-sm text-[#71717A] text-center py-6">
                        No project hours logged for this bonus period.
                      </p>
                    ) : (
                      <div className="rounded-lg border border-[#E3E3E5] overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-[#F7F7F7]">
                            <tr>
                              <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left w-[110px]">
                                Project Key
                              </th>
                              <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left">
                                Project Name
                              </th>
                              <th className="px-4 py-3 text-xs font-medium text-[#71717A] text-left w-[110px]">
                                Hours Logged
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {detail.hours_by_project.map((proj) => (
                              <tr
                                key={proj.project_id}
                                className="border-t border-[#E3E3E5]"
                              >
                                <td className="px-4 py-3 font-semibold text-[#2F2F33]">
                                  {proj.project_key}
                                </td>
                                <td className="px-4 py-3 text-[#2F2F33]">
                                  {proj.project_name}
                                </td>
                                <td className="px-4 py-3 text-[#2F2F33]">
                                  {proj.hours}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                </>
              )}

              {/* Change Requests */}
              {changeRequests.length > 0 && (
                <>
                  <hr className="border-[#E3E3E5]" />
                  <section className="flex flex-col gap-4">
                    <h3 className="text-base font-medium text-[#2F2F33]">
                      Change Requests
                    </h3>
                    <div className="flex flex-col gap-3">
                      {changeRequests.map((req, i) => (
                        <div
                          key={i}
                          className="rounded-lg border border-[#E3E3E5] p-4 flex flex-col gap-1.5"
                        >
                          <p className="text-sm text-[#2F2F33]">{req.note}</p>
                          <p className="text-xs text-[#71717A]">
                            {req.requested_by.fullname} &middot;{" "}
                            {formatDate(req.created)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              {/* Timeline */}
              {timeline.length > 0 && (
                <>
                  <hr className="border-[#E3E3E5]" />
                  <section className="flex flex-col gap-4">
                    <h3 className="text-base font-medium text-[#2F2F33]">
                      Timeline
                    </h3>
                    <div className="flex flex-col">
                      {timeline.map((event, i) => (
                        <div key={i} className="flex gap-4">
                          {/* dot + connector column */}
                          <div className="flex flex-col items-center w-3 flex-shrink-0">
                            <div className="w-4 h-4 rounded-full bg-[#2F2F33] border-[4px] border-[#BEBEC2] flex-shrink-0" />
                            {i < timeline.length - 1 && (
                              <div className="w-px flex-1 bg-[#E3E3E5]" />
                            )}
                          </div>
                          {/* content */}
                          <div className="flex flex-col gap-1 pb-6">
                            <p className="text-sm font-medium text-[#2F2F33]">
                              {event.action_title}
                            </p>
                            <p className="text-sm text-[#2F2F33]">
                              {event.action}
                            </p>
                            <p className="text-xs text-[#71717A]">
                              {event.action_by.fullname} &middot;{" "}
                              {formatDate(event.created)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </>
          ) : null}
        </div>

        {/* ── Sticky footer ── */}
        <div className="flex-shrink-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E3E3E5] bg-white">
          <Button variant="secondary" onButtonClick={onCancel ?? onClose}>
            Cancel
          </Button>
          {notYetSubmitted && (
            <Button variant="primary" onButtonClick={onSubmit}>
              Submit for Approval
            </Button>
          )}
        </div>
      </div>
    </SideDrawer>
  );
};

export default BonusSideDrawer;
