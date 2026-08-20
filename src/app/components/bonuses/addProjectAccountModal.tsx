"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";

export interface ProjectAccountFormData {
  project: string;
  tempoAccount: string;
  projectId: string;
  projectKey: string;
}

interface AddProjectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectAccountFormData, createAnother: boolean) => void;
  isSubmitting?: boolean;
}

const EMPTY_FORM: ProjectAccountFormData = {
  project: "",
  tempoAccount: "",
  projectId: "",
  projectKey: "",
};

export default function AddProjectAccountModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: AddProjectAccountModalProps) {
  const [form, setForm] = useState<ProjectAccountFormData>(EMPTY_FORM);
  const [createAnother, setCreateAnother] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(form, createAnother);
    if (createAnother) {
      setForm(EMPTY_FORM);
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setCreateAnother(false);
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 border border-[#E3E3E5] bg-[#F1F1F2] rounded-lg text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] placeholder:text-[#A1A1AA]";

  const selectClass =
    "w-full px-3 py-2 border border-[#E3E3E5] rounded-lg text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] appearance-none bg-white cursor-pointer";

  return (
    <ModalOverlay onClose={handleClose}>
      <div
        className="relative z-50 w-full max-w-[480px] bg-white rounded-md shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[#F0F0F3]">
          <h2 className="text-base font-semibold text-[#2F2F33]">
            Add Project Account
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
              Project
            </label>
            <div className="relative">
              <select
                value={form.project}
                onChange={(e) =>
                  setForm((f) => ({ ...f, project: e.target.value }))
                }
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

          {/* Tempo Account */}
          <div>
            <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
              Tempo Account
            </label>
            <div className="relative">
              <select
                value={form.tempoAccount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tempoAccount: e.target.value }))
                }
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

          {/* Project ID */}
          <div>
            <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
              Project ID
            </label>
            <input
              type="text"
              value={form.projectId}
              onChange={(e) =>
                setForm((f) => ({ ...f, projectId: e.target.value }))
              }
              className={inputClass}
            />
          </div>

          {/* Project Key */}
          <div>
            <label className="block text-sm font-medium text-[#2F2F33] mb-1.5">
              Project Key
            </label>
            <input
              type="text"
              value={form.projectKey}
              onChange={(e) =>
                setForm((f) => ({ ...f, projectKey: e.target.value }))
              }
              className={inputClass}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between bg-[#F7F7F7] rounded-br-md rounded-bl-md px-6 py-4 border-t border-[#F0F0F3]">
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
              {isSubmitting ? "Saving..." : "Save Account"}
            </Button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
}
