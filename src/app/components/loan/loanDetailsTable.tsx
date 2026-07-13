import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";
import RequestDetails from "./requestDetails";
import LoanHistory from "./loanHistory";
import CurrentLoanActivity from "./currentLoanActivity";
import { getLoanDetails } from "@/stores/loan/getLoanDetails";
import Spinner from "@/app/common/spinner";
import ShowCommentSideBar from "../Employee-Dashboard/loan/showCommentSideBar";
import { useDisburse } from "@/app/hooks/useQueries/loan-request/useDisburse";

interface loadData {
  data: {
    amount: string;
    category: string;
    date_disburse: string;
    due_date: string;
    employee: string;
    id: string;
    repayment_schedule: string;
    estimated_repayment_date: string;
    status: string;
    disburse: boolean;
  }[];
}

const statusBadge = (status: string, disburse: boolean) => {
  if (disburse)
    return {
      label: "Disbursed",
      className: "bg-[#EBF5FF] border-[#1A73E8] text-[#1A73E8]",
    };
  if (status === "approved")
    return {
      label: "Approved",
      className: "bg-[#E9F9EF] border-[#188C43] text-[#188C43]",
    };
  if (status === "pending")
    return {
      label: "Pending",
      className: "bg-[#FFF4E5] border-[#FFA500] text-[#FFA500]",
    };
  return {
    label: "Declined",
    className: "bg-[#FDEBEB] border-[#D42626] text-[#D42626]",
  };
};

const LoanDetailsTable = ({ data }: { data: loadData }) => {
  // const { data } = getLoanRequestList();

  const [isOpen, setIsOpen] = useState(false);
  const { fetchLoanDetails, loading } = getLoanDetails();
  const { handleDisburse, disbursing: disbursingId } = useDisburse(() =>
    setOpenDropdown(null),
  );
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [showCommentDrawer, setShowCommentDrawer] = useState(false);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target as Node),
        )
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Loan Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-[14px] text-start text-sm font-medium w-[20px] text-[#71717A]">
                Request ID
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[230px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Name{" "}
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Repayment Term
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Amount
                </p>
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Estimated final repayment date
                </p>
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Date Disbursed
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[160px]">
                <p className="flex gap-x-1 cursor-pointer items-center">
                  Status
                </p>
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                <p className="flex gap-x-1 cursor-pointer items-center"></p>
              </th>
            </tr>
          </thead>

          {data?.data?.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-8">
                  No Loan Request found
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {data?.data.map((emp, i) => (
                <tr
                  key={i}
                  className="border-b border-[#E3E3E5] last:border-b-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors group"
                  onClick={() => {
                    fetchLoanDetails(emp?.id);
                    setIsOpen(true);
                  }}
                >
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 text-[#2F2F33] text-base">
                    {emp?.id}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#2F2F33] text-base font-medium">
                      {emp?.employee}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#2F2F33] text-base">
                    {emp?.repayment_schedule}
                  </td>
                  <td className="px-6 py-4 text-base text-[#2F2F33]">
                    ₦ {emp?.amount}
                  </td>
                  <td className="px-6 py-4 text-base text-[#2F2F33]">
                    {emp?.estimated_repayment_date || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-base text-[#2F2F33]">
                    {emp?.date_disburse || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {(() => {
                      const { label, className } = statusBadge(
                        emp?.status,
                        emp?.disburse,
                      );
                      return (
                        <span
                          className={`text-sm font-medium border rounded-lg px-[10px] py-1 ${className}`}
                        >
                          {label}
                        </span>
                      );
                    })()}
                  </td>

                  <td
                    className="px-6 py-4 text-sm text-[#2F2F33]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      {/* Explicit "View Details" button */}
                      <button
                        onClick={() => {
                          fetchLoanDetails(emp?.id);
                          setIsOpen(true);
                        }}
                        className="text-xs font-semibold text-[#CF6E13] bg-[#FCF2E8] hover:bg-[#F8E4D0] px-3 py-1.5 rounded-md transition-colors whitespace-nowrap opacity-0 group-hover:opacity-100"
                      >
                        View Details
                      </button>

                      {/* Three-dot menu */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenDropdown(openDropdown === i ? null : i)
                          }
                          className="p-2 hover:bg-[#F0F0F3] rounded-lg transition-colors"
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {openDropdown === i && (
                          <div
                            ref={(el) => {
                              dropdownRefs.current[i] = el;
                            }}
                            className="absolute right-0 top-0 z-50 bg-white border border-[#E3E3E5] rounded-lg shadow-md w-[180px]"
                          >
                            <button
                              onClick={() => {
                                fetchLoanDetails(emp?.id);
                                setIsOpen(true);
                                setOpenDropdown(null);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-[#2F2F33] hover:bg-[#F0F0F3] transition-colors border-b border-[#E3E3E5]"
                            >
                              View Details
                            </button>
                            {emp?.status === "approved" &&
                              emp?.disburse === false && (
                                <button
                                  onClick={() => handleDisburse(emp?.id)}
                                  disabled={disbursingId === emp?.id}
                                  className="w-full text-left px-4 py-3 text-sm font-medium text-[#CF6E13] hover:bg-[#FCF2E8] transition-colors border-b border-[#E3E3E5] disabled:opacity-50"
                                >
                                  {disbursingId === emp?.id
                                    ? "Disbursing..."
                                    : "Disburse Loan"}
                                </button>
                              )}
                            <button
                              onClick={() => {
                                setShowCommentDrawer(true);
                                setOpenDropdown(null);
                                setSelectedStatus(emp?.status);
                                setSelectedId(emp?.id);
                              }}
                              className="w-full text-left px-4 py-3 text-sm text-[#2F2F33] hover:bg-[#F0F0F3] transition-colors"
                            >
                              View Comments
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {isOpen && (
        <SideDrawer
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="relative z-50  w-[620px] h-full bg-white border border-[#E3E3E5] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#E3E3E5]">
              <h2 className="text-xl font-semibold text-[#2F2F33]">
                Loan Details
              </h2>
              <LiaTimesSolid
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <RequestDetails />
                <LoanHistory />
                <CurrentLoanActivity setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        </SideDrawer>
      )}

      {showCommentDrawer && (
        <ShowCommentSideBar
          status={selectedStatus}
          id={selectedId}
          onCloseSideDrawer={() => setShowCommentDrawer(false)}
        />
      )}
    </div>
  );
};

export default LoanDetailsTable;
