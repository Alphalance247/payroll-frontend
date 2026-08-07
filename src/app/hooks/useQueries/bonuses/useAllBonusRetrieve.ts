import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  amount: string;
  id: number;
  approved: string;
  approved_by: string;
  date_paid: string;
  created: string;
  approved_state: string;
  paid: boolean;
  converted_amount: string;
  bonus_type: string;
  pay_deno: string;
  total_hours: string;
  naira_amount: string;
  employee: {
    id: number;
    fullname: string;
  };
  reason: string;
}

interface dataType {
  data: data[];
  total_amount: string;
}

const fetchAllBonusRetrieveList = async (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
) => {
  let url = "/employees/bonuses/pending";
  const params = new URLSearchParams();

  if (month && month !== "") {
    params.append("month", month);
  }
  if (year && year !== "") {
    params.append("year", year);
  }

  if (bonus_type && bonus_type !== "") {
    params.append("bonus_type", bonus_type);
  }

  if (start_date && start_date !== "") {
    params.append("start_date", start_date);
  }

  if (end_date && end_date !== "") {
    params.append("end_date", end_date);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<dataType | null>(url);

  return res.data;
};

export const useAllBonusRetrieveList = (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: [
      "all-bonus-retrieve-list",
      month,
      year,
      bonus_type,
      start_date,
      end_date,
    ],
    queryFn: () =>
      fetchAllBonusRetrieveList(month, year, bonus_type, start_date, end_date),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
