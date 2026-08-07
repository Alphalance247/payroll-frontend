"use client";

import { useState, useRef, useEffect } from "react";
import { Users, Globe } from "lucide-react";
import Button from "@/app/common/Button";
import { GoFilter } from "react-icons/go";
import { useTeamList } from "@/app/hooks/useQueries/useTeamList";

export interface MoreFiltersValue {
  teams: string[];
  countries: string[];
}

interface MoreFiltersDropdownProps {
  onApply?: (value: MoreFiltersValue) => void;
  className?: string;
}

const COUNTRIES = ["kenya", "nigeria", "united kingdom", "united states"];

type Category = "team" | "country";

const CheckMark = ({ isChecked }: { isChecked: boolean }) => (
  <span
    className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
      isChecked ? "bg-[#E37915] border-[#E37915]" : "border-[#D1D1D6] bg-white"
    }`}
  >
    {isChecked && (
      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
        <path
          d="M1 3.5L3.5 6L8 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "team", label: "Team", icon: <Users size={16} /> },
  { id: "country", label: "Country", icon: <Globe size={16} /> },
];

const MoreFiltersDropdown = ({
  onApply,
  className,
}: MoreFiltersDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("team");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const { data: teamList = [], isLoading: teamsLoading } = useTeamList();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleTeam = (team: string) =>
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team],
    );

  const toggleCountry = (country: string) =>
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );

  const handleApply = () => {
    onApply?.({ teams: selectedTeams, countries: selectedCountries });
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedTeams([]);
    setSelectedCountries([]);
    setOpen(false);
  };

  const totalSelected = selectedTeams.length + selectedCountries.length;

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-x-1.5 px-3 p-[7px] rounded-[8px] border text-sm font-medium transition-colors focus:outline-none ${
          totalSelected > 0
            ? "bg-[#FCF2E8] border-[#E37915] text-[#CF6E13]"
            : "bg-white border-[#D3D3D6] text-[#2F2F33] hover:bg-[#F7F7F7]"
        }`}
      >
        <GoFilter color="#71717A" size={20} />
        More Filters
        {totalSelected > 0 && (
          <span className="ml-0.5 bg-[#E37915] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold leading-none">
            {totalSelected}
          </span>
        )}
      </button>

      {/* ── Panel ── */}
      {open && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white border border-[#E3E3E5] rounded-xl shadow-lg overflow-hidden w-[460px]">
          <div className="flex min-h-[300px]">
            {/* Left category nav */}
            <div className="w-[180px] border-r border-[#E3E3E5] flex flex-col py-2">
              <p className="px-4 pt-2 pb-3 text-sm font-semibold text-[#2F2F33]">
                More filters
              </p>
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-x-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#FCF2E8] text-[#E37915]"
                        : "text-[#2F2F33] hover:bg-[#F7F7F7]"
                    }`}
                  >
                    <span
                      className={isActive ? "text-[#E37915]" : "text-[#71717A]"}
                    >
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Right options panel */}
            <div className="flex-1 flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b border-[#F0F0F3]">
                <p className="text-xs font-medium text-[#71717A]">
                  Select a {activeCategory}
                </p>
              </div>
              <ul className="py-1 overflow-y-auto max-h-[280px]">
                {activeCategory === "team" ? (
                  teamsLoading ? (
                    <li className="px-4 py-3 text-sm text-[#71717A]">
                      Loading teams...
                    </li>
                  ) : teamList.length === 0 ? (
                    <li className="px-4 py-3 text-sm text-[#71717A]">
                      No teams found
                    </li>
                  ) : (
                    teamList.map((team) => {
                      const id = String(team.id);
                      const isChecked = selectedTeams.includes(id);
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => toggleTeam(id)}
                            className="w-full flex items-center gap-x-3 px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
                          >
                            <CheckMark isChecked={isChecked} />
                            <span
                              className={`text-left ${
                                isChecked
                                  ? "font-medium text-[#2F2F33]"
                                  : "font-normal text-[#2F2F33]"
                              }`}
                            >
                              {team.name}
                            </span>
                          </button>
                        </li>
                      );
                    })
                  )
                ) : (
                  COUNTRIES.map((country) => {
                    const isChecked = selectedCountries.includes(country);
                    return (
                      <li key={country}>
                        <button
                          type="button"
                          onClick={() => toggleCountry(country)}
                          className="w-full flex items-center gap-x-3 px-4 py-2.5 text-sm hover:bg-[#F7F7F7] transition-colors"
                        >
                          <CheckMark isChecked={isChecked} />
                          <span
                            className={`text-left ${
                              isChecked
                                ? "font-medium text-[#2F2F33]"
                                : "font-normal text-[#2F2F33]"
                            }`}
                          >
                            {country}
                          </span>
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-x-2 px-4 py-3 border-t border-[#E3E3E5]">
            <Button variant="secondary" onButtonClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onButtonClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreFiltersDropdown;
