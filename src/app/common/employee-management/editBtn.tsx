import { HiOutlinePencil } from "react-icons/hi";
const EditBtn = ({ onEditButtutton }: { onEditButtutton: () => void }) => {
  return (
    <button
      onClick={onEditButtutton}
      className="text-orange-500 text-base font-medium underline underline-offset-2 flex items-center gap-1 hover:text-orange-600 transition-colors"
    >
      Edit <HiOutlinePencil size={14} />
    </button>
  );
};

export default EditBtn;
