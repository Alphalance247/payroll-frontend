import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
interface tableContentsProps {
  name: string;
  document: string;
  fileSize: string;
}
const tableContents = [
  {
    name: "application",
    document: "resume",
    fileSize: "2.5mb",
  },
  {
    name: "legal",
    document: "contract",
    fileSize: "2.5mb",
  },
  {
    name: "identification",
    document: "passport",
    fileSize: "2.5mb",
  },
  {
    name: "education",
    document: "transcript",
    fileSize: "2.5mb",
  },
  {
    name: "application",
    document: "resume",
    fileSize: "2.5mb",
  },
  {
    name: "legal",
    document: "contract",
    fileSize: "2.5mb",
  },
];

const Uploads = ({ name, document, fileSize }: tableContentsProps) => {
  return (
    <div className=" rounded-[10px] overflow-hidden border-[1px] table-auto ">
      <table className="  w-full  font-Graphik">
        <thead className=" bg-[#E3E3E5] h-[60px] text-sm text-[#71717A] capitalize font-medium w-full ">
          <tr className=" ">
            <th className="text-start px-6">document</th>
            <th className="text-start px-6">name</th>
            <th className="text-start px-6">file size</th>
          </tr>
        </thead>
        <tbody className="capitalize text-[#71717A] text-[16px] font-normal w-full h-[72px]">
          {tableContents.map((tableContent) => (
            <tr key={tableContent.name} className=" border-[1px]">
              <td className="h-[60px] px-6">{tableContent.document}</td>
              <td className="h-[60px] px-6">{tableContent.name}</td>
              <td className="h-[60px] px-6">
                <div className="flex justify-between items-center">
                  <div> {tableContent.fileSize}</div>
                  <div>
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </td>
            </tr>
          ))}
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
            <td className="h-10 px-6"></td>
            <td className="h-10 px-6">
              <div className="flex justify-between items-center space-x-2">
                <div className="text-[#71717A] font-normal tex-[16px] pl-6">
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
