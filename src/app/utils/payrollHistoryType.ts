export interface payrollRate {
  id: number;
  code: string;
  official_rate: number;
}

export interface payslipData {
  id: string;
  net_pay: string;
  tax: string;
  debt: string;
  gross_pay: string;
  status: string;
  official_base_pay: number;
  employee: {
    fullname: string;
    team: {
      name: string;
    };
  };
}

export interface PayrollTransferData {
  id: string;
  payslip: payslipData;
  status: string;
  created_at: string;
}

export interface PayrollHistoryTranferData {
  id: string;
  teams: string[];
  payroll: {
    id: number;
    approved_by: {
      fullname: string;
    };
    total_payout: string;
    payday: string;
    total_hours: string;
    total_tax: string;
    rates: payrollRate[];
  };
  transfer_data: PayrollTransferData[];
}
