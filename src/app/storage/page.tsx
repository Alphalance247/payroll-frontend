"use client";
import { TfiExport } from "react-icons/tfi";
import Button from "../common/Button";
import DashboardLayout from "../common/DashBoardLayout";
import Heading from "../common/heading";
import ProtectedRoute from "../common/protectedRoute";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import DropDownBtn from "../common/dropDownBtn";
import { FileText, Search } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";
import { getEmployeeDocuments } from "@/stores/storage/getEmployeeDocuments";
import { FiMoreVertical } from "react-icons/fi";
import Spinner from "../common/spinner";
import ErrorFetch from "../common/errorFetch";

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

  // Component to render different document types
  const DocumentRenderer = ({
    document,
    docName,
  }: {
    document: string;
    docName: string;
  }) => {
    const [isImage, setIsImage] = useState(false);
    const [isPdf, setIsPdf] = useState(false);

    useEffect(() => {
      // Check file extension to determine type
      const fileExtension = docName.split(".").pop()?.toLowerCase();
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
      const pdfExtensions = ["pdf", "docx"];

      setIsImage(imageExtensions.includes(fileExtension || ""));
      setIsPdf(pdfExtensions.includes(fileExtension || ""));
    }, [docName]);

    if (isImage) {
      return (
        <img
          src={document}
          alt={docName}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      );
    }

    if (isPdf) {
      return (
        <div className="w-full h-[200px]  bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <FileText className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 text-center px-2 break-words w-[80%]">
            {docName}
          </p>
          <a
            href={document}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
          >
            View PDF
          </a>
        </div>
      );
    }

    // Fallback for unknown file types
    return (
      <div className="w-full h-[200px] bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <FileText className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 text-center px-2">{docName}</p>
        <a
          href={document}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
        >
          Download
        </a>
      </div>
    );
  };

  const { fetchEmployeeDocuments, data, loading, error } =
    getEmployeeDocuments();

  useEffect(() => {
    fetchEmployeeDocuments();
  }, [fetchEmployeeDocuments]);

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
          {loading ? (
            <Spinner />
          ) : error ? (
            <ErrorFetch
              message="Error Fetching documents"
              onRefetch={() => fetchEmployeeDocuments()}
            />
          ) : (
            <>
              {data?.data?.length === 0 ? (
                <p className="text-sm text-gray-600 text-center px-2">
                  No Available documents yet
                </p>
              ) : (
                <div className="mt-10 border border-[#E3E3E5] rounded-md">
                  {data?.data.map((item, i) => {
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
                              {item?.label}
                            </h5>
                            <p className="text-sm text-[#3A3A3A]">
                              {item?.documents.length} documents available |
                              Last upload:
                              {
                                item?.documents?.find(
                                  (find) => find?.uploaded_at
                                )?.uploaded_at
                              }
                            </p>
                          </div>
                          <span className="block">
                            <IoMdArrowDropdown fill="#000000" size={30} />
                          </span>
                        </div>

                        {expandedIndex === i && (
                          <div className="px-4 py-4">
                            <div className="grid-cols-3 grid gap-6">
                              {item?.documents?.map((item, i) => (
                                <div
                                  className="p-4 border border-[#E3E3E5] rounded-lg"
                                  key={i}
                                >
                                  <DocumentRenderer
                                    docName={item?.filename}
                                    document={item?.document}
                                  />
                                  <div className="flex justify-between items-center mt-4">
                                    <p className="text-base text-[#131516]">
                                      {item?.doc_name}
                                    </p>

                                    <span className=" cursor-pointer">
                                      <FiMoreVertical />
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Storage;
