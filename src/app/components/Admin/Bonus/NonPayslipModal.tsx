"use client";
import Label from "@/app/common/label";
import Input from "@/app/common/input";
import { useEffect, useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { useEmployeeBonusDetail } from "@/app/hooks/useQueries/bonus/useEmployeeBonusDetail";
import { getEmployeeListStore } from "@/stores/getEmployee";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useBonusList } from "@/app/hooks/useQueries/bonus/useBonusList";

interface data {
  id: string;
}

const NonPayslipModal = ({
  onModalClose,
  id,
}: {
  onModalClose: () => void;
  id: string;
}) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    employee: "",
    reason: "",
    payslip: "",
    approved: "",
    amount: "",
  });
  const [employeeId, setEmployeeId] = useState("");
  const [employeePayslip, setEmployeePayslip] = useState<data[]>([]);
  const { refetch } = useBonusList();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "employee") {
      setEmployeeId(value);
    }
  };

  const { data: dataDetails } = useEmployeeBonusDetail({ id: id });

  const {
    fetchEmployeeList,
    data,
    loading: loadingEmployeeList,
    error,
  } = getEmployeeListStore();

  useEffect(() => {
    fetchEmployeeList();
    if (id && dataDetails) {
      setForm((prev) => ({
        ...prev,
        employee_name: dataDetails?.data.employee?.fullname,
      }));
    }
  }, [id, dataDetails, fetchEmployeeList]);

  useEffect(() => {
    const fetchPayslip = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(`/employees/payslip/${employeeId}`);
        if (res.status === 200) {
          setEmployeePayslip(res?.data?.data);
        } else {
          toast.error(
            res?.data?.message ||
              "Error fetching payroll history please refresh or contact Admin"
          );
        }
      } catch (err) {
        let errorMessage =
          "An error occurred please try again or contact Admin";
        if (err instanceof AxiosError) {
          errorMessage = err.response?.data?.statusmessage || errorMessage;
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (employeeId) {
      fetchPayslip();
    }
  }, [employeeId]);

  const formatNaira = (value: string) => {
    if (!value) return "";
    const numeric = Number(value.replace(/[^0-9]/g, ""));

    if (Number.isNaN(numeric)) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numeric);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, "");
    setForm((prev) => ({ ...prev, amount: numericValue }));
  };

  const handleSubmitPaySlip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const booleanValue = form?.approved === "approve" ? true : false;
    try {
      setIsLoading(true);

      const res = await axiosInstance.post(`/employees/bonuses/add-bonus`, {
        ...form,
        approved: booleanValue,
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(res?.data?.message || "Bonus added successfully");
        // Refresh loan details after loan request
        refetch();
      }

      setForm((prev) => ({
        ...prev,
        approved: "",
        employee: "",
        reason: "",
        payslip: "",
        amount: "",
      }));

      setIsLoading(false);
    } catch (err) {
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onModalClose}>
      <div className=" border border-[#E3E3E5] rounded-lg relative z-50 w-[550px] bg-[white] shadow-lg">
        <form action="submit" onSubmit={handleSubmitPaySlip}>
          <div className="pt-6 pb-4 pl-6 border-b border-[#E3E3E5]">
            <h2 id="modal-title" className="text-lg font-semibold">
              Non Payslip Bonus
            </h2>
          </div>

          {loadingEmployeeList ? (
            <Spinner spinnerSmall={true} />
          ) : error ? (
            <ErrorFetch
              message="error fetching form please try again"
              onRefetch={() => fetchEmployeeList()}
            />
          ) : (
            <div className="overflow-y-auto h-[350px]">
              <div className="p-4 flex flex-col gap-y-4">
                <div>
                  <Label id="date-of-birth" className="block mb-1">
                    Employee Name
                  </Label>
                  <select
                    name="employee"
                    required
                    id="employee"
                    value={form?.employee}
                    onChange={handleChange}
                    className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                  >
                    <option value="">Employees</option>
                    {data?.employees?.map((el) => (
                      <option value={el?.id} key={el?.id}>
                        {el?.fullname}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label id="due_date" className="block mb-1">
                    Payslip (Optional)
                  </Label>
                  <select
                    name="payslip"
                    required
                    id="payslip"
                    value={form?.payslip}
                    onChange={handleChange}
                    className={`w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg ${
                      employeeId ? "" : " cursor-not-allowed opacity-40"
                    }`}
                    disabled={!employeeId}
                  >
                    <option value="">select payslip</option>
                    {employeePayslip?.map((el) => (
                      <option value={el?.id} key={el?.id}>
                        {el?.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label id="due_date" className="block mb-1">
                    Amount
                  </Label>
                  <div>
                    <Input
                      type="text"
                      id="amount"
                      placeholder="₦0"
                      name="amount"
                      value={formatNaira(form?.amount || "")}
                      onChange={handleAmountChange}
                      className="pl-2"
                    />
                    <p className="text-xs text-[#E37915] mt-1">
                      Amounts are captured strictly in Nigerian Naira (₦).
                    </p>
                  </div>
                </div>

                <div className="">
                  <Label id="location"> Status</Label>
                  <br />
                  <select
                    name="approved"
                    required
                    id="location"
                    value={form?.approved}
                    onChange={handleChange}
                    className="w-full border outline-none text-[#333333] border-[#E3E3E5] p-4 text-sm rounded-lg"
                  >
                    <option value="pending">Pending</option>
                    <option value="approve">Approve</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <Label id="reason" className="block mb-1">
                    Reason
                  </Label>
                  <textarea
                    id=""
                    className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                    placeholder="Add context if needed..."
                    value={form?.reason || ""}
                    required
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    name="reason"
                  >
                    {" "}
                  </textarea>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-x-4 p-4 bg-[#F7F7F7] border-t border-[#E3E3E5] mt-4">
            <Button
              variant="secondary"
              className="w-fit"
              onButtonClick={() => {
                onModalClose();
                setForm((prev) => ({ ...prev, employee_name: "" }));
              }}
            >
              Cancel
            </Button>
            <Button className="w-fit" btnType="submit">
              {loading ? "Thinking...." : "Add employee"}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default NonPayslipModal;
