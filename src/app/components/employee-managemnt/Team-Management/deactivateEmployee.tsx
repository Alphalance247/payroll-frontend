import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { useState } from "react";
import { dataDetails } from "@/app/utils/type";
import Image from "next/image";

const DeactivateEmployee = ({
  onCloseModal,
  employeeInfo,
}: {
  onCloseModal: () => void;
  employeeInfo: dataDetails;
}) => {
  const [comment, setComment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <ModalOverlay onClose={onCloseModal}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[616px] bg-[white] shadow-lg">
        <div className="pt-6 pb-4 pl-4 border-b">
          <h5 className="font-semibold text-[#2F2F33] text-xl tracking-[-0.5px] mb-2">
            Deactivate Employee
          </h5>
          <div className="flex gap-x-4 items-center">
            <Image
              src="/assets/employees-management/avatar.svg"
              height={24}
              width={24}
              alt="avatar"
            />
            <p className="text-[#71717A] text-base">
              {employeeInfo?.fullname || "Afolabi Joyner Judas"}
            </p>
          </div>
        </div>

        {!showConfirmation ? (
          <>
            <div className="p-4 text-[#2F2F33]">
              <p className="text-base font-semibold mb-2">Description</p>
              <p className="text-[15px] leading-5 mb-2">
                {" "}
                The following will occur:
              </p>
              <ul className="text-[15px] leading-5 flex flex-col gap-y-2 list-disc pl-6">
                {[
                  "This employee will be locked out of the system.",
                  "They will no longer appear in payroll, vault, or reporting.",
                  "Their previous records will remain accessible.",
                ].map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 px-4 pb-6">
              <p className="text-[#2F2F33] font-semibold text-base mb-4">
                Comment <span className="font-medium">(Optional)</span>{" "}
              </p>

              <textarea
                className="w-full min-h-[132px] text-[#71717A] rounded-md border border-[#BEBEC2] p-3 text-sm resize-vertical outline-none focus:border-blue-400"
                placeholder="Leave a note for product office..."
                value={comment || ""}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                name="teamdescription"
              />
            </div>
          </>
        ) : (
          <div className="pt-8 px-4 pb-7">
            <p className="text-sm text-[#2F2F33] font-semibold w-[60%]">
              Are you sure you want to deactivate “
              {employeeInfo?.fullname || "Afolabi Joyner Lucas"}”?
            </p>
            <p className="text-[#71717A] text-sm mt-2">
              This action cannot be undone
            </p>
          </div>
        )}

        <div className="flex items-center bg-[#F7F7F7] justify-end p-4 gap-x-4 rounded-br-lg rounded-bl-lg">
          <Button
            variant="secondary"
            className="w-fit"
            onButtonClick={onCloseModal}
          >
            Cancel
          </Button>
          <Button
            disabled={!showConfirmation && comment?.length === 0}
            className={`w-fit ${
              !showConfirmation && comment?.length === 0
                ? "cursor-not-allowed opacity-60"
                : ""
            }`}
            onButtonClick={() => {
              if (showConfirmation === false) {
                setShowConfirmation(true);
                console.log("yyyyyy");
              } else {
                // Handle actual deactivation here
                onCloseModal();
                console.log("nnnnn");
              }
            }}
          >
            {showConfirmation ? "Confirm" : "Deactivate"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DeactivateEmployee;
