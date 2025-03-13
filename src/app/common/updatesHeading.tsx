import Image from "next/image";

const UpdateHeading = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center gap-x-2 py-4 pl-6 border-b border-[#E3E3E5]">
      <Image
        src="/assets/compliance/update.svg"
        width={32}
        height={32}
        alt="update"
      />
      <p className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%]">
        {text || "Updates"}
      </p>
    </div>
  );
};

export default UpdateHeading;
