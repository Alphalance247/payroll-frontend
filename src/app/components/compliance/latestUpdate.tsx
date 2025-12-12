import { getComplianceCardStore } from "@/stores/compliance/getComplianceCard";
import Link from "next/link";

const LatestUpdate = () => {
  const { data } = getComplianceCardStore();

  return (
    <section className="mt-10 mb-6">
      <h3 className="text-base font-Graphik text-[#2F2F33] font-semibold tracking-[-0.3%] mb-5">
        Updates
      </h3>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Link href={`/admin/compliance/${item?.id}`} key={item?.id}>
            <div className="p-4 flex flex-col gap-x-4 bg-[#F7F7F7] border border-[#E3E3E5] rounded-[8px] h-full max-h-[321px]">
              <img
                src={item?.list_image}
                width={226}
                height={162}
                alt="uphold"
                className="w-full h-[182px] rounded-md"
              />

              <div className="mt-4">
                <p className="text-base font-Graphik text-[#2F2F33] font-semibold mb-1">
                  {item?.title}
                </p>
                <div className="text-[#71717A] text-[15px] font-Graphik mb-2">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${item?.content.slice(0, 120)}....`,
                    }}
                  />{" "}
                </div>
                <button className="py-[6px] text-[#E37915] font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestUpdate;
