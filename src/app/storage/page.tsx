"use client";
import { TfiExport } from "react-icons/tfi";
import Button from "../common/Button";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import DropDownBtn from "../common/dropDownBtn";
import { Search } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";
import Image from "next/image";

const Storage = () => {
  const { filteredData, setSearchQuery, searchQuery, setFilter } = useFilter(
    [],
    ["created_by"]
  );
  console.log(filteredData);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [requestType, setRequestType] = useState("");
  const requestOption = ["All", "Salary", "Tax"];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  useEffect(() => {
    setFilter("team", selectedTeam);
    setFilter("team", selectedTeam === "All" ? "" : selectedTeam);
    setFilter("query_type", requestType);
    setFilter("query_type", requestType === "All" ? "" : requestType);
  }, [selectedTeam, requestType, setFilter]);

  const date = [
    {
      month: "January",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "February",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "March",
      description: "You do not have any document for this month",
    },
    {
      month: "April",
      description: "You do not have any document for this month",
    },
    {
      month: "May",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "June",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "July",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "July",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
    {
      month: "July",
      description: "5 documents available | Last upload: Jan 29, 2025",
    },
  ];

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
          <div className="flex justify-between items-center">
            <div>
              <Heading
                flexDirection="column"
                subHead="All your payroll and tax documents in one place."
                user={"Storage"}
              />
            </div>

            <Button variant="primary" className="flex items-center gap-x-2">
              {" "}
              <span className="text-white">
                <TfiExport fill="white" size={14} />
              </span>{" "}
              Downlaod Zip file
            </Button>
          </div>

          <div className="flex items-center gap-x-3 justify-between mt-10">
            <div className="flex items-center gap-x-2">
              <div className="relative w-[400px]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-[10px] border border-[#E3E3E5] rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              </div>

              <DropDownBtn
                subText="Type"
                btnHeight="h-auto"
                width="w-auto"
                placeholder="Salary"
                onSelectOption={setRequestType}
                options={requestOption}
                selectedValue={requestType}
              />
            </div>

            <div>
              <DropDownBtn
                subText=" 2024"
                btnHeight="h-[350px]"
                //   placeholder="Teams"
                onSelectOption={setSelectedTeam}
                options={requestOption}
                selectedValue={selectedTeam}
              />
            </div>
          </div>

          <div className="mt-10 border border-[#E3E3E5] rounded-md">
            {date?.map((item, i) => {
              return (
                <div
                  key={i}
                  className=" border-b-[2.47px] border-[#E3E3E5] last:border-b-[0px]"
                >
                  <div
                    className="flex justify-between px-8 py-6 items-center cursor-pointer"
                    onClick={() => {
                      if (expandedIndex === i) {
                        setExpandedIndex(null);
                      } else {
                        setExpandedIndex(i);
                      }
                    }}
                  >
                    <div>
                      <h5 className="text-lg font-medium text-[#3A3A3A] mb-2">
                        {item?.month}
                      </h5>
                      <p className="text-sm text-[#3A3A3A]">
                        {item?.description}
                      </p>
                    </div>
                    <span className="block">
                      <IoMdArrowDropdown fill="#000000" size={30} />
                    </span>
                  </div>

                  {expandedIndex === i && (
                    <div className="px-4 py-4">
                      <div className="grid-cols-3 grid gap-6">
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                        <Image
                          src="/assets/storage/document.png"
                          width={292}
                          height={203}
                          alt="doocumnent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
