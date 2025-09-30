// stores/usePayrollStore.ts
import { create } from "zustand";
import axiosInstance from "@/app/utils/axios";
import { AxiosError } from "axios";

interface employeeYearlyPayrollDataStore {

  data: {
    totals: {
      total_base_salary: number;
      total_bonus: number;
      total_deductions: number;
    };
    year: string;
    months: {
      total_base_salary: string;
      total_bonus: string;
      total_deductions: string;
      month: string;
    }[];
  }[];

  current_data: {
    months: {
      month: string;
      total_base_salary: string;
      total_bonus: string;
      total_deductions: string;
    }[];

    totals: {
      total_base_salary: number;
      total_bonus: number;
      last_payment: string;
    };
  };
}

// interface MonthData {
//   month: string;
//   total_base_salary: number;
//   total_bonus: number;
//   total_deductions: number;
// }

// interface YearData {
//   year: number;
//   totals: {
//     total_base_salary: number;
//     total_bonus: number;
//     total_deductions: number;
//     last_payment: number | null;
//   };
//   months: MonthData[];
// }

interface employeeYearlyPayrollListStore {
  data: employeeYearlyPayrollDataStore | null;
  // data: {
  //   data: YearData[];
  //   current_data: YearData | null;
  // } | null;
  loading: boolean;
  error: string | null;
  fetchEmployeeYearlyPayroll: () => Promise<void>;
}

export const getEmployeeYearlyPayroll = create<employeeYearlyPayrollListStore>(
  (set) => ({
    data: null,
    loading: false,
    error: null,

    fetchEmployeeYearlyPayroll: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.get(
          `/employees/my-yearly-employee-payroll`
        );
        // const reshaped = res.data.map((item: any) => ({
        //   year: item.year,
        //   totals: {
        //     total_base_salary: item.totals.total_base_salary,
        //     total_bonus: item.totals.total_bonus,
        //     total_deductions: item.totals.total_deductions,
        //     last_payment: item.totals.last_payment,
        //   },
        //   months: item.months.map((m: any) => ({
        //     month: m.month,
        //     total_base_salary: m.total_base_salary,
        //     total_bonus: m.total_bonus,
        //     total_deductions: m.total_deductions,
        //   })),
        // }));
        set({ data: res.data, loading: false });
      } catch (err) {
        if (err instanceof AxiosError) {
          set({ error: err.message, loading: false });
        }
      }
    },
  })
);
