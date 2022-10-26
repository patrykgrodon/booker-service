import { Box, Paper } from "@mui/material";
import { Spinner } from "common/components";
import useTabsContainerStyles from "common/components/TabsContainer/styles";
import { useAuth } from "modules/auth/contexts/authContext";
import ServiceProviderCalendar from "../components/ServiceProviderCalendar/ServiceProviderCalendar";
import ServiceProviderVisits from "../components/ServiceProviderVisits/ServiceProviderVisits";
import ServiceCalendarContextProvider from "../contexts/serviceProviderCalendarContext";

const LoadingSpinner = (
  <Box sx={{ flex: 1 }}>
    <Spinner size="medium" />
  </Box>
);

const Dashboard = () => {
  const classes = useTabsContainerStyles();
  const { user } = useAuth();
  if (!user) return null;

  return (
    <ServiceCalendarContextProvider>
      <Box className={classes.mainContainer}>
        <Box
          className={classes.contentContainer}
          sx={{
            height: "100% !important",
            maxHeight: "100% !important",
            display: "flex",
            columnGap: 2,
          }}>
          <Paper
            sx={{
              maxWidth: "300px",
              padding: (theme) => theme.spacing(2),
              overflow: "auto",
            }}>
            <ServiceProviderVisits LoadingSpinner={LoadingSpinner} />
          </Paper>
          <ServiceProviderCalendar />
          {/* {user.type === "customer" ? (
          <CustomerVisits LoadingSpinner={LoadingSpinner} />
          ) : (
            <ServiceProviderVisits LoadingSpinner={LoadingSpinner} />
          )} */}
        </Box>
      </Box>
    </ServiceCalendarContextProvider>
  );
};

export default Dashboard;
