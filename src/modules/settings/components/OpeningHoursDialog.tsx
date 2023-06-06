import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CloseButton } from "common/components";
import { OpeningHours } from "../types";
import OpeningHoursForm from "./OpeningHoursForm";

type OpeningHoursDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  openingHours: OpeningHours;
  refetch: () => void;
};

const OpeningHoursDialog = ({
  isOpen,
  handleClose,
  openingHours,
  refetch,
}: OpeningHoursDialogProps) => {
  const onSuccess = () => {
    refetch();
    handleClose();
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Set opening hours</DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent>
        <OpeningHoursForm openingHours={openingHours} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default OpeningHoursDialog;
