"use client";
import Button from "@/app/common/Button";
import { BiPlus } from "react-icons/bi";
import { TfiExport } from "react-icons/tfi";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Search } from "lucide-react";
import { useState } from "react";

const EmpoyeeTimeSheet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = [
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
    {
      id: 1,
      fullname: "John Doe",
      email: "",
    },
  ];

  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-10">
        <div>
          <Button variant="secondary">This week</Button>
        </div>
        <div className="flex gap-x-2 items-center">
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
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
          <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
            Leave Requests
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
                onChange={() => {}}
                className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1600px] border-b border-[#E3E3E5]">
              <thead className="bg-[#F7F7F7]">
                <tr>
                  <th className="px-6 py-[14px] w-[40px]">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                    Name
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Mon, Aug 4
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Tue, Aug 5
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Wed, Aug 6
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Thu, Aug 7
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Fri, Aug 8
                  </th>

                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Total
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Expected Hours
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Hours Behind
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[150px]">
                    Status
                  </th>
                  <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[50px]"></th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((emp, i) => (
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
                          {emp?.fullname
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <span className="text-[#2F2F33] text-sm font-medium">
                          {emp?.fullname}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      3h
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      4h
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      3h
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      4h
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      3h
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">20hr</td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">40hr</td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33] text-center">
                      10hr
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs border border-[#188C43] bg-[#E9F9EF] text-[#188C43] font-medium`}
                      >
                        Resolved
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {" "}
                      <BsThreeDotsVertical />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpoyeeTimeSheet;
