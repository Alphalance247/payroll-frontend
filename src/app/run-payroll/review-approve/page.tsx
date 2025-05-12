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

export default function RunPayrollPage() {
  const [isNoteModalOpen, openNoteModal, closeNoteModal] = useBoolean();
  const [isOpen, setIsOpen, setIsClose] = useBoolean();
  // const [sendpayrollAproval, setSendpayrollAproval] = useState<boolean>(false);
  const [initialValue, sendpayrollAproval] = useBoolean();
  const { payroll, loading } = usePayrollContext();

  // useEffect(() => {
  //   const fetchPayroll = async () => {
  //     // setLoading(true);
  //     try {
  //       const res = await axios.get(
  //         `https://real.ec2.alluvium.net/api/employees/generate-payroll`
  //       );
  //       const { data } = res.data; // response.data.data
  //       console.log("data from the backend", data);
  //       if (res.status === 200) {
  //         // setPayroll(res.data);
  //         toast.success("Payroll data loaded");
  //       } else {
  //         toast.error("Failed to fetch payroll");
  //       }
  //     } catch (err) {
  //       // console.error("Failed to fetch payroll:", err);
  //       toast.error("Failed to fetch payroll");
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchPayroll();
  // }, []);

  const handleOpen = () => {
    setIsOpen();
  };

  const handleClose = () => {
    setIsClose();
  };

  const handleSendPayrollAproval = () => {
    sendpayrollAproval();
  };

  const handleNote = () => {
    openNoteModal();
  };

  return (
    <DashboardLayout>
      <main className="overflow-y-scroll">
        <SendPayrollTo
          isOpen={isOpen}
          onClose={handleClose}
          onSend={handleSendPayrollAproval}
        />

        <PayrollStepper />
        {/* <div className="grid grid-cols-[75%auto] gap-4"> */}
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
                  exchangeRate={payroll?.rate}
                  paymentMethod={payroll?.payment_method}
                  bankAccount="0012345678"
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

                    {initialValue ? (
                      <Link href="/run-payroll/process-payment">
                        <button className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg">
                          Next
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="px-4 py-2 text-sm text-white bg-[#E37915] rounded-lg"
                        onClick={handleOpen}
                      >
                        Next
                      </button>
                    )}
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
  );
}
