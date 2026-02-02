import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
import { employeeDetailsData } from "@/app/utils/type";

// interface data {
//   data: employeeDetailsData;
// }

const fetchEmployeeDataDetails = async (id: string | number) => {
  const res = await axiosInstance.get<employeeDetailsData | null>(
    `/employees/employee/${id}`,
  );

  return res.data;
};

export const useEmployeeDataDetails = ({
  id,
}: {
  id: string | number | null;
}) => {
  return useQuery<employeeDetailsData | null, AxiosError>({
    queryKey: ["employee-data-details", id], // shared global key
    queryFn: () => fetchEmployeeDataDetails(id!), // your Axios call
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!id,
  });
};
