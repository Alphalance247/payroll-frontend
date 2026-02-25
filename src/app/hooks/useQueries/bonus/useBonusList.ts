import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  amount: string;
  id: string;
  approved: string;
  approved_by: string;
  date_paid: string;
  created: string;
  paid: boolean;
  employee: {
    fullname: string;
  };
  reason: string;
}

interface dataType {
  data: data[];
  total_amount: string;
}

const fetchBonusList = async (month?: string, year?: string) => {
  let url = "/employees/bonuses";
  const params = new URLSearchParams();

  if (month && month !== "") {
    params.append("month", month);
  }
  if (year && year !== "") {
    params.append("year", year);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<dataType | null>(url);

  return res.data;
};

export const useBonusList = (month?: string, year?: string) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["bonus-list", month, year],
    queryFn: () => fetchBonusList(month, year),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
