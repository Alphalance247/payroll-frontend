"use client";
import { FaChevronLeft, FaCaretDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  pageSize = 20,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 w-full border-t border-slate-200 bg-white">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>Show:</span>
        <div className="relative inline-flex items-center">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E37915] focus:border-[#E37915] cursor-pointer"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <FaCaretDown
            className="absolute right-2.5 pointer-events-none"
            color="#000000"
            size={14}
          />
        </div>
        <span>per page</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-slate-500 font-medium">
          Page{" "}
          <span className="text-slate-900 font-semibold">{currentPage}</span> of{" "}
          <span className="text-slate-900 font-semibold">
            {totalPages || 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#E37915]"
          >
            <FaChevronLeft color="#2F2F33" />
          </button>
          <button
            type="button"
            disabled={currentPage >= (totalPages || 1)}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            className="p-2 bg-white rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#E37915]"
          >
            <FaChevronRight color="#2F2F33" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
