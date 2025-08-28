"use client";
import { useState } from "react";
import EditExchange from "./editExchange";
import { PayrollData } from "../../utils/type";
import { toast } from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import PayrollCardMain from "./payrollCard";

interface OverviewItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  unit?: string;
  hasEdit?: boolean;
  onEdit?: () => void;
}

interface PayrollSummaryProps {
  payroll: PayrollData;
}

const RunPayrollHeading: React.FC<PayrollSummaryProps> = ({ payroll }) => {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentRate, setCurrentRate] = useState({
    usd: 1,
    ngn:
      payroll?.rates?.find((rate) => rate.code === "NGN")?.official_rate ||
      1500,
  });

  const handleSaveExchangeRate = async (rate: { usd: number; ngn: number }) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/employees/set-rate/${
          payroll?.rates?.find((rate) => rate.code === "NGN")?.id
        }`,
        {
          official_rate: rate?.ngn,
        }
      );

      if (res.status === 200) {
        toast.success("Payroll rate successfully updated");
        setCurrentRate(rate);
        setIsExchangeModalOpen(false);
      } else {
        toast.error(
          res?.data?.message ||
            "Failed to update exchange rate please try again or contact admin"
        );
      }
      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const overviewItems: OverviewItem[] = [
    {
      id: "exchange-rate",
      icon: "/assets/payroll/1.svg",
      label: "Exchange Rate",
      value: `₦ ${currentRate.ngn}`,
      hasEdit: true,
      onEdit: () => setIsExchangeModalOpen(true),
    },
    {
      id: "hours-booked",
      icon: "/assets/payroll/2.svg",
      label: "Total Hours Booked",
      value: payroll?.total_hours || "Not set",
      unit: "hrs",
    },
    {
      id: "payday",
      icon: "/assets/payroll/3.svg",
      label: "Payday",
      value: payroll?.payday || "Not set",
      hasEdit: true,
      onEdit: () => console.log("Edit payday"),
    },
    {
      id: "payment-method",
      icon: "/assets/payroll/4.svg",
      label: "Payment Method",
      value: payroll?.payment_method || "Not set",
    },
  ];

  return (
    <div className="mb-20 px-12">
      {/* Heading and Status */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold text-[#2F2F33]">Run Payroll</h2>
        <span className="bg-[#E7E9EA] text-[#0C1720] capitalize text-sm px-3 py-1 rounded-full font-medium border border-[#414D57]">
          {payroll?.approved_state}
        </span>
      </div>

      {/* Description */}
      <p className="mb-6 text-base text-[#71717A] w-[80%]">
        Review the payroll summary and make any necessary adjustments before
        proceeding to the next step. Ensure that all information is accurate to
        avoid any discrepancies in the payroll process.
      </p>

      {/* Overview Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%]">
        {overviewItems.map((item) => (
          <PayrollCardMain
            key={item?.id}
            icon={item?.icon}
            label={item?.label}
            value={item?.value}
            unit={item?.unit || ""}
            id={item?.id}
          />
        ))}
      </div>

      {/* Exchange Rate Modal */}
      <EditExchange
        isOpen={isExchangeModalOpen}
        onClose={() => setIsExchangeModalOpen(false)}
        onSave={handleSaveExchangeRate}
        currentRate={currentRate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RunPayrollHeading;
