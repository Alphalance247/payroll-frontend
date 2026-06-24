"use client";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { Upload, Eye, Download, X, FileText, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useTaxReceiptList,
  useUploadTaxReceipt,
  type TaxReceiptRecord,
} from "@/app/hooks/useQueries/tax/useTaxReceipts";
import {
  getMonthsFromCurrentMonth,
  getYearsInDescendingOrder,
  getMonthName,
} from "@/app/utils/dateOrdering";

const TaxReceipt = () => {
  const { data: receipts = [], isLoading } = useTaxReceiptList();
  const uploadMutation = useUploadTaxReceipt();

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] =
    useState<TaxReceiptRecord | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewFileType, setPreviewFileType] = useState<
    "pdf" | "image" | "other" | "loading"
  >("loading");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolveFileType = async (url: string) => {
    setPreviewFileType("loading");

    // Parse the pathname only — strips query params so S3 signed URLs work correctly
    try {
      const pathname = new URL(url).pathname;
      const ext = pathname.split(".").pop()?.toLowerCase() ?? "";
      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
        setPreviewFileType("image");
        return;
      }
      if (ext === "pdf") {
        setPreviewFileType("pdf");
        return;
      }
    } catch {
      // malformed URL — fall through to HEAD
    }

    // Fallback: ask the server for the Content-Type
    try {
      const res = await fetch(url, { method: "HEAD" });
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("pdf")) setPreviewFileType("pdf");
      else if (ct.startsWith("image/")) setPreviewFileType("image");
      else setPreviewFileType("other");
    } catch {
      setPreviewFileType("other");
    }
  };

  const [form, setForm] = useState({
    month: "",
    year: "",
    reference_id: "",
    note: "",
    receipt: null as File | null,
  });

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    setForm((prev) => ({ ...prev, receipt: file }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const resetForm = () => {
    setForm({ month: "", year: "", reference_id: "", note: "", receipt: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = () => {
    if (!form.month || !form.year || !form.receipt) {
      toast.error("Month, year and receipt file are required");
      return;
    }

    const payload = new FormData();
    payload.append("month", form.month);
    payload.append("year", form.year);
    payload.append("receipt", form.receipt);
    if (form.reference_id) payload.append("reference_id", form.reference_id);
    if (form.note) payload.append("note", form.note);

    uploadMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Receipt uploaded successfully");
        setShowUploadModal(false);
        resetForm();
      },
      onError: (err) => {
        const message =
          err.message || err.message || "Failed to upload receipt";
        toast.error(message);
      },
    });
  };

  const handleDownload = (receipt: TaxReceiptRecord) => {
    const link = document.createElement("a");
    link.href = receipt.receipt;
    link.download = `tax-receipt-${receipt.month}-${receipt.year}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#2F2F33]">Tax Receipts</h2>
          <p className="text-sm text-[#71717A] mt-0.5">
            Upload and manage tax remittance receipts
          </p>
        </div>
        <Button
          variant="primary"
          className="flex items-center gap-x-2"
          onButtonClick={() => setShowUploadModal(true)}
        >
          <Upload size={16} /> Upload Receipt
        </Button>
      </div>

      {/* Receipt list */}
      <div className="bg-white rounded-lg border border-[#E3E3E5]">
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin text-[#E37915]" size={32} />
          </div>
        ) : receipts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText size={40} className="text-[#D3D3D6] mb-3" />
            <p className="text-sm font-medium text-[#2F2F33]">
              No receipts yet
            </p>
            <p className="text-xs text-[#71717A] mt-1">
              Upload your first tax receipt to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-[#F7F7F7] border-b border-[#E3E3E5]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A] w-[50px]">
                    S/N
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Reference ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#71717A]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#E3E3E5] last:border-b-0 hover:bg-[#F7F7F7] transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#2F2F33]">
                      {getMonthName(r.month)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {r.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#2F2F33]">
                      {r.reference_id || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#71717A] max-w-[200px] truncate">
                      {r.note || "—"}
                    </td>
                    <td className="px-6 py-4">
                      {r.receipt ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E37915] bg-orange-50 border border-orange-100 px-2.5 py-1 rounded-full">
                          <FileText size={11} /> Attached
                        </span>
                      ) : (
                        <span className="text-xs text-[#71717A]">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedReceipt(r);
                            setShowPreviewModal(true);
                            resolveFileType(r.receipt);
                          }}
                          className="p-1.5 rounded-md hover:bg-[#E3E3E5] transition-colors"
                          title="Preview receipt"
                        >
                          <Eye size={16} className="text-[#71717A]" />
                        </button>
                        <button
                          onClick={() => handleDownload(r)}
                          className="p-1.5 rounded-md hover:bg-[#E3E3E5] transition-colors"
                          title="Download receipt"
                        >
                          <Download size={16} className="text-[#71717A]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <ModalOverlay
          onClose={() => {
            setShowUploadModal(false);
            resetForm();
          }}
        >
          <div className="relative z-50 bg-white rounded-xl shadow-lg w-full max-w-[520px] mx-4 flex flex-col overflow-hidden border border-[#E3E3E5]">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3E5]">
              <div>
                <h3 className="text-base font-semibold text-[#2F2F33]">
                  Upload Tax Receipt
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Attach a remittance receipt with its details
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetForm();
                }}
                className="p-1.5 rounded-md hover:bg-[#F7F7F7] transition-colors"
              >
                <X size={18} className="text-[#71717A]" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
              {/* Month & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2F2F33]">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.month}
                    onChange={(e) =>
                      setForm({ ...form, month: e.target.value })
                    }
                    className="border border-[#D7DEDD] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] bg-white"
                  >
                    <option value="">Select month</option>
                    {getMonthsFromCurrentMonth().map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#2F2F33]">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="border border-[#D7DEDD] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] bg-white"
                  >
                    <option value="">Select year</option>
                    {getYearsInDescendingOrder().map((y) => (
                      <option key={y} value={String(y)}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reference ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2F2F33]">
                  Reference ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. TXN-2024-001"
                  value={form.reference_id}
                  onChange={(e) =>
                    setForm({ ...form, reference_id: e.target.value })
                  }
                  className="border border-[#D7DEDD] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915]"
                />
              </div>

              {/* Note */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2F2F33]">
                  Note
                </label>
                <textarea
                  placeholder="Add any relevant notes..."
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="border border-[#D7DEDD] rounded-lg px-3 py-2.5 text-sm text-[#2F2F33] focus:outline-none focus:ring-1 focus:ring-[#E37915] resize-none"
                />
              </div>

              {/* File upload zone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#2F2F33]">
                  Receipt File <span className="text-red-500">*</span>
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                    isDragging
                      ? "border-[#E37915] bg-orange-50"
                      : form.receipt
                        ? "border-green-400 bg-green-50"
                        : "border-[#D7DEDD] hover:border-[#E37915] hover:bg-orange-50/40"
                  }`}
                >
                  {form.receipt ? (
                    <>
                      <FileText size={28} className="text-green-600" />
                      <p className="text-sm font-medium text-green-700 text-center">
                        {form.receipt.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {(form.receipt.size / 1024).toFixed(1)} KB
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setForm({ ...form, receipt: null });
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="text-xs text-red-500 hover:underline mt-1"
                      >
                        Remove file
                      </button>
                    </>
                  ) : (
                    <>
                      <Upload size={28} className="text-[#71717A]" />
                      <p className="text-sm font-medium text-[#2F2F33]">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-[#71717A]">
                        PDF, images, spreadsheets — all formats accepted
                      </p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] ?? null)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-[#E3E3E5] flex justify-end gap-3 bg-[#F7F7F7]">
              <Button
                variant="secondary"
                onButtonClick={() => {
                  setShowUploadModal(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex items-center gap-x-2 min-w-[120px] justify-center"
                onButtonClick={handleUpload}
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Upload size={16} />
                )}
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedReceipt && (
        <ModalOverlay
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedReceipt(null);
          }}
        >
          <div className="relative z-50 bg-white rounded-xl shadow-lg w-full max-w-[700px] mx-4 flex flex-col overflow-hidden border border-[#E3E3E5] max-h-[90vh]">
            {/* Preview header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3E5] shrink-0">
              <div>
                <h3 className="text-base font-semibold text-[#2F2F33]">
                  Receipt Preview
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  {getMonthName(selectedReceipt.month)} {selectedReceipt.year}
                  {selectedReceipt.reference_id
                    ? ` · Ref: ${selectedReceipt.reference_id}`
                    : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(selectedReceipt)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#E37915] hover:underline"
                >
                  <Download size={15} /> Download
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    setSelectedReceipt(null);
                  }}
                  className="p-1.5 rounded-md hover:bg-[#F7F7F7] transition-colors"
                >
                  <X size={18} className="text-[#71717A]" />
                </button>
              </div>
            </div>

            {/* File viewer */}
            <div className="flex-1 overflow-auto p-4 min-h-0">
              {(() => {
                if (previewFileType === "loading") {
                  return (
                    <div className="flex items-center justify-center h-[280px]">
                      <Loader2
                        size={32}
                        className="animate-spin text-[#E37915]"
                      />
                    </div>
                  );
                }
                if (previewFileType === "pdf") {
                  return (
                    <iframe
                      src={selectedReceipt.receipt}
                      className="w-full h-[500px] rounded border border-[#E3E3E5]"
                      title="Receipt PDF"
                    />
                  );
                }
                if (previewFileType === "image") {
                  return (
                    <div className="relative w-full h-[500px]">
                      <Image
                        src={selectedReceipt.receipt}
                        alt="Receipt"
                        fill
                        className="rounded border border-[#E3E3E5] object-contain"
                        unoptimized
                      />
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col items-center justify-center h-[280px] gap-4">
                    <FileText size={48} className="text-[#D3D3D6]" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-[#2F2F33]">
                        Preview not available
                      </p>
                      <p className="text-xs text-[#71717A] mt-1">
                        Download the file to view its contents
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      className="flex items-center gap-x-2"
                      onButtonClick={() => handleDownload(selectedReceipt)}
                    >
                      <Download size={16} /> Download File
                    </Button>
                  </div>
                );
              })()}
            </div>

            {/* Note strip */}
            {selectedReceipt.note && (
              <div className="px-6 py-3 border-t border-[#E3E3E5] bg-[#F7F7F7] shrink-0">
                <p className="text-xs font-semibold text-[#71717A] uppercase tracking-wide mb-1">
                  Note
                </p>
                <p className="text-sm text-[#2F2F33]">{selectedReceipt.note}</p>
              </div>
            )}
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default TaxReceipt;
