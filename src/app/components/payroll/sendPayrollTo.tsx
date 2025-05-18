"use client";
import { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import toast from "react-hot-toast";
import { usePayrollContext } from "@/app/context/payrollContext";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";

interface Employee {
  id: number;

  employee: {
    fullname: string;
    role: "super admin" | "admin";
    id: number;
  };
}

interface PayrollAdmin {
  employees: Employee[];
  statusmessage: string;
}

interface SendPayrollToProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (selectedAdmins: number[]) => void;
}

//   { id: "1", name: "Wale Olojo", role: "super admin" },
//   { id: "2", name: "Taiwo Ojo", role: "super admin" },
//   { id: "3", name: "Temilade Adelabu", role: "super admin" },
//   { id: "4", name: "Chinedu Chuwukere", role: "admin" },
//   { id: "5", name: "Adesina Oluwapelu", role: "admin" },
//   { id: "6", name: "Adesina Oluwapelu", role: "admin" },
//   { id: "7", name: "Adesina Oluwapelu", role: "admin" },
//   { id: "8", name: "Adesina Oluwapelu", role: "admin" },
//   { id: "9", name: "Adesina Oluwapelu", role: "admin" },
// ];

export default function SendPayrollTo({
  isOpen,
  onClose,
  onSend,
}: SendPayrollToProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [payrollAdmin, setPayrollAdmin] = useState<PayrollAdmin | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNoteModalOpen, openNoteModal, closeNoteModal] = useBoolean(false);
  const { payroll } = usePayrollContext();

  useEffect(() => {
    const fetchPayrollAdmin = async () => {
      openNoteModal();
      try {
        const res = await axiosInstance.get(`/employees/payroll-staffs`);
        if (res.status === 200) {
          setPayrollAdmin(res?.data);
          toast.success(payrollAdmin?.statusmessage || "Payroll Admin fetched");
        } else {
          toast.error(res?.data?.message || "Failed to fetch payroll");
        }
      } catch (err) {
        // console.error("Failed to fetch payroll:", err);
        toast.error("Error fetching payroll admin");
      } finally {
        closeNoteModal();
      }
    };

    if (isOpen) {
      fetchPayrollAdmin();
    }
  }, [isOpen]);

  const filteredAdmins = payrollAdmin?.employees?.filter((admin) =>
    admin.employee.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAdmin = (adminId: number) => {
    setSelectedAdmins((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId]
    );
  };

  const handleSend = async () => {
    onSend(selectedAdmins);
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/employees/send-payroll-reviews`, {
        payroll_id: payroll?.id,
        employee_ids: selectedAdmins,
      });

      if (res.status === 200) {
        toast.success("Payroll message sent successfully");
        onClose();
      } else {
        toast.error(
          res?.data?.message || "Failed to send payroll confirmation message"
        );
      }
      setLoading(false);
    } catch (err: any) {
      toast.error(
        "Submission failed:",
        err?.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}>
        {/* Modal Container */}
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Modal Content */}
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <h2 id="modal-title" className="text-xl font-semibold mb-4">
              Send Payroll to
            </h2>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Admin List */}
            {isNoteModalOpen ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                {filteredAdmins?.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={admin?.employee?.id.toString()}
                        checked={selectedAdmins.includes(admin?.employee?.id)}
                        onChange={() => handleToggleAdmin(admin?.employee?.id)}
                        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor={admin.id.toString()}
                        className="text-sm font-medium"
                      >
                        {admin.employee.fullname}
                      </label>
                    </div>
                    <span className="text-sm text-gray-500">
                      {admin?.employee?.role || "Admin"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={selectedAdmins.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
