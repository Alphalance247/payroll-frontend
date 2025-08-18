import Image from "next/image";

const OverviewCard = ({
  label,
  image,
  value,
}: {
  label: string;
  image: string;
  value: string;
}) => {
  return (
    <div className="bg-[white] border border-[#E3E3E5] rounded-lg py-3 px-4">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8">
          <Image
            src={image || "/assets/employee-dashboard/home/people.svg"}
            alt={label}
            width={40}
            height={40}
          />
        </div>
        <div>
          <p className="text-sm text-[#71717A]">{label}</p>
          <p className="font-semibold mt-1 text-lg text-[#2F2F33]">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
