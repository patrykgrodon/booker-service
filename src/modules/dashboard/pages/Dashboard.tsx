import { Box, Typography } from "@mui/material";
import useTabsContainerStyles from "common/components/TabsContainer/styles";
import { useAuth } from "modules/auth/contexts/authContext";
import CustomerVisits from "../components/CustomerVisits/CustomerVisits";
import ServiceProviderVisits from "../components/ServiceProviderVisits/ServiceProviderVisits";

const Dashboard = () => {
  const classes = useTabsContainerStyles();
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.contentContainer}>
        <Typography variant="h2" component="h1">
          Upcoming visits
        </Typography>
        {user.type === "customer" ? (
          <CustomerVisits />
        ) : (
          <ServiceProviderVisits />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
