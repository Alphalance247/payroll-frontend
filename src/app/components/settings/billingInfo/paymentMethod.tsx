import Button from "@/app/common/Button";
import Image from "next/image";

const PaymentMethod = () => {
  return (
    <section className="mt-10 ">
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-[#E3E3E5]">
          <div className="flex justify-between gap-x-4 items-start">
            <div className="flex gap-x-2">
              <Image
                src="/assets/settings/Mastercard.png"
                width={70}
                height={48}
                alt="mastercard"
              />
              <div>
                <p className="text-[#2F2F33] text-base font-semibold">
                  1234 **** 0945
                </p>
                <p className="text-[#71717A] text-sm font-medium">
                  Expires 10/27
                </p>
              </div>
            </div>
            <p className="bg-[#E7E9EA] text-[#0C1720] text-xs font-medium py-[2px] px-2 rounded-2xl">
              Default
            </p>
          </div>
          <div className="mt-5 flex gap-x-7 text-sm font-semibold">
            <button className="text-[#71717A]">Set as Default</button>
            <button className=" text-[#EF4444]">Delete</button>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#E3E3E5]">
          <div className="flex justify-between gap-x-4 items-start">
            <div className="flex gap-x-2">
              <Image
                src="/assets/settings/Mastercard.png"
                width={70}
                height={48}
                alt="mastercard"
              />
              <div>
                <p className="text-[#2F2F33] text-base font-semibold">
                  1234 **** 0945
                </p>
                <p className="text-[#71717A] text-sm font-medium">
                  Expires 10/27
                </p>
              </div>
            </div>
            <p className="bg-[#E7E9EA] text-[#0C1720] text-xs font-medium py-[2px] px-2 rounded-2xl">
              Default
            </p>
          </div>
          <div className="mt-5 flex gap-x-7 text-sm font-semibold">
            <button className="text-[#71717A]">Set as Default</button>
            <button className=" text-[#EF4444]">Delete</button>
          </div>
        </div>
      </div>

      <Button variant="primary" className="mt-10">
        Add Payment Method
      </Button>
    </section>
  );
};

export default PaymentMethod;
