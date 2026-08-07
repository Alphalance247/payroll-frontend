"use client";
import { usePayrollContext } from "@/app/context/payrollContext";
import SendApprovalModal from "@/app/common/sendApprovalModal";

interface SendPayrollToProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: () => void;
}

export default function SendPayrollTo({
  isOpen,
  onClose,
  onSend,
}: SendPayrollToProps) {
  const { payrollD } = usePayrollContext();
  const payrollId = payrollD?.data?.id;

  return (
    <SendApprovalModal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Payroll to"
      Subtitle="Select the admins you want to send this for approval."
      endpoint="/employees/send-payroll-reviews"
      bonus_ids={[]}
      buildPayload={(_bonusIds, emails) => ({
        payroll_id: payrollId,
        employee_ids: emails,
      })}
      onSuccess={onSend}
    />
  );
}
