import { Box } from "@mui/material";
import useTabsContainerStyles from "common/components/TabsContainer/styles";
import { useAuth } from "modules/auth/contexts/authContext";
import CustomerVisits from "../components/CustomerVisits/CustomerVisits";
import ServiceProviderDashboard from "../components/ServiceProviderDashboard/ServiceProviderDashboard";
import ServiceCalendarContextProvider from "../contexts/serviceProviderCalendarContext";

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
          }}>
          {user.type === "customer" ? (
            <CustomerVisits />
          ) : (
            <ServiceProviderDashboard />
          )}
        </Box>
      </Box>
    </ServiceCalendarContextProvider>
  );
};

export default Dashboard;
