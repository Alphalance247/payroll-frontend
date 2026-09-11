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
    rate: string;
  };
  reason: string;
}

interface dataType {
  data: data[];
  pagination: {
    has_next: false;
    has_previous: false;
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
  };
  total_amount: string;
}

const fetchAllBonusRetrieveList = async (
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  page?: number,
  page_size?: number,
) => {
  let url = "/employees/bonuses/pending";
  const params = new URLSearchParams();

  if (bonus_type && bonus_type !== "") {
    params.append("bonus_type", bonus_type);
  }

  if (start_date && start_date !== "") {
    params.append("start_date", start_date);
  }

  if (end_date && end_date !== "") {
    params.append("end_date", end_date);
  }

  if (page !== undefined) {
    params.append("page", page.toString());
  }

  if (page_size !== undefined) {
    params.append("page_size", page_size.toString());
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<dataType | null>(url);

  return res.data;
};

export const useAllBonusRetrieveList = (
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  page?: number,
  page_size?: number,
) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: [
      "all-bonus-retrieve-list",
      bonus_type,
      start_date,
      end_date,
      page,
      page_size,
    ],
    queryFn: () =>
      fetchAllBonusRetrieveList(
        bonus_type,
        start_date,
        end_date,
        page,
        page_size,
      ),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
