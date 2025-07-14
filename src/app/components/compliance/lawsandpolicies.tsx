import UpdateHeading from "@/app/common/updatesHeading";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getComplianceCardStore } from "@/stores/compliance/getComplianceCard";

const LawsAndPolicies = () => {
  const { data } = getComplianceCardStore();
  return (
    <section className="border-[#E3E3E5] border rounded-lg">
      <UpdateHeading text="Laws & Policies" />
      <table className="w-full  overflow-hidden shadow-sm ">
        <thead className="bg-[#F9FAFB]  border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
          <tr>
            <th
              className="px-6 py-3 text-left"
              style={{ paddingLeft: "1.5rem" }}
            >
              Name
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            >
              Category
            </th>
            <th
              className="px-6 py-3 text-left"
              style={{ paddingLeft: "1.5rem" }}
            >
              Effective Date
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            >
              Last Updated
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            >
              Uploaded By
            </th>
            <th
              className="px-6 py-3 text-left "
              style={{ paddingLeft: "1.5rem" }}
            ></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
          {data?.map((data) => (
            <tr
              className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
              key={data?.id}
            >
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                {data?.title}
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                {data?.category}
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                {data?.effective_date || "N/A"}
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                {data?.updated_at}
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                {data?.updated_by}
              </td>
              <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                <BsThreeDotsVertical />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LawsAndPolicies;
