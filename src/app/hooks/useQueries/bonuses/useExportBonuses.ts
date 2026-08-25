import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/app/utils/axios";
import { downloadFile, generateFileName } from "@/app/utils/exportFile";

/**
 * Triggers a file download from GET /employees/bonuses/export-bonuses.
 *
 * Pass a bonus_type string to scope the export to a specific tab
 * (e.g. "discretionary", "client_facing"). Omit it to export all bonuses.
 */
export const useExportBonuses = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportBonuses = async (bonusType?: string) => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      if (bonusType) params.set("bonus_type", bonusType);

      const query = params.toString();
      const url = `/employees/bonuses/export-bonuses${query ? `?${query}` : ""}`;

      const res = await axiosInstance.get(url, { responseType: "blob" });

      const baseName = bonusType
        ? `${bonusType.replace(/_/g, "-")}-bonuses`
        : "all-bonuses";

      downloadFile(res.data as Blob, generateFileName(baseName));
    } catch {
      toast.error("Failed to export bonuses. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return { exportBonuses, isExporting };
};
