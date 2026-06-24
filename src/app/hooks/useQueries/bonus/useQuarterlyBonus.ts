import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface QuarterlyBonusResponse {
  message: string;
  data: {
    id: number;
    employee: {
      fullname: string;
      id: string;
    };
    paid: string;
    date_paid: string;
    amount: number;
    approved_state: string;
    period: string;
    approved: boolean;
  }[];
  total_amount: number;
  quarter: string;
}

const fetchQuarterlyBonus = async (quarter?: string) => {
  let url = "/employees/quarterly-bonus-split";
  const params = new URLSearchParams();

  if (quarter && quarter !== "") {
    params.append("quarter", quarter);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<QuarterlyBonusResponse | null>(url);

  return res.data;
};

export const useQuarterlyBonus = (quarter?: string) => {
  return useQuery<QuarterlyBonusResponse | null, AxiosError>({
    queryKey: ["quarterly-bonus", quarter],
    queryFn: () => fetchQuarterlyBonus(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
