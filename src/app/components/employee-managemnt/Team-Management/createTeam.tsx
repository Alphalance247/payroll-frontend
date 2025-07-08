"use client";
import Input from "@/app/common/input";
import ModalOverlay from "@/app/common/modal/modal";
import { useState, useEffect } from "react";
import { Loader2, Search } from "lucide-react";
import Button from "@/app/common/Button";
import { useSearch } from "@/app/hooks/useSearch";
import { getEmployeeListStore } from "@/stores/getEmployee";
import axiosInstance from "@/app/utils/axios";
import useBoolean from "@/app/hooks/useBoolean";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const CreateTeam = ({ onModalClose }: { onModalClose: () => void }) => {
  const [searchEmployee, setSearchEmployee] = useState("");
  const [searchTeamLead, setSearchTeamLead] = useState("");
  const [selectedMember, setSelectedMember] = useState<number[]>([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState("");
  const { data, loading, fetchEmployeeList, error } = getEmployeeListStore();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [addNewTeam, setAddNewTeam, resetAddNewTeam] = useBoolean(false);

  useEffect(() => {
    fetchEmployeeList();
  }, [fetchEmployeeList]);

  const filteredEmployees = useSearch({
    data: data?.employees ?? [],
    searchQuery: searchEmployee,
    searchFields: ["fullname"],
  });

  const filteredTeamLead = useSearch({
    data: data?.employees ?? [],
    searchQuery: searchTeamLead,
    searchFields: ["fullname"],
  });

  const handleCreateNewTeam = async () => {
    try {
      setAddNewTeam();
      const res = await axiosInstance.post(`/employees/teams-create`, {
        ...form,
        member_ids: selectedMember,
        lead: selectedTeamLead,
      });

      if (res.status === 200) {
        toast.success("New Team created successfully");
        onModalClose();
      } else {
        toast.error(
          res?.data?.message || "Failed to send payroll confirmation message"
        );
      }
      resetAddNewTeam();
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      resetAddNewTeam();
    }
  };

  const handleToggleAdmin = (adminId: number) => {
    setSelectedMember((prev) =>
      prev.includes(adminId)
        ? prev.filter((id) => id !== adminId)
        : [...prev, adminId]
    );
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className="relative z-50 bg-white rounded-lg shadow-lg px-6 py-4 max-w-[632px] max-h-[700px] w-full flex flex-col gap-4 overflow-y-scroll">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#2F2F33]">
            Team Name
          </h3>
          <Input
            type="text"
            name="name"
            placeholder="Quality Assurance"
            value={form?.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#2F2F33]">
            Team Description
          </h3>

          <textarea
            className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
            placeholder="Dedicated to testing and validating our products to ensure they are reliable, efficient, and meet customer expectations..."
            value={form?.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            name="teamdescription"
          />
        </div>

        <div className="border border-[#E3E3E5] rounded-lg">
          <div className="p-4 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              Add to Team
            </h2>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchEmployee}
                onChange={(e) => setSearchEmployee(e.target.value)}
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
                        id={admin?.id.toString()}
                        checked={selectedMember.includes(Number(admin?.id))}
                        onChange={() => handleToggleAdmin(Number(admin?.id))}
                        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor={admin.id.toString()}
                        className="text-sm font-medium"
                      >
                        {admin.fullname}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border border-[#E3E3E5] rounded-lg">
          <div className="p-4 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold mb-2">
              Team Lead
            </h2>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTeamLead}
                onChange={(e) => setSearchTeamLead(e.target.value)}
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
                {filteredTeamLead?.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={`team-lead-${admin?.id}`}
                        name="teamLead"
                        checked={selectedTeamLead === admin?.id}
                        onChange={() => setSelectedTeamLead(admin?.id)}
                        className="h-5 w-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label
                        htmlFor={`team-lead-${admin.id}`}
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
            onButtonClick={onModalClose}
          >
            Cancel
          </Button>
          <Button className="w-fit" onButtonClick={handleCreateNewTeam}>
            {addNewTeam ? "creating...." : "Create Team"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default CreateTeam;
