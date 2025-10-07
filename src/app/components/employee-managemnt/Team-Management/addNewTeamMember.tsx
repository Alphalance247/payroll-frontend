"use client";
import ModalOverlay from "@/app/common/modal/modal";
import { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import Button from "@/app/common/Button";
import { getEmployeeListStore } from "@/stores/getEmployee";
import { useSearch } from "@/app/hooks/useSearch";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import useBoolean from "@/app/hooks/useBoolean";
import { AxiosError } from "axios";

const AddNewTeamMembers = ({
  onModalClose,
  teamId,
}: {
  onModalClose: () => void;
  teamId: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<number[]>([]);
  const { data, loading, fetchEmployeeList, error } = getEmployeeListStore();
  const [addNewTeamMember, setAddNewTeamMember, resetAddNewTeamMember] =
    useBoolean(false);

  useEffect(() => {
    fetchEmployeeList();
  }, [fetchEmployeeList]);

  const filteredEmployees = useSearch({
    data: data?.employees ?? [],
    searchQuery,
    searchFields: ["fullname"],
  });

  const handleToggleAdmin = (adminId: number) => {
    setSelectedMember((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId]
    );
  };

  const handleSave = async () => {
    try {
      setAddNewTeamMember();
      const res = await axiosInstance.patch(`/employees/teams/${teamId}`, {
        member_ids: selectedMember,
      });

      if (res.status === 200) {
        toast.success("Employee Added successfully");
      }

      onModalClose();
      resetAddNewTeamMember();
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      resetAddNewTeamMember();
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className="relative z-50 bg-white rounded-lg shadow-lg px-6 py-4 max-w-[500px] max-h-[700px] w-full flex flex-col gap-4">
        <div className="border border-[#E3E3E5] rounded-lg">
          <div className="p-4 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              Add Member
            </h2>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Team List */}
          <div className="p-4">
            {error && (
              <p className="text-red-500 uppercase">
                Error fetching employees list
              </p>
            )}
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="space-y-3 max-h-[200px] overflow-y-auto">
                {filteredEmployees?.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={admin?.id?.toString()}
                        checked={selectedMember.includes(Number(admin?.id))}
                        onChange={() => handleToggleAdmin(Number(admin?.id))}
                        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor={admin.id.toString()}
                        className="text-sm font-medium"
                      >
                        {admin?.fullname}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Button
            variant="secondary"
            className="w-fit"
            btnType="button"
            onButtonClick={() => onModalClose()}
          >
            Cancel
          </Button>
          <Button className="w-fit" onButtonClick={handleSave}>
            {addNewTeamMember ? "Adding.." : "Save"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default AddNewTeamMembers;
