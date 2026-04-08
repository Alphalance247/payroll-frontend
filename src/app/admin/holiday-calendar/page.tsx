"use client";
import ProtectedRoute from "../../common/protectedRoute";
import DashboardLayout from "../../common/DashBoardLayout";
import DropDownBtn from "../../common/dropDownBtn";
import { useEffect, useState } from "react";
import Button from "../../common/Button";
import { FiPlus, FiEdit2 } from "react-icons/fi";
import { IoMenuOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiFlag1 } from "react-icons/ci";
import { LuTag } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { getHolidayStore } from "@/stores/home/getHoliday";
import Spinner from "../../common/spinner";
import StartEndDate from "../../components/common/startEndDate";
import { useFilter } from "../../hooks/useFilter";
import DeleteEvent from "../holiday-calendar-event/DeleteEvent";
import CreateEvent from "../holiday-calendar-event/CreateEvent";
import UpdateEvent from "../holiday-calendar-event/updateStatus";

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

  const country = [
    "All",
    "Nigeria",
    "Kenya",
    "United States",
    "Ghana",
    "South Africa",
  ];

  const {
    loading: loadingHolidayData,
    fetchPayrollHoliday,
    data: holidayData,
  } = getHolidayStore();
  const { setFilter, filteredData } = useFilter(
    holidayData?.data?.holidays?.results || [],
    ["country"],
  );

  console.log("holidayData", holidayData, "filtered", filteredData);

  useEffect(() => {
    fetchPayrollHoliday();
  }, [fetchPayrollHoliday]);

  useEffect(() => {
    setFilter("country", selectedCountry);
    setFilter("country", selectedCountry === "All" ? "" : selectedCountry);
  }, [selectedCountry, setFilter]);

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
                btnHeight="h-[350px]"
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
                        className="border-b border-[#E3E3E5] last:border-b-0"
                      >
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
                        className="border-b border-[#E3E3E5] last:border-b-0"
                      >
                        <td className="px-6 py-4 text-base font-medium text-[#2F2F33]">
                          {emp?.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#2F2F33]">
                          {emp?.date}
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
      </DashboardLayout>
    </ProtectedRoute>
  );
}
