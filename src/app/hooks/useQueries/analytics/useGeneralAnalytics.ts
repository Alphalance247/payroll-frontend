import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";

export interface PayrollAnalyticsFiltersEcho {
  start_date: string;
  end_date: string;
  team: string | null;
  employee: string | null;
  job_type: string | null;
}

export interface AnalyticsMetric {
  value: number;
  previous: number;
  change_pct: number | null;
}

export interface PayrollAnalyticsSummary {
  total_salary: AnalyticsMetric;
  total_bonus: AnalyticsMetric;
  total_loan: AnalyticsMetric;
  total_tax: AnalyticsMetric;
}

export interface PayrollTrendPoint {
  month: string; // "Jan", "Feb", ... "Dec"
  salary: number;
  bonus: number;
  tax: number;
}

export interface TeamAmount {
  team_id: number;
  team: string;
  amount: number;
}

export interface TeamHours {
  team_id: number;
  team: string;
  hours: number;
}

export interface TeamEmployeeCount {
  team_id: number;
  team: string;
  count: number;
}

export interface BonusBreakdownItem {
  type: string;
  label: string;
  amount: number;
  percentage: number;
}

export interface BonusBreakdown {
  total: number;
  items: BonusBreakdownItem[];
}

export interface EmploymentTypeItem {
  type: string;
  label: string;
  amount: number;
}

export interface SalaryByEmploymentType {
  total: number;
  items: EmploymentTypeItem[];
}

export interface LoansSummary {
  total: number;
  outstanding: number;
  repaid: number;
}

export interface TaxSummary {
  total: number;
  remitted: number;
  pending_remittance: number;
}

export interface PayrollAnalyticsResponse {
  filters: PayrollAnalyticsFiltersEcho;
  summary: PayrollAnalyticsSummary;
  payroll_trend: PayrollTrendPoint[];
  salary_by_team: TeamAmount[];
  bonus_by_team: TeamAmount[];
  bonus_breakdown: BonusBreakdown;
  salary_by_employment_type: SalaryByEmploymentType;
  loans: LoansSummary;
  tax: TaxSummary;
  hours_by_team: TeamHours[];
  employees_by_team: TeamEmployeeCount[];
}

export interface PayrollAnalyticsQueryParams {
  start_date?: string | null;
  end_date?: string | null;
  team?: string | null;
  employee?: string | null;
  job_type?: string | null;
}

const fetchGeneralAnalytics = async (
  params: PayrollAnalyticsQueryParams,
): Promise<PayrollAnalyticsResponse> => {
  const query = new URLSearchParams();
  if (params.start_date) query.set("start_date", params.start_date);
  if (params.end_date) query.set("end_date", params.end_date);
  if (params.team) query.set("team", params.team);
  if (params.employee) query.set("employee", params.employee);
  if (params.job_type) query.set("job_type", params.job_type);

  const qs = query.toString();
  const url = `/employees/payroll_analysis${qs ? `?${qs}` : ""}`;

  const res = await axiosInstance.get(url);
  return res.data?.data ?? res.data;
};

export const useGeneralAnalytics = (params: PayrollAnalyticsQueryParams) =>
  useQuery<PayrollAnalyticsResponse, AxiosError>({
    queryKey: ["general-analytics", params],
    queryFn: () => fetchGeneralAnalytics(params),
  });
