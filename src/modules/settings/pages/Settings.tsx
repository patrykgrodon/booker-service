import { Grid } from "@mui/material";

import { PageContainer } from "common/components";
import { OpeningHours } from "../components";

const Settings = () => {
  return (
    <PageContainer title="Settings">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.5}>
          <OpeningHours />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Settings;
