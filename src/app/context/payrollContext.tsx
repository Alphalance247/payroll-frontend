"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { PayrollData } from "../utils/type";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

type PayrollContextType = {
  payroll: PayrollData | null;
  setPayroll: React.Dispatch<React.SetStateAction<PayrollData | null>>;
  loading: boolean;
};

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export const PayrollProvider = ({ children }: { children: ReactNode }) => {
  const [payroll, setPayroll] = useState<PayrollData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayroll = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://real.ec2.alluvium.net/api/employees/generate-payroll`
        );
        const { data } = res.data; // response.data.data
        if (res.status === 200) {
          setPayroll(data);
          toast.success("Payroll data loaded");
        } else {
          toast.error("Failed to fetch payroll");
        }
      } catch (err) {
        // console.error("Failed to fetch payroll:", err);
        toast.error("Failed to fetch payroll");
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, []);

  return (
    <PayrollContext.Provider value={{ payroll, setPayroll, loading }}>
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
