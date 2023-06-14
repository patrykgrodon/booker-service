import { useState } from "react";

import { ConfirmationDialog } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { deleteVisit } from "modules/visits/api";

type DeleteVisitConfirmationDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  visitId: string;
  onDeleteSuccess: () => void;
};

const DeleteVisitConfirmationDialog = ({
  handleClose,
  isOpen,
  visitId,
  onDeleteSuccess,
}: DeleteVisitConfirmationDialogProps) => {
  const { setErrorMessage } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteVisit(visitId);
      onDeleteSuccess();
    } catch (err: any) {
      setErrorMessage("Error while deleteting visit. Try again!");
    }
    setIsLoading(false);
  };
  return (
    <ConfirmationDialog
      title="Delete visit"
      text="Are you sure that you want to delete the visit?"
      mainButtonText="Delete"
      type="error"
      open={isOpen}
      isLoading={isLoading}
      handleClick={handleDelete}
      handleClose={handleClose}
    />
  );
};

export default DeleteVisitConfirmationDialog;
