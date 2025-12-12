"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useBonusList } from "@/app/hooks/useQueries/bonus/useBonusList";

interface DisbursementModalProps {
  onModalClose: () => void;
  onConfirm?: () => void;
  employeeName?: string;
  amount?: string;
  id: string;
}

const MultipleDisburseModal = ({
  onModalClose,
  id,
}: DisbursementModalProps) => {
  const [loading, setIsLoading] = useState(false);
  const { refetch } = useBonusList();

  const handleDisbursePayment = async () => {
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(
        `employees/bonuses/bonus/${id}/disburse`
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(
          res?.data?.message || "Bonus disbursed to employee successfully"
        );
        onModalClose();
        refetch();
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
            Please confirm you want to disburse this bonus.
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
          >
            {loading ? "Thinking...." : "Yes, Disburse"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default MultipleDisburseModal;
