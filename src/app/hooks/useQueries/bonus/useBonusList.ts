import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  amount: string;
  id: string;
  approved: string;
  approved_by: string;
  date_paid: string;
  employee: {
    fullname: string;
  };
  paid: boolean;
  reason: string;
}

interface dataType {
  data: data[];
}

const fetchBonusList = async () => {
  const res = await axiosInstance.get<dataType | null>("/employees/bonuses");

  return res.data;
};

export const useBonusList = () => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["bonus-list"],
    queryFn: fetchBonusList,
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
