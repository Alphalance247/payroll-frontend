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
  approval_status: string;
  paid: boolean;
  converted_amount: string;
  bonus_type: string;
  pay_deno: string;
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
  pagination?: {
    has_next: boolean;
    has_previous: boolean;
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
  };
}

const fetchInReviewBonusList = async (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  page?: number,
  page_size?: number,
) => {
  let url = "/employees/bonuses/in-review";
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

  if (page !== undefined) params.append("page", page.toString());
  if (page_size !== undefined) params.append("page_size", page_size.toString());

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<dataType | null>(url);

  return res.data;
};

export const useInReviewBonusList = (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  page?: number,
  page_size?: number,
) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: [
      "in-review-bonus-list",
      month,
      year,
      bonus_type,
      start_date,
      end_date,
      page,
      page_size,
    ],
    queryFn: () =>
      fetchInReviewBonusList(month, year, bonus_type, start_date, end_date, page, page_size),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
