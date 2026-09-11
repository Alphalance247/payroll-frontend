import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { AddBonusPayload } from "@/app/hooks/useQueries/bonuses/useAddBonus";

export interface EditBonusPayload {
  bonusId: number;
  amount: number;
  reason: string;
  bonus_type: AddBonusPayload["bonus_type"];
  pay_deno: number | string;
}

const editBonus = async ({ bonusId, ...payload }: EditBonusPayload) => {
  const res = await axiosInstance.patch(
    `/employees/bonuses/bonus/${bonusId}`,
    payload,
  );
  return res.data;
};

export const useEditBonus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, EditBonusPayload>({
    mutationFn: editBonus,
    onSuccess: () => {
      toast.success("Bonus updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-bonus-retrieve-list"] });
      queryClient.invalidateQueries({ queryKey: ["in-review-bonus-list"] });
      queryClient.invalidateQueries({ queryKey: ["approved-bonus-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Failed to update bonus. Please try again.";
      toast.error(message);
    },
  });
};
