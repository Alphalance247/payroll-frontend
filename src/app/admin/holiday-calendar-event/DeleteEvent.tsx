import React from "react";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
const DeleteEvent = () =>
  // { onModalClose }: { onModalClose: () => void }
  {
    const handleSubmit = () => {
      console.log("submit");
    };
    return (
      // <ModalOverlay onClose={onModalClose}>
      <div className="w-[475px] h-[186px] border-[1px] border-[#E3E3E5] rounded-[8px] bg-white relative  z-50   shadow-lg mt-20  ">
        <div className="px-4  py-5 grid gap-y-2">
          <div className="text-large text-[#2F2F33] font-semibold font-Graphik">
            Delete Event
          </div>
          <p className="text-sm text-[#2F2F33] font-normal font-Graphik">
            You’re about to delete the{" "}
            <span className="font-medium">Cloud Connect </span> event <br />{" "}
            This can’t be undone. Are you sure you want to proceed?
          </p>
        </div>
        <div className="flex justify-end items-center  bg-[#F7F7F7] h-[68px] border-t border-[#D3D3D6] mt-1 px-4 rounded-b-[8px]">
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              className="w-[96px] text-[#2F2F33] text-sm font-semibold font-Graphik"
              onButtonClick={() => handleSubmit()}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="w-[133px] text-[#F7F7F7] text-sm font-semibold font-Graphik"
              onButtonClick={() => handleSubmit()}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      // </ModalOverlay>
    );
  };

export default DeleteEvent;
