"use client";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Search } from "lucide-react";
import { getAdminTimesheet } from "@/stores/admin-dashboard/timesheet/time-sheet";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useFilter } from "@/app/hooks/useFilter";

const EmpoyeeTimeSheet = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const { data, fetchAdminTimesheet, loading, error } = getAdminTimesheet();
  // const [start_date, setStartDate] = useState("");
  // const [end_date, setEndDate] = useState("");

  const { filteredData, setSearchQuery, searchQuery } = useFilter(
    data?.current_week_data || [],
    ["name"],
  );

  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-10">
        {/* <div className="flex gap-x-3 items-center">
          <div>
            <StartEndDate
              start_date={start_date}
              end_date={end_date}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onFetch={() => {
                fetchAdminTimesheet(start_date, end_date);
              }}
            />
          </div>

          <div>
            <Button
              variant="secondary"
              onButtonClick={() => fetchAdminTimesheet()}
            >
              This week
            </Button>
          </div>
        </div> */}
        {/* <div className="flex gap-x-2 items-center">
          <Button variant="secondary" className="flex items-center gap-x-2">
            {" "}
            <span className="text-[#2F2F33]">
              <TfiExport fill="#2F2F33" size={14} />
            </span>{" "}
            Filter
          </Button>
          <Button variant="secondary" className="flex items-center gap-x-2">
            {" "}
            <span className="text-[#2F2F33]">
              <TfiExport fill="#2F2F33" size={14} />
            </span>{" "}
            Export CSV File
          </Button>
          <Button variant="primary" className="flex items-center gap-x-2">
            {" "}
            <span className="text-white">
              <BiPlus size={20} />
            </span>{" "}
            Log Time
          </Button>
        </div> */}
      </div>
      {loading ? (
        <Spinner spinnerSmall={true} />
      ) : error ? (
        <ErrorFetch
          message="Error fetching Time Sheet"
          onRefetch={() => fetchAdminTimesheet()}
        />
      ) : (
        <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
          <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
            Employees Timesheet
          </h2>
          <div className="py-4 px-4 flex items-center justify-between">
            <div className="flex items-center cursor-pointer bg-[#F7F7F7] w-fit gap-x-1 rounded-sm px-1 py-1 border border-[#E3E3E5]">
              <div className="">
                <input
                  type="checkbox"
                  className="rounded w-[13px] h-[13px] border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <TiArrowSortedDown size={20} />
              </div>
            </div>

            <div className="relative w-[300px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] border-b border-[#E3E3E5]">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-6 py-[14px] w-[40px]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[300px]">
                    Name
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Mon
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Tue
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Wed
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Thu
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Fri
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Sat
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Sun
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[50px]"></th>
                </tr>
              </thead>
              {filteredData?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      No Time logged
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredData?.map((emp, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#E3E3E5] last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                            {emp?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <span className="text-[#2F2F33] text-sm font-medium">
                            {emp?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33] text-left">
                        {emp?.week_hours?.Mon}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33] text-left">
                        {emp?.week_hours?.Tue}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33] text-left">
                        {emp?.week_hours?.Wed}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33] text-left">
                        {emp?.week_hours?.Thu}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33] text-left">
                        {emp?.week_hours?.Fri}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {" "}
                        {emp?.week_hours?.Sat}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {emp?.week_hours?.Sun}
                      </td>

                      <td className="px-6 py-4 text-sm text-[#2F2F33]">
                        {" "}
                        <BsThreeDotsVertical />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmpoyeeTimeSheet;
