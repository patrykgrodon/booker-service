import { Button, Grid, Typography } from "@mui/material";
import { Visit } from "common/providers/VisitsProvider";
import { Link } from "react-router-dom";
import { Routes } from "routes";
import CustomerVisit from "../CustomerVisit/CustomerVisit";

interface UpcomingProps {
  visits: Visit[] | undefined;
}

const Upcoming = ({ visits }: UpcomingProps) => {
  return (
    <Grid container item xs={12} md={6} spacing={2} alignSelf="flex-start">
      <Grid item xs={12}>
        <Typography variant="h2">Upcoming</Typography>
      </Grid>
      {visits?.length === 0 ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "230px",
          }}>
          <Typography variant="button" sx={{ fontSize: 24 }}>
            No upcoming visits.
          </Typography>
          <Button component={Link} to={Routes.Services}>
            Book the service
          </Button>
        </Grid>
      ) : null}
      {visits
        ?.sort((a, b) => a.date.getTime() - b.date.getTime())
        .map((visit) => (
          <CustomerVisit key={visit.id} visit={visit} />
        ))}
    </Grid>
  );
};

export default Upcoming;
