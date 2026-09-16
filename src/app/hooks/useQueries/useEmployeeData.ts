import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface data {
  id: string;
  email: string;
  fullname: string;
  job_role: string;
  job_type: string;
  country: string;
  client_bonus_rate?: string;
  team: {
    name: string;
  };
}

interface dataType {
  employees: data[];
}

const fetchEmployeeData = async () => {
  const res = await axiosInstance.get<dataType | null>("/employees");

  return res.data;
};

export const useEmployeeListData = () => {
  return useQuery<dataType | null, AxiosError>({
    queryKey: ["employee-list"],
    queryFn: fetchEmployeeData,
    staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
    retry: 1,
  });
};
