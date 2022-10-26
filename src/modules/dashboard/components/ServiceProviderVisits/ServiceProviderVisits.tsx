import { Box, Grid, Typography } from "@mui/material";
import ServiceProviderVisit from "./ServiceProviderVisit/ServiceProviderVisit";
import { useServiceCalendar } from "modules/dashboard/contexts/serviceProviderCalendarContext";
import { format } from "date-fns";
import { dashedDateFormat } from "utils/dateTimeUtils";

interface ServiceProviderVisitsProps {
  LoadingSpinner: JSX.Element;
}

const ServiceProviderVisits = ({
  LoadingSpinner,
}: ServiceProviderVisitsProps) => {
  const { isLoading, serviceProviderVisits, dateRange } = useServiceCalendar();
  if (isLoading) return LoadingSpinner;

  const getDateText = () => {
    if (!dateRange) return "---";
    const { start, end } = dateRange;
    return `${format(start, dashedDateFormat)} - ${format(
      end,
      dashedDateFormat
    )}`;
  };
  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 600 }}>
        Visits
      </Typography>
      <Typography>{getDateText()}</Typography>
      <Box
        sx={{
          marginTop: (theme) => theme.spacing(3),
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: 2,
        }}>
        <Grid item xs={12}>
          <Typography variant="h3">
            {serviceProviderVisits && serviceProviderVisits.length > 0
              ? `${serviceProviderVisits.length} visits`
              : "No visits."}
          </Typography>
        </Grid>

        {serviceProviderVisits
          ?.sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((visit) => (
            <ServiceProviderVisit key={visit.id} visit={visit} />
          ))}
      </Box>
    </>
  );
};

export default ServiceProviderVisits;
