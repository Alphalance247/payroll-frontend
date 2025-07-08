"use client";
import ModalOverlay from "@/app/common/modal/modal";
import Button from "@/app/common/Button";
import { useState } from "react";
import axiosInstance from "@/app/utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const DeleteTeam = ({
  onCloseModal,
  teamName,
  teamId,
}: {
  onCloseModal: () => void;
  teamName: string;
  teamId: string;
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeactivation = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(`/employees/teams/${teamId}`);

      if (res.status === 200) {
        toast.success("Team Successfully deleted Redirecting....");
        router.push("/employee-management/team-management");
      }

      onCloseModal();
      setLoading(false);
    } catch (err) {
      // Extract the error message from the response
      let errorMessage = "An error occurred please try again or contact Admin";
      if (err instanceof AxiosError) {
        // Check if err is an instance of AxiosError
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  return (
    <ModalOverlay onClose={onCloseModal}>
      <div className="border border-[#E3E3E5] rounded-lg relative z-50 w-[616px] bg-[white] shadow-lg">
        <div className="pt-6 pb-4 pl-4 border-b">
          <h5 className="font-semibold text-[#2F2F33] text-xl tracking-[-0.5px] mb-2">
            Delete Team
          </h5>

          <p className="text-[#71717A] text-base">
            {teamName || "Quality Assurance"}
          </p>
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
                  "All team members will be unassigned from this team.",
                  "Any scheduled tasks or workflows associated with this team will be canceled.",
                  "You will no longer see this team on reports, dashboards, or team filters.",
                ].map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="pt-8 px-4 pb-7">
            <p className="text-sm text-[#2F2F33] font-semibold w-[60%]">
              Are you sure you want to delete Team “
              {teamName || "Quality Assurance"}”?
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
            className="w-fit"
            variant="danger"
            onButtonClick={() => {
              if (showConfirmation === false) {
                setShowConfirmation(true);
              } else {
                handleDeactivation();
              }
            }}
          >
            {showConfirmation
              ? loading
                ? "Deleting..."
                : "Yes, Delete"
              : "Delete"}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DeleteTeam;
