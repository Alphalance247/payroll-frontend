import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  amount: string;
  approved: boolean;
  approved_by: number;
  approved_state: string;
  bonus_type: string;
  client_bonus: number;
  client_bonus_str: string;
  client_hours: number;
  created: string;
  current_month_rate: number;
  date_approved: string;
  date_paid: string;
  employee: {
    id: number;
    fullname: string;
    email: string;
  };
  hours_by_project: string[];
  id: number;
  is_foundation: boolean;
  naira_amount: number;
  naira_amount_: number;
  non_client_bonus: number;
  non_client_bonus_str: string;
  non_client_hours: number;
  paid: boolean;
  pay_deno: string;
  payslip: {
    id: number;
    payslip_id: string;
  };
  period_month: number;
  period_year: number;
  processing_status: "pending";
  quarter: number;
  reason: string;
  review_comment: string;
  reviewers: string[];
  timesheet_met: boolean;
  total_hours: string;
  updated: string;
}

interface dataType {
  data: data[];
  total_amount: string;
}

const fetchApprovedBonusList = async (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
) => {
  let url = "/employees/bonuses/approved-unpaid";
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

export const useApprovedBonusList = (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
) => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: [
      "approved-bonus-list",
      month,
      year,
      bonus_type,
      start_date,
      end_date,
    ],
    queryFn: () =>
      fetchApprovedBonusList(month, year, bonus_type, start_date, end_date),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
