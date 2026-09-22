import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export type TaxVerificationStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export interface TaxVerificationProgress {
  run_id: string;
  status: TaxVerificationStatus;
  step: string;
  percentage: number;
}

interface StartTaxVerificationPayload {
  file: File;
  month: number | string;
  year: number | string;
}

export interface TaxVerificationRecordItem {
  match_key: string;
  name: string;
  remittance_status: string;
  status: string;
  tax_id: string;
  email: string;
  employee_id: number;
  fields: {
    monthly_tax: {
      diff: number;
      spreadsheet: string;
      payroll: number;
    };
  };
}

export interface TaxVerificationResult {
  id: string;
  month: number;
  year: number;
  compared_count: number;
  records_matched: number;
  discrepancy_count: number;
  status: string;
  report: TaxVerificationRecordItem[];
}

const startTaxVerification = async ({
  file,
  month,
  year,
}: StartTaxVerificationPayload): Promise<{ run_id: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("month", String(month));
  formData.append("year", String(year));

  const res = await axiosInstance.post(
    "/employees/tax-verifications",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data?.data ?? res.data;
};

export const useStartTaxVerification = () =>
  useMutation<{ run_id: string }, AxiosError, StartTaxVerificationPayload>({
    mutationFn: startTaxVerification,
  });

const TERMINAL_STATUSES: TaxVerificationStatus[] = ["completed", "failed"];

const fetchTaxVerificationProgress = async (
  runId: string,
): Promise<TaxVerificationProgress> => {
  const res = await axiosInstance.get(
    `/employees/tax-verifications/${runId}/progress`,
  );
  return res.data?.data ?? res.data;
};

/**
 * Polls GET /employees/tax-verifications/{run_id}/progress every 1.5s
 * until the run reaches a terminal status (completed/failed).
 */
export const useTaxVerificationProgress = (runId: string | null) =>
  useQuery<TaxVerificationProgress, AxiosError>({
    queryKey: ["tax-verification-progress", runId],
    queryFn: () => fetchTaxVerificationProgress(runId as string),
    enabled: !!runId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status && TERMINAL_STATUSES.includes(status) ? false : 1500;
    },
  });

const fetchTaxVerificationResult = async (
  runId: string,
): Promise<TaxVerificationResult> => {
  const res = await axiosInstance.get(`/employees/tax-verifications/${runId}`);
  return res.data?.data ?? res.data;
};

/**
 * Fetches the full verification report from GET /employees/tax-verifications/{run_id}.
 * Pass `enabled: true` once the progress run has reached a terminal status.
 */
export const useTaxVerificationResult = (
  runId: string | null,
  enabled: boolean,
) =>
  useQuery<TaxVerificationResult, AxiosError>({
    queryKey: ["tax-verification-result", runId],
    queryFn: () => fetchTaxVerificationResult(runId as string),
    enabled: !!runId && enabled,
  });

export interface VerificationHistoryEntry {
  id: number;
  created: string;
  month: number;
  year: number;
  status: string;
  outcome: string;
  discrepancy_count: number;
  unmatched_count: number;
  records_matched: string;
  spreadsheet_row_count: number;
  file_name: string;
  download_url: string;
  source_file_url: string;
  run_by: { id: number; fullname: string };
}

export interface VerificationHistoryPagination {
  has_next: boolean;
  has_previous: boolean;
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}

interface VerificationHistoryResponse {
  data: VerificationHistoryEntry[];
  pagination: VerificationHistoryPagination;
}

const fetchTaxVerificationsByPeriod = async (
  month?: number | string,
  year?: number | string,
): Promise<VerificationHistoryResponse> => {
  const params = new URLSearchParams();
  if (month !== undefined) params.set("month", String(month));
  if (year !== undefined) params.set("year", String(year));

  const query = params.toString();
  const url = `/employees/tax-verifications${query ? `?${query}` : ""}`;

  const res = await axiosInstance.get(url);
  return res.data;
};

export const useGetTaxVerificationsByPeriod = (
  month?: number | string,
  year?: number | string,
) =>
  useQuery<VerificationHistoryResponse, AxiosError>({
    queryKey: ["tax-verifications-by-period", month, year],
    queryFn: () => fetchTaxVerificationsByPeriod(month, year),
    enabled: !!month && !!year,
  });
