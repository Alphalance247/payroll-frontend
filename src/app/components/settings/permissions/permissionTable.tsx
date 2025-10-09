"use client";
import { Search } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PermissionOverlay from "./permissionOverlay";
import { getAdminPermissionList } from "@/stores/settings/permissions/permissions";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useFilter } from "@/app/hooks/useFilter";

const PermissionTable = ({
  showOverLay,
  setShowOverlay,
}: {
  showOverLay: boolean;
  setShowOverlay: (showOverLay: boolean) => void;
}) => {
  // const [searchQuery, setSearchQuery] = useState("");

  const { data, error, loading, fetchAdminPermission } =
    getAdminPermissionList();
  const { filteredData, setSearchQuery, searchQuery } = useFilter(
    data?.employees || [],
    ["employee_name"]
  );

  return (
    <section className="mt-6">
      {showOverLay && (
        <PermissionOverlay
          onCloseOverlay={() => {
            setShowOverlay(false);
          }}
        />
      )}
      <div className="flex justify-between items-center mb-10">
        <div className="relative w-[400px]">
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
      <div className="bg-white rounded-lg border border-[#E3E3E5] mt-10">
        <h2 className="text-base font-semibold py-5 pl-6 text-[#2F2F33] border-b border-[#E3E3E5]">
          Manage Admins
        </h2>

        {loading ? (
          <Spinner spinnerSmall={true} />
        ) : error ? (
          <ErrorFetch
            message="Error fetching admin role or please check your access"
            onRefetch={() => fetchAdminPermission()}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full  overflow-hidden shadow-sm ">
              <thead className="bg-[#F9FAFB] border-[#E3E3E5] border-b-[1px]  text-[#667085] text-[15px] leading-[1.5rem] font-medium">
                <tr>
                  <th
                    className="px-6 py-3 text-left"
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Invoice
                  </th>
                  <th
                    className="px-6 py-3 text-left "
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left"
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-left "
                    style={{ paddingLeft: "1.5rem" }}
                  >
                    Date
                  </th>

                  <th
                    className="px-6 py-3 text-left "
                    style={{ paddingLeft: "1.5rem" }}
                  ></th>
                </tr>
              </thead>
              {filteredData?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      No Admin found
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="text-gray-600 dark:text-white text-[15px] leading-[1.5rem] divide-y divide-gray-200 dark:divide-[#424E59]">
                  {filteredData?.map((data, i) => (
                    <tr
                      className="hover:bg-gray-50 dark:hover:bg-[#424E59] transition duration-200 ease-in-out"
                      key={i}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#26547C] text-white flex items-center justify-center text-sm font-medium">
                            {data?.employee_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="text-[#2F2F33] text-sm font-medium mb-1">
                              {data?.employee_name}
                            </p>
                            <p className="text-[#71717A] text-sm font-normal">
                              {data?.employee_email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                        {data?.role}
                      </td>
                      <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                        {data?.status}
                      </td>
                      <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                        {data?.last_login || "Not Logged In Yet"}
                      </td>

                      <td className="p-6" style={{ paddingLeft: "1.5rem" }}>
                        <BsThreeDotsVertical />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default PermissionTable;
