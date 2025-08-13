"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { PayrollResponse } from "../utils/type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

type PayrollContextType = {
  payrollD: PayrollResponse | null;
  setPayroll: React.Dispatch<React.SetStateAction<PayrollResponse | null>>;
  loading: boolean;
  fetchPayroll: () => void;
};

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export const PayrollProvider = ({ children }: { children: ReactNode }) => {
  const [payrollD, setPayroll] = useState<PayrollResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/employees/generate-payroll`);
      const { data } = res; // response.data.data
      if (res.status === 200) {
        setPayroll(data);
      }
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPayroll();
  }, []);

  return (
    <PayrollContext.Provider
      value={{ payrollD, setPayroll, loading, fetchPayroll }}
    >
      {children}
    </PayrollContext.Provider>
  );
};

export const usePayrollContext = () => {
  const context = useContext(PayrollContext);
  if (!context) {
    throw new Error("usePayrollContext must be used within a PayrollProvider");
  }
  return context;
};
