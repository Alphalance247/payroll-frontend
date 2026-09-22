import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export interface TaxDetailRecord {
  id: string;
  tax_amount_monthly: number;
  tax_amount_yearly: number;
  remmited: boolean;
  gross_pay: string;
  nhis_relief: number;
  payslip: {
    employee: {
      fullname: string;
      id: string;
      tax_id: string;
    };
    paid: boolean;
  };
}

export interface TaxDetailsResponse {
  data: TaxDetailRecord[];
  id: string;
  total_gross_pay: number;
  total_monthly_tax: number;
  "number_of employee": number;
  verification_status: string;
  latest_verification: string;
}

const getTaxDetails = async (
  month?: string,
  year?: string,
): Promise<TaxDetailsResponse> => {
  const params = new URLSearchParams();
  if (month) params.append("month", month);
  if (year) params.append("year", year);

  const url = params.toString()
    ? `/employees/taxes?${params.toString()}`
    : "/employees/taxes";

  const res = await axiosInstance.get(url);
  return res.data;
};

export const useGetTaxDetails = (month?: string, year?: string) =>
  useQuery<TaxDetailsResponse, AxiosError>({
    queryKey: ["get-tax-details", month, year],
    queryFn: () => getTaxDetails(month, year),
    enabled: !!month && !!year,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
