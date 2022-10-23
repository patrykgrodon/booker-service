import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseButton from "common/components/CloseButton/CloseButton";
import { useUserSettings } from "common/providers/UserSettingsProvider";
import { ServiceFormValues } from "modules/services/types";
import OpeningHoursForm from "../OpeningHoursForm/OpeningHoursForm";
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
  const { userSettings } = useUserSettings();

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
        {userSettings?.openingHours ? (
          <ServiceForm
            handleClose={handleClose}
            defaultService={defaultService}
            id={id}
          />
        ) : (
          <OpeningHoursForm handleClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
