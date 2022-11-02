import { Box, Grid } from "@mui/material";

import { Spinner } from "common/components";
import Upcoming from "./Upcoming/Upcoming";
import Finished from "./Finished/Finished";
import useCustomerVisits from "modules/dashboard/hooks/useCustomerVisits";

const CustomerVisits = () => {
  const {
    isLoadingUpcVisits,
    isLoadingFinishedVisits,
    upcomingCustomerVisits,
    finishedCustomerVisits,
  } = useCustomerVisits();

  if (isLoadingUpcVisits || isLoadingFinishedVisits)
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}>
        <Spinner size="medium" />
      </Box>
    );

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{
        marginTop: (theme) => theme.spacing(3),
        maxWidth: "100%",
      }}>
      <Upcoming visits={upcomingCustomerVisits} />
      <Finished visits={finishedCustomerVisits} />
    </Grid>
  );
};

export default CustomerVisits;
