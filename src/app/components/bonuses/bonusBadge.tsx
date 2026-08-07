type BadgeConfig = { label: string; className: string };

/** Approval / stage status */
export function stageBadge(status: string): BadgeConfig {
  const s = status?.toLowerCase();
  if (s === "approved")
    return {
      label: "Approved",
      className: "bg-[#E9F9EF] text-[#1FB356]",
    };
  if (s === "rejected" || s === "declined")
    return {
      label: "Rejected",
      className: "bg-[#FDEBEB] text-[#D42626]",
    };
  if (s === "draft")
    return {
      label: "Draft",
      className: "bg-[#E7E9EA] text-[#0F1D29]",
    };

  if (s === "change requested")
    return {
      label: "Change Requested",
      className: "bg-[#FFF0EC]  text-[#CF6E13]",
    };
  // pending / awaiting approval / default
  return {
    label: "Awaiting Approval",
    className: "bg-[#FFF9EC] text-[#B07A0C]",
  };
}

/** Disburse / payment status */
export function disburseBadge(disbursed: boolean | string): BadgeConfig {
  const isDisbursed =
    disbursed === true || String(disbursed).toLowerCase() === "disbursed";
  if (isDisbursed)
    return {
      label: "Disbursed",
      className: "bg-[#E9F9EF]  text-[#1FB356]",
    };
  return {
    label: "Not Disbursed",
    className: "bg-[#FFF4E5] text-[#FFA500]",
  };
}

const BADGE_BASE =
  "inline-flex items-center text-xs font-medium border-none rounded-[1rem] px-2.5 py-1";

export function Badge({ config }: { config: BadgeConfig }) {
  return (
    <span className={`${BADGE_BASE} ${config.className}`}>{config.label}</span>
  );
}
