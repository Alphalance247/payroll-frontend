import Image from "next/image";

const PayrollCardMain = ({
  icon,
  label,
  value,
  unit,
  id,
}: {
  icon: string;
  label: string;
  value: string;
  unit: string;
  id: string;
}) => {
  return (
    <div className="flex gap-4 items-start border-r" key={id}>
      <Image src={icon} alt={label} width={40} height={40} />
      <div className="">
        <p className="text-sm text-[#71717A] font-medium mb-2">{label}</p>
        <p className="text-lg font-medium text-[#2F2F33] tracking-[-0.5px] mb-2">
          {value}
          {unit && <span className="font-normal text-base"> {unit}</span>}
        </p>

        {/* {item.hasEdit && (
            <button
              onClick={item.onEdit}
              className="text-orange-500 text-sm flex items-center gap-1 hover:text-orange-600 transition-colors"
            >
              Edit <FaEdit size={14} />
            </button>
          )} */}
      </div>
    </div>
  );
};

export default PayrollCardMain;
