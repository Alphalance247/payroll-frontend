import { ReactNode } from "react";

type buttonVariant = "primary" | "secondary";

// type buttonSize = "small" | "medium" | "large" | "switch";

interface buttonProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: buttonVariant;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<buttonProps> = ({
  children,
  className,
  variant = "primary",
}) => {
  const buttonColor = {
    primary: "text-[white] bg-[#E37915]",
    secondary: "",
  };
  return (
    <button
      className={`text-sm px-3 py-2 font-Graphik font-semibold rounded-md ${className} ${buttonColor[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
