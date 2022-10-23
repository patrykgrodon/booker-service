import { Grid, Card, Typography } from "@mui/material";
import { Visit } from "common/providers/VisitsProvider";
import { makeSx } from "common/styles/makeSx";

import { format } from "date-fns";
import { dashedDateTimeFormatNoSeconds } from "utils/dateTimeUtils";

interface CustomerVisitProps {
  visit: Visit;
}

const sxCard = makeSx((theme) => ({
  padding: theme.spacing(2),
}));

const CustomerVisit = ({ visit }: CustomerVisitProps) => {
  const { id, date, service } = visit;

  const getDuration = () => {
    const [h, m] = service.duration.split(":");
    const hours = +h;
    const minutes = +m;

    const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
    const minutesText =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

    return `${hoursText} ${minutesText}`;
  };

  const fields = [
    { label: "Service name", value: service.name },
    { label: "Provider", value: service.companyName },
    { label: "Date", value: format(date, dashedDateTimeFormatNoSeconds) },
    { label: "City", value: service.city },
    { label: "Cost", value: `${service.cost} euro` },
    { label: "Duration", value: getDuration() },
  ];
  return (
    <Grid key={id} item xs={12} md={6}>
      <Card sx={sxCard}>
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
    </Grid>
  );
};

export default CustomerVisit;
