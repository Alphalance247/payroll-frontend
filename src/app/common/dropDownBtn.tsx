import { FaChevronDown } from "react-icons/fa6";

const DropDownBtn = ({
  onClick,
  className,
}: {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}) => {
  return (
    <div
      className={`px-4 py-[10px] border-[#E3E3E5] border rounded-md flex gap-x-2 items-center ${className}`}
      onClick={onClick}
    >
      <button className="font-medium flex items-center gap-x-2">
        <span className="text-[#71717A] ">Type</span>
        <span className="text-[#2F2F33]">Employees</span>
        <span>
          <FaChevronDown />
        </span>
      </button>
    </div>
  );
};

export default DropDownBtn;
