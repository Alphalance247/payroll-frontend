import { PayrollProvider } from "../context/payrollContext";
import { ReactNode } from "react";

export default function PayrollLayout({ children }: { children: ReactNode }) {
  return <PayrollProvider>{children}</PayrollProvider>;
}
