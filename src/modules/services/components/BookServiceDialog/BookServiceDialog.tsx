import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { getUserSettings } from "common/api";
import { RequestButton, CloseButton, Spinner } from "common/components";
import { useToast } from "common/providers/ToastProvider";
import { Visit, useVisits } from "common/providers/VisitsProvider";
import { useAuth } from "modules/auth/contexts/authContext";
import { Service } from "modules/services/types";
import { useState } from "react";
import { useQuery } from "react-query";

interface BookServiceDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  service: Service;
}

const BookServiceDialog = ({
  isOpen,
  handleClose,
  service,
}: BookServiceDialogProps) => {
  const { user } = useAuth();
  const { addVisit } = useVisits();
  const [isLoading, setIsLoading] = useState(false);
  const [visitDate, setVisitDate] = useState(new Date());
  const { setSuccessMessage, setErrorMessage } = useToast();

  const { data: companySettings, isLoading: isFetching } = useQuery(
    [`user-settings-${service.userId}`],
    async () => {
      if (!user) return undefined;
      return await getUserSettings(service.userId);
    }
  );

  const handleBookVisit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const visit: Visit = {
        service,
        date: visitDate,
        customerId: user.id,
      };
      await addVisit(visit);
      handleClose();
      setSuccessMessage("Successfully booked a visit");
    } catch (err: any) {
      setErrorMessage("Unable to book a visit. Try again!");
    }
    setIsLoading(false);
  };

  const getMinMaxTime = () => {
    if (!companySettings?.openingHours) return undefined;
    const { from, to } = companySettings.openingHours;
    const fromSplitted = from.split(":");
    const toSplitted = to.split(":");
    return {
      min: new Date(0, 0, 0, +fromSplitted[0], +fromSplitted[1]),
      max: new Date(0, 0, 0, +toSplitted[0], +toSplitted[1]),
    };
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Book service</DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ minWidth: "400px" }}>
        {isFetching ? (
          <Spinner size="medium" />
        ) : (
          <DateTimePicker
            onChange={(value) => {
              if (!value) return;
              setVisitDate(value);
            }}
            minDate={new Date()}
            minTime={getMinMaxTime()?.min}
            maxTime={getMinMaxTime()?.max}
            value={visitDate}
            label="Visit date"
            renderInput={(props) => <TextField fullWidth {...props} />}
          />
        )}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: (theme) => theme.spacing(2, 3),
        }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <RequestButton
          disabled={isFetching}
          onClick={handleBookVisit}
          isLoading={isLoading}>
          Book
        </RequestButton>
      </DialogActions>
    </Dialog>
  );
};

export default BookServiceDialog;
