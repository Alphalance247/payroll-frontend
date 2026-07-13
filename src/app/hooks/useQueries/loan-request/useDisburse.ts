import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { getLoanRequestList } from "@/stores/loan/getLoanList";

export const useDisburse = (onSuccess?: () => void) => {
  const [disbursing, setDisbursing] = useState<string | null>(null);
  const { fetchLoanRequestList } = getLoanRequestList();

  const handleDisburse = async (id: string) => {
    try {
      setDisbursing(id);
      const res = await axiosInstance.post(`/employees/loan-disburse/${id}`);
      if (res.status === 200) {
        toast.success("Loan disbursed successfully");
        fetchLoanRequestList();
        onSuccess?.();
      }
    } catch (err) {
      let errorMessage = "An error occurred, please try again";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setDisbursing(null);
    }
  };

  return { handleDisburse, disbursing };
};
