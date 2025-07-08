interface subHeadProps {
  withSubHead: boolean;
  heading?: string;
  subHead?: string;
  headingClassName?: string;
  subHeadClassName?: string;
}

const HeadingSubHead: React.FC<subHeadProps> = ({
  withSubHead,
  heading,
  subHead,
  headingClassName,
  subHeadClassName,
}) => {
  return (
    <>
      <h2
        className={` font-Graphik font-semibold text-[#2F2F33] mb-2 ${
          headingClassName || "text-xl"
        }`}
      >
        {heading || "Good afternoon, James"}
      </h2>
      {withSubHead && (
        <p
          className={` font-Graphik text-[#71717A] tracking-[-0.5px] ${
            subHeadClassName || "text-base"
          }`}
        >
          {subHead || "Wednesday, 20 February, 2024"}
        </p>
      )}
    </>
  );
};

export default HeadingSubHead;
