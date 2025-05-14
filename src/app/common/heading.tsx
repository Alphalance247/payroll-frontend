"use client";
interface subHeadProps {
  heading?: string;
  subHead?: string;
  flexDirection: string;
  user: string;
}

const Heading: React.FC<subHeadProps> = ({ subHead, flexDirection, user }) => {
  return (
    <div
      className={`${
        flexDirection === "column" ? "flex-col" : "flex-col-reverse"
      } flex gap-y-4`}
    >
      <h2
        className={`font-Graphik font-semibold text-[2rem] leading-[2.5rem] tracking-[-1px] text-[#2F2F33] mb-2`}
      >
        {`Good afternoon, ${user}`}
      </h2>
      <p className={` font-Graphik text-base text-[#71717A] tracking-[-0.5px]`}>
        {subHead || "Wednesday, 20 February, 2024"}
      </p>
    </div>
  );
};

export default Heading;
