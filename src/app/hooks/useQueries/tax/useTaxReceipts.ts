import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { type TaxReceiptDetail } from "@/app/hooks/useQueries/tax/useTaxList";

export interface TaxReceiptRecord {
  id: number;
  month: string;
  year: string;
  receipt: string;
  reference: string;
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

const uploadTaxReceipt = async (
  payload: FormData,
): Promise<TaxReceiptDetail> => {
  const res = await axiosInstance.post(
    "/employees/taxes/remittance-receipts",
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data?.data ?? res.data;
};

export const useUploadTaxReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<TaxReceiptDetail, AxiosError, FormData>({
    mutationFn: uploadTaxReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      // A new receipt also flips the month's receipt/remittance state
      // shown in the tax list, so that list needs to be refetched too.
      queryClient.invalidateQueries({ queryKey: ["get-year-tax-record"] });
    },
  });
};

const editTaxReceipt = async ({
  id,
  payload,
}: {
  id: number;
  payload: FormData;
}): Promise<TaxReceiptDetail> => {
  const res = await axiosInstance.patch(
    `/employees/taxes/remittance-receipts/${id}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data?.data ?? res.data;
};

export const useEditTaxReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<
    TaxReceiptDetail,
    AxiosError,
    { id: number; payload: FormData }
  >({
    mutationFn: editTaxReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["get-year-tax-record"] });
    },
  });
};

const deleteTaxReceipt = async (id: number) => {
  const res = await axiosInstance.delete(
    `/employees/taxes/remittance-receipts/${id}`,
  );
  return res.data;
};

export const useDeleteTaxReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, number>({
    mutationFn: deleteTaxReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      // Removing a receipt also flips the month's receipt/remittance state
      // shown in the tax list, so that list needs to be refetched too.
      queryClient.invalidateQueries({ queryKey: ["get-year-tax-record"] });
    },
  });
};
