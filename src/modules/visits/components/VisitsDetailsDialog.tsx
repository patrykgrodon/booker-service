import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

import { CloseButton, Spinner } from "common/components";
import { dashedDateTimeFormat } from "common/utils/dateTimeUtils";
import { useModal } from "common/hooks";
import useVisitDetails from "../hooks/useVisitDetails";
import VisitFormDialog from "./VisitFormDialog";
import { DeleteVisitConfirmationDialog } from ".";

type VisitsDetailsDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  id: string;
  onEditSuccess: () => void;
  onDeleteSuccess: () => void;
};

const VisitsDetailsDialog = ({
  handleClose,
  isOpen,
  id,
  onEditSuccess,
  onDeleteSuccess,
}: VisitsDetailsDialogProps) => {
  const { visit, isLoading, refetch } = useVisitDetails(id);
  const {
    closeModal: closeEditView,
    isOpen: isEditViewOpen,
    openModal: openEditView,
  } = useModal();
  const {
    closeModal: closeDeleteView,
    isOpen: isDeleteViewOpen,
    openModal: openDeleteView,
  } = useModal();

  if (isLoading)
    return (
      <Modal open>
        <Box sx={{ width: "100%", height: "100%" }}>
          <Spinner size="medium" />
        </Box>
      </Modal>
    );
  if (!visit) return null;

  const { employee, service, customer, startAt, endAt } = visit;

  if (isEditViewOpen)
    return (
      <VisitFormDialog
        isOpen
        onSuccess={() => {
          closeEditView();
          refetch();
          onEditSuccess();
        }}
        formValues={{
          customer: customer.id,
          date: startAt,
          employee: employee.id,
          service: service.id,
        }}
        id={visit.id}
        handleClose={closeEditView}
      />
    );

  if (isDeleteViewOpen)
    return (
      <DeleteVisitConfirmationDialog
        handleClose={closeDeleteView}
        isOpen={isDeleteViewOpen}
        onDeleteSuccess={onDeleteSuccess}
        visitId={visit.id}
      />
    );

  const generalInfo = [
    {
      label: "Date start",
      value: format(startAt, dashedDateTimeFormat),
    },
    {
      label: "Date end",
      value: format(endAt, dashedDateTimeFormat),
    },
    {
      label: "Employee",
      value: `${employee.firstName} ${employee.lastName}`,
    },
    {
      label: "Service name",
      value: service.name,
    },
  ];

  const customerInfo = [
    {
      label: "Name",
      value: `${customer.firstName} ${customer.lastName}`,
    },
    {
      label: "Phone number",
      value: customer.phoneNumber,
    },
    {
      label: "E-mail",
      value: customer.email,
    },
  ];

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        sx={{ pb: 0, display: "flex", alignItems: "center", columnGap: 1 }}
      >
        Visit details
        <IconButton size="small" onClick={openEditView}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={openDeleteView}>
          <DeleteForeverOutlined fontSize="small" />
        </IconButton>
      </DialogTitle>
      <CloseButton onClick={handleClose} />
      <DialogContent>
        <Grid container spacing={1}>
          <SectionHeader title="General info" />
          {generalInfo.map(({ label, value }) => (
            <InfoItem key={label} label={label} value={value} />
          ))}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 2.5 }}>
          <SectionHeader title="Customer info" />
          {customerInfo.map(({ label, value }) => (
            <InfoItem key={label} label={label} value={value} />
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default VisitsDetailsDialog;

const SectionHeader = ({ title }: { title: string }) => (
  <Grid item xs={12}>
    <Typography variant="button" component="h3" sx={{ textTransform: "none" }}>
      {title}
    </Typography>
  </Grid>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="subtitle1">{value || "---"}</Typography>
    </Grid>
  );
};
