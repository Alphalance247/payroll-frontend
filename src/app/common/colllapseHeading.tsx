import { FaChevronDown } from "react-icons/fa";

const CollapseHeading = ({
  text,
  withOutline = false,
}: {
  text: string;
  withOutline?: boolean;
}) => {
  return (
    <div
      className={`p-6 ${withOutline && "border-t-[6px] border-[#E3E3E5] "} `}
    >
      <h4 className="flex items-center gap-x-2 text-lg font-medium text-[#2F2F33]">
        <span className="cursor-pointer">
          <FaChevronDown size={20} />
        </span>{" "}
        {text}
      </h4>
    </div>
  );
};

export default CollapseHeading;
