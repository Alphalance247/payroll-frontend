"use client";
import SideDrawer from "@/app/common/sideDrawer/sideDrawer";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSend } from "react-icons/io5";

interface Comment {
  id: string;
  author: "admin" | "employee";
  message: string;
  timestamp: string;
  authorName?: string;
}

// type StatusType = "pending" | "approved" | "rejected";

const ShowCommentSideBar = ({
  onCloseSideDrawer,
  status,
  rejectionReason,
}: {
  onCloseSideDrawer: () => void;
  status?: string;
  rejectionReason?: string;
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "admin",
      message:
        "Thank you for submitting your leave request. We have received it and will review it shortly.",
      timestamp: "2025-01-05 10:30 AM",
      authorName: "Admin - Leave Management",
    },
    {
      id: "2",
      author: "employee",
      message: "Thank you! When can I expect a response?",
      timestamp: "2025-01-05 2:15 PM",
      authorName: "You",
    },
    {
      id: "3",
      author: "admin",
      message:
        "Your leave request has been approved! The dates are confirmed in the system.",
      timestamp: "2025-01-07 9:45 AM",
      authorName: "Admin - Leave Management",
    },
  ]);

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newComment: Comment = {
        id: String(comments.length + 1),
        author: "employee",
        message: newMessage,
        timestamp: new Date().toLocaleString(),
        authorName: "You",
      };
      setComments([...comments, newComment]);
      setNewMessage("");
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
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-[#71717A] text-sm">
                No comments yet. Start a conversation!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className={`flex ${
                  comment.author === "employee"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    comment.author === "employee"
                      ? "bg-[#E37915]"
                      : "bg-[#F0F0F3]"
                  } rounded-lg px-4 py-3`}
                >
                  {comment.author === "admin" && (
                    <p className="text-xs font-semibold text-[#71717A] mb-1">
                      {comment.authorName}
                    </p>
                  )}
                  <p
                    className={`text-sm ${
                      comment.author === "employee"
                        ? "text-white"
                        : "text-[#2F2F33]"
                    } break-words`}
                  >
                    {comment.message}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      comment.author === "employee"
                        ? "text-[rgba(255,255,255,0.7)]"
                        : "text-[#999]"
                    }`}
                  >
                    {comment.timestamp}
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
              <IoSend size={18} />
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
