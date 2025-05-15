"use client";
import PayrollStepper from "@/app/components/payroll/payrollStepper";
import DashboardLayout from "../../common/DashBoardLayout";
import ProcessPayment from "@/app/components/payroll/processPayment";
import EmployeeBankDetails from "@/app/components/payroll/EmployeeBankDetails";
import { usePayrollContext } from "@/app/context/payrollContext";
import ProtectedRoute from "@/app/common/protectedRoute";
import { toast } from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

export default function RunPayrollPage() {
  const { payroll } = usePayrollContext();
  const [getPaystackBalance, setGetPaystackBalance] = useState<{
    status: string;
    payout_required: number;
    balance: number;
  } | null>(null);

  useEffect(() => {
    const fetchPayrollAdmin = async () => {
      try {
        const res = await axiosInstance.get(`/employees/paystack-balance`);
        if (res.status === 200) {
          setGetPaystackBalance(res?.data);
          toast.success("Paystack balance fetched");
        } else {
          toast.error(
            res?.data?.message ||
              "Error fetching paystack balance please refresh or contact Admin"
          );
        }
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      } finally {
      }
    };

    fetchPayrollAdmin();
  }, []);
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll">
          {/* <ApprovalConfirmation  /> */}

          <PayrollStepper />

          {payroll && getPaystackBalance && (
            <>
              <ProcessPayment
                cashRequired={getPaystackBalance?.payout_required || 0}
                dollarsAccountBalance={getPaystackBalance?.balance || 30000}
                nairaAccountBalance={getPaystackBalance?.balance || 0}
                approvedBy={payroll?.approved_by?.fullname}
                approvalTimestamp={payroll?.payday}
                fundStatus={getPaystackBalance?.status || "insufficient funds"}
              />
              <EmployeeBankDetails
                payroll={payroll}
                getPaystackBalance={getPaystackBalance}
              />
            </>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
