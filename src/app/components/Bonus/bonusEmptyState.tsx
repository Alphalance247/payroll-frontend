import Button from "@/app/common/Button";
import { Gift, Plus } from "lucide-react";

const BonusEmptyState = ({
  setModalMode,
  title = "No bonus records found",
  subtitle = "There are no bonus records to display.",
}: {
  setModalMode?: (mode: "add") => void;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 gap-4">
      <div className="w-14 h-14 rounded-full bg-[#F7F7F7] flex items-center justify-center">
        <Gift size={26} strokeWidth={1.5} className="text-[#71717A]" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center max-w-[320px]">
        <p className="text-sm font-semibold text-[#2F2F33]">{title}</p>
        <p className="text-sm text-[#71717A]">{subtitle}</p>
      </div>
      {setModalMode && (
        <Button
          variant="secondary"
          onButtonClick={() => setModalMode("add")}
          className="flex items-center gap-1.5 text-sm font-medium text-[#2F2F33] border border-[#E3E3E5] rounded-lg px-3 py-2 hover:bg-[#F7F7F7] transition-colors"
        >
          <Plus size={14} strokeWidth={2.5} />
          Add Bonus
        </Button>
      )}
    </div>
  );
};

export default BonusEmptyState;
