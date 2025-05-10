// types.ts
export interface Employee {
  ticket_id: string | null;
  acct_id: string | null;
  fullname: string;
  team: string;
  acct_num: string;
  bank_name: string;
  currency: string;
}

export interface Payslip {
  id: number;
  employee: Employee;
  debt: string;
  tax: string;
  net_pay: string;
}

export interface PayrollData {
  id: number;
  total_payout: string;
  total_bonus: string;
  total_hours: string;
  approved_state: string;
  approved_by: string;
  payday: string;
  payment_method: string;
  payslips: Payslip[];
  rate: number;
  run_by: {
    fullname: string;
    id: number;
  };
}

export interface PayrollResponse {
  message: string;
  data: PayrollData;
}
