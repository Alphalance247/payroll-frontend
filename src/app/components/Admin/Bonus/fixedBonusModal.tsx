"use client";
import Label from "@/app/common/label";
import { useEffect, useState } from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { AxiosError } from "axios";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { useEmployeeBonusDetail } from "@/app/hooks/useQueries/bonus/useEmployeeBonusDetail";
import Spinner from "@/app/common/spinner";
import ErrorFetch from "@/app/common/errorFetch";
import { useEmployeeListData } from "@/app/hooks/useQueries/useEmployeeData";
import { DenominationData } from "@/app/utils/type";

const initialForm = {
  employee: "",
  reason: "",
  payslip: "",
  approved: "",
  amount: "",
  pay_deno: "",
};

// Currency symbol mapping
const getCurrencySymbol = (code: string): string => {
  const symbolMap: Record<string, string> = {
    USD: "$",
    NGN: "₦",
    EUR: "€",
    GBP: "£",
  };
  return symbolMap[code] || code;
};

const FixedBonusModal = ({
  onModalClose,
  id,
  btnType,
  refetch,
}: {
  onModalClose: () => void;
  refetch: () => void;
  id: string;
  btnType: "edit" | "add-new";
}) => {
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [denominationData, setDenominationData] = useState<DenominationData[]>(
    [],
  );

  useEffect(() => {
    const fetchDenomination = async () => {
      try {
        const res = await axiosInstance.get(`/employees/denominations`);
        const data = res?.data?.denomination; // response.data.data

        if (res.status === 200) {
          setDenominationData(data);
        }
      } catch (err) {
        if (err instanceof AxiosError) {
        }
      }
    };

    fetchDenomination();
  }, []);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const { data: dataDetails } = useEmployeeBonusDetail({ id: id });

  const {
    data,
    isError,
    isLoading: loadingEmployeeList,
    error,
    refetch: refetchEmployee,
  } = useEmployeeListData();

  useEffect(() => {
    if (id && dataDetails?.data && btnType === "edit") {
      // prefer using the employee id as the select value (options use id)
      const employeeIdFromDetails =
        dataDetails?.data.employee?.id?.toString?.() ||
        dataDetails?.data.employee?.id ||
        "";

      setForm(() => ({
        employee: employeeIdFromDetails,
        reason: dataDetails?.data.reason || "",
        payslip: dataDetails?.data?.payslip || "",
        approved: dataDetails?.data?.approved ? "approve" : "pending",
        pay_deno: dataDetails?.data?.pay_deno === "Dollars" ? "1" : "2",
        amount:
          dataDetails?.data?.amount != null
            ? String(dataDetails?.data?.amount)
            : "",
      }));
    } else {
      // Set default to Naira (NGN)
      const ngnDenomination = denominationData?.find((d) => d.code === "NGN");
      setForm(() => ({
        ...initialForm,
        pay_deno: ngnDenomination?.id?.toString() || "",
      }));
    }

    // cleanup on unmount
    return () => {
      setForm(initialForm);
    };
  }, [id, dataDetails?.data, btnType, denominationData]);

  const handleSubmitPaySlip = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const booleanValue = form?.approved === "approve" ? true : false;
    try {
      setIsLoading(true);

      let res;
      //requirement: if btnType === "edit" use POST, otherwise use PATCH
      if (btnType === "edit") {
        res = await axiosInstance.patch(`/employees/bonuses/bonus/${id}`, {
          ...form,
          bonus_type: "fixed",
          approved: booleanValue,
        });

        if (res.status === 200 || res.status === 201) {
          toast.success(
            res?.data?.message || "Fixed bonus updated successfully",
          );
          refetch();
          onModalClose();
        }
      } else {
        res = await axiosInstance.post(`/employees/bonuses/add-bonus`, {
          ...form,
          bonus_type: "fixed",
          approved: booleanValue,
        });
        if (res.status === 200 || res.status === 201) {
          toast.success(res?.data?.message || "Fixed bonus added successfully");
          await refetch();
          onModalClose();
        }
        setForm((prev) => ({
          ...prev,
          approved: "",
          employee: "",
          reason: "",
          payslip: "",
          amount: "",
        }));
      }

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
              Fixed Bonus
            </h2>
          </div>

          {loadingEmployeeList ? (
            <Spinner spinnerSmall={true} />
          ) : isError ? (
            <ErrorFetch
              message={error?.message || "error fetching form please try again"}
              onRefetch={() => refetchEmployee()}
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
                  <Label id="base-pay" className="block mb-1">
                    Amount
                  </Label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#333333] font-medium">
                        {getCurrencySymbol(
                          denominationData?.find(
                            (d) => d.id?.toString() === form?.pay_deno,
                          )?.code || "NGN",
                        )}
                      </span>
                      <input
                        id="amount"
                        type="text"
                        name="amount"
                        value={form?.amount || ""}
                        placeholder="Enter amount"
                        required
                        onChange={handleChange}
                        className={`font-poppinsRegular outline-[#51F4A6] text-black border-[#D7DEDD] border w-full pl-8 pr-3 py-3 text-sm rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none`}
                      />
                    </div>
                    <select
                      id="pay-deno"
                      name="pay_deno"
                      value={form?.pay_deno || ""}
                      onChange={handleChange}
                      className="w-[150px] border border-[#E0E0E0] rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none text-sm px-3 py-[14px] focus:outline-none focus:ring-1 focus:ring-[#E37915] focus:border-[#E37915]"
                    >
                      <option>Select</option>
                      {denominationData?.map((denomination) => (
                        <option key={denomination?.id} value={denomination?.id}>
                          {denomination?.code}
                        </option>
                      ))}
                    </select>
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
              {loading
                ? "Thinking...."
                : `${btnType === "edit" ? "Update Bonus" : "Add Bonus"} `}
            </Button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
};

export default FixedBonusModal;
