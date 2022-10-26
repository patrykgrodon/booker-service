import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { RequestButton, CloseButton, Spinner } from "common/components";
import useBookService from "modules/services/hooks/useBookService";

import { Service } from "modules/services/types";
import BookDays from "./BookDays/BookDays";
import BookHours from "./BookHours/BookHours";

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
  const {
    isLoading,
    handleBookVisit,
    isFetching,
    visitDate,
    currentDay,
    changeCurrentDay,
    availableHours,
    changeVisitDate,
  } = useBookService(service, handleClose);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Book service</DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent sx={{ minWidth: "400px" }}>
        {isFetching ? (
          <Spinner size="medium" />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <BookDays
              currentDay={currentDay}
              changeCurrentDay={changeCurrentDay}
            />
            <BookHours
              availableHours={availableHours}
              changeVisitDate={changeVisitDate}
              visitDate={visitDate}
            />
          </Box>
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
          disabled={!visitDate || isFetching}
          onClick={handleBookVisit}
          isLoading={isLoading}>
          Book
        </RequestButton>
      </DialogActions>
    </Dialog>
  );
};

export default BookServiceDialog;
