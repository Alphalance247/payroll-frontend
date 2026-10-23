"use client";

export interface SummaryRow {
  label: string;
  value: string;
}

interface SummaryListCardProps {
  title: string;
  rows: SummaryRow[];
}

const SummaryListCard = ({ title, rows }: SummaryListCardProps) => {
  return (
    <div className="flex-1 bg-white rounded-xl border border-[#E3E3E5] overflow-hidden">
      <div className="p-6 border-b border-[#E3E3E5]">
        <h3 className="text-base font-medium leading-6 text-[#2F2F33]">
          {title}
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex items-center justify-between ${
              index < rows.length - 1 ? "pb-4 border-b border-[#E3E3E5]" : ""
            }`}
          >
            <span className="text-sm font-normal leading-5 text-[#71717A]">
              {row.label}
            </span>
            <span className="text-sm font-normal leading-5 text-[#2F2F33]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryListCard;
