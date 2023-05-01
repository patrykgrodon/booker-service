import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { CloseButton } from "common/components";
import { EmployeeFormValues } from "modules/employees/types";
import { EmployeeForm } from ".";

type EmployeeFormDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  formValues?: EmployeeFormValues;
  id?: string;
};

const EmployeeFormDialog = ({
  isOpen,
  handleClose,
  onSuccess,
  formValues,
  id,
}: EmployeeFormDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { position: "relative" } }}
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>
        {id ? "Edit" : "Add"} employee
      </DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent>
        <EmployeeForm onSuccess={onSuccess} formValues={formValues} id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeFormDialog;
