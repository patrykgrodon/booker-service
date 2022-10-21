import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseButton from "common/components/CloseButton/CloseButton";
import { ServiceFormValues } from "modules/services/types";
import ServiceForm from "../ServiceForm/ServiceForm";

interface ServiceDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultService?: ServiceFormValues;
  id?: string;
}

const ServiceDialog = ({
  handleClose,
  isOpen,
  defaultService,
  id,
}: ServiceDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { position: "relative" } }}>
      <DialogTitle sx={{ paddingBottom: 0 }}>
        {!!defaultService ? "Edit" : "Add"} service
      </DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ minWidth: "500px", maxWidth: "500px" }}>
        <ServiceForm
          handleClose={handleClose}
          defaultService={defaultService}
          id={id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
