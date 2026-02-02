const useStatusApproval = () => {
  const getStatusBadge = (
    status: string | undefined,
    hasDocument: boolean,
  ): { label: string; bgColor: string; textColor: string } => {
    // If no document uploaded yet
    if (!hasDocument) {
      return {
        label: "N/A",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
      };
    }

    // If document uploaded but not approved
    if (status === "pending") {
      return {
        label: "In Review",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
      };
    }

    // If document uploaded but not approved
    if (status === "reject" || status === "declined") {
      return {
        label: "rejected",
        bgColor: "bg-red-100",
        textColor: "text-red-700",
      };
    }

    // If approved
    if (status === "approve" || status === "approved") {
      return {
        label: "Approved",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
      };
    }

    // Default fallback
    return {
      label: status || "N/A",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    };
  };

  return { getStatusBadge };
};

export default useStatusApproval;
