"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useBonusList } from "@/app/hooks/useQueries/bonus/useBonusList";

interface MultipleDisburseModalProps {
  onModalClose: () => void;
  onSuccess?: () => void;
  bonusIds: string[];
}

const MultipleDisburseModal = ({
  onModalClose,
  onSuccess,
  bonusIds,
}: MultipleDisburseModalProps) => {
  const [loading, setIsLoading] = useState(false);
  const { refetch } = useBonusList();

  const handleDisbursePayment = async () => {
    if (!bonusIds.length) return;
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(
        `/employees/bonuses/disburse-multiple-bonuses/`,
        {
          bonus_ids: bonusIds,
        },
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(
          res?.data?.message ||
            "Bonus disbursed successfully to selected employees",
        );
        await refetch();
        onSuccess?.();
        onModalClose();
      }

      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[520px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="pt-6 pb-4 px-6 border-b border-[#E3E3E5]">
          <h2 id="modal-title" className="text-lg font-semibold text-[#2F2F33]">
            Confirm Disbursement
          </h2>
          <p className="text-sm text-[#71717A] mt-1">
            You are about to disburse bonuses for{" "}
            <span className="font-semibold text-[#2F2F33]">
              {bonusIds.length}
            </span>{" "}
            {bonusIds.length === 1 ? "employee" : "employees"}. This action
            cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-3 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5]">
          <Button
            variant="secondary"
            className="w-fit"
            onButtonClick={onModalClose}
          >
            Cancel
          </Button>
          <Button
            className="w-fit"
            btnType="submit"
            onButtonClick={handleDisbursePayment}
            disabled={!bonusIds.length || loading}
          >
            {loading ? "Disbursing..." : "Yes, Disburse"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default MultipleDisburseModal;
