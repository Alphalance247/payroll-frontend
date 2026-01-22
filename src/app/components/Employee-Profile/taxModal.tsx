import ModalOverlay from "@/app/common/modal/modal";
import { useState, useRef } from "react";
import useBoolean from "@/app/hooks/useBoolean";
import { UseEmployeeStore } from "@/stores/employee-dashboard/settings/employeeDetails/PersonalDetail";
import Label from "@/app/common/label";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "@/app/common/Button";

const TaxModal = ({ onModalClose }: { onModalClose: () => void }) => {
  const { employeeData, fetchPersonalDetails } = UseEmployeeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    tax_identification_number: employeeData?.data.tax_id || "",
    rent_amount: employeeData?.data.rent_amount || "",
    rent_document: null as File | null,
  });
  const [documentPreview, setDocumentPreview] = useState<{
    name: string;
    type: string;
  } | null>(
    employeeData?.data.rent_doc
      ? { name: employeeData.data.rent_doc, type: "" }
      : null,
  );
  const [editTaxDetails, setEditTaxDetails, resetEditTaxDetails] =
    useBoolean(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prevData) => ({
        ...prevData,
        rent_document: file,
      }));
      setDocumentPreview({ name: file.name, type: file.type });
    }
  };

  const getFileTypeLabel = (type: string) => {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("word") || type.includes("document")) return "DOC";
    if (type.includes("image")) return "IMAGE";
    if (type.includes("text")) return "TXT";
    return "FILE";
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setEditTaxDetails();
      const formData = new FormData();

      formData.append("rent_amount", form.rent_amount);
      if (form.rent_document) {
        formData.append("rent_doc", form.rent_document);
      }

      const response = await axiosInstance.patch(
        `/employees/employee/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Tax information updated successfully!");
      }
      setForm({
        tax_identification_number: "",
        rent_amount: "",
        rent_document: null,
      });
      setDocumentPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onModalClose();
      resetEditTaxDetails();
      fetchPersonalDetails();
    } catch (error) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
      resetEditTaxDetails();
    }
  };
  return (
    <ModalOverlay onClose={onModalClose} className="">
      <div className="w-[528px] h-[450px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative z-50  shadow-lg mt-20   ">
        {" "}
        <form
          action="submit"
          onSubmit={handleSubmit}
          className="absolute z-50 w-[528px]"
        >
          <div className="pt-6  pl-6 border-b border-[#E3E3E5]  ">
            <h2 id="" className="text-lg font-semibold mb-2">
              Edit Tax Information
            </h2>
          </div>
          <div className=" h-[300px] overflow-auto">
            <div className="grid gap-y-4 p-6">
              <div className="">
                <Label
                  id="tax_identification_number"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Tax Identification Number
                </Label>
                <br />
                <input
                  type="text"
                  name="tax_identification_number"
                  value={form.tax_identification_number}
                  onChange={handleChange}
                  readOnly
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik bg-[#F7F7F7] cursor-not-allowed"
                />
              </div>
              <div className="">
                <Label
                  id="rent_amount"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Rent Amount
                </Label>
                <br />
                <input
                  type="number"
                  name="rent_amount"
                  value={form.rent_amount}
                  onChange={handleChange}
                  className="rounded-[8px] border-[1px] border-[#E3E3E5] h-10 w-full mt-2 text-[#2F2F33] text[16px] font-normal pl-4 font-Graphik"
                />
              </div>
              <div className="">
                <Label
                  id="rent_document"
                  className="text-[#2F2F33] text-sm font-medium font-Graphik "
                >
                  {" "}
                  Rent Document
                </Label>
                <br />
                <div className="mt-2 border-[1px] border-[#E3E3E5] rounded-[8px] p-4 bg-[#F7F7F7]">
                  {documentPreview ? (
                    <div className="flex items-center gap-3 max-w-xs">
                      <div className="bg-blue-100 px-3 py-1 rounded-md text-xs font-semibold text-blue-700">
                        {getFileTypeLabel(documentPreview.type)}
                      </div>
                      <a
                        href={employeeData?.data.rent_doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline text-sm truncate font-medium"
                      >
                        {employeeData?.data.rent_doc.split("/").pop() ||
                          "View Document"}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({ ...prev, rent_document: null }));
                          setDocumentPreview(null);
                          if (fileInputRef.current)
                            fileInputRef.current.value = "";
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full text-center text-[#2F2F33] text-sm font-medium hover:text-blue-600 transition"
                    >
                      + Upload Document
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.txt,.xlsx,.xls"
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center py-6 justify-end gap-x-4 px-6 border-t-[1px]  border-[#E3E3E5] bg-[#F7F7F7] rounded-b-[8px]">
            <Button
              variant="secondary"
              className="bg-white w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#2F2F33] font-semibold text-sm"
              onButtonClick={onModalClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className=" w-[96px] h-[36px] rounded-[6px] font-Graphik text-[#F7F7F7] font-semibold text-sm"
            >
              {editTaxDetails ? "Updating..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default TaxModal;
