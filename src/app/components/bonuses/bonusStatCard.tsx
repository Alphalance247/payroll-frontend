import { Info } from "lucide-react";

type BadgeFooter = {
  type: "badge";
  badge: string | number;
  label: string;
};

type BreakdownFooter = {
  type: "breakdown";
  items: { count: string | number; label: string }[];
};

export interface BonusStatCardProps {
  title: string;
  value: string;
  footer: BadgeFooter | BreakdownFooter;
  showInfo?: boolean;
}

export default function BonusStatCard({
  title,
  value,
  footer,
  showInfo = false,
}: BonusStatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#71717A]">{title}</span>
        {showInfo && (
          <Info size={14} className="text-[#71717A] flex-shrink-0" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-medium text-[#2F2F33]">{value}</span>

        {footer.type === "badge" ? (
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 bg-[#E9F9EF] rounded-full text-xs font-medium text-[#188C43]">
              {footer.badge}%
            </span>
            <span className="text-xs text-[#71717A]"> Vs {footer.label}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {footer.items.map((item, i) => (
              <p key={i} className="text-xs">
                <span className="font-medium text-[#2F2F33]">{item.count}</span>

                <span className="text-[#71717A]"> {item.label}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
