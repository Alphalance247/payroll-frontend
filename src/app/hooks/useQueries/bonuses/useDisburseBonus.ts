import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDisburseBonus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: (bonusId) =>
      axiosInstance
        .post(`/employees/bonuses/bonus/${bonusId}/disburse`)
        .then((r) => r.data),
    onSuccess: () => {
      toast.success("Bonus disbursed successfully");
      queryClient.invalidateQueries({ queryKey: ["approved-bonus-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Disbursement failed. Please try again.";
      toast.error(message);
    },
  });
};

export const useDisburseMultipleBonuses = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, string[]>({
    mutationFn: (bonus_ids) =>
      axiosInstance
        .post("/employees/bonuses/disburse-multiple-bonuses/", { bonus_ids })
        .then((r) => r.data),
    onSuccess: () => {
      toast.success("Bonuses disbursed successfully");
      queryClient.invalidateQueries({ queryKey: ["approved-bonus-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Disbursement failed. Please try again.";
      toast.error(message);
    },
  });
};
