"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import Input from "@/app/common/input";
import { useEffect, useState } from "react";
import { getTeamList } from "@/stores/getTeamList";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  {
    value: "active",
    label: "Active",
    description: "Currently working",
    selectedBorder: "border-green-500",
    selectedBg: "bg-green-50",
    dot: "bg-green-500",
    selectedText: "text-green-700",
  },
  {
    value: "suspended",
    label: "Suspended",
    description: "Access temporarily restricted",
    selectedBorder: "border-red-500",
    selectedBg: "bg-red-50",
    dot: "bg-red-500",
    selectedText: "text-red-700",
  },
  {
    value: "former",
    label: "Former",
    description: "Left the organization",
    selectedBorder: "border-gray-400",
    selectedBg: "bg-gray-50",
    dot: "bg-gray-400",
    selectedText: "text-gray-600",
  },
];

interface EmployeeMember {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  team_id: string;
}

const EditEmployeeMember = ({
  employee,
  onClose,
}: {
  employee: EmployeeMember;
  onClose: () => void;
}) => {
  const [form, setForm] = useState({
    email: employee.email || "",
    team: employee.team_id || "",
    role: employee.role || "",
    status: employee.status || "active",
  });
  const [saving, setSaving] = useState(false);
  const { data, fetchTeamList } = getTeamList();

  useEffect(() => {
    fetchTeamList();
  }, [fetchTeamList]);

  const initials = employee.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    try {
      await axiosInstance.patch(`/employees/employee/${employee.id}`, {
        team: form.team || undefined,
        job_role: form.role,
        status: form.status,
      });
      toast.success("Employee details updated successfully");
      onClose();
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "Failed to update employee details";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="relative z-50 bg-white rounded-xl shadow-lg w-full max-w-[560px] mx-4 flex flex-col overflow-hidden border border-[#E3E3E5]">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-5 border-b border-[#E3E3E5]">
          <div className="h-11 w-11 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {initials}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#2F2F33]">
              {employee.name}
            </h3>
            <p className="text-sm text-[#71717A]">{employee.email}</p>
          </div>
          <button
            className="ml-auto text-[#71717A] hover:text-[#2F2F33] transition-colors p-1 rounded-md hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#2F2F33]">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              value={form.email}
              placeholder="email@company.com"
              readonly
              onChange={() => {}}
            />
          </div>

          {/* Team */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#2F2F33]">Team</label>
            <select
              className="border border-[#D7DEDD] rounded-lg p-3 text-sm text-black w-full focus:outline-[#51F4A6] bg-white"
              value={form.team}
              onChange={(e) => setForm({ ...form, team: e.target.value })}
            >
              <option value="">Select a team</option>
              {data?.data.map((t) => (
                <option key={t?.id} value={t?.id}>
                  {t?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#2F2F33]">Role</label>
            <Input
              type="text"
              name="role"
              value={form.role}
              placeholder="e.g. Software Engineer"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F2F33]">
              Employment Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = form.status === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`flex flex-col gap-1.5 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? `${opt.selectedBorder} ${opt.selectedBg}`
                        : "border-[#E3E3E5] hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="emp-status"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => setForm({ ...form, status: opt.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`h-2 w-2 rounded-full shrink-0 ${
                          isSelected ? opt.dot : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          isSelected ? opt.selectedText : "text-[#71717A]"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#71717A] leading-tight">
                      {opt.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#F7F7F7] border-t border-[#E3E3E5]">
          <Button variant="secondary" onButtonClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="min-w-[120px] flex justify-center"
            onButtonClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default EditEmployeeMember;
