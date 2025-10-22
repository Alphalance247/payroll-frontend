"use client";
import Button from "@/app/common/Button";
import { getEmployeeTimesheet } from "@/stores/employee-dashboard/timesheet/time-sheet";

const TimeSheetTable = () => {
  const { data } = getEmployeeTimesheet();

  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Button variant="secondary">This week</Button>
        </div>
        {/* <Button variant="secondary" className="flex items-center gap-x-2">
          {" "}
          <span className="text-[#2F2F33]">
            <TfiExport fill="#2F2F33" size={14} />
          </span>{" "}
          Export CSV File
        </Button> */}
      </div>

      <div>
        <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
          <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
            My Timesheet
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-b border-[#E3E3E5]">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Date
                  </th>
                  {/* <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Issue ID
                  </th> */}
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Hours Logged
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Regular Hours
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Overtime Hours
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[250px]">
                    Description
                  </th>
                </tr>
              </thead>
              {data?.timesheet?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      No Time logged
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data?.timesheet.map((emp, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#E3E3E5] last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <span className="text-[#2F2F33] text-base">
                          {emp?.date_logged}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-[#2F2F33] text-left cursor-pointer underline underline-offset-2">
                        DVCT-{emp?.id}
                      </td> */}
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {emp?.hours}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {emp?.hours}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {emp?.overtime}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {emp?.description || "Not Specified"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeSheetTable;
