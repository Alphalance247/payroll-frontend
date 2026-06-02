"use client";
import TeamCard from "@/app/common/teamCard";
import Button from "../../../common/Button";
import DashboardLayout from "../../../common/DashBoardLayout";
import Heading from "../../../common/heading";
import CreateTeam from "@/app/components/employee-managemnt/Team-Management/createTeam";
import useBoolean from "@/app/hooks/useBoolean";
import { useEffect } from "react";
import { getTeamList } from "@/stores/getTeamList";
import Spinner from "@/app/common/spinner";

const TeamManagement = () => {
  const { data, loading, error, fetchTeamList } = getTeamList();
  const [isNewTeam, SetIsNewTeam, resetIsNewTeam] = useBoolean(false);

  useEffect(() => {
    fetchTeamList();
  }, [fetchTeamList]);

  return (
    <DashboardLayout>
      <main className="py-4 md:py-6 lg:py-10 overflow-y-scroll px-10">
        <div className="flex items-center justify-between border-b border-b-[#E3E3E5] pb-6">
          <Heading
            flexDirection="column"
            subHead="Review and manage teams efficiently"
            user={"Team Management"}
          />

          <Button
            className="flex items-center gap-x-1"
            onButtonClick={() => SetIsNewTeam()}
          >
            Create Team
          </Button>
        </div>

        {loading && <Spinner />}
        {error && (
          <div className="flex flex-col justify-center items-center h-full ">
            <p className="text-red-500 text-center">Error fetching team list</p>
            <Button
              className="flex items-center gap-x-1 mt-4"
              onButtonClick={() => fetchTeamList()}
            >
              Retry
            </Button>
          </div>
        )}
        <div className="mt-6 grid grid-cols-3 gap-x-5 gap-y-8">
          {data?.data.map((team) => (
            <TeamCard
              key={team.id}
              link={`/admin/employee-management/team-management/${team.id}`}
              teamName={team.name.split(" ")?.slice(0, 3).join(" ")}
              teamLead={team?.lead?.fullname || "No Lead Assigned"}
              teamCount={team.members_count}
            />
          ))}
        </div>
        {isNewTeam && (
          <CreateTeam
            onModalClose={() => {
              resetIsNewTeam();
            }}
          />
        )}
      </main>
    </DashboardLayout>
  );
};

export default TeamManagement;
