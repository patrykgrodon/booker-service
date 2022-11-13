import { Grid, Typography } from "@mui/material";
import { Visit } from "common/providers/VisitsProvider";
import CustomerVisit from "../CustomerVisit/CustomerVisit";

interface FinishedProps {
  visits: Visit[] | undefined;
}

const Finished = ({ visits }: FinishedProps) => {
  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      spacing={2}
      alignSelf="flex-start"
      sx={{ mt: { xs: 2, md: -2 } }}>
      <Grid item xs={12}>
        <Typography variant="h2">Finished</Typography>
      </Grid>
      {visits?.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="button" sx={{ fontSize: 24 }}>
            No finished visits
          </Typography>
        </Grid>
      ) : null}
      {visits
        ?.sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((visit) => (
          <CustomerVisit key={visit.id} visit={visit} />
        ))}
    </Grid>
  );
};

export default Finished;
