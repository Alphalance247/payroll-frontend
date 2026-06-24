import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

export interface TaxReceiptRecord {
  id: number;
  month: string;
  year: string;
  receipt: string;
  reference_id: string;
  note: string;
}

const QUERY_KEY = ["tax-receipts"] as const;

const fetchTaxReceipts = async (): Promise<TaxReceiptRecord[]> => {
  const res = await axiosInstance.get("/employees/taxes/remittance-receipts");
  return res.data?.data ?? res.data ?? [];
};

export const useTaxReceiptList = () =>
  useQuery<TaxReceiptRecord[], AxiosError>({
    queryKey: QUERY_KEY,
    queryFn: fetchTaxReceipts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

const uploadTaxReceipt = async (payload: FormData) => {
  const res = await axiosInstance.post(
    "/employees/taxes/remittance-receipts",
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data;
};

export const useUploadTaxReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, FormData>({
    mutationFn: uploadTaxReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
