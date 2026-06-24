"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import DropDownBtn from "../../common/dropDownBtn";
import { useCallback, useEffect, useState, useRef } from "react";
import Button from "../../common/Button";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiFlag1 } from "react-icons/ci";
import { LuTag } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { Loader2 } from "lucide-react";
import { getHolidayStore } from "@/stores/home/getHoliday";
import Spinner from "../../common/spinner";
import StartEndDate from "../../components/common/startEndDate";
import { useFilter } from "../../hooks/useFilter";
import DeleteEvent from "../holiday-calendar-event/DeleteEvent";
import CreateEvent from "../holiday-calendar-event/CreateEvent";
import UpdateEvent from "../holiday-calendar-event/updateStatus";
import { GiWorld } from "react-icons/gi";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export default function HolidayCalendar() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selecteHolidayId, setSelectedHolidayId] = useState("");
  const [eventModal, setEventModal] = useState(false);
  const [eventType, setEventType] = useState("");
  const [holidayName, setHolidayName] = useState("");
  const [holidayStatus, setHolidayStatus] = useState(false);

  const [selectedHolidayIds, setSelectedHolidayIds] = useState<Set<string>>(
    new Set(),
  );
  const [bulkStatusValue, setBulkStatusValue] = useState<string>("");
  const [isApplyingBulkUpdate, setIsApplyingBulkUpdate] = useState(false);
  const [isApplyingBulkDelete, setIsApplyingBulkDelete] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const country = ["All", "Nigeria", "Kenya", "United States"];

  const {
    loading: loadingHolidayData,
    fetchPayrollHoliday,
    data: holidayData,
  } = getHolidayStore();
  const { setFilter, filteredData } = useFilter(
    holidayData?.data?.holidays?.results || [],
    ["country"],
  );

  const allHolidays = filteredData || [];
  const isAllSelected =
    selectedHolidayIds.size === allHolidays.length && allHolidays.length > 0;

  const clearSelections = useCallback(() => {
    setSelectedHolidayIds(new Set());
    setBulkStatusValue("");
    if (selectAllRef.current) {
      selectAllRef.current.checked = false;
    }
  }, []);

  useEffect(() => {
    fetchPayrollHoliday();
  }, [fetchPayrollHoliday]);

  useEffect(() => {
    setFilter("country", selectedCountry === "All" ? "" : selectedCountry);
  }, [selectedCountry, setFilter]);

  useEffect(() => {
    const previousCount = selectedHolidayIds.size;

    // Check if any selected items are no longer in filtered data
    const selectedStillVisible = Array.from(selectedHolidayIds).some(
      (id) =>
        filteredData.some((h) => h.id === id) ||
        holidayData?.data?.events?.some((e) => e.id === id),
    );

    if (previousCount > 0 && !selectedStillVisible) {
      // All selected items have been filtered out
      toast.error("Selections cleared due to filter change");
      clearSelections();
    }
  }, [
    filteredData,
    holidayData?.data?.events,
    selectedHolidayIds,
    clearSelections,
  ]);

  // ============ TOGGLE INDIVIDUAL HOLIDAY ============
  const toggleHolidaySelection = (holidayId: string) => {
    setSelectedHolidayIds((prev) => {
      const next = new Set(prev);
      if (next.has(holidayId)) {
        next.delete(holidayId);
      } else {
        next.add(holidayId);
      }
      return next;
    });

    // Reset status dropdown when selections change
    if (bulkStatusValue) {
      setBulkStatusValue("");
    }
  };

  // ============ TOGGLE SELECT ALL ============
  const toggleSelectAll = () => {
    if (isAllSelected) {
      // Deselect all
      setSelectedHolidayIds(new Set());
    } else {
      // Select all visible holidays
      const allIds = new Set([
        ...(holidayData?.data?.events?.map(
          (event: { id: string }) => event.id,
        ) || []),
        ...(filteredData.map((holiday: { id: string }) => holiday.id) || []),
      ]);
      setSelectedHolidayIds(allIds);
    }

    // Reset status dropdown
    setBulkStatusValue("");

    // Update checkbox visual state
    if (selectAllRef.current) {
      selectAllRef.current.checked = !isAllSelected;
    }
  };

  // ============ HANDLE BULK STATUS CHANGE ============
  const handleBulkStatusChange = (newStatus: string) => {
    setBulkStatusValue(newStatus);
  };

  // ============ APPLY BULK STATUS UPDATE ============
  const handleApplyBulkUpdate = async () => {
    if (!bulkStatusValue || selectedHolidayIds.size === 0) {
      toast.error("Please select a status and at least one holiday");
      return;
    }

    setIsApplyingBulkUpdate(true);
    try {
      const payload = Array.from(selectedHolidayIds).map((id) => ({
        id,
        status: bulkStatusValue,
      }));
      await axiosInstance.patch("/leaves/holidays/bulk", payload);
      toast.success(
        `Updated ${selectedHolidayIds.size} ${selectedHolidayIds.size === 1 ? "holiday" : "holidays"} to "${bulkStatusValue}"`,
      );
      clearSelections();
      await fetchPayrollHoliday();
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "Failed to update holidays";
      toast.error(message);
    } finally {
      setIsApplyingBulkUpdate(false);
    }
  };

  // ============ BULK DELETE ============
  const handleBulkDelete = async () => {
    if (selectedHolidayIds.size === 0) return;

    setIsApplyingBulkDelete(true);
    try {
      const payload = Array.from(selectedHolidayIds);
      await axiosInstance.delete("/leaves/holidays/bulk", {
        data: { ids: payload },
      });
      toast.success(
        `Deleted ${selectedHolidayIds.size} ${selectedHolidayIds.size === 1 ? "holiday" : "holidays"}`,
      );
      clearSelections();
      await fetchPayrollHoliday();
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message || err.message
          : "Failed to delete holidays";
      toast.error(message);
    } finally {
      setIsApplyingBulkDelete(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="p-10 overflow-y-scroll">
          {showDeleteModal && (
            <DeleteEvent
              id={selecteHolidayId}
              onModalClose={() => setShowDeleteModal(!showDeleteModal)}
              eventType={eventType}
              holidayName={holidayName}
            />
          )}

          {holidayStatus && (
            <UpdateEvent
              id={selecteHolidayId}
              onModalClose={() => setHolidayStatus(!holidayStatus)}
              eventType={eventType}
              holidayName={holidayName}
            />
          )}

          {eventModal && (
            <CreateEvent onModalClose={() => setEventModal(!eventModal)} />
          )}

          <div className="flex items-center justify-between mb-10">
            <StartEndDate
              start_date={start_date}
              end_date={end_date}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onFetch={() => {
                fetchPayrollHoliday(start_date, end_date);
              }}
            />

            <div className="flex gap-x-2 items-center">
              <DropDownBtn
                subText=""
                btnHeight="h-fit"
                placeholder="Nigeria"
                onSelectOption={setSelectedCountry}
                options={country}
                selectedValue={selectedCountry}
              />
              <div className="bg-[#F7F7F7] border border-[#E3E3E5] rounded-md p-[2px] flex gap-x-1 items-center">
                <button className="px-3 py-2 rounded-[4px]">
                  <FaRegCalendarAlt size={20} />
                </button>

                <button className="bg-[#FFFFFF] border border-[#E3E3E5] px-3 py-2 rounded-md">
                  <IoMenuOutline color="#71717A" size={20} />
                </button>
              </div>
              <Button
                className="flex gap-x-2 items-center justify-center"
                onButtonClick={() => setEventModal(true)}
              >
                <FiPlus /> Create Event
              </Button>
            </div>
          </div>
          {loadingHolidayData ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-b border-[#E3E3E5]">
                <thead className="border-y">
                  <tr>
                    {/* Checkbox column */}
                    <th className="w-[50px] px-6 py-[14px]">
                      <input
                        type="checkbox"
                        ref={selectAllRef}
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        title={`Select all holidays (${selectedHolidayIds.size} selected)`}
                        aria-label="Select all holidays"
                        className="w-4 h-4 rounded border-2 border-[#D3D3D6] 
                                   checked:bg-[#E37915] checked:border-[#E37915]
                                   cursor-pointer transition-all"
                      />
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px] ">
                      <div className="flex items-center gap-x-2">
                        <CiFlag1 color="#71717A" /> Name
                      </div>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                      <div className="flex items-center gap-x-2">
                        <FaRegCalendarAlt color="#71717A" /> Date
                      </div>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                      <div className="flex items-center gap-x-2">
                        <GiWorld color="#71717A" /> Country
                      </div>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                      <div className="flex items-center gap-x-2">
                        <FaRegCalendarAlt color="#71717A" /> Status
                      </div>
                    </th>

                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[120px]">
                      <div className="flex items-center gap-x-2">
                        <LuTag color="#71717A" /> Type
                      </div>
                    </th>
                    <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]"></th>
                  </tr>
                </thead>
                {filteredData?.length === 0 &&
                holidayData?.data?.events?.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={6} className="text-center py-8">
                        No holiday or events found
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {holidayData?.data?.events?.map((event, i) => (
                      <tr
                        key={i}
                        className={`border-b border-[#E3E3E5] last:border-b-0 transition-colors ${
                          selectedHolidayIds.has(event.id)
                            ? "bg-[#F0F9FF] border-l-4 border-l-[#E37915]"
                            : "hover:bg-[#F7F7F7]"
                        }`}
                      >
                        {/* Checkbox cell */}
                        <td className="px-6 py-4 w-[50px]">
                          <input
                            type="checkbox"
                            checked={selectedHolidayIds.has(event.id)}
                            onChange={() => toggleHolidaySelection(event.id)}
                            aria-label={`Select ${event.title}`}
                            className="w-4 h-4 rounded border-2 
                                     checked:bg-[#E37915] checked:border-[#E37915]
                                     cursor-pointer transition-all"
                          />
                        </td>

                        <td className="px-6 py-4 text-base font-medium text-[#2F2F33]">
                          {event?.title}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {event?.start}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <p className="px-[10px] py-[2px] border border-[#22C55E] bg-[#22C55E33] text-[#22C55E] rounded-[1rem] w-fit">
                            approved
                          </p>
                        </td>
                        <td className="px-6 py-4 text-base font-medium text-[#2F2F33]">
                          Event
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center gap-x-3">
                              <RiDeleteBinLine
                                color="#71717A"
                                className="cursor-pointer"
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setEventType(event?.type);
                                  setHolidayName(event?.title);
                                  setSelectedHolidayId(event?.id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredData?.map((emp, i) => (
                      <tr
                        key={i}
                        className={`border-b border-[#E3E3E5] last:border-b-0 transition-colors ${
                          selectedHolidayIds.has(emp.id)
                            ? "bg-[#F0F9FF] border-l-4 border-l-[#E37915]"
                            : "hover:bg-[#F7F7F7]"
                        }`}
                      >
                        {/* Checkbox cell */}
                        <td className="px-6 py-4 w-[50px]">
                          <input
                            type="checkbox"
                            checked={selectedHolidayIds.has(emp.id)}
                            onChange={() => toggleHolidaySelection(emp.id)}
                            aria-label={`Select ${emp.name}`}
                            className="w-4 h-4 rounded border-2 
                                     checked:bg-[#E37915] checked:border-[#E37915]
                                     cursor-pointer transition-all"
                          />
                        </td>

                        <td className="px-6 py-4 text-base font-medium text-[#2F2F33]">
                          {emp?.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {emp?.date}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {emp?.country}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p
                            className={`px-[10px] py-[2px] border rounded-[1rem] w-fit ${
                              emp?.status === "in review"
                                ? "border-yellow-400 bg-yellow-100 text-yellow-700"
                                : emp?.status === "approved"
                                  ? "border-green-500 bg-green-100 text-green-600"
                                  : "border-red-500 bg-red-100 text-red-600"
                            }`}
                          >
                            {emp?.status}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <p className="px-[10px] py-[2px] bg-[#009BC0] text-[white] rounded-[1rem] w-fit">
                            {emp?.primary_type}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center gap-x-3">
                              <RiDeleteBinLine
                                color="#71717A"
                                className="cursor-pointer"
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setEventType(emp?.type);
                                  setSelectedHolidayId(emp?.id);
                                  setHolidayName(emp?.name);
                                }}
                              />

                              <FiEdit2
                                color="#71717A"
                                className="cursor-pointer"
                                onClick={() => {
                                  setHolidayStatus(true);
                                  setEventType(emp?.type);
                                  setSelectedHolidayId(emp?.id);
                                  setHolidayName(emp?.name);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          )}
        </main>

        {/* Floating Action Bar - Bulk Update */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 
                      transition-all duration-300 ease-in-out
                      ${
                        selectedHolidayIds.size > 0
                          ? "translate-y-0 opacity-100 pointer-events-auto"
                          : "translate-y-20 opacity-0 pointer-events-none"
                      }`}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl border border-[#E3E3E5] 
                          px-6 py-3 flex items-center gap-4 flex-wrap"
          >
            {/* Count Badge & Text */}
            <div className="flex items-center gap-2">
              <span
                className="h-6 w-6 rounded-full bg-[#E37915] text-white 
                               text-xs flex items-center justify-center font-bold"
              >
                {selectedHolidayIds.size}
              </span>
              <span className="text-sm text-[#2F2F33] font-medium">
                {selectedHolidayIds.size ===
                filteredData.length + (holidayData?.data?.events?.length || 0)
                  ? `All ${selectedHolidayIds.size} selected`
                  : `${selectedHolidayIds.size} selected`}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-[#E3E3E5]" />

            {/* Deselect Link */}
            <button
              onClick={clearSelections}
              className="text-sm text-[#71717A] hover:text-[#2F2F33] 
                         transition-colors font-medium"
            >
              Deselect All
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-[#E3E3E5]" />

            {/* Status Dropdown Section */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-[#2F2F33] font-medium whitespace-nowrap">
                Update Status:
              </label>
              <select
                value={bulkStatusValue}
                onChange={(e) => handleBulkStatusChange(e.target.value)}
                disabled={isApplyingBulkUpdate}
                className="px-3 py-1.5 border border-[#E3E3E5] rounded-lg
                           text-sm text-[#2F2F33] outline-none
                           hover:border-[#E37915] focus:border-[#E37915]
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                <option value="">Select new status</option>
                <option value="in review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleApplyBulkUpdate}
                disabled={
                  !bulkStatusValue ||
                  isApplyingBulkUpdate ||
                  isApplyingBulkDelete
                }
                className="px-4 py-1.5 bg-[#E37915] text-white rounded-lg
                           text-sm font-medium transition-colors
                           hover:bg-[#D16B0D] disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isApplyingBulkUpdate ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Applying...
                  </>
                ) : (
                  "Apply"
                )}
              </button>

              <button
                onClick={handleBulkDelete}
                disabled={isApplyingBulkDelete || isApplyingBulkUpdate}
                className="px-4 py-1.5 bg-red-500 text-white rounded-lg
                           text-sm font-medium transition-colors
                           hover:bg-red-600 disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isApplyingBulkDelete ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>

              <button
                onClick={clearSelections}
                disabled={isApplyingBulkUpdate || isApplyingBulkDelete}
                className="px-4 py-1.5 border border-[#E3E3E5] text-[#2F2F33]
                           rounded-lg text-sm font-medium transition-colors
                           hover:bg-[#F7F7F7] disabled:opacity-50
                           disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
