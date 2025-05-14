import { usePayrollContext } from "@/app/context/payrollContext";
import { useState } from "react";
import toast from "react-hot-toast";
import useBoolean from "@/app/hooks/useBoolean";
import axiosInstance from "@/app/utils/axios";

const ApprovalConfirmation = ({ onClose }: { onClose: () => void }) => {
  const [approveLoading, setApproveLoading, setApproveLoadingFalse] =
    useBoolean(false);
  const [rejectLoading, setRejectLoading, setRejectLoadingFalse] =
    useBoolean(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const { payroll } = usePayrollContext();

  const handleSend = async () => {
    setApproveLoading();
    try {
      const res = await axiosInstance.patch(
        `/employees/approve-payroll/${payroll?.id}`,
        {
          approved: true,
        }
      );

      if (res.status === 200) {
        toast.success("Payroll approved successfully");
      } else {
        toast.error(
          res?.data?.message ||
            "Failed to approve payroll please try again or contact admin"
        );
      }
      setApproveLoadingFalse();
    } catch (err: any) {
      toast.error(
        "Failed to approve payroll please try again or contact admin",
        err?.response?.data?.message || err.message
      );
    } finally {
      setApproveLoadingFalse();
    }
    onClose();
  };

  const handleRejectClick = () => {
    if (showRejectionReason) {
      if (rejectionReason.trim() === "") {
        toast.error("Please provide a reason for rejection.");
        return;
      }
      handleReject();
    } else {
      setShowRejectionReason(true);
    }
  };

  const handleReject = async () => {
    setRejectLoading();
    try {
      const res = await axiosInstance.patch(
        `/employees/approve-payroll/${payroll?.id}`,
        {
          approved: false,
          reason: rejectionReason,
        }
      );

      if (res.status === 200) {
        toast.success("Payroll rejected successfully");
        setRejectLoadingFalse();
      } else {
        toast.error(
          res?.data?.message ||
            "Failed to reject payroll please try again or contact admin"
        );
      }
    } catch (err: any) {
      toast.error(
        "Failed to reject payroll please try again or contact admin",
        err?.response?.data?.message || err.message
      );
    } finally {
      setRejectLoadingFalse();
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}>
        {/* Modal Container */}
        <div className="flex min-h-screen items-center justify-center">
          {/* Modal Content */}
          <div
            className="w-full max-w-[478px] rounded-lg bg-white shadow-xl border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <h2
              id="modal-title"
              className="text-lg font-semibold mb-4 border-b border-[#E3E3E5] px-6 py-4"
            >
              Approve Payrolll
            </h2>

            <div className="px-6 pb-3">
              <p className="text-lg font-semibold text-[#2F2F33] mb-2">
                Are you sure you want to approve payroll?
              </p>
              <p className="text-[#71717A] text-base">
                Lorem ipsum dolor sit amet consectetur. Mauris congue tincidunt
                vivamus in sed integer. Elementum{" "}
              </p>

              {/* Input for rejection reason */}
              {/* Conditionally render the rejection reason input */}
              {showRejectionReason && (
                <textarea
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="Enter reason for rejection"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 px-6 pb-6 pt-6">
              <button
                onClick={handleRejectClick}
                className="px-6 py-2 text-sm font-semibold border border-[#E3E3E5] bg-[#F1F1F2] text-[#2F2F33] hover:bg-gray-100 rounded-lg"
              >
                {rejectLoading ? "Rejecting..." : "Reject"}
              </button>
              <button
                onClick={handleSend}
                className="px-6 py-2 text-sm font-semibold text-white bg-[#E37915] rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {approveLoading ? "Submitting..." : "Yes, approve Payroll"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalConfirmation;
