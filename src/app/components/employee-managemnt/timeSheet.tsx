"use client";
import DropDownBtn from "@/app/common/dropDownBtn";
import { getTimeSheetWithId } from "@/stores/time-sheet-id/getTimeSheetWithId";
import React, { useState } from "react";

type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

const TimeSheet = () => {
  const { data: timeSheetData } = getTimeSheetWithId();
  const [selectedMonth, setSelectedMonth] = useState<Month>("January");

  // Create dummy entries
  const sundayEntry = {
    hours: 10,
    overtime: 10,
    type: "weekend",
  };

  const saturdayEntry = {
    hours: 12,
    overtime: 19,
    type: "weekend",
  };

  const originalWk1 =
    timeSheetData?.timesheet_data?.[selectedMonth] !== undefined
      ? timeSheetData?.timesheet_data?.[selectedMonth]?.slice(0, 5)
      : [];
  const originalWk2 =
    timeSheetData?.timesheet_data?.[selectedMonth] !== undefined
      ? timeSheetData?.timesheet_data?.[selectedMonth]?.slice(5, 10)
      : [];
  const originalWk3 =
    timeSheetData?.timesheet_data?.[selectedMonth] !== undefined
      ? timeSheetData?.timesheet_data?.[selectedMonth]?.slice(10, 15)
      : [];
  const originalWk4 =
    timeSheetData?.timesheet_data?.[selectedMonth] !== undefined
      ? timeSheetData?.timesheet_data?.[selectedMonth]?.slice(15, 20)
      : [];

  const wk1 = [sundayEntry, ...originalWk1, saturdayEntry];
  const wk2 = [sundayEntry, ...originalWk2, saturdayEntry];
  const wk3 = [sundayEntry, ...originalWk3, saturdayEntry];
  const wk4 = [sundayEntry, ...originalWk4, saturdayEntry];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hrsandtime = [
    {
      hrs: "Regular Hours",
      time: timeSheetData?.total_regular_hours || "00.00",
    },
    {
      hrs: "Overtime Hours",
      time: timeSheetData?.total_overtime || "00.00",
    },
    {
      hrs: "Total Hours",
      time: timeSheetData?.total_hours || "00.00",
    },
  ];

  // This is a simplified representation, you'd need more complex logic
  // to handle weeks and month views properly based on the full month's data.
  // For this example, we'll just render the days we have in dummyData.

  return (
    <section className="mt-10">
      <div className="bg-white rounded-lg  mt-10">
        <div className=" border-t border-x border-[#E3E3E5]">
          <div className="flex justify-between py-5 px-6">
            <h2 className="text-base font-semibold  text-[#2F2F33]">
              Time logged
            </h2>

            <DropDownBtn
              placeholder="Month"
              subText=""
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              onSelectOption={(value) => setSelectedMonth(value as Month)}
              selectedValue={selectedMonth}
              btnHeight="h-[200px]"
            />
          </div>

          <div className="bg-[#F7F7F7] py-4 px-6 flex flex-col gap-y-3">
            {hrsandtime.map((el, i) => (
              <div className="flex justify-between items-center" key={i}>
                <p className="text-[#71717A] text-sm font-medium">{el?.hrs}</p>
                <p className="text-sm font-medium text-[#71717A]">{el?.time}</p>
              </div>
            ))}
          </div>
        </div>

        <table className="w-full border-collapse overflow-auto">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="border text-left border-[#E3E3E5] p-3 text-sm text-[#71717A]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSheetData?.timesheet_data?.[selectedMonth] === undefined ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-[#71717A]">
                  No data available for this month.
                </td>
              </tr>
            ) : (
              <>
                <tr>
                  {wk1.map((dayData, i) => (
                    <td
                      key={i}
                      className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                    >
                      <div className="mb-16">
                        <p className="text-xl font-medium text-[#71717A]">
                          {/* {dayData.dayOfMonth} */} {i + 1}
                        </p>
                      </div>
                      {dayData?.type === "weekend" ? (
                        <div className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]">
                          Weekend break
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.9em" }}>
                          <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                            Regular: {dayData?.hours || "00:00"}
                          </div>
                          <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                            Overtime: {dayData?.overtime || "00:00"}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
                {/* Add more rows here for additional weeks */}
                <tr>
                  {wk2.map((dayData, i) => (
                    <td
                      key={i}
                      className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                    >
                      <div className="mb-16">
                        <p className="text-xl font-medium text-[#71717A]">
                          {i + 8}
                        </p>
                      </div>
                      {dayData.type === "weekend" ? (
                        <div className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]">
                          Weekend break
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.9em" }}>
                          <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                            Regular: {dayData?.hours || "00:00"}
                          </div>
                          <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                            Overtime: {dayData?.overtime || "00:00"}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                <tr>
                  {wk3.map((dayData, i) => (
                    <td
                      key={i}
                      className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                    >
                      <div className="mb-16">
                        <p className="text-xl font-medium text-[#71717A]">
                          {i + 15}
                        </p>
                      </div>
                      {dayData.type === "weekend" ? (
                        <div className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]">
                          Weekend break
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.9em" }}>
                          <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                            Regular: {dayData?.hours || "00:00"}
                          </div>
                          <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                            Overtime: {dayData?.overtime || "00:00"}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                <tr>
                  {wk4.map((dayData, i) => (
                    <td
                      key={i}
                      className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                    >
                      <div className="mb-16">
                        <p className="text-xl font-medium text-[#71717A]">
                          {i + 22}
                        </p>
                      </div>
                      {dayData.type === "weekend" ? (
                        <div className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]">
                          Weekend break
                        </div>
                      ) : (
                        <div style={{ fontSize: "0.9em" }}>
                          <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                            Regular: {dayData?.hours || "00:00"}
                          </div>
                          <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                            Overtime: {dayData?.overtime || "00:00"}
                          </div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>{" "}
    </section>
  );
};

export default TimeSheet;
