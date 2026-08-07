import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";

export interface TeamListItem {
  id: number;
  name: string;
  lead: { id: number; fullname: string };
  members: string;
  members_count: string;
  border_color: string;
  bg_color: string;
  description: string;
}

const fetchTeamList = async (): Promise<TeamListItem[]> => {
  const res = await axiosInstance.get("/employees/list-teams");
  const raw = res.data?.data ?? res.data;
  return Array.isArray(raw) ? raw : [];
};

export const useTeamList = () => {
  return useQuery<TeamListItem[], Error>({
    queryKey: ["team-list"],
    queryFn: fetchTeamList,
    staleTime: 1000 * 60 * 10,
  });
};
