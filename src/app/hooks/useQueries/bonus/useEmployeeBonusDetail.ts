import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface dataType {
  data: {
    amount: string;
    id: string;
    approved: string;
    approved_by: string;
    date_paid: string;
    pay_deno: string;
    employee: {
      fullname: string;
      id: string;
    };
    paid: boolean;
    payslip: string;
    reason: string;
  };
}

const fetchEmployeeBonusDetail = async (id: string | number) => {
  const res = await axiosInstance.get<dataType | null>(
    `/employees/bonuses/bonus/${id}`,
  );

  return res.data;
};

export const useEmployeeBonusDetail = ({
  id,
}: {
  id: string | number | null;
}) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["bonus-detail", id], // shared global key
    queryFn: () => fetchEmployeeBonusDetail(id!), // your Axios call
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1, //
    enabled: !!id, // only run when id exists
  });
};
