import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { CloseButton } from "common/components";
import { VisitFormValues } from "../types";
import VisitForm from "./VisitForm";

type VisitFormDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  formValues?: Partial<VisitFormValues>;
  id?: string;
};

const VisitFormDialog = ({
  isOpen,
  handleClose,
  onSuccess,
  formValues,
  id,
}: VisitFormDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { position: "relative" } }}
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>
        {id ? "Edit" : "Add"} visit
      </DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent>
        <VisitForm onSuccess={onSuccess} formValues={formValues} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default VisitFormDialog;
