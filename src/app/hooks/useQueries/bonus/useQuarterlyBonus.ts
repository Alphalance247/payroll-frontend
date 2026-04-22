import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface QuarterlyBonusResponse {
  message: string;
  data: {
    client_bonus: number;
    id: number;
    employee: {
      fullname: string;
      id: string;
    };
    approved_state: string;
    paid: string;
    date_paid: string;
    date_approved: string;
  }[];
  total_amount: number;
}

const fetchQuarterlyBonus = async (month?: string, year?: string) => {
  let url = "/employees/quarterly-bonus-split";
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

  const res = await axiosInstance.get<QuarterlyBonusResponse | null>(url);

  return res.data;
};

export const useQuarterlyBonus = (month?: string, year?: string) => {
  return useQuery<QuarterlyBonusResponse | null, AxiosError>({
    queryKey: ["quarterly-bonus", month, year],
    queryFn: () => fetchQuarterlyBonus(month, year),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
