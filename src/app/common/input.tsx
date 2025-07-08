import React from "react";

interface InputProps {
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  variant?: string;
  withWidth?: boolean;
  readonly?: boolean;
  id?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  id,
  readonly = false,
  disabled,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      readOnly={readonly}
      required
      onChange={onChange}
      disabled={disabled}
      className={` font-poppinsRegular ${
        readonly
          ? "outline-none bg-gray-200 cursor-not-allowed"
          : "outline-[#51F4A6]"
      } text-black border-[#D7DEDD] border w-full  p-3 text-sm rounded-lg ${className} ${
        disabled ? "bg-gray-200 cursor-not-allowed" : ""
      }`}
    />
  );
};

export default Input;
