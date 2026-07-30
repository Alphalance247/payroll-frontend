"use client";
import { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { ChevronDown } from "lucide-react";

export interface BonusFormData {
  employeeId: string;
  bonusType: string;
  currency: string;
  amount: string;
  notes: string;
}

export interface EmployeeOption {
  label: string;
  value: string;
}

export interface BonusTypeOption {
  label: string;
  value: string;
}

interface BonusModalProps {
  mode: "add" | "edit";
  initialData?: Partial<BonusFormData>;
  employeeOptions?: EmployeeOption[];
  bonusTypeOptions?: BonusTypeOption[];
  onClose: () => void;
  onSaveDraft?: (data: BonusFormData) => void;
  onSubmit: (data: BonusFormData, createAnother: boolean) => void;
}

const DEFAULT_BONUS_TYPES: BonusTypeOption[] = [
  { label: "Fixed bonus", value: "Fixed bonus" },
  { label: "Client-facing bonus", value: "Client facing bonus" },
  { label: "Quarterly bonus", value: "Quarterly bonus" },
  { label: "Discretionary bonus", value: "Discretionary bonus" },
];

const CURRENCIES = ["NGN", "USD", "GBP", "EUR"];

const SelectField = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  children,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-[#2F2F33]">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none border border-[#E3E3E5] rounded-lg px-3 py-2.5 text-sm pr-9 focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] bg-white transition-colors
          ${value ? "text-[#2F2F33]" : "text-[#A0A0A8]"}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <ChevronDown
        size={15}
        strokeWidth={2}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A]"
      />
    </div>
  </div>
);

const BonusModal = ({
  mode,
  initialData,
  employeeOptions = [],
  bonusTypeOptions = DEFAULT_BONUS_TYPES,
  onClose,
  onSaveDraft,
  onSubmit,
}: BonusModalProps) => {
  const [form, setForm] = useState<BonusFormData>({
    employeeId: initialData?.employeeId ?? "",
    bonusType: initialData?.bonusType ?? "",
    currency: initialData?.currency ?? "NGN",
    amount: initialData?.amount ?? "",
    notes: initialData?.notes ?? "",
  });
  const [createAnother, setCreateAnother] = useState(false);

  const set = (field: keyof BonusFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isAdd = mode === "add";
  const title = isAdd ? "Add Bonus" : "Edit Bonus";
  const submitLabel = isAdd ? "Save Bonus" : "Update Bonus";

  const handleSubmit = () => {
    onSubmit(form, createAnother);
    if (createAnother) {
      setForm({
        employeeId: "",
        bonusType: "",
        currency: "NGN",
        amount: "",
        notes: "",
      });
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative z-50 w-full max-w-[460px] bg-white rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#F0F0F3]">
          <h2 className="text-base font-semibold text-[#2F2F33]">{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Employee select */}
          <SelectField
            label="Select employee(s)"
            id="employee"
            value={form.employeeId}
            onChange={set("employeeId")}
            placeholder="Select an employee"
          >
            {employeeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectField>

          {/* Bonus type select */}
          <SelectField
            label="Select bonus type"
            id="bonusType"
            value={form.bonusType}
            onChange={set("bonusType")}
            placeholder="Select bonus type"
          >
            {bonusTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectField>

          {/* Amount */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-[#2F2F33]"
            >
              Amount
            </label>
            <div className="flex rounded-lg border border-[#E3E3E5] overflow-hidden focus-within:ring-1 focus-within:ring-[#E37915] focus-within:border-[#E37915] transition-colors">
              {/* Currency picker */}
              <div className="relative flex-shrink-0">
                <select
                  value={form.currency}
                  onChange={(e) => set("currency")(e.target.value)}
                  className="appearance-none h-full pl-3 pr-7 text-sm font-medium text-[#2F2F33] bg-[#F7F7F7] border-r border-[#E3E3E5] focus:outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  strokeWidth={2}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#71717A]"
                />
              </div>
              {/* Amount input */}
              <input
                id="amount"
                type="number"
                min="0"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => set("amount")(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#A0A0A8] bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="notes"
              className="text-sm font-medium text-[#2F2F33]"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              placeholder="Add a note..."
              value={form.notes}
              onChange={(e) => set("notes")(e.target.value)}
              className="w-full border border-[#E3E3E5] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#A0A0A8] resize-none focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F0F0F3] flex items-center justify-between gap-3">
          {isAdd ? (
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={createAnother}
                onChange={(e) => setCreateAnother(e.target.checked)}
                className="w-4 h-4 rounded border-[#D3D3D6] accent-[#E37915] cursor-pointer"
              />
              <span className="text-sm text-[#2F2F33]">Create another</span>
            </label>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {onSaveDraft && (
              <Button variant="secondary" onButtonClick={() => onSaveDraft(form)}>
                Save Draft
              </Button>
            )}
            <Button variant="primary" onButtonClick={handleSubmit}>
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default BonusModal;
