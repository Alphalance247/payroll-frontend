import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const DropDownBtn = ({
  className,
  selectedValue,
  subText,
  width,
  options,
  onSelectOption,
  placeholder,
}: {
  className?: string;
  subText: string;
  width?: string;
  selectedValue: string;
  options: string[];
  onSelectOption: (value: string) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className={`px-4 py-[10px] border-[#E3E3E5] h-[44px] border rounded-md flex gap-x-2 items-center ${className} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <button className={`font-medium flex items-center gap-x-2 ${width}`}>
          <span className="text-[#71717A] text-sm">{subText}</span>
          <span className="text-[#2F2F33] text-base">
            {selectedValue || placeholder}
          </span>
          <span>
            <FaChevronDown className="w-4 h-4" />
          </span>
        </button>
      </div>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-[white] border border-[#ccc]  rounded-md shadow-md z-10 list-[none] mt-2">
          {options.map((option, index) => (
            <div
              className="py-3 px-4 cursor-pointer hover:bg-[#f4f4f4]"
              key={index}
            >
              <li
                key={index}
                className=""
                onClick={() => {
                  onSelectOption(option);
                  setIsOpen(!open);
                }}
              >
                {option}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownBtn;
