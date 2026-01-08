import ErrorFetch from "@/app/common/errorFetch";
import Spinner from "@/app/common/spinner";
import { getEmployeeLoanDetails } from "@/stores/employee-dashboard/loan/loanDetails";
import { getEmployeeLoanList } from "@/stores/employee-dashboard/loan/loanList";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import ShowCommentSideBar from "./showCommentSideBar";

const LoanTable = ({
  setIsOpenSideBar,
}: {
  setIsOpenSideBar: (isOpenSideBar: boolean) => void;
}) => {
  const { fetchEmployeeLoanList, error, loading, data } = getEmployeeLoanList();
  const { fetchEmployeeLoanDetails } = getEmployeeLoanDetails();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node)
        )
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-white rounded-lg border  border-[#E3E3E5] mt-10">
      <h3 className=" py-5 px-6 text-base font-medium text-[#2F2F33]">
        Loan History
      </h3>
      <div className="overflow-x-auto">
        {loading ? (
          <Spinner spinnerSmall={true} />
        ) : error ? (
          <ErrorFetch
            onRefetch={fetchEmployeeLoanList}
            message="Error fetching loan list"
          />
        ) : (
          <table className="w-full min-w-[1000px] overflow-hidden shadow-sm ">
            <thead className="bg-[#F7F7F7]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
              <tr>
                <th
                  className="px-6 py-3 text-left"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Request ID
                </th>
                <th
                  className="px-6 py-3 text-left "
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Repayment Term
                </th>
                <th
                  className="px-6 py-3 text-left"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Amount
                </th>
                <th
                  className="px-6 py-3 text-left w-[200px]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left w-[200px]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Requested On
                </th>

                <th
                  className="px-6 py-3 text-left w-[200px]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Repayment Percentage
                </th>

                <th
                  className="px-6 py-3 text-left w-[200px]"
                  style={{ paddingLeft: "1.5rem" }}
                >
                  Due Date
                </th>

                <th
                  className="px-6 py-3 text-left "
                  style={{ paddingLeft: "1.5rem" }}
                ></th>
              </tr>
            </thead>

            {data?.data.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    No Loan request found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-gray-600  dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 ">
                {data?.data?.map((data, i) => (
                  <tr
                    className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                    key={i}
                  >
                    <td
                      className="px-6 py-6 text-sm text-[#2F2F33]"
                      onClick={() => {
                        fetchEmployeeLoanDetails(data?.id);
                        setIsOpenSideBar(true);
                      }}
                    >
                      {data?.id}
                    </td>
                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      {data?.repayment_schedule}
                    </td>
                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      # {data?.amount}
                    </td>
                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                      >
                        {data?.status}
                      </span>
                    </td>

                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      {data?.created}
                    </td>

                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      {data?.created}
                    </td>

                    <td
                      className="p-6 text-sm text-[#2F2F33]"
                      style={{ paddingLeft: "1.5rem" }}
                    >
                      {data?.due_date}
                    </td>

                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === i ? null : i)
                          }
                          className="p-2 hover:bg-[#F0F0F3] rounded-lg transition-colors"
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === i && (
                          <div
                            ref={(el) => {
                              dropdownRefs.current[i] = el;
                            }}
                            className="absolute right-0 top-10 z-50 bg-white border border-[#E3E3E5] rounded-lg shadow-md w-[180px]"
                          >
                            <button
                              onClick={() => {
                                setShowCommentDrawer(true);
                                setOpenDropdown(null);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-[#2F2F33] hover:bg-[#F0F0F3] transition-colors border-b border-[#E3E3E5] last:border-b-0"
                            >
                              View Comments
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
      {showCommentDrawer && (
        <ShowCommentSideBar
          onCloseSideDrawer={() => setShowCommentDrawer(false)}
        />
      )}
    </section>
  );
};

export default LoanTable;
