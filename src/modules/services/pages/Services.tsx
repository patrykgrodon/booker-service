import { Box, Typography } from "@mui/material";
import { ServicesTable, AddServiceBtn } from "../components";

const Services = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" sx={{ lineHeight: 1, mb: 4 }}>
          My services
        </Typography>
        <AddServiceBtn />
      </Box>
      <ServicesTable />
    </Box>
  );
};

export default Services;
