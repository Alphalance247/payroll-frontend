import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { downloadFile, generateFileName } from "@/app/utils/exportFile";

/**
 * Triggers a file download from GET /employees/taxes/export.
 *
 * Pass the month (1-12) and year to scope the export to that payroll period.
 */
export const useExportTaxReport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportTaxReport = async (
    month: number | string,
    year: number | string,
  ) => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      params.set("month", String(month));
      params.set("year", String(year));

      const res = await axiosInstance.get(
        `/employees/taxes/export?${params.toString()}`,
        { responseType: "blob" },
      );

      downloadFile(
        res.data as Blob,
        generateFileName(`tax-report-${month}-${year}`),
      );
    } catch {
      toast.error("Failed to export tax report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportTaxReport, isExporting };
};
