import { create } from "zustand";
import type {
  YearTaxRecord,
  TaxReceiptDetail,
} from "@/app/hooks/useQueries/tax/useTaxList";

interface ReceiptModalStore {
  uploadTarget: YearTaxRecord | null;
  editTarget: YearTaxRecord | null;
  viewTarget: YearTaxRecord | null;
  removeTarget: YearTaxRecord | null;

  openUploadReceipt: (record: YearTaxRecord) => void;
  closeUploadReceipt: () => void;

  openEditReceipt: (record: YearTaxRecord) => void;
  closeEditReceipt: () => void;

  openViewReceipt: (record: YearTaxRecord) => void;
  closeViewReceipt: () => void;

  openRemoveReceipt: (record: YearTaxRecord) => void;
  closeRemoveReceipt: () => void;

  /**
   * Shared "receipt just landed" handler for both upload and edit success:
   * merges the new receipt into the source record and opens it in the view modal.
   */
  applyReceiptAndView: (
    source: YearTaxRecord,
    receipt: TaxReceiptDetail,
  ) => void;
}

export const useReceiptModalStore = create<ReceiptModalStore>((set) => ({
  uploadTarget: null,
  editTarget: null,
  viewTarget: null,
  removeTarget: null,

  openUploadReceipt: (record) => set({ uploadTarget: record }),
  closeUploadReceipt: () => set({ uploadTarget: null }),

  openEditReceipt: (record) => set({ editTarget: record }),
  closeEditReceipt: () => set({ editTarget: null }),

  openViewReceipt: (record) => set({ viewTarget: record }),
  closeViewReceipt: () => set({ viewTarget: null }),

  openRemoveReceipt: (record) => set({ removeTarget: record }),
  closeRemoveReceipt: () => set({ removeTarget: null }),

  applyReceiptAndView: (source, receipt) =>
    set({
      uploadTarget: null,
      editTarget: null,
      viewTarget: {
        ...source,
        remittance: { ...source.remittance, receipt },
      },
    }),
}));
