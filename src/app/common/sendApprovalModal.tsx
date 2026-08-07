"use client";
import { useState, useEffect } from "react";
import { Loader2, Search, X } from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import SubmitApprovalConfirmation from "@/app/common/submitApprovalConfirmation";

interface Employee {
  id: number;
  employee: {
    fullname: string;
    role: string;
    id: number;
    email: string;
  };
}

interface AdminList {
  employees: Employee[];
  statusmessage: string;
}

export interface SendApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Modal heading — defaults to "Send to" */
  title?: string;
  /** Subtitle shown below the heading */
  Subtitle?: string;
  /** POST endpoint, e.g. "/employees/send-payroll-reviews" */
  endpoint: string;
  bonus_ids: string[];
  /** Return the full request body given the selected employee IDs */
  // buildPayload: (
  //   bonus_ids: number[],
  //   emails: string[],
  // ) => Record<string, unknown>;
  /** Called after a successful send */
  onSuccess?: () => void;
  /** Number of records being submitted — shown in the confirmation step */
  recordCount?: number;
  /** Singular label for the records, e.g. "bonus record" */
  recordLabel?: string;
}

export default function SendApprovalModal({
  isOpen,
  onClose,
  title = "Send to",
  Subtitle,
  endpoint,
  // buildPayload,
  bonus_ids,
  onSuccess,
  recordCount = 0,
  recordLabel = "bonus record",
}: SendApprovalModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [adminList, setAdminList] = useState<AdminList | null>(null);
  const [fetching, setFetching] = useState(false);
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedAdmins([]);
    setSearchQuery("");
    setShowConfirmation(false);

    const fetchAdmins = async () => {
      setFetching(true);
      try {
        const res = await axiosInstance.get(`/employees/payroll-staffs`);
        if (res.status === 200) setAdminList(res.data);
      } catch (err) {
        let message = "Could not load admin list, please try again";
        if (err instanceof AxiosError)
          message = err.response?.data?.message || message;
        toast.error(message);
      } finally {
        setFetching(false);
      }
    };

    fetchAdmins();
  }, [isOpen]);

  const filteredAdmins = adminList?.employees?.filter((a) =>
    a.employee.fullname?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedNames =
    adminList?.employees
      ?.filter((a) => selectedAdmins.includes(a.employee.id))
      .map((a) => a.employee.fullname) ?? [];

  const handleToggle = (id: number) =>
    setSelectedAdmins((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );

  const handleConfirmSend = async () => {
    const emails =
      adminList?.employees
        ?.filter((a) => selectedAdmins.includes(a.employee.id))
        .map((a) => a.employee.email) ?? [];

    setSending(true);
    try {
      const res = await axiosInstance.post(endpoint, { bonus_ids, emails });
      if (res.status === 200) {
        toast.success("Sent successfully");
        onSuccess?.();
        setShowConfirmation(false);
        onClose();
      } else {
        toast.error(res?.data?.message || "Failed to send");
      }
    } catch (err) {
      let message = "An error occurred, please try again";
      if (err instanceof AxiosError)
        message = err.response?.data?.message || message;
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClose={onClose}>
        <div
          className="relative z-50 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#F0F0F3]">
            <h2 className="text-base font-semibold text-[#2F2F33] mb-1">
              {title}
            </h2>
            {Subtitle && <p className="text-sm text-[#71717A]">{Subtitle}</p>}
          </div>

          {/* Search */}
          <div className="px-6 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[#E3E3E5] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
            </div>

            {/* Selected approver chips */}
            {selectedAdmins.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {adminList?.employees
                  ?.filter((a) => selectedAdmins.includes(a.employee.id))
                  .map((a) => {
                    const initials = a.employee.fullname
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase();
                    return (
                      <span
                        key={a.employee.id}
                        className="flex items-center gap-1.5 pl-1 pr-2 py-1 bg-[#F0F0F3] rounded-full text-sm text-[#2F2F33]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#26547C] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium leading-none">
                            {initials[0]}
                          </span>
                        </span>
                        <span className="font-medium text-xs">
                          {a.employee.fullname}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggle(a.employee.id)}
                          className="text-[#71717A] hover:text-[#2F2F33] transition-colors"
                          aria-label={`Remove ${a.employee.fullname}`}
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </span>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Admin list */}
          <div className="px-6 py-4 min-h-[200px] max-h-[300px] overflow-y-auto">
            {fetching ? (
              <div className="flex items-center justify-center h-[160px]">
                <Loader2 className="animate-spin text-[#E37915]" size={24} />
              </div>
            ) : !filteredAdmins?.length ? (
              <p className="text-sm text-center text-[#71717A] py-10">
                No admins found
              </p>
            ) : (
              <ul className="space-y-1">
                {filteredAdmins.map((admin) => {
                  const isSelected = selectedAdmins.includes(admin.employee.id);
                  return (
                    <li key={admin.id}>
                      <label
                        htmlFor={`admin-${admin.employee.id}`}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                          ${isSelected ? "bg-[#FFF9F2]" : "hover:bg-[#F7F7F7]"}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`admin-${admin.employee.id}`}
                            checked={isSelected}
                            onChange={() => handleToggle(admin.employee.id)}
                            className="w-4 h-4 rounded border-[#D3D3D6] accent-[#E37915] cursor-pointer"
                          />
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#26547C] flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-medium">
                                {admin.employee.fullname
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-[#2F2F33]">
                              {admin.employee.fullname}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-[#71717A] capitalize">
                          {admin.employee.role || "Admin"}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 rounded-br-md rounded-bl-md border-t bg-[#F7F7F7] border-[#F0F0F3]">
            <Button variant="secondary" onButtonClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={selectedAdmins.length === 0}
              onButtonClick={() => setShowConfirmation(true)}
            >
              Send
            </Button>
          </div>
        </div>
      </ModalOverlay>

      <SubmitApprovalConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSend}
        isSubmitting={sending}
        recordCount={recordCount}
        reviewerNames={selectedNames}
        recordLabel={recordLabel}
      />
    </>
  );
}
