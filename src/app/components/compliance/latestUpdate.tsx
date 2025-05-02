import Image from "next/image";

const LatestUpdate = () => {
  return (
    <section className="mt-10 mb-6">
      <h3 className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-5">
        Updates
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 flex flex-col gap-x-4 bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
          <Image
            src="/assets/compliance/3.png"
            width={226}
            height={162}
            alt="uphold"
          />

          <div className="mt-4">
            <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
              FIRS Update
            </p>
            <p className="text-[#71717A] text-[15px] font-Graphik mb-2">
              PAYE tax must be remitted by the 10th of every month. Late
              payments attract..
            </p>
            <button className="py-[6px] text-[#E37915] font-semibold">
              Learn More
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-x-4 bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
          <Image
            src="/assets/compliance/3.png"
            width={226}
            height={162}
            alt="uphold"
          />

          <div className="mt-4">
            <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
              FIRS Update
            </p>
            <p className="text-[#71717A] text-[15px] font-Graphik">
              PAYE tax must be remitted by the 10th of every month. Late
              payments attract..
            </p>
            <button className="py-[6px] text-[#E37915] font-semibold">
              Learn More
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-x-4 bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
          <Image
            src="/assets/compliance/3.png"
            width={226}
            height={162}
            alt="uphold"
          />

          <div className="mt-4">
            <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
              FIRS Update
            </p>
            <p className="text-[#71717A] text-[15px] font-Graphik">
              PAYE tax must be remitted by the 10th of every month. Late
              payments attract..
            </p>
            <button className="py-[6px] text-[#E37915] font-semibold">
              Learn More
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-x-4 bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px]">
          <Image
            src="/assets/compliance/3.png"
            width={226}
            height={162}
            alt="uphold"
          />

          <div className="mt-4">
            <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
              FIRS Update
            </p>
            <p className="text-[#71717A] text-[15px] font-Graphik">
              PAYE tax must be remitted by the 10th of every month. Late
              payments attract..
            </p>
            <button className="py-[6px] text-[#E37915] font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdate;
