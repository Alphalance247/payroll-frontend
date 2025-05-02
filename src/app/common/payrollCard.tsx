const PayrollCard = ({
  heading,
  subhead,
}: {
  heading: string;
  subhead: string;
}) => {
  return (
    <div className="p-4 bg-[#F7F7F7] rounded-xl border border-[#E3E3E5]">
      <p
        className={`font-Graphik font-semibold text-[#71717A]  text-[13px] mb-4`}
      >
        {heading}
        {/* {el?.heading} */}
      </p>
      <h5 className={` font-Graphik font-semibold text-[#2F2F33] text-lg`}>
        {subhead}
        {/* {el?.subhead} */}
      </h5>
    </div>
  );
};

export default PayrollCard;
