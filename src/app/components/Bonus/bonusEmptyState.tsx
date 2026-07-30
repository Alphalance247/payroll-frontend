import Button from "@/app/common/Button";
import { Gift, Plus } from "lucide-react";

const BonusEmptyState = ({
  setModalMode,
}: {
  setModalMode: (mode: "add") => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 gap-4">
      <div className="w-14 h-14 rounded-full bg-[#F7F7F7] flex items-center justify-center">
        <Gift size={26} strokeWidth={1.5} className="text-[#71717A]" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center max-w-[320px]">
        <p className="text-sm font-semibold text-[#2F2F33]">
          You&apos;re all caught up
        </p>
        <p className="text-sm text-[#71717A]">
          There are no bonus records waiting for review. New calculated bonuses
          will appear here automatically, or you can create a manual bonus.
        </p>
      </div>
      <Button
        variant="secondary"
        onButtonClick={() => setModalMode("add")}
        className="flex items-center gap-1.5 text-sm font-medium text-[#2F2F33] border border-[#E3E3E5] rounded-lg px-3 py-2 hover:bg-[#F7F7F7] transition-colors"
      >
        <Plus size={14} strokeWidth={2.5} />
        Add Bonus
      </Button>
    </div>
  );
};

export default BonusEmptyState;
