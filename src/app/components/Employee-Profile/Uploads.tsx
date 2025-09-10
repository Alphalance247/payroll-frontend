import { ChevronLeft, ChevronRight, Trash2Icon, Upload } from "lucide-react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useDocumentsUploaded } from "@/stores/employeeDetails/UploadDocument";
import Spinner from "@/app/common/spinner";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
interface Uploads {
  children: any;
  onClick: any;
}
const Uploads = ({ children, onClick }: Uploads) => {
  const { documents, loading } = useDocumentsUploaded();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const toggleDropdown = (id: any) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };
  const deleteDocument = (id: any) => {
    documents?.data.filter((item) => item.id !== id);
    console.log("delete");
  };
  return (
    <div className=" rounded-[10px]  border-[1px] table-auto overflow-auto h-fit">
      <table className="  w-full  font-Graphik">
        <thead className=" bg-[#E3E3E5] h-[60px] text-sm text-[#71717A] capitalize font-medium w-full  ">
          <tr className=" ">
            <th className="text-start px-6 ">document</th>
            <th className="text-start px-6">name</th>
            <th className="text-start px-6">file size</th>
          </tr>
        </thead>
        <tbody className="capitalize text-[#71717A] text-[16px] font-normal w-full h-[72px] ">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {documents?.data.length ? (
                <>
                  {documents?.data.map((document) => (
                    <tr key={document.id} className=" border-[1px]">
                      <td className="h-[60px] px-6">{document.document}</td>
                      <td className="h-[60px] px-6">{document.doc_name}</td>
                      <td className="h-[60px] px-6">
                        <div className="flex justify-between items-center">
                          <div> {document.file_size}</div>
                          <div className="relative">
                            <BsThreeDotsVertical
                              className="cursor-pointer"
                              onClick={() => {
                                toggleDropdown(document.id);
                              }}
                            />
                            {openDropdownId === document.id && (
                              <div className="absolute top-4 right-0 bg-white shadow-lg h-fit rounded-md w-28 z-20">
                                <div className="grid gap-y-2 p-4">
                                  {" "}
                                  <button
                                    className="outline-none text-[#E37915] capitalize font-Graphik font-normal text-start"
                                    onClick={onClick}
                                  >
                                    <div className="flex space-x-2 items-ceter">
                                      {" "}
                                      <div className=" items-center">
                                        <Upload className="text-[#E37915] w-[13.5px] " />
                                      </div>
                                      <div>upload</div>
                                    </div>
                                  </button>
                                  <button
                                    className="outline-none text-[#E37915] capitalize font-Graphik font-normal text-start"
                                    onClick={() => deleteDocument(document.id)}
                                  >
                                    <div className="flex space-x-2 items-ceter">
                                      {" "}
                                      <div className=" items-center">
                                        <Trash2Icon className="text-[#E37915] w-[13.5px] " />
                                      </div>
                                      <div>Delete</div>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            )}
                            {children}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="px-6 text-[#4D4D4D] font-Graphik pt-6">
                  <td>
                    <div className="px-6">No documents is available</div>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
        <tfoot className="">
          <tr className="w-full h-[72px] ">
            <td className="h-10 px-6">
              <div className="flex items-center space-x-2">
                <div className="text-[#71717A] font-normal">Show:</div>
                <div className="flex items-center space-x-1">
                  <div className="text-[16px] text-[#2F2F33]">10</div>
                  <button className="outline-none">
                    <RiArrowDropDownFill className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-[#71717A] font-normal text-sm">
                  per page
                </div>
              </div>
            </td>
            {/* <td className="h-10 px-6"></td> */}
            <td className="h-10 px-6" colSpan={2}>
              <div className="flex justify-between  items-center space-x-2 shrink-0">
                <div className="text-[#71717A] font-normal tex-[16px] ">
                  Page 1 of <span className="text-[#2F2F33]">2</span>
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="">
                    <button className="rounded-[4px] bg-[#E3E3E5]  flex items-center h-8 w-8 border-[1px] ">
                      <ChevronLeft className=" items-center h-8 w-8 px-1.5" />
                    </button>
                  </div>
                  <div className="">
                    <button className="rounded-[4px] bg-[#E3E3E5] flex items-center h-8 w-8 border-[1px] ">
                      <ChevronRight className=" items-center h-8 w-8 px-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Uploads;
