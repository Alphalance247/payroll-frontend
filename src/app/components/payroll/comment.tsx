import React, { useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";

interface CommentModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onAddNote: (note: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onCancel,
  onAddNote,
}) => {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  return (
    <ModalOverlay onClose={onCancel}>
      <div className="relative z-50 bg-white rounded-lg shadow-lg px-6 py-4 max-w-[632px] w-full flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#2F2F33]">
            Add a Comment
          </h3>
          <textarea
            className="w-full min-h-[132px] font-medium rounded-md border border-[#BEBEC2] p-3 text-base resize-vertical outline-none focus:border-blue-400"
            placeholder="Leave a note for product office..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-2 items-center border-[#E5E5E5] border-t pt-4">
          <div className="text-sm text-gray-500 flex gap-3 items-center">
            <span>@mention</span>
            <span>
              <b>**bold**</b>
            </span>
            <span>
              <i>_italics_</i>
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <button
              className="bg-gray-100 border border-gray-300 rounded px-4 py-2 text-base hover:bg-gray-200 transition"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-sky-600 text-white rounded px-4 py-2 text-base font-medium hover:bg-sky-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                onAddNote(note);
                setNote("");
              }}
              disabled={!note.trim()}
              type="button"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CommentModal;
