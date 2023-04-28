import { Box, Typography } from "@mui/material";
import { ServicesTable } from "../components";

const Services = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h3" component="h1" sx={{ lineHeight: 1, mb: 4 }}>
          My services
        </Typography>
      </Box>
      <ServicesTable />
    </Box>
  );
};

export default Services;
