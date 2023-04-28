import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { CloseButton } from "common/components";
import { ServiceFormValues } from "modules/services/types";
import { ServiceForm } from ".";

type ServiceFormDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  formValues?: ServiceFormValues;
  id?: string;
};

const ServiceFormDialog = ({
  isOpen,
  handleClose,
  onSuccess,
  formValues,
  id,
}: ServiceFormDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { position: "relative" } }}
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>
        {id ? "Edit" : "Add"} service
      </DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent>
        <ServiceForm onSuccess={onSuccess} formValues={formValues} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormDialog;
