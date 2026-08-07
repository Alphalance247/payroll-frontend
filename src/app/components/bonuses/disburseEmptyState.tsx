import { Wallet } from "lucide-react";

const DisburseEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 gap-4">
      <div className="w-14 h-14 rounded-full bg-[#F7F7F7] flex items-center justify-center">
        <Wallet size={26} strokeWidth={1.5} className="text-[#71717A]" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center max-w-[320px]">
        <p className="text-sm font-semibold text-[#2F2F33]">
          Nothing to disburse yet
        </p>
        <p className="text-sm text-[#71717A]">
          Bonuses will show up here once they&apos;ve been approved and are
          ready for payment.
        </p>
      </div>
    </div>
  );
};

export default DisburseEmptyState;
