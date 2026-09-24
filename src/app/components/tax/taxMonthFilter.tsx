"use client";
import { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface MonthYear {
  month: number;
  year: number;
}

interface TaxMonthFilterProps {
  value?: MonthYear;
  onChange?: (value: MonthYear) => void;
  className?: string;
}

const now = new Date();
const YEARS = [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1];

const TaxMonthFilter = ({ value, onChange, className }: TaxMonthFilterProps) => {
  const [month, setMonth] = useState(value?.month ?? now.getMonth());
  const [year, setYear] = useState(value?.year ?? now.getFullYear());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (m: number, y: number) => {
    setMonth(m);
    setYear(y);
    onChange?.({ month: m, year: y });
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-x-2 px-3 py-[7px] rounded-[8px] border border-[#D3D3D6] bg-white text-sm font-medium text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors focus:outline-none"
      >
        <CalendarDays size={14} className="text-[#71717A] flex-shrink-0" />
        {MONTHS[month]} {year}
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`text-[#71717A] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg overflow-hidden w-[228px]">
          {/* Year row */}
          <div className="flex items-center justify-between gap-1 px-3 py-2.5 border-b border-[#F0F0F3]">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  y === year
                    ? "bg-[#E37915] text-white"
                    : "text-[#71717A] hover:bg-[#F7F7F7]"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Month grid */}
          <div className="grid grid-cols-3 gap-1 p-2">
            {MONTHS.map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => handleSelect(i, year)}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  i === month
                    ? "bg-[#FCF2E8] text-[#E37915] font-semibold"
                    : "text-[#2F2F33] hover:bg-[#F7F7F7]"
                }`}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxMonthFilter;
