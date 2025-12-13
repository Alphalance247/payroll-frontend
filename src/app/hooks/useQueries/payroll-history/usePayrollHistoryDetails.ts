import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export interface payrollRate {
  id: number;
  code: string;
  official_rate: number;
}

export interface PayrollTransferData {
  id: string;
  status: string;
  created_at: string;
}

export interface data {
  data: {
    data: {
      id: string;
      teams: string[];

      approved_by: {
        fullname: string;
      };
      total_payout: string;
      payday: string;
      total_hours: string;
      total_tax: string;

      rates: payrollRate[];
      payslips: {
        id: string;
        net_pay: string;
        tax: string;
        paid: boolean;
        debt: string;
        gross_pay: string;
        status: string;
        official_base_pay: number;
        employee: {
          fullname: string;
          team: {
            name: string;
          };
        };
      }[];
    };
  };
}

const fetchPayrollHistoryDetails = async (id: string | number) => {
  const res = await axiosInstance.get<data | null>(`/employees/payroll/${id}`);

  return res.data;
};

export const usePayrollHistoryDetails = ({
  id,
}: {
  id: string | number | null;
}) => {
  return useQuery<data | null, AxiosError>({
    queryKey: ["payroll-history-detail", id], // shared global key
    queryFn: () => fetchPayrollHistoryDetails(id!), // your Axios call
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!id,
  });
};
