import { Box, Grid, TextField } from "@mui/material";
import AllServicesTable from "./AllServicesTable/AllServicesTable";

const AllServices = () => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: (theme) => theme.spacing(4) }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search..."
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
        </Grid>
      </Grid>
      <AllServicesTable />
    </Box>
  );
};

export default AllServices;
