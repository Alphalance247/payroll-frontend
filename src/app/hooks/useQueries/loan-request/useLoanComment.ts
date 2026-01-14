import axiosInstance from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface dataType {
  data: Array<{
    id: string;
    title: string;
    comment: string;
    created_at: string;
    is_admin: boolean;
    author_name: string;
  }>;
}

const fetchLoanComments = async (id: string | number | null) => {
  const res = await axiosInstance.get<dataType | null>(
    `employees/loan-request/${id}/comments`
  );

  return res.data;
};

export const useLoanComments = ({ id }: { id: string | number | null }) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["loan-comments", id],
    queryFn: () => fetchLoanComments(id!),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
