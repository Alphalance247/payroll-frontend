import { ReactNode } from "react";

type buttonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "primaryWhite"
  | "pluginDisconnect";

// type buttonSize = "small" | "medium" | "large" | "switch";

interface buttonProps {
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: buttonVariant;
  className?: string;
  disabled?: boolean;
  onButtonClick?: () => void;
}

const Button: React.FC<buttonProps> = ({
  children,
  className,
  variant = "primary",
  onButtonClick,
  disabled,
}) => {
  const buttonColor = {
    primary: "text-[white] bg-[#E37915]",
    primaryWhite: "text-[#71717A] bg-[white] border border-[#E3E3E5]",
    secondary: "bg-[#F1F1F2] text-[#2F2F33] border border-[#E3E3E5]",
    tertiary: "bg-[#FCF2E8] text-[#CF6E13]",
    danger: "bg-[#EC221F] text-[#FEE9E7]",
    pluginDisconnect: "bg-[white] border-[#E3E3E5] border text-[#EF4444]",
  };
  return (
    <button
      className={`text-sm px-3 py-2 font-Graphik font-semibold rounded-md ${className} ${buttonColor[variant]}`}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
