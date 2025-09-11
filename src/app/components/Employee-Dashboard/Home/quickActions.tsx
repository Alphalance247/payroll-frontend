import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";

const QuickActions = () => {
  const data = [
    {
      name: "Request a Loan",
      link: "/employee/loan-request",
    },
    {
      name: "Raise a Query",
      link: "/employee/query",
    },
    {
      name: "Request a Leave",
      link: "/employee/leave-request",
    },
    {
      name: "View Pay slip",
      link: "/employee/payroll",
    },
  ];
  return (
    <section className="mt-10">
      <div className="bg-[white] border border-[#E3E3E5] rounded-lg">
        <p className="text-base text-[#2F2F33] pl-4 py-6 border-b border-[#E3E3E5]">
          Quick Actions
        </p>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.map((item, i) => (
            <Link href={item?.link || ""} passHref key={i}>
              <div className="p-6 bg-[#F7F7F7] border border-[#E3E3E5] rounded-lg">
                <MdOutlinePayment size={20} fill="#009BC0" />
                <div className="flex gap-x-2 mt-4">
                  <p className="text-[#009BC0] text-[15px] tracking-[-0.3px] font-medium">
                    {item?.name}
                  </p>
                  <GoArrowRight size={20} fill="#009BC0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
