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
}

export interface Payslip {
  id: number;
  employee: Employee;
  debt: string;
  tax: string;
  net_pay: string;
  official_base_pay: number;
  bonus: number;
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
