import { Box, Paper } from "@mui/material";
import ServiceProviderCalendar from "../ServiceProviderCalendar/ServiceProviderCalendar";
import ServiceProviderVisits from "../ServiceProviderVisits/ServiceProviderVisits";

const ServiceProviderDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        flex: 1,
        gap: 2,
        maxHeight: { xs: "max-content", lg: "100%" },
      }}>
      <Paper
        sx={{
          width: { xs: "100%", lg: "300px" },
          padding: (theme) => theme.spacing(2),
          overflow: "auto",
          order: { xs: 2, lg: 0 },
        }}>
        <ServiceProviderVisits />
      </Paper>
      <ServiceProviderCalendar />
    </Box>
  );
};

export default ServiceProviderDashboard;
