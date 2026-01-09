"use client";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSend } from "react-icons/io5";
import { useLeaveComments } from "@/app/hooks/useQueries/bonus/useLeaveComments";
import CommentLoadingState from "@/app/common/loadingState/commentLoading";
import ErrorFetch from "@/app/common/errorFetch";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const ShowCommentSideBar = ({
  onCloseSideDrawer,
  status,
  rejectionReason,
  id,
}: {
  onCloseSideDrawer: () => void;
  status?: string;
  rejectionReason?: string;
  id: string;
}) => {
  const { data, error, isLoading, refetch } = useLeaveComments({ id });
  const [loadingState, setLoadingState] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const getStatusStyles = () => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-[#E9F9EF]",
          text: "text-[#188C43]",
          border: "border-[#188C43]",
          icon: "✓",
          message: "Request Approved",
        };
      case "pending":
        return {
          bg: "bg-[#FEF3C7]",
          text: "text-[#B45309]",
          border: "border-[#B45309]",
          icon: "⏱",
          message: "Request Pending",
        };
      case "rejected":
        return {
          bg: "bg-[#FEE2E2]",
          text: "text-[#DC2626]",
          border: "border-[#DC2626]",
          icon: "✕",
          message: "Request Rejected",
        };
      default:
        return {
          bg: "bg-[#E9F9EF]",
          text: "text-[#188C43]",
          border: "border-[#188C43]",
          icon: "✓",
          message: "Request Approved",
        };
    }
  };

  const statusStyles = getStatusStyles();

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setLoadingState(true);
      try {
        const res = await axiosInstance.post(
          `/leaves/leave-requests/${id}/notes`,
          {
            note: newMessage,
            leave_request: id,
          }
        );

        if (res.status === 200 || res.status === 201) {
          setNewMessage("");
          refetch();
        }

        setLoadingState(false);
      } catch (err) {
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      } finally {
        setLoadingState(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <SideDrawer onClose={onCloseSideDrawer}>
      <div className="relative z-50 w-[606px] h-full bg-white border border-[#E3E3E5] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E3E3E5]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#2F2F33]">Comments</h2>
            <button
              onClick={onCloseSideDrawer}
              className="text-2xl cursor-pointer text-[#71717A] hover:text-[#2F2F33] transition-colors"
            >
              <LiaTimesSolid />
            </button>
          </div>

          {/* Status Badge */}
          <div
            className={`${statusStyles.bg} ${statusStyles.border} border rounded-lg px-4 py-3`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg ${statusStyles.text}`}>
                {statusStyles.icon}
              </span>
              <p className={`text-sm font-semibold ${statusStyles.text}`}>
                {statusStyles.message}
              </p>
            </div>
            {status === "rejected" && rejectionReason && (
              <p className={`text-xs ${statusStyles.text}`}>
                {rejectionReason}
              </p>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {isLoading ? (
            <CommentLoadingState />
          ) : error ? (
            <ErrorFetch
              message="Error fetching comments"
              onRefetch={refetch}
              smallWindow
            />
          ) : data?.data?.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-[#71717A] text-sm">
                No comments yet. Start a conversation!
              </p>
            </div>
          ) : (
            data?.data?.map((comment) => (
              <div
                key={comment.id}
                className={`flex ${
                  comment.is_admin ? "justify-start" : " justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    comment.is_admin ? "bg-[#F0F0F3]" : "bg-[#E37915]"
                  } rounded-lg px-4 py-3`}
                >
                  <p className="text-xs font-semibold text-[#71717A] mb-1">
                    {comment?.is_admin ? "Admin - Leave Management" : "You"}
                  </p>

                  <p
                    className={`text-sm ${
                      comment.is_admin ? " text-[#2F2F33]" : "text-white"
                    } break-words`}
                  >
                    {comment?.note}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      comment.is_admin
                        ? "text-[#999]"
                        : "text-[rgba(255,255,255,0.7)]"
                    }`}
                  >
                    {comment?.created_at}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#E3E3E5] px-6 py-4 bg-white">
          <div className="flex gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              className="flex-1 px-4 py-2 border border-[#E3E3E5] rounded-lg text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] min-h-[44px] max-h-[100px]"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-[#E37915] text-white rounded-lg hover:bg-[#d46f0f] disabled:bg-[#CCCCCC] disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {loadingState ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.046 1.137 5.824 3 7.938l3-3.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <IoSend size={18} />
              )}
            </button>
          </div>
          <p className="text-xs text-[#999] mt-2">
            Press Enter or click the send button to submit your message
          </p>
        </div>
      </div>
    </SideDrawer>
  );
};

export default ShowCommentSideBar;
