type BadgeConfig = { label: string; className: string };

/** Approval / stage status */
export function stageBadge(status: string): BadgeConfig {
  const s = status?.toLowerCase();
  if (s === "approved")
    return { label: "Approved", className: "bg-[#E9F9EF] border-[#188C43] text-[#188C43]" };
  if (s === "rejected" || s === "declined")
    return { label: "Rejected", className: "bg-[#FDEBEB] border-[#D42626] text-[#D42626]" };
  if (s === "returned")
    return { label: "Returned", className: "bg-[#FFF4E5] border-[#FFA500] text-[#FFA500]" };
  // pending / awaiting approval / default
  return { label: "Awaiting Approval", className: "bg-[#FFF4E5] border-[#FFA500] text-[#FFA500]" };
}

/** Disburse / payment status */
export function disburseBadge(disbursed: boolean | string): BadgeConfig {
  const isDisbursed =
    disbursed === true || String(disbursed).toLowerCase() === "disbursed";
  if (isDisbursed)
    return { label: "Disbursed", className: "bg-[#EBF5FF] border-[#1A73E8] text-[#1A73E8]" };
  return { label: "Not Disbursed", className: "bg-[#FFF4E5] border-[#FFA500] text-[#FFA500]" };
}

const BADGE_BASE = "inline-flex items-center text-xs font-medium border rounded-md px-2.5 py-1";

export function Badge({ config }: { config: BadgeConfig }) {
  return (
    <span className={`${BADGE_BASE} ${config.className}`}>{config.label}</span>
  );
}
