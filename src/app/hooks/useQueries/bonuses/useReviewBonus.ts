import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export type ReviewAction = "approved" | "rejected" | "change_requested";

interface SingleReviewPayload {
  bonusId: number;
  action: ReviewAction;
  comment: string;
}

interface MultipleReviewPayload {
  action: ReviewAction;
  comment: string;
  bonus_ids: string[];
}

const SUCCESS_MESSAGES: Record<ReviewAction, string> = {
  approved: "Bonus approved successfully",
  rejected: "Bonus rejected successfully",
  change_requested: "Change request submitted successfully",
};

export const useReviewBonus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, SingleReviewPayload>({
    mutationFn: ({ bonusId, action, comment }) =>
      axiosInstance
        .patch(`/employees/bonuses/bonus/${bonusId}/review`, {
          action,
          comment,
        })
        .then((r) => r.data),
    onSuccess: (_, { action }) => {
      toast.success(SUCCESS_MESSAGES[action]);
      queryClient.invalidateQueries({ queryKey: ["in-review-bonus-list"] });
      queryClient.invalidateQueries({ queryKey: ["all-bonus-retrieve-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Review failed. Please try again.";
      toast.error(message);
    },
  });
};

export const useReviewMultipleBonuses = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, MultipleReviewPayload>({
    mutationFn: (payload) =>
      axiosInstance
        .patch("/employees/bonuses/review-multiple", payload)
        .then((r) => r.data),
    onSuccess: (_, { action }) => {
      toast.success(SUCCESS_MESSAGES[action]);
      queryClient.invalidateQueries({ queryKey: ["in-review-bonus-list"] });
      queryClient.invalidateQueries({ queryKey: ["all-bonus-retrieve-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Review failed. Please try again.";
      toast.error(message);
    },
  });
};
