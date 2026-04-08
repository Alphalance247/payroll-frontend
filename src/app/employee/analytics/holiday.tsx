"use client";
import { useEffect, useMemo } from "react";
import { getHolidayStore } from "@/stores/home/getHoliday";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { BiCertification } from "react-icons/bi";

const ApprovedHolidaysTab = () => {
  const {
    loading: loadingHolidayData,
    fetchPayrollHoliday,
    data: holidayData,
    error: holidayDataError,
  } = getHolidayStore();

  useEffect(() => {
    fetchPayrollHoliday();
  }, [fetchPayrollHoliday]);

  // Filter holidays by country and status
  const filteredHolidays = useMemo(() => {
    if (!holidayData?.data?.holidays?.results) return [];
    return holidayData.data.holidays.results.filter(
      (holiday) => holiday.status === "approved",
    );
  }, [holidayData]);

  const parseHolidayDate = (dateString: string): Date | null => {
    if (!dateString) return null;

    const normalized = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) return parsed;

    const regex = /^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,\s*(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) return null;

    const [, month, day, year] = match;
    const parsedExplicit = new Date(`${month} ${day}, ${year}`);
    return Number.isNaN(parsedExplicit.getTime()) ? null : parsedExplicit;
  };

  const calculateDaysUntil = (dateString: string): number | null => {
    const holidayDate = parseHolidayDate(dateString);
    if (!holidayDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    holidayDate.setHours(0, 0, 0, 0);

    return Math.ceil(
      (holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const formatHolidayDate = (dateString: string): string => {
    const holidayDate = parseHolidayDate(dateString);
    if (!holidayDate) return "Date unavailable";

    return holidayDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDayStatusText = (days: number | null): string => {
    if (days === null) return "Date unavailable";
    if (days < 0) return "Already taken";
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";
    return `${days} days away`;
  };

  const getDayStatusColor = (days: number | null): string => {
    if (days === null) return "bg-gray-100 text-gray-600";
    if (days < 0) return "bg-gray-100 text-gray-600";
    if (days === 0) return "bg-red-100 text-red-600";
    if (days <= 7) return "bg-orange-100 text-orange-600";
    if (days <= 30) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  if (loadingHolidayData) {
    return <Spinner spinnerSmall={true} />;
  }

  if (holidayDataError) {
    return (
      <ErrorFetch
        onRefetch={fetchPayrollHoliday}
        message={holidayDataError}
        smallWindow={true}
      />
    );
  }

  if (!filteredHolidays || filteredHolidays.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <FaCalendarDays size={64} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-500 mb-2">
          No Approved Holidays
        </h3>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#2F2F33] mb-2 font-Graphik">
              🎉 Approved Holidays
            </h2>
            <p className="text-[#71717A] text-sm">
              Celebrate these official days off across your organization
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#009BC0]">
              {filteredHolidays.length}
            </div>
            <p className="text-[#71717A] text-sm">Total Holidays</p>
          </div>
        </div>

        {/* Country Filter */}
        {/* <div className="flex gap-2 flex-wrap">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCountry === country
                  ? "bg-[#009BC0] text-white shadow-md"
                  : "bg-[#F7F7F7] text-[#71717A] hover:bg-[#E3E3E5]"
              }`}
            >
              {country}
            </button>
          ))}
        </div> */}
      </div>

      {/* Holidays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHolidays.map((holiday) => {
          const daysUntil = calculateDaysUntil(holiday.date);

          return (
            <div
              key={holiday.id}
              className="group relative overflow-hidden bg-white border border-[#E3E3E5] rounded-xl transition-all duration-300 hover:shadow-lg hover:border-[#009BC0] hover:-translate-y-1"
            >
              {/* Gradient Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#009BC0] to-[#00D4FF]"></div>

              <div className="p-6">
                {/* Top Section - Holiday Name & Status */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#2F2F33] font-Graphik pr-2 flex-1">
                      {holiday.name}
                    </h3>
                    <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0">
                      ✓ Approved
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E3E3E5] mb-4"></div>

                {/* Details Section */}
                <div className="space-y-3 mb-4">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F5F9] flex items-center justify-center">
                      <FaCalendarDays size={18} className="text-[#009BC0]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] uppercase tracking-wide">
                        Date
                      </p>
                      <p className="text-sm font-medium text-[#2F2F33]">
                        {formatHolidayDate(holiday.date || "")}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF4E6] flex items-center justify-center">
                      <MdLocationOn size={18} className="text-[#E37915]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] uppercase tracking-wide">
                        Country
                      </p>
                      <p className="text-sm font-medium text-[#2F2F33]">
                        {holiday.country}
                      </p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F0E6FF] flex items-center justify-center">
                      <BiCertification size={18} className="text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#71717A] uppercase tracking-wide">
                        Type
                      </p>
                      <p className="text-sm font-medium text-[#2F2F33] capitalize">
                        {holiday.primary_type || holiday.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E3E3E5] my-4"></div>

                {/* Countdown Section */}
                <div
                  className={`px-4 py-3 rounded-lg text-center font-medium transition-all ${getDayStatusColor(
                    daysUntil,
                  )}`}
                >
                  {getDayStatusText(daysUntil)}
                </div>
              </div>

              {/* Hover Effect - Animated Corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#009BC0] opacity-0 group-hover:opacity-10 rounded-tl-full transition-all duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-12 p-6 bg-gradient-to-r from-[#E6F5F9] to-[#F0F9FB] rounded-xl border border-[#B0E0EB]">
        <h4 className="font-semibold text-[#2F2F33] mb-4 font-Graphik">
          Quick Stats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-[#71717A] mb-1">
              Total Approved Holidays
            </p>
            <p className="text-2xl font-bold text-[#009BC0]">
              {filteredHolidays.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-[#71717A] mb-1">Coming Up Soon</p>
            <p className="text-2xl font-bold text-[#E37915]">
              {
                // filteredHolidays.filter((h) => {
                //   const days = calculateDaysUntil(h.date);
                //   return days > 0 && days <= 30;
                // }).length
              }
            </p>
          </div>
          <div>
            <p className="text-sm text-[#71717A] mb-1">Countries Covered</p>
            <p className="text-2xl font-bold text-[#7C3AED]">
              {new Set(filteredHolidays.map((h) => h.country)).size}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedHolidaysTab;
