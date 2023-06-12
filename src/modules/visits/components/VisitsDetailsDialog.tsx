import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { CloseButton, Spinner } from "common/components";
import useVisitDetails from "../hooks/useVisitDetails";
import { format } from "date-fns";
import { dashedDateTimeFormat } from "common/utils/dateTimeUtils";

type VisitsDetailsDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  id: string;
};

const VisitsDetailsDialog = ({
  handleClose,
  isOpen,
  id,
}: VisitsDetailsDialogProps) => {
  const { visit, isLoading } = useVisitDetails(id);

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
      <DialogTitle sx={{ pb: 0 }}>Visit details</DialogTitle>
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
      <Typography variant="subtitle1">{value}</Typography>
    </Grid>
  );
};
