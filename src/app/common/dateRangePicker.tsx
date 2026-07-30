"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subMonths,
  subQuarters,
  subYears,
} from "date-fns";

export interface DateRangeValue {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  placeholder?: string;
  className?: string;
  position?: boolean; // true for right, false for left
}

type PresetKey =
  | "today"
  | "this_week"
  | "this_month"
  | "this_quarter"
  | "this_year"
  | "last_month"
  | "last_quarter"
  | "last_year"
  | "custom";

interface Preset {
  key: PresetKey;
  label: string;
}

const PRESETS: Preset[] = [
  { key: "today", label: "Today" },
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "this_quarter", label: "This Quarter" },
  { key: "this_year", label: "This Year" },
  { key: "last_month", label: "Last Month" },
  { key: "last_quarter", label: "Last Quarter" },
  { key: "last_year", label: "Last Year" },
  { key: "custom", label: "Custom" },
];

function getPresetRange(key: PresetKey): DateRangeValue {
  const now = new Date();
  switch (key) {
    case "today":
      return { from: now, to: now };
    case "this_week":
      return {
        from: startOfWeek(now, { weekStartsOn: 1 }),
        to: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case "this_month":
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case "this_quarter":
      return { from: startOfQuarter(now), to: endOfQuarter(now) };
    case "this_year":
      return { from: startOfYear(now), to: endOfYear(now) };
    case "last_month": {
      const last = subMonths(now, 1);
      return { from: startOfMonth(last), to: endOfMonth(last) };
    }
    case "last_quarter": {
      const last = subQuarters(now, 1);
      return { from: startOfQuarter(last), to: endOfQuarter(last) };
    }
    case "last_year": {
      const last = subYears(now, 1);
      return { from: startOfYear(last), to: endOfYear(last) };
    }
    case "custom":
    default:
      return { from: null, to: null };
  }
}

function formatTriggerLabel(
  value: DateRangeValue | undefined,
  placeholder: string,
): string {
  if (!value?.from) return placeholder;
  if (!value.to) return format(value.from, "MMM d, yyyy");
  if (value.from.toDateString() === value.to.toDateString())
    return format(value.from, "MMM d, yyyy");
  return `${format(value.from, "MMM d, yyyy")} – ${format(value.to, "MMM d, yyyy")}`;
}

const SCOPED_CSS = `
.drp-calendar .rdp-month_grid td {
  padding: 0;
}
.drp-calendar .rdp-month_grid td:has(.drp-range-mid) {
  background: #FCF2E8;
}
.drp-calendar .rdp-month_grid td:has(.drp-range-start) {
  background: linear-gradient(to right, transparent 50%, #FCF2E8 50%);
}
.drp-calendar .rdp-month_grid td:has(.drp-range-end) {
  background: linear-gradient(to left, transparent 50%, #FCF2E8 50%);
}
.drp-calendar .rdp-month_grid td:has(.drp-range-start.drp-range-end) {
  background: transparent;
}
`;

const DateRangePicker = ({
  value,
  onChange,
  placeholder = "Select date range",
  className,
  position = true,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<PresetKey | null>(null);
  const [pending, setPending] = useState<DateRange>({
    from: value?.from ?? undefined,
    to: value?.to ?? undefined,
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Keep pending in sync when value changes from outside
  useEffect(() => {
    setPending({
      from: value?.from ?? undefined,
      to: value?.to ?? undefined,
    });
  }, [value?.from, value?.to]);

  const defaultMonth = useMemo(() => {
    if (pending.from) return subMonths(pending.from, 0);
    return subMonths(new Date(), 1);
  }, [pending.from]);

  const hasValue = !!value?.from;

  const handlePresetClick = (preset: Preset) => {
    setActivePreset(preset.key);
    if (preset.key !== "custom") {
      const range = getPresetRange(preset.key);
      setPending({ from: range.from ?? undefined, to: range.to ?? undefined });
    }
  };

  const handleApply = () => {
    onChange?.({ from: pending.from ?? null, to: pending.to ?? null });
    setOpen(false);
  };

  const handleCancel = () => {
    setPending({ from: value?.from ?? undefined, to: value?.to ?? undefined });
    setOpen(false);
  };

  const handleDayPickerSelect = (range: DateRange | undefined) => {
    setPending(range ?? { from: undefined, to: undefined });
    setActivePreset("custom");
  };

  const startLabel = pending.from
    ? format(pending.from, "MMM d, yyyy")
    : "Start date";
  const endLabel = pending.to ? format(pending.to, "MMM d, yyyy") : "End date";

  return (
    <>
      <style>{SCOPED_CSS}</style>
      <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center gap-x-2 px-3 py-[7px] rounded-[8px] border text-sm font-medium transition-colors focus:outline-none
            ${
              hasValue
                ? "bg-[#FCF2E8] border-[#E37915] text-[#CF6E13]"
                : "bg-white border-[#D3D3D6] text-[#2F2F33] hover:bg-[#F7F7F7]"
            }`}
        >
          <Calendar size={14} strokeWidth={2} className="flex-shrink-0" />
          <span>{formatTriggerLabel(value, placeholder)}</span>
          <ChevronDown
            size={13}
            strokeWidth={2.5}
            className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Panel */}
        {open && (
          <div
            className={`absolute top-full mt-2 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg flex overflow-hidden ${position ? "right-0" : "left-0"}`}
          >
            {/* Left — presets */}
            <div className="w-[160px] border-r border-[#F0F0F3] py-2 flex-shrink-0">
              {PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                    ${
                      activePreset === preset.key
                        ? "bg-[#FCF2E8] text-[#CF6E13] font-medium"
                        : "text-[#2F2F33] hover:bg-[#F7F7F7]"
                    }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Right — calendar */}
            <div className="flex flex-col">
              {/* Date display row */}
              <div className="flex items-center gap-x-3 px-5 pt-4 pb-3 border-b border-[#F0F0F3]">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-medium text-[#71717A] uppercase tracking-wide mb-0.5">
                    Start
                  </span>
                  <span
                    className={`text-sm font-medium ${pending.from ? "text-[#2F2F33]" : "text-[#A0A0A8]"}`}
                  >
                    {startLabel}
                  </span>
                </div>
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  className="text-[#D3D3D6] mt-3 flex-shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-medium text-[#71717A] uppercase tracking-wide mb-0.5">
                    End
                  </span>
                  <span
                    className={`text-sm font-medium ${pending.to ? "text-[#2F2F33]" : "text-[#A0A0A8]"}`}
                  >
                    {endLabel}
                  </span>
                </div>
              </div>

              {/* DayPicker */}
              <div className="px-4 py-3 drp-calendar">
                <DayPicker
                  mode="range"
                  numberOfMonths={2}
                  selected={pending}
                  onSelect={handleDayPickerSelect}
                  defaultMonth={defaultMonth}
                  showOutsideDays={false}
                  classNames={{
                    months: "flex gap-x-6",
                    month_caption: "flex items-center justify-center mb-3",
                    caption_label: "text-sm font-semibold text-[#2F2F33]",
                    nav: "flex items-center",
                    button_previous:
                      "absolute left-1 top-0 p-1.5 rounded-md hover:bg-[#F0F0F3] text-[#71717A] transition-colors",
                    button_next:
                      "absolute right-1 top-0 p-1.5 rounded-md hover:bg-[#F0F0F3] text-[#71717A] transition-colors",
                    month_grid: "w-full border-collapse",
                    weekdays: "flex mb-1",
                    weekday:
                      "w-9 h-9 flex items-center justify-center text-[11px] font-medium text-[#A0A0A8]",
                    week: "flex",
                    day: "drp-day w-9 h-9 relative flex items-center justify-center",
                    day_button:
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm text-[#2F2F33] hover:bg-[#F0F0F3] transition-colors focus:outline-none relative z-10",
                    today: "font-semibold text-[#E37915]",
                    selected: "",
                    range_start: "drp-range-start",
                    range_middle: "drp-range-mid",
                    range_end: "drp-range-end",
                    outside: "opacity-0 pointer-events-none",
                    disabled: "opacity-30 cursor-not-allowed",
                  }}
                  components={{
                    Chevron: ({ orientation }) =>
                      orientation === "left" ? (
                        <ChevronLeft size={15} strokeWidth={2.5} />
                      ) : (
                        <ChevronRight size={15} strokeWidth={2.5} />
                      ),
                  }}
                  modifiersClassNames={{
                    range_start:
                      "!bg-[#E37915] !text-white hover:!bg-[#CF6E13] rounded-full",
                    range_end:
                      "!bg-[#E37915] !text-white hover:!bg-[#CF6E13] rounded-full",
                    range_middle: "rounded-none text-[#CF6E13]",
                  }}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-x-2 px-5 py-3 border-t border-[#F0F0F3]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-[#2F2F33] bg-white border border-[#D3D3D6] rounded-[8px] hover:bg-[#F7F7F7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!pending.from}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#E37915] rounded-[8px] hover:bg-[#CF6E13] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Apply dates
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DateRangePicker;
