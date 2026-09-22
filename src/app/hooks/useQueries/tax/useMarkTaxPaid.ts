import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

const invalidateTaxQueries = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  queryClient.invalidateQueries({ queryKey: ["get-tax-details"] });
  queryClient.invalidateQueries({ queryKey: ["get-year-tax-record"] });
};

const markTaxPaid = async (taxId: string) => {
  const res = await axiosInstance.put(`/employees/taxes/${taxId}/mark-paid`);
  return res.data;
};

export const useMarkTaxPaid = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, string>({
    mutationFn: markTaxPaid,
    onSuccess: () => {
      invalidateTaxQueries(queryClient);
    },
  });
};

const markMultipleTaxPaid = async (taxIds: string[]) => {
  const res = await axiosInstance.post("/employees/taxes/mark-multiple-paid", {
    tax_ids: taxIds,
  });
  return res.data;
};

export const useMarkMultipleTaxPaid = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, string[]>({
    mutationFn: markMultipleTaxPaid,
    onSuccess: () => {
      invalidateTaxQueries(queryClient);
    },
  });
};
