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
  metrics: {
    total_bonus_paid: string;
    employee_count: string;
    pending_actions: {
      awaiting_approval: number;
      awaiting_payment: number;
    };
    average_bonus: string;
    bonus_value_by_type: {
      [key: string]: string;
    };
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
) => {
  let url = "/employees/v1/bonuses";
  const params = new URLSearchParams();

  if (month && month !== "") params.append("month", month);
  if (year && year !== "") params.append("year", year);
  if (bonus_type && bonus_type !== "") params.append("bonus_type", bonus_type);
  if (start_date && start_date !== "") params.append("start_date", start_date);
  if (end_date && end_date !== "") params.append("end_date", end_date);
  if (approval_status && approval_status !== "") params.append("approval_status", approval_status);
  if (paid && paid !== "") params.append("paid", paid);

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
    ],
    queryFn: () =>
      fetchAllBonusHistoryList(month, year, bonus_type, start_date, end_date, approval_status, paid),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
