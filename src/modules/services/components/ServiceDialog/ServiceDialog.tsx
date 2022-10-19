import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseButton from "common/components/CloseButton/CloseButton";
import ServiceForm from "../ServiceForm/ServiceForm";

interface ServiceDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ServiceDialog = ({ handleClose, isOpen }: ServiceDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{ sx: { position: "relative" } }}>
      <DialogTitle sx={{ paddingBottom: 0 }}>Add service</DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ minWidth: "500px", maxWidth: "500px" }}>
        <ServiceForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
