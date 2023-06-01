import { Grid } from "@mui/material";

import { PageContainer } from "common/components";

const Settings = () => {
  return (
    <PageContainer title="Settings">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>
          opening hours
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Settings;
