import axiosInstance from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface dataType {
  data: Array<{
    id: string;
    title: string;
    note: string;
    created_at: string;
    is_admin: boolean;
    author_name: string;
  }>;
}

const fetchLeaveComment = async (id: string | number | null) => {
  const res = await axiosInstance.get<dataType | null>(
    `/leaves/leave-requests/${id}/notes`
  );

  return res.data;
};

export const useLeaveComments = ({ id }: { id: string | number | null }) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["leave-comments", id],
    queryFn: () => fetchLeaveComment(id!),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
