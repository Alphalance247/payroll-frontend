import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  id: string;
}

interface dataType {
  data: data[];
}

const fetchPayslip = async (id: string | number) => {
  const res = await axiosInstance.get<dataType | null>(
    `/employees/payslip/${id}`
  );

  return res.data;
};

export const usePayslip = ({ id }: { id: string | number | null }) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["payslip", id],
    queryFn: () => fetchPayslip(id!),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
    enabled: !!id, // only run when id exists
  });
};
