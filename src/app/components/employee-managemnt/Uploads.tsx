import { BsThreeDotsVertical } from "react-icons/bs";

const Uploads = () => {
  const filterTable = [
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
    {
      id: 1,
      name: "azeez",
    },
  ];
  return (
    <section className="bg-white  mt-10">
      <div className="overflow-x-auto rounded-lg border border-[#E3E3E5]">
        <table className="w-full min-w-[1100px] border-b border-[#E3E3E5]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Document
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Name
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Upload Date
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                File Size
              </th>
              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[200px]">
                Uploaded by
              </th>

              <th className="px-6 py-[14px] text-sm font-medium text-[#71717A] text-left w-[100px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filterTable.map((emp, i) => (
              <tr key={i} className="border-b border-[#E3E3E5] last:border-b-0">
                <td className="px-6 py-4 text-sm text-[#2F2F33]">Resume</td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  Application
                </td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">01-01-2025</td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">2.5mb</td>
                <td className="px-6 py-4 text-sm text-[#2F2F33]">Employee</td>

                <td className="px-6 py-4 text-sm text-[#2F2F33]">
                  {" "}
                  <BsThreeDotsVertical />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Uploads;
