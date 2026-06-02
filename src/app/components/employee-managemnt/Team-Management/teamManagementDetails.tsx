"use client";
import useBoolean from "@/app/hooks/useBoolean";
import { useEffect, useState } from "react";
import EditTeam from "./editTeam";
import AddNewTeamMembers from "./addNewTeamMember";
import TeamSearch from "./teamSearch";
import DashboardLayout from "@/app/common/DashBoardLayout";
import Heading from "@/app/common/heading";
import Button from "@/app/common/Button";
import TeamsDetailsTable from "./teamDetailsTable";
import axiosInstance from "@/app/utils/axios";
import { employeeDetailsData } from "@/app/utils/type";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Spinner from "@/app/common/spinner";
import { IoChevronDownOutline } from "react-icons/io5";
import DeleteTeam from "./deleteTeam";

const TeamManagementDetails = ({
  teamManagementDetails,
}: {
  teamManagementDetails: string;
}) => {
  const [showEditTeam, setShowEditTeam] = useState(false);
  const [isAddTeamMember, setIsAddTeamMember, resetAddTeamMember] =
    useBoolean(false);
  const [showDeleteTeam, setShowDeleteTeam, resetShowDeleteTeam] =
    useBoolean(false);
  const [teamData, setTeamData] = useState<employeeDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const res = await axiosInstance.get(
          `/employees/teams/${teamManagementDetails}`,
        );
        setTeamData(res.data);
      } catch (err) {
        // Extract the error message from the response
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          // Check if err is an instance of AxiosError
          errorMessage = err.response?.data?.message || errorMessage;
        }

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [teamManagementDetails]);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between ">
          <Heading
            flexDirection="column"
            subHead={
              teamData?.data?.description ||
              "Dedicated to testing and validating our products to ensure they are reliable, efficient, and meet customer expectations"
            }
            user={teamData?.data?.name || "N/A"}
            subHeadClassName="w-[70%]"
          />

          <div className="relative">
            <Button
              variant="primary"
              className="flex items-center text-sm font-semibold gap-x-2 justify-center w-[149px]"
              onButtonClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              Team Setting <IoChevronDownOutline color="#F7F7F7" size={20} />
            </Button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-lg z-20 border border-[#F2F4F7] shadow-lg">
                <button
                  onClick={() => {
                    setIsAddTeamMember();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-[10px] text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Add Member
                </button>
                <button
                  className="w-full text-left px-4 py-[10px] text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    setShowEditTeam(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  Edit Team
                </button>
                <button
                  onClick={() => {
                    setShowDeleteTeam();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-[10px] text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Delete Team
                </button>
              </div>
            )}
          </div>

          {showEditTeam && (
            <>
              {teamData && (
                <EditTeam
                  teamName={teamData?.data?.name}
                  teamDescription={teamData?.data?.description}
                  teamId={teamData?.data?.id}
                  onModalClose={() => setShowEditTeam((prev) => !prev)}
                />
              )}
            </>
          )}

          {isAddTeamMember && (
            <>
              {teamData && (
                <AddNewTeamMembers
                  teamId={teamData?.data?.id}
                  onModalClose={() => resetAddTeamMember()}
                />
              )}
            </>
          )}

          {showDeleteTeam && (
            <>
              {teamData && (
                <DeleteTeam
                  onCloseModal={() => resetShowDeleteTeam()}
                  teamName={teamData?.data?.name}
                  teamId={teamData?.data?.id}
                />
              )}
            </>
          )}
        </div>

        <div>
          <TeamSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedRole={selectedRole}
            selectedStatus={selectedStatus}
            setSelectedRole={setSelectedRole}
            setSelectedStatus={setSelectedStatus}
          />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {!teamData?.data || Object.keys(teamData.data).length <= 0 ? (
              <div className="text-center text-gray-500 mt-4">
                No team members found
              </div>
            ) : (
              <TeamsDetailsTable
                detailsData={teamData}
                searchQuery={searchQuery}
              />
            )}
          </>
        )}
      </main>
    </DashboardLayout>
  );
};

export default TeamManagementDetails;
