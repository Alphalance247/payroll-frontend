"use client";
import { useState, useEffect } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { ChevronDown } from "lucide-react";
import SearchableSelect from "@/app/common/searchableSelect";
import { parseAmount } from "@/app/utils/formatCurrency";
import { useEmployeeListData } from "@/app/hooks/useQueries/useEmployeeData";
import {
  useAddBonus,
  type AddBonusPayload,
} from "@/app/hooks/useQueries/bonuses/useAddBonus";
import { useEditBonus } from "@/app/hooks/useQueries/bonuses/useEditBonus";

export interface BonusFormData {
  employeeId: string;
  bonusType: string;
  currency: number | string;
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
  bonusId?: number;
  initialData?: Partial<BonusFormData>;
  employeeOptions?: EmployeeOption[];
  bonusTypeOptions?: BonusTypeOption[];
  onClose: () => void;
  onSaveDraft?: (data: BonusFormData) => void;
  onSubmit: (data: BonusFormData, createAnother: boolean) => void;
}

const DEFAULT_BONUS_TYPES: BonusTypeOption[] = [
  { label: "Fixed bonus", value: "fixed" },
  { label: "Client-facing bonus", value: "client" },
  { label: "Discretionary bonus", value: "non-client" },
];

const CURRENCIES = [
  { id: 1, name: "Dollars", code: "USD" },
  { id: 2, name: "naira", code: "NGN" },
];

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
        className="w-full appearance-none border font-medium border-[#E3E3E5] rounded-lg px-3 py-2.5 text-sm pr-9 text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] bg-white transition-colors"
      >
        {placeholder && (
          <option value="" disabled style={{ color: "#BEBEC2" }}>
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
  bonusId,
  initialData,
  bonusTypeOptions = DEFAULT_BONUS_TYPES,
  onClose,
  onSubmit,
}: BonusModalProps) => {
  const formatAmountForInput = (val: string | number | null | undefined) => {
    if (val == null || val === "") return "";
    const num = parseAmount(val);
    return isFinite(num)
      ? num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  };

  const [form, setForm] = useState<BonusFormData>({
    employeeId: initialData?.employeeId ?? "",
    bonusType: initialData?.bonusType ?? "",
    currency: initialData?.currency ?? "NGN",
    amount: formatAmountForInput(initialData?.amount),
    notes: initialData?.notes ?? "",
  });

  useEffect(() => {
    if (!initialData) return;
    setForm({
      employeeId: initialData.employeeId ?? "",
      bonusType: initialData.bonusType ?? "",
      currency: initialData.currency ?? "NGN",
      amount: formatAmountForInput(initialData.amount),
      notes: initialData.notes ?? "",
    });
  }, [initialData]);

  console.log("initialData", initialData);

  const [createAnother, setCreateAnother] = useState(false);
  const { data: employeeData } = useEmployeeListData();
  const { mutate: addBonus, isPending: isAdding } = useAddBonus(() => {
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
  });
  const { mutate: editBonus, isPending: isEditing } = useEditBonus(() => {
    onSubmit(form, createAnother);
  });
  const isPending = isAdding || isEditing;

  const set = (field: keyof BonusFormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isAdd = mode === "add";
  const title = isAdd ? "Add Bonus" : "Edit Bonus";
  const submitLabel = isAdd ? "Save Bonus" : "Update Bonus";

  const buildPayload = (): AddBonusPayload => ({
    amount: parseAmount(form.amount),
    reason: form.notes,
    bonus_type: form.bonusType as AddBonusPayload["bonus_type"],
    review_comment: "",
    paid: false,
    pay_deno: CURRENCIES.find((c) => c.code === form.currency)?.id ?? 0,
    employee: Number(form.employeeId),
  });

  const handleSubmit = () => {
    if (isAdd) {
      addBonus(buildPayload());
    } else if (bonusId != null) {
      const payload = buildPayload();
      editBonus({
        bonusId,
        amount: payload.amount,
        reason: payload.reason,
        bonus_type: payload.bonus_type,
        pay_deno: payload.pay_deno,
        employee: payload.employee,
      });
    } else {
      onSubmit(form, createAnother);
    }
  };

  // const handleSaveDraft = () => {
  //   if (isAdd) {
  //     addBonus(buildPayload());
  //   } else {
  //     onSaveDraft?.(form);
  //   }
  // };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative z-50 w-full max-w-[460px] bg-white rounded-md shadow-xl flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#F0F0F3]">
          <h2 className="text-base font-semibold text-[#2F2F33]">{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Employee select */}
          <SearchableSelect
            label="Select employee(s)"
            id="employee"
            value={form.employeeId}
            onChange={set("employeeId")}
            placeholder=""
            searchPlaceholder="Search employee"
            options={
              employeeData?.employees?.map((opt) => ({
                label: opt?.fullname ?? "",
                value: String(opt?.id ?? ""),
              })) ?? []
            }
          />

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
                  className="appearance-none h-full pl-3 pr-7 text-sm font-medium text-[#2F2F33] bg-white border-r border-[#D1D5DB] focus:outline-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c?.id} value={c?.code}>
                      {c?.code}
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
                type="text"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => set("amount")(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#BEBEC2] bg-white focus:outline-none"
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
              className="w-full border border-[#BEBEC2] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] placeholder:text-[#A0A0A8] resize-none focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t rounded-br-md rounded-bl-md border-[#D3D3D6] bg-[#F7F7F7] flex items-center justify-between gap-3">
          {isAdd ? (
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={createAnother}
                onChange={(e) => setCreateAnother(e.target.checked)}
                className="w-4 h-4 rounded border-[#D3D3D6] accent-[#E37915] cursor-pointer"
              />
              <span className="text-sm font-medium text-[#2F2F33]">
                Create another
              </span>
            </label>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="primaryWhite"
              // disabled={isPending}
              className="!text-[#2F2F33] border-[1px] !border-[#D3D3D6] !font-semibold"
              onButtonClick={onClose}
            >
              cancel
            </Button>
            <Button
              variant="primary"
              disabled={isPending}
              onButtonClick={handleSubmit}
            >
              {isPending ? "Saving..." : submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default BonusModal;
