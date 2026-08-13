import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface ActionBy {
  id: number;
  fullname: string;
}

interface TimelineEntry {
  action_title: string;
  action: string;
  action_by: ActionBy;
  created: string;
  updated: string;
}

interface ChangeRequest {
  note: string;
  requested_by: ActionBy;
  created: string;
  updated: string;
}

interface clientHoursByProject {
  hours: string;
  is_client: boolean;
  project_id: string;
  project_key: string;
  project_name: string;
}

export interface BonusDetail {
  id: number;
  amount: number;
  reason: string;
  bonus_type: string;
  approved: boolean;
  approved_state: string;
  review_comment: string;
  date_approved: string;
  paid: boolean;
  processing_status: string;
  date_paid: string;
  is_foundation: boolean;
  total_hours: string;
  non_client_hours: string;
  hours_by_project: clientHoursByProject[];
  client_hours: string;
  period_year: number;
  period_month: number;
  quarter: number;
  timesheet_met: boolean;
  created: string;
  updated: string;
  employee: number;
  payslip: number;
  pay_deno: number;
  approved_by: number;
  reviewers: number[];
}

export interface BonusDetailResponse {
  message: string;
  data: BonusDetail;
  timeline: TimelineEntry[];
  change_requests: ChangeRequest[];
}

const fetchBonusDetails = async (bonusId: number) => {
  const res = await axiosInstance.get<BonusDetailResponse>(
    `/employees/bonuses/bonus/${bonusId}`,
  );
  return res.data;
};

export const useGetBonusDetails = (bonusId: number | null) => {
  return useQuery<BonusDetailResponse, AxiosError>({
    queryKey: ["bonus-details", bonusId],
    queryFn: () => fetchBonusDetails(bonusId!),
    enabled: bonusId != null,
    staleTime: 1000 * 60 * 2,
  });
};
