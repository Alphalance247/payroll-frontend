import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";
interface EmployeeDetailsState {
    data: {
        fullname: string,
        employee_id: string,
        email: string,
        phone: string,
        dob: string,
        country: string,
        prof_img: string,
        street_address: string,
        city: string,
        state: string,
        job_role: string,
        job_type: string,
        team: {
            name: string,
        },
        nok: {
            name: string,
            phone: string,
            country: string,
            relationship: string,
            city: string,
            email: string
        },
        status: string,
        start_date: string,
        bank_name: string,
        bank_code: string,
        acct_name: string,
        acct_num: string,
        nok_name: string,
        nok_address: string,
        nok_phone: string,
        postal_code: string,
    }
}
interface EmployeePersonalDetails {
    employeeData: EmployeeDetailsState | null;
    error: string | null;
    loading: boolean;
    fetchPersonalDetails: () => Promise<void>;
}

export const UseEmployeeStore = create<EmployeePersonalDetails>((set) => ({
    employeeData: null,
    error: "",
    loading: false,
    fetchPersonalDetails: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axiosInstance.get<EmployeeDetailsState>("/employees/employee/my-profile");
            set({
                employeeData: res.data, loading: false
            }

            );
            console.log(res.data);

        } catch (err) {
            if (err instanceof AxiosError) {
                set({ error: err.message, loading: false });
            }
            else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },
}));



