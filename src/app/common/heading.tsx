"use client";
interface subHeadProps {
  heading?: string;
  subHead?: string;
  flexDirection: string;
  user: string;
  subHeadClassName?: string;
  withGap?: boolean;
}

const Heading: React.FC<subHeadProps> = ({
  subHead,
  flexDirection,
  user,
  subHeadClassName,
  withGap = true,
}) => {
  return (
    <div
      className={`${
        flexDirection === "column" ? "flex-col" : "flex-col-reverse"
      } flex ${withGap ? "gap-y-4" : "gp-y-0"}`}
    >
      <h2
        className={`font-Graphik font-semibold text-[2rem] leading-[2.5rem] tracking-[-1px] text-[#2F2F33] mb-2`}
      >
        {`${user}`}
      </h2>
      <p
        className={`font-Graphik text-base text-[#71717A] tracking-[-0.5px] ${subHeadClassName}`}
      >
        {subHead}
      </p>
    </div>
  );
};

export default Heading;
