import { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button className="text-sm px-3 py-2 text-[#2F2F33] font-Graphik font-medium border-[#E3E3E5] border rounded-md">
      {children}
    </button>
  );
};

export default Button;
