import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export interface BonusHistoryRecord {
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
  total_hours: string;
  naira_amount: string;
  employee: {
    id: number;
    fullname: string;
  };
  reason: string;
}

export interface BonusHistoryData {
  message: string;
  data: BonusHistoryRecord[];
  total_amount: string;
  pagination?: {
    has_next: boolean;
    has_previous: boolean;
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
  };
  metrics: {
    total_bonus_paid: string;
    employee_count: string;
    pending_actions: {
      awaiting_approval: number;
      awaiting_payment: number;
    };
    client_bonus_rate: string;
    non_client_bonus_rate: string;
    total_hours: string;
    average_bonus: string;
    bonus_value_by_type: {
      [key: string]: string;
    };
    total_fixed_paid: string;
    total_client_paid: string;
    total_quarterly_paid: string;
    total_non_client_paid: string;
    comparison: {
      compared_to: string;
      total_bonus_paid_change_percent: number;
      employee_count_change_percent: number;
      average_bonus_change_percent: number;
    };
  };
  recent_activities: {
    action_title: string;
    action: string;
    action_by: {
      id: number;
      fullname: string;
    };
    created: string;
    updated: string;
  }[];
}

const fetchAllBonusHistoryList = async (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  approval_status?: string,
  paid?: string,
  team_id?: string,
  country?: string,
  page?: number,
  page_size?: number,
) => {
  let url = "/employees/v1/bonuses";
  const params = new URLSearchParams();

  if (month && month !== "") params.append("month", month);
  if (year && year !== "") params.append("year", year);
  if (bonus_type && bonus_type !== "") params.append("bonus_type", bonus_type);
  if (start_date && start_date !== "") params.append("start_date", start_date);
  if (end_date && end_date !== "") params.append("end_date", end_date);
  if (approval_status && approval_status !== "")
    params.append("approval_status", approval_status);
  if (paid && paid !== "") params.append("paid", paid);
  if (team_id && team_id !== "") params.append("team_id", team_id);
  if (country && country !== "") params.append("country", country);
  if (page !== undefined) params.append("page", page.toString());
  if (page_size !== undefined) params.append("page_size", page_size.toString());

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const res = await axiosInstance.get<BonusHistoryData | null>(url);

  return res.data;
};

export const useAllBonusHistory = (
  month?: string,
  year?: string,
  bonus_type?: string,
  start_date?: string,
  end_date?: string,
  approval_status?: string,
  paid?: string,
  team_id?: string,
  country?: string,
  page?: number,
  page_size?: number,
) => {
  return useQuery<BonusHistoryData | null, AxiosError>({
    queryKey: [
      "all-bonus-history",
      month,
      year,
      bonus_type,
      start_date,
      end_date,
      approval_status,
      paid,
      team_id,
      country,
      page,
      page_size,
    ],
    queryFn: () =>
      fetchAllBonusHistoryList(
        month,
        year,
        bonus_type,
        start_date,
        end_date,
        approval_status,
        paid,
        team_id,
        country,
        page,
        page_size,
      ),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
