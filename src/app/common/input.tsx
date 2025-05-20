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
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  className,
  id,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required
      onChange={onChange}
      className={` font-poppinsRegular outline-[#51F4A6] text-black border-[#D7DEDD] border w-full  p-3 text-sm rounded-lg ${className}`}
    />
  );
};

export default Input;
