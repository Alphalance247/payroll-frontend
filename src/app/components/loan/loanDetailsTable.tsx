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

interface loadData {
  data: {
    amount: string;
    category: string;
    date_disburse: string;
    due_date: string;
    employee: string;
    id: string;
    repayment_schedule: string;
    status: string;
  }[];
}

const LoanDetailsTable = ({ data }: { data: loadData }) => {
  // const { data } = getLoanRequestList();

  const [isOpen, setIsOpen] = useState(false);
  const { fetchLoanDetails, loading } = getLoanDetails();
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
    <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
      <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33]">
        Pending Loan Details
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] w-[40px]">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-[14px] text-start text-sm font-medium w-[200px] text-[#71717A]">
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
                  Date Disbursed
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
                  className="border-b border-[#E3E3E5] last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td
                    className="px-6 py-4 text-[#2F2F33] text-base cursor-pointer hover:underline"
                    onClick={() => {
                      fetchLoanDetails(emp?.id);
                      setIsOpen(true);
                    }}
                  >
                    {emp?.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#2F2F33] text-base">
                        {emp?.employee}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#2F2F33] text-base">
                    {emp?.repayment_schedule}
                  </td>
                  <td className="px-6 py-4 text-base text-[#2F2F33]">
                    ₦ {emp?.amount}
                  </td>

                  <td className="px-6 py-4 text-base text-[#2F2F33]">
                    {" "}
                    {emp?.date_disburse || "N/A"}
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
                          className="absolute right-0 top-0 z-50 bg-white border border-[#E3E3E5] rounded-lg shadow-md w-[180px]"
                        >
                          <button
                            onClick={() => {
                              setShowCommentDrawer(true);
                              setOpenDropdown(null);
                              setSelectedStatus(emp?.status);
                              setSelectedId(emp?.id);
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
