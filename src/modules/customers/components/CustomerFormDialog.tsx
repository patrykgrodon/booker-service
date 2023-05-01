import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { CloseButton } from "common/components";
import { CustomerFormValues } from "modules/customers/types";
import { CustomerForm } from ".";

type CustomerFormDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  formValues?: CustomerFormValues;
  id?: string;
};

const CustomerFormDialog = ({
  isOpen,
  handleClose,
  onSuccess,
  formValues,
  id,
}: CustomerFormDialogProps) => {
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
        <CustomerForm onSuccess={onSuccess} formValues={formValues} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
