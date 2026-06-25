import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

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

const editTaxReceipt = async ({
  id,
  payload,
}: {
  id: number;
  payload: FormData;
}) => {
  const res = await axiosInstance.patch(
    `/employees/taxes/remittance-receipts/${id}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return res.data;
};

export const useEditTaxReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, { id: number; payload: FormData }>({
    mutationFn: editTaxReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
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
    },
  });
};
