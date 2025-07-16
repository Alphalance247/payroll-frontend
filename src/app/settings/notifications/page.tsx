"use client";
import HeadingSubHead from "@/app/common/headingSubHead";
import ProtectedRoute from "@/app/common/protectedRoute";
import DashboardLayout from "@/app/common/DashBoardLayout";

const Account = () => {
  const HeadingSubHeadInner = ({
    heading,
    subhead,
  }: {
    heading: string;
    subhead: string;
  }) => {
    return (
      <div className="pt-6 pb-4 px-4 border-b border-[#E3E3E5]">
        <p className="font-semibold text-[#2F2F33] text-base mb-2">{heading}</p>
        <p className="text-[#71717A] text-sm">{subhead}</p>
      </div>
    );
  };

  const CheckBox = () => {
    return (
      <td className="px-6 py-[14px]  text-center">
        <input
          type="checkbox"
          className="rounded cursor-pointer scale-150 border-[5px] border-[#E37915] accent-[#E37915]"
        />
      </td>
    );
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-4 md:p-6 lg:p-10 overflow-y-scroll">
          <div className="mb-10">
            <HeadingSubHead heading="Notifications" withSubHead={false} />
          </div>

          <div className="flex flex-col gap-y-8">
            {/* Access & Security */}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading=" Access & Security "
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when someone logs in from an
                      unrecognized device or location
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when there are failed login attempts
                      on your account
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when user roles or permissions are
                      changed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payroll */}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading="Payroll"
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when payroll is submitted for
                      approval
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when payroll is approved or rejected
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when payroll payment is processed or
                      fails
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when payroll is exported
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when changes are made to approved
                      payroll
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Employee Management */}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading="Employee Management"
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a new employee is added
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when an employee’s profile is updated
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when an employee is deactivated or
                      removed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when employee access or role is
                      changed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Time & Leave*/}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading="Time & Leave"
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a leave request is submitted
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a leave request is approved or
                      rejected
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when an employee is deactivated or
                      removed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when employee access or role is
                      changed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Loan Management*/}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading="Loan Management"
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a loan request is submitted
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a leave request is approved or
                      rejected
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a loan is approved, rejected, or
                      marked as paid
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a loan repayment schedule is
                      updated
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* System & General*/}
            <div className="border border-[#E3E3E5] rounded-xl">
              <HeadingSubHeadInner
                heading="System & General"
                subhead="Choose which notifications you'd like to receive and stay updated on your data requests."
              />

              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[600px]"></th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      EMAIL
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] w-[50px]">
                      SLACK
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a new integration is added or
                      removed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a system update or downtime is
                      scheduled
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a data export or backup is
                      completed
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>

                  <tr className="border-y border-[#E3E3E5] last:border-b-0">
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      Receive notification when a note or comment is added to
                      payroll or employee files
                    </td>
                    <CheckBox />
                    <CheckBox />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Account;
