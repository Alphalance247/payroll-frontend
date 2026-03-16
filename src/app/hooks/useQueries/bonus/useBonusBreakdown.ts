import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface Employee {
  id: number;
  fullname: string;
  email: string;
}

interface BonusRecord {
  id: number;
  amount: number;
  reason: string;
  approved: boolean;
  date_approved: string;
  paid: boolean;
  processing_status: string;
  date_paid: string;
  is_foundation: boolean;
  approved_state: string;
  period_year: number | null;
  period_month: number | null;
  quarter: string | null;
  timesheet_met: boolean;
  created: string;
  updated: string;
  employee: Employee;
  payslip: string | null;
  approved_by: number;
  client_hours: number;
  non_client_hours: number;
  client_bonus: number;
  non_client_bonus: number;
  client_bonus_str: string;
  non_client_bonus_str: string;
}

interface Metrics {
  total_hours_logged: number;
  client_hours: string;
  non_client_hours: string;
  total_client_bonus: string;
  total_non_client_bonus: string;
  client_bonus_rate: number;
  non_client_bonus_rate: number;
}

interface BonusBreakdownResponse {
  message: string;
  data: BonusRecord[];
  metrics: Metrics;
}

const fetchBonusBreakdown = async (month?: string, year?: string) => {
  let url = "/employees/bonus-dashboard";
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

  const res = await axiosInstance.get<BonusBreakdownResponse | null>(url);

  return res.data;
};

export const useBonusBreakdown = (month?: string, year?: string) => {
  return useQuery<BonusBreakdownResponse | null, AxiosError>({
    queryKey: ["bonus-breakdown", month, year],
    queryFn: () => fetchBonusBreakdown(month, year),
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
