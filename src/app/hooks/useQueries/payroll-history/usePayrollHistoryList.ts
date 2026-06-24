import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  approved_by: {
    fullname: string;
  };
  total_salary: string;
  total_payout: string;
  approved_state: string;
  approved_on: string;
  id: string;
  created: string;
}

interface dataType {
  data: data[];
}

const fetchPayrollHistoryList = async () => {
  const res = await axiosInstance.get<dataType | null>("/employees/payroll");

  return res.data;
};

export const usePayrollHistoryList = () => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["payroll-history-list"],
    queryFn: fetchPayrollHistoryList,
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
