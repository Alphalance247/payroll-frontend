"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import EmployeeDetailsTable from "../../components/payroll/employeeData";
import ReviewAndApprove from "../../components/payroll/reviewandApprove";
import Link from "next/link";
import SendPayrollTo from "@/app/components/payroll/sendPayrollTo";
import CommentModal from "@/app/components/payroll/comment";
import useBoolean from "@/app/hooks/useBoolean";
import { usePayrollContext } from "@/app/context/payrollContext";
import ProtectedRoute from "@/app/common/protectedRoute";
import ApprovalConfirmation from "@/app/components/payroll/approvalConfirmation";
import { useAuth } from "@/app/context/authContext";
import { toast } from "react-hot-toast";

export default function RunPayrollPage() {
  const [isNoteModalOpen, closeNoteModal] = useBoolean();
  const [isOpen, setIsOpen, setIsClose] = useBoolean();
  const [
    isApprovalConfirmationOpen,
    setIsApprovalConfirmationOpen,
    setIsApprovalConfirmationClose,
  ] = useBoolean();
  const [initialValue, sendpayrollAproval] = useBoolean();
  const { payroll, loading } = usePayrollContext();
  const { user } = useAuth();

  console.log(initialValue);

  const handleOpen = () => {
    if (
      user?.uid === payroll?.run_by?.id &&
      payroll?.approved_state !== "approved"
    ) {
      setIsOpen(); // Open SendPayrollTo modal
    } else if (
      payroll?.reviewers_list?.includes(user?.uid || 0) &&
      user?.uid !== payroll?.run_by_id &&
      payroll?.approved_state !== "approved"
    ) {
      setIsApprovalConfirmationOpen();
      // Logic to open ApprovalConfirmation modal
      // You might need to set a different state or directly control the modal visibility
    } else {
      toast.error("You are not part of the payroll reviewer or admin");
    }
  };

  const handleClose = () => {
    setIsClose();
    setIsApprovalConfirmationClose();
  };

  const handleSendPayrollAproval = () => {
    sendpayrollAproval();
  };

  // const handleNote = () => {
  //   openNoteModal();
  // };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="overflow-y-scroll py-4 md:py-6 lg:py-10">
          <SendPayrollTo
            isOpen={isOpen}
            onClose={handleClose}
            onSend={handleSendPayrollAproval}
          />

          {isApprovalConfirmationOpen && (
            <ApprovalConfirmation onClose={setIsApprovalConfirmationClose} />
          )}

          <PayrollStepper />
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="py-4 md:py-6 lg:py-10">
              {payroll ? (
                <>
                  <ReviewAndApprove
                    cashRequired={payroll?.total_payout}
                    numberOfEmployees={payroll?.payslips.length}
                    employeePayday={payroll?.payday?.slice(0, 24)}
                    exchangeRate={
                      payroll?.rates?.find((rate) => rate?.code === "NGN")
                        ?.official_rate || 1500
                    }
                    paymentMethod={payroll?.payment_method}
                    bankAccount="1856902353"
                    runBy={payroll?.run_by?.fullname}
                    status={payroll?.approved_state}
                  />
                  <EmployeeDetailsTable payroll={payroll} />
                  <div className="flex justify-between py-4 px-12">
                    <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                      Add Employee
                    </button>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                        Save as Draft
                      </button>

                      <Link href="/run-payroll">
                        <button className="px-4 py-2 text-sm text-[#2F2F33] border border-[#E3E3E5] rounded-lg">
                          Back
                        </button>
                      </Link>
                      <div className="flex items-center gap-2">
                        {payroll?.approved_state !== "approved" ? (
                          <button
                            className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg"
                            onClick={handleOpen}
                          >
                            Next
                          </button>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            {payroll?.approved_state === "approved" &&
                            user?.uid === payroll?.run_by?.id ? (
                              <Link href="/run-payroll/process-payment">
                                <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
                                  Proceed
                                </button>
                              </Link>
                            ) : (
                              <button
                                className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg opacity-50 cursor-not-allowed"
                                disabled
                              >
                                Proceed
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-2xl font-semibold flex-col flex justify-center">
                  No data found please refresh the page or contact support
                </p>
              )}
            </div>
          )}

          {/* <div className="border-[#E3E3E5] border-l px-4">
            <div className="flex justify-between items-center border-b pb-6">
              <p className=" text-base text-[#2F2F33] font-semibold">
                Timeline
              </p>
              <button
                className="px-4 py-2 text-sm font-semibold gap-x-2 border border-[#E3E3E5] text-[#2F2F33] bg-transparent rounded-[6px] flex items-center justify-center"
                onClick={handleNote}
              >
                <FaPlus size={20} /> Add Note
              </button>
            </div>
          </div>
        </div> */}
          <CommentModal
            isOpen={isNoteModalOpen}
            onCancel={closeNoteModal}
            onAddNote={() => {
              closeNoteModal();
            }}
          />
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

{
  /* <Link href="/run-payroll/process-payment">
<button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
  Next
</button>
</Link> */
}
