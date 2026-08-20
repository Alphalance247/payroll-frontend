"use client";
import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

export interface FixedBonusFormData {
  employeeId: string;
  project: string;
  projectId: string;
  projectKey: string;
  bonusStage: string;
  paymentPercentage: string;
  approvedHours: string;
  paymentPeriod: string;
  notes: string;
}

interface AddFixedBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FixedBonusFormData, createAnother: boolean) => void;
  isSubmitting?: boolean;
}

const EMPTY_FORM: FixedBonusFormData = {
  employeeId: "",
  project: "",
  projectId: "",
  projectKey: "",
  bonusStage: "",
  paymentPercentage: "",
  approvedHours: "",
  paymentPeriod: "",
  notes: "",
};

const BONUS_STAGE_OPTIONS = ["Start", "Mid", "End"];

export default function AddFixedBonusModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddFixedBonusModalProps) {
  const [form, setForm] = useState<FixedBonusFormData>(EMPTY_FORM);
  const [createAnother, setCreateAnother] = useState(false);

  if (!isOpen) return null;

  const set =
    (field: keyof FixedBonusFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    onSubmit(form, createAnother);
    if (createAnother) {
      setForm(EMPTY_FORM);
    }
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setCreateAnother(false);
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] bg-white focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] placeholder:text-[#A1A1AA]";

  const readonlyInputClass =
    "w-full px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#71717A] bg-[#F1F1F2] focus:outline-none cursor-default";

  const selectClass =
    "w-full px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer";

  const labelClass = "block text-sm font-medium text-[#2F2F33] mb-1.5";

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#F0F0F3] flex-shrink-0">
          <h2 className="text-base font-semibold text-[#2F2F33]">
            Add Fixed Bonus
          </h2>
        </div>

        {/* Scrollable body */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          {/* Select employee */}
          <div>
            <label className={labelClass}>Select employee</label>
            <div className="relative">
              <select
                value={form.employeeId}
                onChange={set("employeeId")}
                className={selectClass}
              >
                <option value="" disabled />
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
              />
            </div>
          </div>

          {/* Project */}
          <div>
            <label className={labelClass}>Project</label>
            <div className="relative">
              <select
                value={form.project}
                onChange={set("project")}
                className={selectClass}
              >
                <option value="" disabled />
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
              />
            </div>
          </div>

          {/* Project ID — auto-filled from project selection */}
          <div>
            <label className={labelClass}>Project ID</label>
            <input
              type="text"
              value={form.projectId}
              readOnly
              className={readonlyInputClass}
            />
          </div>

          {/* Project Key — auto-filled from project selection */}
          <div>
            <label className={labelClass}>Project Key</label>
            <input
              type="text"
              value={form.projectKey}
              readOnly
              className={readonlyInputClass}
            />
          </div>

          {/* Bonus Stage */}
          <div>
            <label className={labelClass}>Bonus Stage</label>
            <div className="relative">
              <select
                value={form.bonusStage}
                onChange={set("bonusStage")}
                className={selectClass}
              >
                <option value="" disabled />
                {BONUS_STAGE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
              />
            </div>
          </div>

          {/* Payment Percentage */}
          <div>
            <label className={labelClass}>Payment Percentage</label>
            <input
              type="text"
              value={form.paymentPercentage}
              onChange={set("paymentPercentage")}
              placeholder="e.g. 20%"
              className={inputClass}
            />
          </div>

          {/* Approved Hours */}
          <div>
            <label className={labelClass}>Approved Hours</label>
            <input
              type="text"
              value={form.approvedHours}
              onChange={set("approvedHours")}
              placeholder="e.g. 20"
              className={inputClass}
            />
          </div>

          {/* Payment Period */}
          <div>
            <label className={labelClass}>Payment Period</label>
            <div className="relative">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
              />
              <input
                type="month"
                value={form.paymentPeriod}
                onChange={set("paymentPeriod")}
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          {/* Notes / Reason */}
          <div>
            <label className={labelClass}>Notes/Reason</label>
            <textarea
              value={form.notes}
              onChange={set("notes")}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#F0F0F3] flex-shrink-0">
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-[#2F2F33]">
            <input
              type="checkbox"
              checked={createAnother}
              onChange={(e) => setCreateAnother(e.target.checked)}
              className="rounded border-gray-300 cursor-pointer accent-[#E37915]"
            />
            Create another
          </label>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onButtonClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onButtonClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Bonus"}
            </Button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
