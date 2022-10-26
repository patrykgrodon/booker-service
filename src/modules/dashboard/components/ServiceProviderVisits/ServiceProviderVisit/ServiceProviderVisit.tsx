import { Card, Grid, Typography } from "@mui/material";
import { Visit } from "common/providers/VisitsProvider";
import { format } from "date-fns";
import { dashedDateTimeFormatNoSeconds } from "utils/dateTimeUtils";
import { getVisitDurationText } from "utils/getVisitDurationText";

interface ServiceProviderVisitProps {
  visit: Visit;
}

const ServiceProviderVisit = ({ visit }: ServiceProviderVisitProps) => {
  const { service, date, customer } = visit;

  const fields = [
    { label: "Service name", value: service.name },
    { label: "Date", value: format(date, dashedDateTimeFormatNoSeconds) },
    { label: "Cost", value: `${service.cost} euro` },
    { label: "Duration", value: getVisitDurationText(service.duration) },
    { label: "First name", value: customer.firstName },
    { label: "Last name", value: customer.lastName },
    { label: "Phone number", value: customer.phoneNumber },
  ];

  return (
    <Card sx={{ padding: (theme) => theme.spacing(2) }}>
      <Grid container spacing={1}>
        {fields.map(({ label, value }) => (
          <Grid key={label} item xs={12} md={6}>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontWeight: 500 }}>
              {label}
            </Typography>
            <Typography variant="subtitle1">{value}</Typography>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default ServiceProviderVisit;
