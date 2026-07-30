"use client";
import { FaChevronRight } from "react-icons/fa6";

export interface BonusActivity {
  id: string | number;
  employeeName: string;
  description: string;
  amount: string;
  timeAgo: string;
}

interface RecentBonusActivitiesProps {
  activities: BonusActivity[];
  onViewAll?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function RecentBonusActivities({
  activities,
  onViewAll,
}: RecentBonusActivitiesProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E3E3E5] flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E3E3E5] flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2F2F33]">Recent activities</span>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-1 text-sm font-medium text-[#E37915] hover:underline"
          >
            View All
            <FaChevronRight size={12} />
          </button>
        )}
      </div>

      {/* Activity list */}
      <div className="flex flex-col divide-y divide-[#E3E3E5]">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 px-6 py-5">
            <div className="w-10 h-10 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
              {getInitials(activity.employeeName)}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-[#2F2F33]">{activity.description}</p>
              <p className="text-sm text-[#71717A]">{activity.amount}</p>
              <p className="text-xs text-[#71717A]">{activity.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
