"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { PayrollData } from "../utils/type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

type PayrollContextType = {
  payroll: PayrollData | null;
  setPayroll: React.Dispatch<React.SetStateAction<PayrollData | null>>;
  loading: boolean;
  fetchPayroll: () => void;
};

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export const PayrollProvider = ({ children }: { children: ReactNode }) => {
  const [payroll, setPayroll] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPayroll = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/employees/generate-payroll`);
      const { data } = res.data; // response.data.data
      if (res.status === 200) {
        setPayroll(data);
      } else {
        toast.error(res?.data?.message);
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
      value={{ payroll, setPayroll, loading, fetchPayroll }}
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
