"use client";
import EmployeeDashboardLayout from "@/app/common/employee-dashboard/common/employeeLayout";
import Heading from "@/app/common/heading";
import ProtectedRoute from "@/app/common/protectedRoute";
import ActiveLoan from "@/app/components/Employee-Dashboard/loan/activeLoan";
import LoanOverviewCard from "@/app/components/Employee-Dashboard/loan/loanCard";
import LoanTable from "@/app/components/Employee-Dashboard/loan/loanTable";
import { useEffect, useState } from "react";
import LoanRequestModal from "@/app/components/Employee-Dashboard/loan/loanRequestModal";
import Button from "@/app/common/Button";
import LoanSideBar from "@/app/components/Employee-Dashboard/loan/loanSideBar";
import { getEmployeeLoanList } from "@/stores/employee-dashboard/loan/loanList";

const EmployeeLoanRequest = () => {
  const [loanModal, setLoanModal] = useState(false);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const { fetchEmployeeLoanList } = getEmployeeLoanList();

  useEffect(() => {
    fetchEmployeeLoanList();
  }, [fetchEmployeeLoanList]);

  return (
    <ProtectedRoute>
      <EmployeeDashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <div className="flex justify-between items-center">
            <Heading
              user={"My Leave Request"}
              subHead="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, "
              flexDirection="column"
            />

            <Button variant="primary" onButtonClick={() => setLoanModal(true)}>
              New Loan Request
            </Button>
          </div>

          <LoanOverviewCard />

          <ActiveLoan setIsOpenSideBar={setIsOpenSideBar} />
          <LoanTable setIsOpenSideBar={setIsOpenSideBar} />

          {loanModal && (
            <LoanRequestModal
              onModalClose={() => {
                setLoanModal(!loanModal);
              }}
            />
          )}

          {isOpenSideBar && <LoanSideBar setIsOpenSideBar={setIsOpenSideBar} />}
        </main>
      </EmployeeDashboardLayout>
    </ProtectedRoute>
  );
};

export default EmployeeLoanRequest;
