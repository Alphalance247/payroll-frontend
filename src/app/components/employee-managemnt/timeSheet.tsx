"use client";
import DropDownBtn from "@/app/common/dropDownBtn";
import React from "react";

// Dummy data mimicking API response for a few days
const wk1 = [
  { date: "2023-10-01", dayOfMonth: 1, dayOfWeek: "Sunday", type: "weekend" },
  {
    date: "2023-10-02",
    dayOfMonth: 2,
    dayOfWeek: "Monday",
    type: "workday",
    regularHours: "08:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-03",
    dayOfMonth: 3,
    dayOfWeek: "Tuesday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-04",
    dayOfMonth: 4,
    dayOfWeek: "Wednesday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-05",
    dayOfMonth: 5,
    dayOfWeek: "Thursday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-06",
    dayOfMonth: 6,
    dayOfWeek: "Friday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  { date: "2023-10-07", dayOfMonth: 7, dayOfWeek: "Saturday", type: "weekend" },
];

const wk2 = [
  { date: "2023-10-01", dayOfMonth: 8, dayOfWeek: "Sunday", type: "weekend" },
  {
    date: "2023-10-02",
    dayOfMonth: 9,
    dayOfWeek: "Monday",
    type: "workday",
    regularHours: "08:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-03",
    dayOfMonth: 10,
    dayOfWeek: "Tuesday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-04",
    dayOfMonth: 11,
    dayOfWeek: "Wednesday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-05",
    dayOfMonth: 12,
    dayOfWeek: "Thursday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-06",
    dayOfMonth: 13,
    dayOfWeek: "Friday",
    type: "workday",
    regularHours: "06:00:00",
    overtimeHours: "00:00:00",
  },
  {
    date: "2023-10-07",
    dayOfMonth: 14,
    dayOfWeek: "Saturday",
    type: "weekend",
  },
];

const TimeSheet = () => {
  // In a real scenario, you'd fetch data here and store it in state
  //   const calendarData = dummyCalendarData; // Using dummy data for now

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
      time: "06.00",
    },
    {
      hrs: "Overtime Hours",
      time: "06.00",
    },
    {
      hrs: "Total Hours",
      time: "12.00",
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

            <DropDownBtn text="January" subText="" />
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
            <tr>
              {wk1.map((dayData) => (
                <td
                  key={dayData.date}
                  // style={{
                  //   border: "1px solid #ddd",
                  //   padding: "15px",
                  //   verticalAlign: "top",
                  //   minHeight: "100px",
                  //   width: `${100 / 7}%`,
                  // }}
                  className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                >
                  <div className="mb-16">
                    <p className="text-xl font-medium text-[#71717A]">
                      {dayData.dayOfMonth}
                    </p>
                  </div>
                  {dayData.type === "weekend" ? (
                    <div
                      // style={{
                      //   fontSize: "0.9em",
                      //   color: "#666",
                      //   marginTop: "10px",
                      // }}
                      className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]"
                    >
                      Weekend break
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.9em" }}>
                      <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                        Regular: {dayData.regularHours}
                      </div>
                      <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                        Overtime: {dayData.overtimeHours}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
            {/* Add more rows here for additional weeks */}
            <tr>
              {wk2.map((dayData) => (
                <td
                  key={dayData.date}
                  className="p-4 min-h-[100px] w-[200px] align-top border border-[#E3E3E5]"
                >
                  <div className="mb-16">
                    <p className="text-xl font-medium text-[#71717A]">
                      {dayData.dayOfMonth}
                    </p>
                  </div>
                  {dayData.type === "weekend" ? (
                    <div className="text-[#00000080] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#00000080] bg-[#F1F1F2]">
                      Weekend break
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.9em" }}>
                      <div className="text-[#0185C0] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#E6F5F9] mb-[5.5px]">
                        Regular: {dayData.regularHours}
                      </div>
                      <div className="text-[#CF6E13] px-[5.55px] w-fit text-[10px] font-medium rounded-[3px] border-[0.55px] border-[#0185C080] bg-[#FCF2E8]">
                        Overtime: {dayData.overtimeHours}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>{" "}
    </section>
  );
};

export default TimeSheet;
