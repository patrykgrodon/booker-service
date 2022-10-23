import { Box, Typography } from "@mui/material";
import { Spinner } from "common/components";
import useTabsContainerStyles from "common/components/TabsContainer/styles";
import { useAuth } from "modules/auth/contexts/authContext";
import CustomerVisits from "../components/CustomerVisits/CustomerVisits";
import ServiceProviderVisits from "../components/ServiceProviderVisits/ServiceProviderVisits";

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
    <Box className={classes.mainContainer}>
      <Box
        className={classes.contentContainer}
        sx={{
          height: "100% !important",
          maxHeight: "100% !important",
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography variant="h2" component="h1">
          Upcoming visits
        </Typography>
        {user.type === "customer" ? (
          <CustomerVisits LoadingSpinner={LoadingSpinner} />
        ) : (
          <ServiceProviderVisits LoadingSpinner={LoadingSpinner} />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
