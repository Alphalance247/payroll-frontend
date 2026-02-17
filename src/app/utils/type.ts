// types.ts
export interface Employee {
  ticket_id: string | null;
  acct_id: string | null;
  fullname: string;
  team: {
    bg_color: string;
    border_color: string;
    name: string;
  };
  acct_num: string;
  bank_name: string;
  currency: string;
  base_pay: number;
  pay_deno: string;
  employee_id: string;
}

export interface Payslip {
  id: number;
  employee: Employee;
  debt: string;
  tax: string;
  net_pay: string;
  official_base_pay: number;
  bonus: number;
  rent: string;
  pension: string;
  nhf: string;
  nhis: string;
  total_hours: string;
  main_hours: string;
}

export interface payrollRate {
  id: number;
  code: string;
  official_rate: number;
}

export interface PayrollData {
  id: number;
  total_payout: string;
  total_bonus: string;
  total_hours: string;
  approved_state: string;
  total_tax: number;
  total_salary: number;
  approved_by: {
    fullname: string;
    id: number;
  };
  payday: string;
  payment_method: string;
  total_debt: number;
  payslips: Payslip[];
  reviewers_list: number[];
  rates: payrollRate[];
  run_by_id: number;
  run_by: {
    fullname: string;
    id: number;
  };
}

export interface PayrollResponse {
  message: string;
  data: PayrollData;
  task_id: string;
}

export interface TeamData {
  id: number;
  name: string;
}

export interface DenominationData {
  id: number;
  code: string;
  name: string;
}

export interface BankData {
  id: number;
  name: string;
  code: string;
}

export interface dataDetails {
  id: string;
  fullname: string;
  email: string;
  dob: string;
  employee_id: string;
  phone: string;
  country: string;
  postal_code: string;
  status: string;
  street_address: string;
  base_pay: string;
  city: string;
  tax_id: string;
  rent_approve_status: string;
  rent_approved: boolean;
  rent_amount: string;
  rent_doc: string;
  pay_deno: string;
  state: string;
  nok_name: string;
  nok_phone: string;
  nok_address: string;
  job_type: string;
  job_role: string;
  team: {
    name: string;
  };
  start_date: string;
}

export interface dataDetails {
  name: string;
  id: string;
  description: string;
  members: [
    {
      name: string;
      email: string;
      Type: string;
      status: string;
      role: string;
      id: string;
    },
  ];
}

export interface employeeDetailsData {
  data: dataDetails;
}
