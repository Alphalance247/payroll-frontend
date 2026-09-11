import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface AddBonusPayload {
  amount: number;
  reason: string;
  bonus_type: "fixed" | "client" | "non-client" | "quarterly";
  review_comment: string;
  paid: boolean;
  date_paid?: string;
  pay_deno: number | string;
}

const addBonus = async (payload: AddBonusPayload) => {
  const res = await axiosInstance.post("/employees/bonuses/add-bonus", payload);
  return res.data;
};

export const useAddBonus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, AddBonusPayload>({
    mutationFn: addBonus,
    onSuccess: () => {
      toast.success("Bonus added successfully");
      queryClient.invalidateQueries({ queryKey: ["all-bonus-retrieve-list"] });
      onSuccess?.();
    },
    onError: (err) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Failed to add bonus. Please try again.";
      toast.error(message);
    },
  });
};
