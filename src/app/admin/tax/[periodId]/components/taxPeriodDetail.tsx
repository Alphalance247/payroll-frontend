"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Info, XCircle, CheckCircle } from "lucide-react";
import { GoChevronRight } from "react-icons/go";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Button from "@/app/common/Button";
import PeriodEmployeeTable, {
  type EmployeeTaxRecord,
} from "./periodEmployeeTable";

const fromSlug = (slug: string) => {
  const parts = slug.split("-");
  if (parts.length < 2) return { full: slug, short: slug };
  const month = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const year = parts[1];
  return {
    full: `${month} ${year}`,
    short: `${month.slice(0, 3)} ${year}`,
  };
};

type SummaryCardType = "currency" | "number" | "verification";

interface SummaryCardConfig {
  label: string;
  type: SummaryCardType;
  value?: string | number;
  prefix?: string;
  showInfo?: boolean;
  verified?: boolean;
}

const SUMMARY_CARDS: SummaryCardConfig[] = [
  { label: "Total Tax", type: "currency", value: "1,000,000", prefix: "₦" },
  { label: "Number of Employee", type: "number", value: 40 },
  {
    label: "Total Gross Salary",
    type: "currency",
    value: "18,430,000",
    prefix: "₦",
  },
  {
    label: "Verification Status",
    type: "verification",
    showInfo: true,
    verified: false,
  },
];

const SummaryCard = ({ card }: { card: SummaryCardConfig }) => (
  <div className="flex-1 bg-white rounded-lg border border-[#E3E3E5] p-4">
    <p className="flex items-center gap-x-1 text-xs font-medium text-[#71717A] mb-3">
      {card.label}
      {card.showInfo && (
        <Info size={13} className="text-[#71717A] flex-shrink-0" />
      )}
    </p>
    {card.type === "verification" ? (
      <div className="flex items-center gap-x-2">
        {card.verified ? (
          <>
            <CheckCircle
              size={20}
              className="text-[#15803D] flex-shrink-0"
              fill="#15803D"
              color="white"
            />
            <span className="text-lg font-medium text-[#2F2F33] tracking-tight">
              Verified
            </span>
          </>
        ) : (
          <>
            <XCircle
              size={20}
              className="text-[#DC2626] flex-shrink-0"
              fill="#DC2626"
              color="white"
            />
            <span className="text-lg font-medium text-[#2F2F33] tracking-tight">
              Not verified
            </span>
          </>
        )}
      </div>
    ) : (
      <p className="text-lg font-medium text-[#2F2F33] tracking-tight">
        {card.prefix ?? ""}
        {card.value}
      </p>
    )}
  </div>
);

const DUMMY_EMPLOYEES: EmployeeTaxRecord[] = [
  {
    id: 1,
    name: "Lanre Ademoye",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 2,
    name: "Amaka Obi",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 3,
    name: "Tunde Fashola",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "remitted",
  },
  {
    id: 4,
    name: "Ngozi Eze",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 5,
    name: "Bayo Akinlade",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 6,
    name: "Chisom Nwosu",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 7,
    name: "Emeka Chukwu",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "remitted",
  },
  {
    id: 8,
    name: "Funmi Adeyemi",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 9,
    name: "Ibrahim Musa",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
  {
    id: 10,
    name: "Kemi Olawale",
    grossSalary: "200,000",
    monthlyTax: "40,000",
    nhis: "160,000",
    status: "pending_remittance",
  },
];

const MORE_ACTIONS = [
  { label: "Mark as Remitted" },
  { label: "View Receipt" },
  { label: "Compare History" },
];

const MoreActionsDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Button
        variant="secondary"
        onButtonClick={() => setOpen((p) => !p)}
        className="flex items-center gap-x-2 "
      >
        More Actions
        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg py-1 min-w-[180px]">
          {MORE_ACTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2.5 text-sm text-[#2F2F33] hover:bg-[#F7F7F7] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface TaxPeriodDetailProps {
  periodId: string;
}

const TaxPeriodDetail = ({ periodId }: TaxPeriodDetailProps) => {
  const { full, short } = fromSlug(periodId);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-x-1.5 mb-4">
          <Link
            href="/admin/tax"
            className="text-sm text-[#71717A] font-medium hover:text-[#2F2F33] transition-colors"
          >
            Tax
          </Link>
          <GoChevronRight size={16} className="text-[#71717A]" />
          <p className="text-sm text-[#A0A0A6]">{short}</p>
        </div>

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] font-semibold text-[#2F2F33] tracking-[-0.3px]">
              {full} Tax
            </h2>
            <p className="text-sm text-[#71717A] mt-2">
              Review and verify {full} employee payroll tax records.
            </p>
          </div>
          <div className="flex items-center gap-x-2 flex-shrink-0 mt-1">
            <MoreActionsDropdown />
            <Button variant="primary" onButtonClick={() => {}}>
              Verify with Excel
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="flex items-stretch gap-4 mb-6">
          {SUMMARY_CARDS.map((card) => (
            <SummaryCard key={card.label} card={card} />
          ))}
        </div>

        {/* Employee table */}
        <PeriodEmployeeTable records={DUMMY_EMPLOYEES} />
      </main>
    </DashboardLayout>
  );
};

export default TaxPeriodDetail;
