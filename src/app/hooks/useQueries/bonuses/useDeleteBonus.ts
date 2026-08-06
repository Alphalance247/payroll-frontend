import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDeleteBonus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: (bonusId) =>
      axiosInstance
        .delete(`/employees/bonuses/bonus/${bonusId}`)
        .then((r) => r.data),
    onSuccess: () => {
      toast.success("Bonus deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-bonus-retrieve-list"] });
      queryClient.invalidateQueries({ queryKey: ["in-review-bonus-list"] });
      queryClient.invalidateQueries({ queryKey: ["approved-bonus-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Failed to delete bonus. Please try again.";
      toast.error(message);
    },
  });
};
