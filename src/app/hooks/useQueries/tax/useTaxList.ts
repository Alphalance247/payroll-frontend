import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export type TaxVerificationStatus = "pending_remittance" | "remitted";
export type TaxRemittanceStatus = "pending_remittance" | "remitted";

export interface TaxReceiptMeta {
  filename: string;
  uploaded_by: string;
  uploaded_on: string;
  file_type: string;
}

export interface TaxReceiptDetail {
  created: string;
  id: number;
  month: number;
  month_name: string;
  note: string;
  period: string;
  receipt: string;
  reference: string;
  updated: string;
  uploaded_by: {
    fullname: string;
  };
}

export interface YearTaxRecord {
  id: number;
  month: string;
  month_name: string;
  month_number: number;
  total_tax: number;
  num_of_employees: number;
  remittance: {
    remitted_count: number;
    total_count: number;
    status: string;
    receipt: TaxReceiptDetail;
  };
  verification: {
    latest_verification: string;
    status: string;
  };
  year: string;
}

const getYearTaxRecord = async (year?: string): Promise<YearTaxRecord[]> => {
  let url = "/employees/taxes-list";
  if (year) {
    url += `?year=${year}`;
  }
  const res = await axiosInstance.get(url);
  return res.data?.data ?? res.data ?? [];
};

export const useGetYearTaxRecord = (year?: string) =>
  useQuery<YearTaxRecord[], AxiosError>({
    queryKey: ["get-year-tax-record", year],
    queryFn: () => getYearTaxRecord(year),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
