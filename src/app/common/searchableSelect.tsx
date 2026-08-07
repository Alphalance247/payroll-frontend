"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

const SearchableSelect = ({
  label,
  placeholder = "Select...",
  searchPlaceholder = "Search",
  options,
  value,
  onChange,
  id,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#2F2F33]">
          {label}
        </label>
      )}

      <div className="relative" ref={containerRef}>
        {/* Trigger */}
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full flex items-center justify-between border font-medium border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915] transition-colors ${
            selectedLabel ? "text-[#2F2F33]" : "text-[#2F2F33]"
          }`}
        >
          <span className="truncate">{selectedLabel ?? placeholder}</span>
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={`flex-shrink-0 ml-2 text-[#71717A] transition-transform duration-150 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div className="absolute z-50 top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E3E3E5] rounded-lg shadow-lg overflow-hidden">
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E3E3E5]">
              <Search size={14} className="flex-shrink-0 text-[#BEBEC2]" />
              <input
                ref={searchRef}
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm text-[#2F2F33] placeholder:text-[#BEBEC2] focus:outline-none bg-transparent"
              />
            </div>

            {/* Options list */}
            <ul className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-[#A0A0A8]">
                  No results found
                </li>
              ) : (
                filtered.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-[#2F2F33] hover:bg-[#F7F7F7] cursor-pointer transition-colors"
                  >
                    <span>{opt.label}</span>
                    {value === opt.value && (
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="flex-shrink-0 text-[#2F2F33]"
                      />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
